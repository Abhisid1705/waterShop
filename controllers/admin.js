const Admin=require('../models/admin');

const Product=require('../models/product');

const bcrypt=require('bcryptjs');

exports.getEditpage=(req,res,next)=>{
    const prodId=req.body.productId;
    console.log(prodId);
    Product.findById(prodId).then(product=>{
        if(!product){
            return res.redirect('/admin/edit-product');
        }
        res.render('add-product',{
            editing:true,
            product:product
        }).catch(err=>{
            console.log(err);
        })
    })   
}
exports.getsignup=(req,res,next)=>{
    console.log(req.session);
    res.render('admin/signup');
}
exports.postSignup=(req,res,next)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    Admin.findOne({email:email}).then(user=>{
        if(!user){
            bcrypt.hash(password,12).then(encryptedpassword=>{
                const admin=new Admin({
                    name:name,
                    password:encryptedpassword,
                    email:email
                })
                return admin.save();
        
            }).then(result=>{
                res.redirect('/admin/login');
            }).catch(err=>console.log(err));
        }
        else{
            res.redirect('/admin/signup');
        }
    })
    

}
exports.getadminLogin=(req,res,next)=>{
    console.log('yes');
    res.render('admin/login');
}
exports.postlogin=(req,res,next)=>{
    let email=req.body.email;
    let password=req.body.password;
    Admin.findOne({email:email}).then(admin=>{
        if(!admin){
            return res.status(422).render('admin/login');
        }
        else{
          bcrypt.compare(password,admin.password).then(doMatch=>{
              if(!doMatch){
                return res.status(422).render('admin/login');
              }
              else{
                  req.session.isAdmin=true;
                  req.session.admin=admin;
                  return req.session.save(err=>{
                      console.log(err);
                      return res.render('admin/admin-main');
                  })
              }
          })
        }
    })
}
exports.postLogout=(req,res,next)=>{
    req.session.destroy(err=>{
        console.log(req.session);
        res.redirect('/admin/login');
    })
}
exports.getTask=(req,res,next)=>{
    let task=req.query.adminTask;
    if(task=="addProduct"){
        res.render('add-product',{
            editing:false
        })

    }
    else if(task="editProduct"){
        res.render('add-product',{
            editing:true
        })

    }
    else{
          res.render('userDetails',{
              editing:false
          })
    }
}
exports.postAddProduct=(req,res,next)=>{
    let title=req.body.title;
    let image=req.file;
    let description=req.body.description;
    let price=req.body.price;
    if(!image){
        return res.status(422).render('add-product');
    }
    imageUrl=image.path;

    let product=new Product({
        title:title,
        price:price,
        imageUrl:imageUrl,
        description:description
    });
    console.log('title',title);
    console.log(imageUrl);
    product.save().then(result=>{
        console.log('created');
        res.redirect('/');
    }).catch(err=>{
        console.log(err);
    })


    
}
exports.postEditProduct=(req,res,next)=>{
 const prodId=req.body.productId;
 Product.findById(prodId).then(product=>{
     if(!product){
         return res.redirect('/');
     }
     res.render('add-product',{
         editing:true,
         product:product
     }).catch(err=>{
         console.log(err);
     })
 })   
}