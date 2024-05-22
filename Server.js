const express=require('express');
const mongoose=require('mongoose');
const Product=require('./Product');
const app=express();
const PORT=3000;
app.use(express.json());

const conn = async () => {
    await mongoose.connect("mongodb+srv://aswin42samuel7:8gaCeXq0L4djgXhm@sample1.e5kawpx.mongodb.net/ten?retryWrites=true&w=majority&appName=sample1");
}

conn().then(() => {
    console.log("connected");
}).catch((error) => {
    console.error("not connected", error);
});
app.get('/',(req,res)=>{
    res.send("hello world updated version");
})
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})
app.post('/post',async(req,res)=>{
   try{
    await Product.create(req.body);
    res.status(200).json(Product);

   }catch(err){
    console.log(err)

   }
})
app.get('/post',async(req,res)=>{
    try{
        const p=await Product.find({});
        console.log(p);
        res.send(p);

    }catch(err){
        console.log(err);
    }
  
})
app.get('/post/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const t= await Product.findById(id);
        console.log(t);
        res.send(t);

    }catch(err){
        console.log(err);
    }
  
})
app.put('/post/:id',async(req,res)=>{
    try{
        const {id}=req.params;
       const product= await Product.findByIdAndUpdate(id,req.body);
       if(!product){
        return res.status(404).json({message:"product not found"});
       }
       const updated=await Product.findById(id);
       res.send(updated);
        

    }catch(err){
        console.log(err);
    }
  
})
app.delete('/post/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        await Product.findByIdAndDelete(id)
        res.status(200).json({message:"deleted successfully"});

    }catch(err){
        console.log(err);

    }
   
})