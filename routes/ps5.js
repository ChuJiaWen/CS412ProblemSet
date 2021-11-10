const express = require('express');
const router = express.Router();
const keys = require('../config/apikey.js');
const path = require("path");
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));//copied from Node-fetch README file
//import fetch from 'node-fetch';
const fetch = require('node-fetch');

const request = require("request");
const redis = require('redis');
const client = redis.createClient();
const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);
const existsAsync = promisify(client.exists).bind(client);
const setAsync = promisify(client.set).bind(client);
const expireAsync = promisify(client.expire).bind(client);

client.on("error",function (error){
    console.error(`Error from redis.client ${error}`);
})

router.get('/', function (req, res, next) {
    res.render('form');
    //res.sendFile(path.join(__dirname, '../public', 'form.html'));
});


/* problem c: POST method that retrieves data from an external API using Async/Await. */
/* ps5b: using redis to cache the result in memory. Timeout=15s */
async function getArray_async(query) {
    const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${keys.RECIPE_API_KEY}&number=5`);
    //     .then((response)=>{
    //         return response.json()
    // });
    const dishArray = [];
    const data = await res.json();
    data.results.map(item => {
        dishArray.push({id: item.id, title: item.title, url: null, image: null});
    });
    return dishArray;
}

async function getUrl_async(dish) {
    const resp = await fetch(`https://api.spoonacular.com/recipes/${dish.id}/information?includeNutrition=false&apiKey=${keys.RECIPE_API_KEY}`);
    const data = await resp.json();
    dish.url = data.sourceUrl;
    dish.image = data.image;
    // console.log("processed after getUrl_async:",dish);//NOTE: using `${var}` in console.log to print json objects var shows [obejct Object]
                                                     // instead of real content. HAVE TO USE ("", var) to show inner content

}

//I can't come up with another way other than Promise.all() to return dishArray after Array.map is completed.
// using await dishArray.map(dish => getUrl_async(dish)); doesn't work
async function pass_async(dishArray) {
    const unresolvedPromises = dishArray.map(dish => getUrl_async(dish));//changed dishArray.forEach(in ps4) to dishArray.map(ps5) since it doesn't work
    await Promise.all(unresolvedPromises);
}

router.post('/async', async function (req, res, next) {
    const query = req.body.query;
    if (await existsAsync(query)){//if key exists in cache, grab it
        let dishArray = await getAsync(query);
        let response ={
            dishData : dishArray,
            cached: true
        }
        res.send(response);
    }else{//if key not in cache, retrieve the result and store it in cache
        const dishArray = await getArray_async(query);
        await pass_async(dishArray);
        await setAsync(query, JSON.stringify(dishArray));
        let response ={
            dishData : dishArray,
            cached: false
        }
        await expireAsync(query,15);
        res.send(response);
    }

});

module.exports = router;
