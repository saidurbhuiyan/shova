import React from 'react';

export default function Cart(){
    const cartItems =

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            <div className="bg-white shadow-md rounded-lg p-4">
                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <>
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item.id} className="flex items-center justify-between py-2 border-b">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                                    <div className="flex-1">
                                        <h2 className="text-lg font-semibold">{item.name}</h2>
                                        <p className="text-sm text-gray-600">${item.price} x {item.quantity}</p>
                                    </div>
                                    <div className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 text-right">
                            <h2 className="text-xl font-bold">Total: ${totalPrice}</h2>
                        </div>
                        <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            Proceed to Checkout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
