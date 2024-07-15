import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddlewares.js'
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js'

const router = express.Router()

//routes
//create category routes
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

//update category routes
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

//getAll categories routes
router.get('/get-category',categoryController)

//single category routes
router.get('/single-category/:slug',singleCategoryController)

//delete category routes
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)

export default router