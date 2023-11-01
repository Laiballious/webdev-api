const express = require('express');
const router = express.Router();

const users = [
    { id: '1', username: 'user1', token: 'valid_token_1' },
    { id: '2', username: 'user2', token: 'valid_token_2' },
    // Add more users with their valid tokens
];

// Simulate an in-memory cart
let cart = [];

// Route for adding an Abaya to the cart
router.post("/add", (req, res) => {
    const token = req.body.token;
    const abayaId = req.body.abayaId;

    // Check if the user is authenticated (you would typically have user authentication logic)

    // Add the Abaya to the cart
    cart.push({ userId: token, abayaId });

    // Respond with a success message or the updated cart
    res.json({ message: 'Abaya added to the cart', cart });
});

// Route for proceeding to checkout
router.post("/checkout", (req, res) => {
    const token = req.body.token;

    // Check if the user is authenticated (you would typically have user authentication logic)

    // Find items in the user's cart
    const userCart = cart.filter(item => item.userId === token);

    if (userCart.length === 0) {
        return res.status(400).json({ message: 'Your cart is empty.' });
    }

    // Simulate order confirmation
    const orderConfirmation = { userId: token, orderItems: userCart, date: new Date() };

    // Clear the user's cart
    cart = cart.filter(item => item.userId !== token);

    // Respond with the order confirmation
    res.json({ message: 'Order confirmed', orderConfirmation });
});
router.post("/reviews/leave", (req, res) => {
    const token = req.body.token;
    const abayaId = req.body.abayaId;
    const rating = req.body.rating;
    const title = req.body.title;
    const review = req.body.review;



    // Check if the user is authenticated using a proper authentication mechanism
    if (!isAuthenticated(token)) {
        return res.status(401).json({ message: 'Authentication failed' });
    }

    // In a real application, you would save the review and rating to a database.
    // Here, we'll simulate by generating a unique review ID.
    const reviewId = generateUniqueReviewId();

    // Respond with the review ID or any relevant response
    res.status(201).json({ reviewId });
});
function isAuthenticated(token) {
    console.log('Received token:', token);

    // Log the contents of the users array
    console.log('Users array:', users);

    const user = users.find(u => u.token === token);
    console.log('Matched user:', user);

    return !!user;
}


// function isAuthenticated(token) {
//     console.log('Received token:', token);
//     const user = users.find(u => u.token === token);
//     console.log('Matched user:', user);
//     return !!user;
// }


module.exports = router;
