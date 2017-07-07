const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = require("bluebird")
mongoose.connect("mongodb://localhost:27017/car");

const hobbySchema = new Schema({
  make:String,
  color:String,
  model:[{
    name:String,
    year:String
  }],
  price:String
});

const hobby = mongoose.model("car", hobbySchema);


const edit = function (req,res,next) {
  if (req.body.item === "name"){
    hobby.updateOne({_id: req.params.id}, {model: {name: req.body.new_item }}).then(function (name) {
      console.log(name)
      // res.redirect("/");
    });
  }
   if (req.body.item === "year"){
    hobby.updateOne({_id: req.params.id}, {model: {  year: req.body.new_item }}).then(function (year) {
      console.log(year);
      // res.redirect("/");
    });
  } if (req.body.item === "make"){
    hobby.updateOne({_id: req.params.id},{make: req.body.new_item}).then(function (new_info) {
      console.log(new_info);
      // res.redirect("/");
    });
  } if (req.body.item === "color"){
    hobby.updateOne({_id: req.params.id},{color: req.body.new_item}).then(function (new_info) {
      console.log(new_info);
      // res.redirect("/");
    });
  }if (req.body.item === "price"){
    hobby.updateOne({_id: req.params.id},{price: req.body.new_item}).then(function (new_info) {
      console.log(new_info);
      // res.redirect("/");
    });
}
next();
}




router.get("/", function (req , res) {
hobby.find({}).then(function (cars) {
  console.log(cars);
  console.log(cars.model);
  res.render("index", {info: cars});
})

});

router.post("/", function (req, res) {
  let car = new hobby({
    make: req.body.make,
    color: req.body.color,
    price: req.body.price
  });
  car.model.push({name: req.body.name , year: req.body.year});
  hobby.create(car).then(function (cars) {
    console.log(cars);
    res.redirect("/");
  })
});

router.post("/:id/delete", function (req, res) {
  hobby.deleteOne({_id: req.params.id}).then(function (old_car) {
    res.redirect("/");
  })
})

router.post("/:id/edit" , edit,  function (req, res) {

res.redirect("/");
  console.log(req.body.item);
  console.log(req.body.new_item);


});




module.exports = router;
