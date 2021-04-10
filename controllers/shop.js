const express = require("express");

const Product=require('../models/product');

exports.displayShop=(req,res,next)=>{
    Product.find({}).then(products=>{
        res.render('shop',{
            products:products,
            editing:true
        })
    }).catch(err=>{
        console.log(err);
    })

}

