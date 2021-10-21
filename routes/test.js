const express = require('express');
const router = express.Router();
const keys = require('../config/apikey.js');
const path = require("path");

const request = require("request");

/* problem b: POST method that retrieves data from an external API. */
const doReq =  function (query) {
    //resolve: if there is no error, run resolve
    //reject: if there is a problem, run reject
    return new Promise(function (resolve, reject) {
        //console.log("URL in options is",options.url);
        let dishArray = [];

        let getArray =  function(){
            return new Promise(function(resolve, reject) {
                const options = {
                    method: 'GET',
                    url: `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${keys.RECIPE_API_KEY}&number=3`
                }

                request(options,function (error, response, body) {
                    if (error){
                        reject(new Error("Error happened in getUrl"))
                    }else{
                        JSON.parse(body).results.map(item => {
                            dishArray.push({id: item.id, title: item.title, url: null});
                        });
                        console.log("Getting dish id for each result. dishArray: ", dishArray);
                        resolve(dishArray);
                    }
                })
            })
        }

        let getUrl = function(dish){
            return new Promise(function (resolve, reject){
                const options = {
                    method: 'GET',
                    url: `https://api.spoonacular.com/recipes/${dish.id}/information?includeNutrition=false&apiKey=${keys.RECIPE_API_KEY}`
                }

                request(options,function (error, response, body) {
                    if (error){
                        reject(new Error("Error happened in getUrl"))
                    }else{
                        dish.url = JSON.parse(body).sourceUrl;
                        resolve(dishArray);
                    }
                })
                // .then(function (info){
                //     dish.url = info.data.sourceUrl;
                //     console.log(`Getting the dish ${dish.title}'s url: ${dish.url}`);
                //     resolve();
                // })
            })
        }

        console.log('Starting recipe loop');
        let dishes =  Promise.resolve(getArray().then(
            (dishArray)=>{
                let dishPromises = dishArray.map(getUrl);

                Promise.all(dishPromises)
                    .then(function () {
                        //do the callback, pass cities to the callback
                        console.log("in promise all:", dishArray)
                        resolve(dishArray); //null means no error
                    })
                    .catch(function (err) {
                        console.log(err);
                    })

            }
        ));
        console.log("call Promise.resolve(getArray", dishes);
        let Array = [
            { id: 656791, title: 'Pork Menudo', url: null },
            { id: 656777, title: 'Pork Fried Rice', url: null },
            { id: 656795, title: 'Pork Patty Bánh Mì', url: null }
        ]
        // console.log("dishArray looks like", dishArray);
        // console.log("dishes looks like", dishes);
        //  let dishPromises = Array.map(getUrl);
        //
        // Promise.all(dishPromises)
        //     .then(function () {
        //         //do the callback, pass cities to the callback
        //         console.log("in promise all:", Array)
        //         resolve(Array); //null means no error
        //     })
        //     .catch(function (err) {
        //         console.log(err);
        //     })

    })
}
router.get('/', function(req, res, next) {
    let foo;
    res.render('form');
    //res.sendFile(path.join(__dirname, '../public', 'form.html'));
});

router.post('/', function(req, res, next) {
    console.log("Hi, I reached router.post");
    const query = req.body.query;
    doReq(query) //hangs right here
        //Resolve function:
        .then(function (body) {
            console.log("Here is the body in router:",body);
            res.send(`this is body ${body}`)
            // const dishArray = [];
            // const value = JSON.parse(body);
            // value.results.map(item => {
            //     dishArray.push({title: item.title});
            // })
            // console.log("Value is:",value);
            // console.log("Can I access value.results.title?", dishArray)
            // },
            // //Reject function
            // function (err) {
            //     console.log(`An error happened`);
        })
        .catch(function(err) {
            console.log(`ERROR! ${err}`);
        });
    //res.render('index')
});

module.exports = router;
