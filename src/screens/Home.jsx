import { useEffect, useState, useRef } from "react";
import { Banner } from "../components/Banner";
import { Card } from "../components/Card";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import img1 from '../images/f1.jpg'
import img2 from '../images/f2.jpg'
import img3 from '../images/f3.jpg'

export function Home() {

    const [search, setSearch] = useState("");
    const [foodItem, setFoodItem] = useState([])
    const [foodCategory, setFoodCategory] = useState([])
    const [debouncedSeacrh, setDebouncedSearch] = useState("");
    const isDataFetched = useRef(false);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/food", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        response = await response.json();
        setFoodItem(response[0] || [])
        setFoodCategory(response[1] || [])
    }

    useEffect(() => {
        if (!isDataFetched.current) {
            isDataFetched.current = true;
            loadData()
        }
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);
        return () => clearTimeout(timeout);
    }, [search]);

    return (
        <div>
            <Navbar />
            <div>
                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" >
                    <div className="carousel-inner" id="carousel">
                        <div className='carousel-caption' style={{ zIndex: '10' }}>
                            <div className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                                <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src={img1} className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={img2} className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={img3} className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            {/* <Banner />/ */}
            <div className="container">
                {foodCategory.length > 0 ? (
                    foodCategory.map((catData, index) => {
                        return (
                            <div className="row mb-3" key={catData._id}>
                                <div className="fs-3 m-3" style={{ color: 'white' }}>
                                    {catData.CategoryName}
                                </div>
                                <hr />
                                <div className="row">
                                    {foodItem.length > 0 ? (
                                        foodItem.filter((item) => (item.CategoryName === catData.CategoryName) && item.name.toLowerCase().includes(debouncedSeacrh.toLowerCase())).map((data) => {
                                            return (
                                                <div className="col-12 col-md-6 col-lg-3" key={data._id}>
                                                    <Card foodDetail={data} itemOption={data.options[0]} />
                                                </div>
                                            )
                                        })
                                    ) : ("no such food ")}
                                </div>
                            </div>
                        )

                    })
                ) : (
                    <p>helo</p>
                )}
                {/* <Card /> */}
            </div>
            <Footer />
        </div>
    )
}