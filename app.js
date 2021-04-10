const path=require('path');
const express=require('express');
const bodyParser=require('body-parser');
const session=require('express-session');
const shopRoutes=require('./routes/shop');
const adminRoutes=require('./routes/admin');
const mongoose = require('mongoose');
const MongoDBStore=require('connect-mongodb-session')(session);
const multer=require('multer');
const csrf=require('csurf');
const app=express();

const store=new MongoDBStore({
    uri:'own uri',
    collection:'sessions'
})

const csrfProtection=csrf();

const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'productimages');
    },
    filename:(req,file,cb)=>{
      let date= Date.now().toString();
      cb(null,date+file.originalname);
    }
  })
  const fileFilter=(req,file,cb)=>{//multer filefilter
    if(file.mimetype==="image/jpeg" || file.mimetype==="image/png" || file.mimetype==="image/jpg"){
      cb(null,true);
    }
    else{
      cb(null,false)
    }
  }

app.set('view engine','ejs');
app.set('views','views');

app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image'));
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'images')));
app.use(express.static(path.join(__dirname,'images')));
app.use('/productimages',express.static(path.join(__dirname, 'productimages')));
app.use(session({secret:'thisisnot for you',resave:false,saveUninitialized:false,store:store}));
app.use(csrfProtection);

app.use((req,res,next)=>{
    res.locals.isAdmin=req.session.isAdmin;
    res.locals.csrfToken=req.csrfToken();
    next();
  })

app.use(adminRoutes);
app.use(shopRoutes);

mongoose.connect(
    'own uri',
     {useNewUrlParser: true, useUnifiedTopology: true}

).then(result=>{
    app.listen(5500)})
    .catch(err=>{console.log(err);
})
