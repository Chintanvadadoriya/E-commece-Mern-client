// src/components/PaymentForm.js

import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { paymentIntentServiceApi } from '../services/authService';

const PaymentForm = () => {
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            return;
        }

        setProcessing(true);

        // Call your backend to create a PaymentIntent and get the client secret
        const { data: { clientSecret } } = await paymentIntentServiceApi({
            email: "ridhish@gmail.com",
            amount: 240,
        });

        console.log('clientSecret', clientSecret);

        // Confirm the payment with the client secret
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'ridhish', // Optional
                },
            },
        });

        if (error) {
            setError(error.message);
            setProcessing(false);
        } else {
            if (paymentIntent.status === 'succeeded') {
                setSucceeded(true);
                // Handle successful payment
            } else {
                // Handle other statuses, if necessary
            }
            setProcessing(false);
        }
    };

    return (
        <div className="max-w-md mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Complete Payment</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="card-element">
                        Card Details
                    </label>
                    <div className="border p-2 rounded-lg">
                        <CardElement className="p-2" />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={!stripe || processing || succeeded}
                    className={`w-full py-2 px-4 rounded-lg text-white ${
                        processing ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'
                    }`}
                >
                    {processing ? 'Processing...' : 'Pay ₹240'}
                </button>
                {error && <div className="mt-4 text-red-500">{error}</div>}
                {succeeded && <div className="mt-4 text-green-500">Payment succeeded!</div>}
            </form>
        </div>
    );
};

export default PaymentForm;
