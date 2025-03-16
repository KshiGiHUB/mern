import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from "../components/ContextReducer";
export default function Cart() {

    let cart = useCart();
    let dispatch = useDispatchCart();

    if (cart.length === 0) {
        return (
            <div className="container text-center p-5">
                <h3 className="text-muted">The Cart is Empty!</h3>
            </div>
        );
    }

    let totalPrice = cart.reduce((total, food) => total + food.price, 0)

    const handleCheckout = async () => {
        let userEmail = localStorage.getItem("userEmail");

        if (!userEmail) {
            console.error("User email not found. Please log in.");
            return;
        }

        let response = await fetch("http://localhost:5000/orderData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: userEmail,
                order_data: cart,
                order_date: new Date().toDateString(),
            }),
        });

        let data = await response.json();
        if (data.success) {
            dispatch({ type: "DROP" });
        } else {
            console.error("Checkout failed:", data.error);
        }
    };


    return (
        <div>
            <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
                <table className="table table-hover">
                    <thead className="text-success fs-4">
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((data, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{data.name}</td>
                                <td>{data.qty}</td>
                                <td>{data.size}</td>
                                <td>{data.price}</td>
                                <td ><button type="button" className="btn p-0"><DeleteIcon onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
                <div><h1 className=' text-muted fs-2'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className="btn btn-success mt-5" onClick={handleCheckout}>Check Out</button>
                </div>
            </div>
        </div >
    )
}