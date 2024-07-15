import slugify from "slugify"
import categoryModel from "../models/categoryModel.js"

export const createCategoryController = async(req,res)=>{
    try {
        const {name} = req.body
        if(!name){
            return res.status(401).send({
                message:"Name is required"
            })
        }
        const existingCategory = await categoryModel.findOne({name})

        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:"Category Already Exists"
            })
        }

     const category = await new categoryModel({name,slug:slugify(name)}).save()   
     res.status(201).send({
        success:true,
        message:"New category Created",
        category
     })

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in category"
        })
    }

}

//update category
export const updateCategoryController=async(req,res)=>{
    try {
const {name} = req.body
const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:"Category Updated",
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in Updating category"
        })
    }
}

//get category
export const categoryController=async(req,res)=>{
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:"All categories List",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in getting category"
        })
    }
}

//single catwegoruy
export const singleCategoryController = async(req,res)=>{
    try {
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:"successfully get single category",
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while getting single category",
            error
        })
    }

}

//delerte category
export const deleteCategoryController = async(req,res)=>{
    try {
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"category deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while deleting category",
            error
        })
    }
}