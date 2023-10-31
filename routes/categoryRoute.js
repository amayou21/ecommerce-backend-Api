const express=require("express")
const { getCategories } = require("../services/ctegoryService")


const router=express.Router()

router.get('/',getCategories)

module.exports=router