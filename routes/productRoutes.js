import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddlewares.js'
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFilterController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js'
import formidable from 'express-formidable'

const router = express.Router()

//routes
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)

//update product
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)

// get products
router.get('/get-product',getProductController)

//get single product
router.get('/get-product/:slug',getSingleProductController)

//get photo
router.get('/get-productphoto/:pid',productPhotoController)

//delete product
router.delete('/delete-product/:pid',deleteProductController)

//filter products
router.post('/product-filter',productFilterController)

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword",searchProductController);

//similiar product
router.get("/related-product/:pid/:cid",relatedProductController)

//category wise products
router.get("/product-category/:slug",productCategoryController)

//payment routes
//token
router.get("/braintree/token", braintreeTokenController)

//payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController )





export default router