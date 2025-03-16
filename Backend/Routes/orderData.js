const express = require("express");
const router = express.Router();
const Order = require("../models/orders");

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    let todayDate = new Date().toDateString();  // Example: "Sat Mar 16 2025"

    let userOrder = await Order.findOne({ email: req.body.email });

    if (!userOrder) {
        // Create a new order document if the user has no previous orders
        try {
            await Order.create({
                email: req.body.email,
                order_data: [{ Order_date: todayDate, items: data }]
            });
            return res.json({ success: true });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Check if there's an existing order for today
    let orderIndex = userOrder.order_data.findIndex(order => order.Order_date === todayDate);

    if (orderIndex !== -1) {
        // If today's order exists, add items to it
        try {
            await Order.findOneAndUpdate(
                { email: req.body.email, "order_data.Order_date": todayDate },
                { $push: { "order_data.$.items": { $each: data } } }
            );
            return res.json({ success: true });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } else {
        // If there's no order for today, create a new entry
        try {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: { Order_date: todayDate, items: data } } }
            );
            return res.json({ success: true });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
});


router.post("/myOrder", async (req, res) => {
    try {
        let data = await Order.findOne({ email: req.body.email });

        if (!data) {
            return res.status(404).json({ message: "No orders found for this user" });
        }

        // Format the response to group orders by date
        let formattedOrders = data.order_data.map(order => ({
            date: order.Order_date,
            items: order.items
        }));

        res.json({ orders: formattedOrders });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
