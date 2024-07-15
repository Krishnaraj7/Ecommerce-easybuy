import express from 'express'
import  { registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddlewares.js'

const router = express.Router()

//REGISTER
router.post('/register',registerController)
//LOGIN
router.post('/login', loginController)

//forgot password
router.post('/forgot-password', forgotPasswordController)

//test route
router.get('/test', requireSignIn,isAdmin, testController)

//protected routes
router.get('/user-auth', requireSignIn, (req,res) =>{
    res.status(200).send({ok:true})
})
//protected routes admin
router.get('/admin-auth', requireSignIn, isAdmin, (req,res) =>{
    res.status(200).send({ok:true})
})

//update profile
router.put(`/profile`,requireSignIn,updateProfileController)

//orders
router.get('/orders', requireSignIn,getOrdersController)

//get All orders
router.get('/all-orders', requireSignIn, isAdmin,getAllOrdersController)

//order status
router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController)


export default router