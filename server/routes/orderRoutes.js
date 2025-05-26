import express from 'express';
const router = express.Router({mergeParams: true});
import { allOrders, createOrder, orderSuccess, verifyPayment } from '../controllers/OrderController.js';
import { verifyToken } from '../Middleware.js';
import { upload } from '../utils/upload.js';

router
    .route("/")
    .get(
        verifyToken , allOrders
    )
    .post(
        createOrder
    );

router
    .route("/place")
    .post(
        verifyToken, upload.single("image"), orderSuccess
    )
    .get(
        verifyPayment
    );

export default router;