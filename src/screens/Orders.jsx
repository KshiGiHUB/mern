import React, { useEffect, useState } from "react";

export default function Orders() {

    const [orders, setOrder] = useState([]);

    const fetchData = async () => {
        let userEmail = localStorage.getItem("userEmail");

        if (!userEmail) {
            console.error("User email not found. Please log in.");
            return;
        }

        let response = await fetch("http://localhost:5000/myOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: userEmail
            }),
        });
        let data = await response.json();
        setOrder(data.orders || []);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order History</h2>
            {orders.length === 0 ? (
                <p className="text-gray-500">No orders found.</p>
            ) : (
                orders.map((order, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg p-4 mb-6">
                        <h3 className="text-xl font-semibold text-gray-700 mb-3">
                            📅 {order.date}
                        </h3>
                        <table className="w-full border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                                    <th className="border p-2">#</th>
                                    <th className="border p-2">Name</th>
                                    <th className="border p-2">Quantity</th>
                                    <th className="border p-2">Size</th>
                                    <th className="border p-2">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items.map((item, i) => (
                                    <tr key={item.id} className="text-gray-700 text-sm text-center">
                                        <td className="border p-2">{i + 1}</td>
                                        <td className="border p-2">{item.name}</td>
                                        <td className="border p-2">{item.qty}</td>
                                        <td className="border p-2">{item.size}</td>
                                        <td className="border p-2">₹{item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))
            )}
        </div>
    )
}