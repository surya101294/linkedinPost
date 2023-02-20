const express= require("express")
const { BlogModel } = require("../Model/BlogModel")

const BlogRouter=express.Router()

BlogRouter.get("/", async(req,res)=>{
    const search=req.query
    const blog=await BlogModel.find(search)
    res.send(blog)
})
BlogRouter.post("/create", async(req,res)=>{
    
    try{
        const blog=new BlogModel(req.body)
        await blog.save()
            res.send("Post created Succssfull")
        }    
    catch(err){
    res.send({"msg":"something Wrong", "err":err.message})
    }
})


BlogRouter.patch("/update/:id", async(req,res)=>{
    const id= req.params.id
    const blogs=await BlogModel.findOne({'_id':id})

    const userID= req.body.user
    try{
        if(blogs.user!==userID)
            res.send({"msg":"Not Authorized"})
        else{
            await BlogModel.findByIdAndUpdate({"_id":id}, req.body)
            res.send("Update Succssfull")
        }    
    }catch(err){
    res.send({"msg":"something Wrong", "err":err.message})
    }
})

BlogRouter.delete("/delete/:id", async(req,res)=>{
    const id= req.params.id
    const blogs=await BlogModel.findOne({'_id':id})

    const userID= req.body.user
    try{
        if(blogs.user!==userID)
            res.send({"msg":"Not Authorized"})
        else{
            await BlogModel.findByIdAndDelete({"_id":id})
            res.send("Update Succssfull")
        }    
    }catch(err){
    res.send({"msg":"something Wrong", "err":err.message})
    }
})


module.exports={BlogRouter}

// /posts ==> This will show the posts of logged in users.
// /posts/top ==> This will show the post details that has maximum number of comments for the user who has logged in.
// /posts/update ==> The logged in user can update his/her posts.
// /posts/delete ==> The logged in user can delete his/her posts.

// Following functionalities should also be there.
// 1. If the device name is passed as query, then it should show only those posts from which device that post has been made.
//  2. For Example, device=Mobile ==> will give mobile posts only.
// 3. device1=Mobile & device2=Tablet ==> will give the posts made by mobile and tablet.