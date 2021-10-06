var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: `Welcome to Jiawen Chu's CS412 PS2/3`, string:'Have Fun!'});
});

//Part c: A route using the POST method
router.post('/', function(req, res, next) {
    res.render('index', { string: `Your string is: "${req.body.string}"`, len:`It has length: ${req.body.string.length}`});
});

//Part d: the "/:"column tells what is stored in params
router.get('/names/:fname',function(req, res, next){
    res.render( 'index',{name:req.params.fname} )
})

/* router.route('/pass')
    .get((req,res,next) => {
      res.send('Got something in the GET');
    })
    //simulate it using Postman: POST:http://localhost:300/pass  Add values into "firstName" in the "BODY"
    .post((req,res,next) => {
      res.render('index', {name:req.body.firstName});
    })
    .put((req,res,next) => {

    })
*/


module.exports = router;
