const express = require('express');
const Product = require('../models/Product');
const router = express.Router(); //mini instance/application;
const Review = require('../models/Review');
router.post('/products/:id/review',async (req,res)=>{
    let {id} = req.params;
    let {rating , comment} = req.body;
    let product= await Product.findById(id);
    let review = new Review({rating , comment});
    product.reviews.push(review);
    await product.save();
    await review.save();
    res.send(" review daal gya")
});

// export so that you can use it in app.ja
module.exports = router;