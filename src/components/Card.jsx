import { useEffect, useRef, useState } from 'react';
import img2 from '../images/f2.jpg'
import { useDispatchCart, useCart } from './ContextReducer';

export function Card(props) {

    let dispatch = useDispatchCart();
    let cart = useCart();
    const priceRef = useRef();
    // let props.foodDetail = props.item;

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const options = props.itemOption;
    const optionKey = Object.keys(options);

    const displayError = (e) => {
        e.target.src = img2;
    }

    const handleAddToCart = async () => {
        let food = []
        for (const item of cart) {
            if (item.id === props.foodDetail._id) {
                food = item;

                break;
            }
        }
        console.log(food)
        console.log(new Date())
        if (!food == []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodDetail._id, price: finalPrize, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodDetail._id, name: props.foodDetail.name, price: finalPrize, qty: qty, size: size, img: props.ImgSrc })
                console.log("Size different so simply ADD one more to the list")
                return
            }
            return
        }

        await dispatch({ type: "ADD", id: props.foodDetail._id, name: props.foodDetail.name, price: finalPrize, qty: qty, size: size })


        // setBtnEnable(true)

    }

    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    let finalPrize = qty * parseInt(options[size])

    return (
        <div className="card" style={{ "width": "18rem", margin: '10px' }}>
            <img src={props.foodDetail.img} className="card-img-top" alt="..." style={{ height: '220px' }} onError={displayError} />
            <div className="card-body">
                <h5 className="card-title">{props.foodDetail.name}</h5>
                <p className="card-text">{props.foodDetail.description}</p>
                <div className="container w-100">
                    <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
                        {Array.from(Array(6), (e, i) => {
                            return (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            )
                        })}
                    </select>

                    <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                        {optionKey.map((data) => {
                            return <option key={data} value={data}>{data}</option>
                        })}
                        {/* <option value="half">Half</option>
                        <option value="full">full</option> */}
                    </select>

                    <div className="d-inline h-100 fs-5">
                        {`RS ${finalPrize}`}
                    </div>
                </div>
                <hr></hr>
                <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>Add to cart</button>
            </div>
        </div>
    )
}