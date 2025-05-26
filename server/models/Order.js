import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    rzp_orderid: {
        type: String,
        required: true,
        unique: true
    },
    rzp_signature: {
        type: String,
        required: true,
        unique: true
    },
    rzp_paymentid: {
        type: String,
        required: true,
        unique: true
    },
    image_link: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Order = mongoose.model('order', orderSchema);
export { Order };