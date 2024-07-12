const express=require('express');
const router=express.Router()

router.get('/prime',async(req,res)=>{
    const data=await fetch("http://20.244.56.144/test/primes")
    await data.json();
    console.log(data);
})




module.exports=router