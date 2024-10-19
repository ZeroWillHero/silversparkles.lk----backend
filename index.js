const express = require('express');
const cors = require('cors');
const app = express();

// Configure CORS to allow requests from any origin
app.use(cors());

// Your existing routes and middleware
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/media", medaiRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/collabs", collabs);

// Check if authorized
app.get("/api/check/auth", auth, (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Authorized"
    });
});

// Handle 404 not found error
app.all("*", (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: "404 not found"
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});