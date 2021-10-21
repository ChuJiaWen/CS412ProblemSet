const express = require('express');
const router = express.Router();
const keys = require('../config/apikey.js');
const path = require("path");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));//copied from Node-fetch README file
//import fetch from 'node-fetch';

const request = require("request");

/* problem b: POST method that retrieves data from an external API using Promises. */
const doReq = function (query) {
    //resolve: if there is no error, run resolve
    //reject: if there is a problem, run reject
    return new Promise(function (resolve, reject) {
        //console.log("URL in options is",options.url);
        let dishArray = [];

        let getDish_promise = function () {
            /*The first promise to get the dish id and title related to the user input query*/
            return new Promise(function (resolve, reject) {
                const options = {
                    method: 'GET',
                    url: `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${keys.RECIPE_API_KEY}&number=5`
                }

                request(options, function (error, response, body) {
                    if (error) {
                        reject(new Error("Error happened in getDish_promise. Check if apiKey has exceeded quota."))
                    } else {
                        //create an array that stores the result
                        JSON.parse(body).results.map(item => {
                            dishArray.push({id: item.id, title: item.title, url: null, image: null});
                        });
                        console.log("Getting dish id for each result. dishArray: ", dishArray);
                        resolve(dishArray);
                    }
                })
            })
        }

        let getUrl_promise = function (dish) {
            /*The second promise to get the recipe url and image related to the dish*/
            return new Promise(function (resolve, reject) {
                const options = {
                    method: 'GET',
                    url: `https://api.spoonacular.com/recipes/${dish.id}/information?includeNutrition=false&apiKey=${keys.RECIPE_API_KEY}`
                }

                request(options, function (error, response, body) {
                    if (error) {
                        reject(new Error("Error happened in getUrl_promise"))
                    } else {
                        //update the information of each dish
                        dish.url = JSON.parse(body).sourceUrl;
                        dish.image = JSON.parse(body).image;
                        resolve();
                    }
                })
            })
        }
        /*I'm a bit confused why this works though...
        * From my understanding: first call getDish_promise() to get a list of dish, ".then()" ensures that I start to iterate
        * over each dish in dishArray after I have got all the results from getDish_promise()
        * Then it call getUrl_promise(dish) on every item in dishArray, and update the information in it.
        * When dishPromises(aka. getUrl_promise) completes, it returns to the router with results */
        let dishes = Promise.resolve(getDish_promise().then(
            (dishArray) => {
                let dishPromises = dishArray.map(getUrl_promise);
                //NOTE: Must use Promise.all instead of Promise.resolve, otherwise the url & image won't be shown
                //Don't know why
                Promise.all(dishPromises)
                    .then(function () {
                        resolve(dishArray);
                    })
                    .catch(function (err) {
                        console.log(err);
                    })

            }
        ));
        console.log("call Promise.resolve(getDish_promise", dishes);


    })
}
router.get('/', function (req, res, next) {
    let foo;
    res.render('form');
    //res.sendFile(path.join(__dirname, '../public', 'form.html'));
});

router.post('/promise', function (req, res, next) {
    const query = req.body.query;
    const syntax = 'Promise';
    doReq(query) //hangs right here
        //Resolve function:
        .then(function (body) {
            console.log("Here is the body in router:", body);
            res.render('result', {dishArray: body, ingredient: query, syntax: syntax})
        })
        .catch(function (err) {
            console.log(`ERROR! ${err}`);
        });
    // From class:
    // return new Promise((resolve, reject) => {
    //     const result = request('url', (err, response, body) => {
    //         //the response after the request has completed
    //         if (response.statusCode == 200) {
    //             resolve(body);
    //         } else {
    //             reject("bad call");
    //         }
    //     })
    // }).then((result) => {
    //         res.render('index', {title: result})
    //     },
    //     //reject function
    //     (result) => {
    //         res.render('index', {title: result})
    //     }
    // );
});

/* problem c: POST method that retrieves data from an external API using Async/Await. */
async function getArray_async(query) {
    const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${keys.RECIPE_API_KEY}&number=5`);
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
}

//I can't come up with another way other than Promise.all() to return dishArray after Array.map is completed.
// using await dishArray.map(dish => getUrl_async(dish)); doesn't work
async function pass_async(dishArray) {
    const unresolvedPromises = dishArray.forEach(dish => getUrl_async(dish));
    await Promise.all(unresolvedPromises);
}

router.post('/async', async function (req, res, next) {
    const query = req.body.query;
    const syntax = 'Async/Await';
    const dishArray = await getArray_async(query);
    await pass_async(dishArray);
    res.render('result', {dishArray: dishArray, ingredient: query, syntax: syntax});
});

/* problem d: POST method that retrieves data from an external API using Callback. */
const getUrl_cb = function (dish, cb) {
    const options = {
        method: 'GET',
        url: `https://api.spoonacular.com/recipes/${dish.id}/information?includeNutrition=false&apiKey=${keys.RECIPE_API_KEY}`
    }
    request(options, function (error, response, body) {
        if (error) {
            new Error("Error happened in getUrl_cb")
        } else {
            //update the information of each dish
            dish.url = JSON.parse(body).sourceUrl;
            dish.image = JSON.parse(body).image;
            cb();
        }
    })
}

const getDish_cb = function (query, callback) {
    //callback = getResult_cb
    let dishArray = [];
    const options = {
        method: 'GET',
        url: `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${keys.RECIPE_API_KEY}&number=5`
    }

    request(options, function (error, response, body) {
        if (error) {
            new Error("Error happened in getDish_cb. Check if apiKey has exceeded quota.");
        } else {
            //create an array that stores the result
            JSON.parse(body).results.forEach(item => {
                dishArray.push({id: item.id, title: item.title, url: null, image: null});
            });
            console.log("Getting dish id for each result. dishArray: ", dishArray);

            //running getResult_cb(dishArray, getUrl_cb)
            //getResult_cb is defined inside router.post(I cannot come up with a cleaner way to have completed dishArray
            // to be passed in res.render()
            return callback(dishArray, getUrl_cb);
        }
    })
}

router.post('/callback', function (req, res, next) {
    const query = req.body.query;
    const syntax = 'Callback';

    const getResult_cb = function (dishArray, cb) {
        //cb = getUrl_cb
        let requests = dishArray.map(dish => {
            return new Promise((resolve) => {
                cb(dish, resolve);//running getUrl_cb(dish, resolve) here
            })
        })
        //Tried to use callback instead of promise to wait for Array.map finish, but didn't work
        Promise.all(requests).then(() => {
            console.log("This should work now. dishArray:", dishArray);
            res.render('result', {dishArray: dishArray, ingredient: query, syntax: syntax})
        })

    }

    getDish_cb(query, getResult_cb);

});
module.exports = router;
