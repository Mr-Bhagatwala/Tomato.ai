import userModel from '../models/userModel.js'


//add item to user cart
const addToCart = async (req,res) => {
    try {
            //let userData = await userModel.findById(req.body.userId)
        let userData = await userModel.findOne({_id : req.body.userId})//herewe will get userId from authMiddleware
        if(!userData){
            return res.json({success : false , message:"error while fetchd data"})
        }
        let cartData = userData.cartData
    
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId , {cartData})
        res.json({success : true , message:"added to cart"})
    } catch (error) {
        console.log(error)
        res.json({success : false , message:"error while addToCart"})
    }
}

//remove item from user cart

const removeFromCart = async (req,res) => {
        try {
            let userData = await userModel.findById(req.body.userId)//herewe will get userId from authMiddleware
            let cartData = userData.cartData
            if(cartData[req.body.itemId] > 0){
                cartData[req.body.itemId] -= 1;
            }
            await userModel.findByIdAndUpdate(req.body.userId,{cartData})
            res.json({success : true , message : "Item will be removed from cart"})
        } catch (error) {
            console.log(error)
            res.json({success : false , message:"error while remove from cart"})
        }
}

//fetch user cart data
const getCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId)//herewe will get userId from authMiddleware
        let cartData = userData.cartData
        res.json({success:true , cartData})
    } catch (error) {
        console.log(error)
        res.json({success:false , message : "error while get cart details"})
    }
}

export {
    addToCart,
    removeFromCart,
    getCart

}