import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { paymentIntentServiceApi, saveCardPaymentMethodServiceApi, savePaymentMethodServiceApi } from '../services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { UserData } from '../redux/authSlice';
import { fetchUserProfile, selectUserProfile } from '../redux/userProfileSlice';
import { getAuthHeader } from '../constant';
import useToast from '../hook/useToaster';

const PaymentForm = () => {
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const [amount, setAmount] = useState(100); // Default amount to add funds
    const [walletBalance, setWalletBalance] = useState(500); // Simulating wallet balance (e.g., ₹500)
    const [showForm, setShowForm] = useState(false); // Toggle form visibility
    const [savedCards, setSavedCards] = useState([]); // Simulate saved cards
    const [selectedCard, setSelectedCard] = useState(''); // Selected saved card
    const [email, setEmail] = useState(''); // Email field for the form
    const stripe = useStripe();
    const elements = useElements();
    const { user,token } = useSelector(UserData);
    const data = useSelector(selectUserProfile);
    const dispatch = useDispatch();
    const showToast = useToast();


   function fetchCardSavedData(){
     if(data){
            setSavedCards([...data?.paymentMethods]);
        }
        // Set email if available in user data
        if (user?.email) {
            setEmail(user.email);
        }
   }

    useEffect(() => {
       fetchCardSavedData()
    }, [data]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        try {
            if (selectedCard) {
                // Case 1: Use saved card to make payment
                const payload = {
                    amount,
                    email,
                    currency: 'inr',
                    paymentMethodId: selectedCard, // Use the selected card's paymentMethodId
                };

                const {response} = await saveCardPaymentMethodServiceApi(payload);
                console.log('response', response);
                setProcessing(false);

                if (response?.data?.paymentIntent?.status === 'succeeded') {
                    showToast('success', 'Transaction is Succeeded!');
                    setSucceeded(true);
                    setWalletBalance(walletBalance + amount); // Update wallet balance
                    dispatch(fetchUserProfile(getAuthHeader(token))); // Update user profile if needed

                } else {
                    setError('Payment failed');
                }
            } else {
                // Case 2: No saved card selected, so pay with new card details
                if (!stripe || !elements) {
                    return; // Stripe.js has not yet loaded
                }

                // Call your backend to create a PaymentIntent and get the client secret
                const { data: { clientSecret } } = await paymentIntentServiceApi({
                    email, // Use the entered email
                    amount, // Use the dynamic amount input by the user
                    currency: "inr",
                });

                // Use new card details for payment
                const paymentMethod = {
                    card: elements.getElement(CardElement),
                    billing_details: { name: user?.name || 'User' }, // Optional: Pass user name
                };

                // Confirm the payment with the client secret
                const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: paymentMethod,
                });

                if (error) {
                    setError(error.message);
                    setProcessing(false);
                    return;
                } else {
                    if (paymentIntent.status === 'succeeded') {
                        const payment_method_id = paymentIntent?.payment_method;

                        // Save the new card for future payments
                        await savePaymentMethodServiceApi({ email, paymentMethodId: payment_method_id });

                        setSucceeded(true);
                        dispatch(fetchUserProfile(getAuthHeader(token))); // Update user profile if needed
                        fetchCardSavedData(); // Refresh saved cards
                        setWalletBalance(walletBalance + amount); // Update wallet balance
                    }
                    setProcessing(false);
                }
            }
        } catch (err) {
            setError("Failed to create PaymentIntent.");
            setProcessing(false);
        }
    };


    return (
        <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
            {/* Wallet Balance Section */}
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Your Wallet</h2>
                <div className="text-lg text-green-600 mb-4">
                    <strong>Wallet Balance: ₹{walletBalance}</strong>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                >
                    {showForm ? 'Hide Form' : 'Add Funds to Wallet'}
                </button>
            </div>

            {/* Show Add Funds Form if toggled */}
            {showForm && (
                <div className="p-6 bg-gray-100 rounded-lg">
                    <h3 className="text-xl font-bold mb-4 text-center">Add Funds to Your Wallet</h3>

                    <form onSubmit={handleSubmit}>
                        {/* Amount Input */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                                Enter Amount (in ₹)
                            </label>
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(parseInt(e.target.value, 10))}
                                className="w-full p-2 border rounded-lg"
                                min="1"
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Enter Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border rounded-lg"
                                required
                            />
                        </div>

                        {/* Saved Cards Dropdown */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="saved-card">
                                Select Saved Card
                            </label>
                            <select
                                id="saved-card"
                                value={selectedCard}
                                onChange={(e) => setSelectedCard(e.target.value)}
                                className="w-full p-2 border rounded-lg"
                            >
                                <option value="">Use New Card</option>
                                {savedCards.map((card) => (
                                    <option key={card.id} value={card.id}>
                                        {`${card.brand} ending in ${card.last4} (Expires: ${card.exp_month}/${card.exp_year})`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Show Card Element if no saved card is selected */}
                        {!selectedCard && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="card-element">
                                    Card Details
                                </label>
                                <div className="border p-2 rounded-lg">
                                    <CardElement className="p-2" />
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={!stripe || processing || succeeded}
                            className={`w-full py-2 px-4 rounded-lg text-white ${
                                processing ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'
                            }`}
                        >
                            {processing ? 'Processing...' : `Pay ₹${amount}`}
                        </button>

                        {/* Error and success messages */}
                        {error && <div className="mt-4 text-red-500">{error}</div>}
                        {succeeded && <div className="mt-4 text-green-500">Payment succeeded! Your new wallet balance is ₹{walletBalance + amount}.</div>}
                    </form>
                </div>
            )}
        </div>
    );
};

export default PaymentForm;
