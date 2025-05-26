import { wrapAsync } from '../utils/wrapAsync.js'
import { User } from '../models/User.js';
import { Order } from '../models/Order.js';
import {v2 as cloudinary} from 'cloudinary';
import Razorpay from 'razorpay';
import crypto from 'crypto';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const allOrders = wrapAsync(async (req, res) => {
    const loggedInUserID = req.user.id;
    const loggedInUser = await User.findById(loggedInUserID);
    if (!loggedInUser) {
        return res.status(404).json({ message: "User not found" });
    }
    const loggedInUserOrders = await Order.find({ user_id: loggedInUserID });
    res.json(loggedInUserOrders);
});


export const verifyPayment = async (req, res) => {
    try {
        let { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        let sign = razorpay_order_id + "|" + razorpay_payment_id;
        console.log(razorpay_order_id);
        console.log(razorpay_payment_id);
        console.log(razorpay_signature);
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(sign.toString()).digest("hex");
        console.log(response.razorpay_signature);
        console.log(expectedSign);
        if (razorpay_signature === expectedSign) {
            res.send({ "message": "Payment Verified" }).status(200);
        } else {
            res.send({ "message": "Payment Verification Failed" }).status(401);
        }
    } catch (e) {
        console.log(e);
        res.send(e);
    }
}

export const createOrder = async (req, res) => {
    try {
        let { amount } = req.body;
        const options = {
            amount: amount,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        }

        const rzp_instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY,
            key_secret: process.env.RAZORPAY_SECRET
        });

        const order = await rzp_instance.orders.create(options);
        res.json(order);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
}

const uploadToCloudinary = async (buffer) => {
    try {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image' },
                (error, result) => {
                    if (error) {
                        reject(new Error('Cloudinary upload failed'));
                    } else {
                        resolve(result); 
                    }
                }
            );
            uploadStream.end(buffer);
        });
    } catch (err) {
        console.error('Cloudinary upload error:', err.message);
        throw new Error('Failed to upload images to Cloudinary');
    }
};

export const orderSuccess =
    wrapAsync(async (req, res) => {
        const { price, rzp_orderid, rzp_paymentid, rzp_signature } = req.body;
        const loggedInUserID = req.user.id;
        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        const result = await uploadToCloudinary(req.file.buffer);
        const newOrder = new Order({
            user_id: loggedInUserID,
            price,
            rzp_orderid,
            rzp_paymentid,
            rzp_signature,
            image_link: result.secure_url
        });

        await newOrder.save();

        res.status(200).json({ message: "Order placed successfully" });

    });
