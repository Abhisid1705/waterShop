const express=require('express');

const isAuth=require('../middleware/is-Auth');

const adminController=require('../controllers/admin');

const router=express.Router();

router.get('/admin/edit-product/:productId',isAuth,adminController.getEditpage);

router.get('/admin/signup',adminController.getsignup);

router.post('/admin/signup',adminController.postSignup);

router.get('/admin/login',adminController.getadminLogin);

router.post('/admin/login',adminController.postlogin);

router.post('/admin/logout',isAuth,adminController.postLogout);

router.get('/admin/task',isAuth,adminController.getTask);

router.post('/admin/add-product',isAuth,adminController.postAddProduct);

router.post('/admin/edit-product',isAuth,adminController.postEditProduct);

module.exports=router;