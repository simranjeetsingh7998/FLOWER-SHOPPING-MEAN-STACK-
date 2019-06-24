var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var stockSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

//model name,schema ,table name
var Stock = mongoose.model('stockModel', stockSchema, 'stock');

router.get('', (request, response) => {
    console.log(request.body);
    response.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200'
    })
    //error if any,table name
    Stock.find({}, function (err, stock) {
        if (err) {
            throw err;
        }
        else {
            console.log('Get stock request processed successfully')
            response.send(stock);
        }
    });
})

router.post('/addStock', (req, res) => {
    let stocks = req.body;
    console.log("Request in post is " + req.body);
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200'
    })
    Stock.create(stocks, function (err, stock) {
        if (err) {
            console.log("The error is : " + err);
            res.status(400);
            res.send(err);
        }
        else {
            console.log("The success is : " + stock);
            res.send(stock);
        }
    })
});
router.put('/decreaseStock/:flowerName', (req, res) => {
    var FlowerName = req.params.flowerName;
    var updatedFlower = {   $inc : { "quantity": -req.body.quantity }};
    var query = {   "name": FlowerName };

    console.log("Flower to update is " + FlowerName);
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200'
    })

    Stock.findOneAndUpdate(query, updatedFlower, (err,flower) => {
        if (err) {
            console.log("The error is : " + err);
            res.status(400);
            res.send(err);
        }
        else {
            console.log("The success is : " + flower);
            res.send(flower);
        }
    })
});

router.put('/updateStock/:flowerName', (req, res) => {
    var FlowerName = req.params.flowerName;
    var updatedFlower = { $set : { "quantity" : req.body.quantity}};
    var query = { "name": FlowerName };

    console.log("Flower to update is " + JSON.stringify(updatedFlower));
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200'
    })

    Stock.findOneAndUpdate(query, updatedFlower, (err,flower) => {
        if (err) {
            console.log("The error is : " + err);
            res.status(400);
            res.send(err);
        }
        else {
            console.log("The success is : " + flower);
            res.send(flower);
        }
    })
});
module.exports = router;