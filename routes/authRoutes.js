const express = require('express');
const User = require('../models/User');
const passport = require('passport');




const router= express.Router()

router.get('/login',(req,res)=>{
    res.render('./auth/signin');

})

router.post('/register', async(req, res) => {
    let {username,email,password,age,gender}=req.body;
    console.log(username,email,password,age,gender);
    let newuser=new User({username,email,age,gender});
    let welcome=await User.register(newuser,password);
    res.redirect('/login');
})

router.post('/login',
passport.authenticate('local',{failureRedirect:'/login'}),
function(req,res){
     //console.log(req.user , "new");//req.user humko sari attributes dega db ka
    res.redirect('/products');
})

router.get('/register',(req,res)=>{
    
    res.render('./auth/signup');

})






// export so that you can use it in app.ja
module.exports = router;