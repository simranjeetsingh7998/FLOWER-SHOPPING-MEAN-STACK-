// require is the node js import syntax
var express = require('express');  
var router = express.Router();
var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
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

// we need to turn the upper defination into the model
//model name,schema ,table name
var Flowers = mongoose.model('orderModel', orderSchema, 'order');
// module.exports = mongoose.model('orderModel', orderSchema, 'order');

router.get('', (request, response) => {
    console.log(request.body);
    response.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200'
    })
    //error if any,table name
    Flowers.find({}, function (err, flowers) {
        if (err) {
            throw err
        }
        else {
            console.log('Get Orders request processed successfully')
            response.send(flowers);
        }
    });
})

router.post('/addOrder', (req, res) => {
    let orders = req.body;
    console.log("Request in post is " + req.body);
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200'
    })
    Flowers.create(orders, function (err, order) {
        if (err) {
            console.log("The error is : " + err);
            res.status(400);
            res.send(err);
        }
        else {
            console.log("The success is : " +order);
            res.send(order);
        }
    })
});
router.delete('/deleteOrder/:flowerName', (req, res) => {
    var flowerName = req.params.flowerName;
    var query = { "name": flowerName };
    toDelete = req.body;
    console.log("Order to delete is " + flowerName);
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200'
    })
    Flowers.findOneAndRemove(query, toDelete, (err, flower) => {
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
})
module.exports = router;