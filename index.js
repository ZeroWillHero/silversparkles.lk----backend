const express = require('express');
const cors = require("cors");
require('dotenv').config();
var bodyParser = require('body-parser')
const path = require('path');
const userRoutes = require("./module/user/user.routes")
const productRoutes = require("./module/product/product.routes")
const wishlistRoutes = require("./module/wishlist/wishlist.routes")
const cartRoutes = require("./module/cart/cart.routes")
const orderRoutes = require("./module/order/order.routes")
const medaiRoutes = require("./module/media/media.routes");
const reviewRoutes = require("./module/review/review.routes");
const auth = require("./middleware/auth")



const port = 3000;
const app = express();

// handle cors error
app.use(cors())
app.use('/uploads', express.static('uploads'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// parse application/x-www-form-urlencoded
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));




// mongoose.connect(process.env.MONGO_DB_URL, {}).then(() => {
//     console.log("Database connection succesfuly");
// }).catch((err) => {
//     console.log(err);
// })

// // mongoose.model("User", userSchema)
// require("./model/userModel")
// require("./model/productModel")

// Main route
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order",orderRoutes)
app.use("/api/media",medaiRoutes)
app.use("/api/review",reviewRoutes)

// check is authorized 
app.get ("/api/check/auth",auth,(req,res)=>{
    res.status(200).json({
        status:"success",
        message:"Authorized"
    });
})

// handle 404 not found error
app.all("*", (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: "404 not found"
    })
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
