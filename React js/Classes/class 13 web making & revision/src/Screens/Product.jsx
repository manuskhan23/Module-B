import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductData } from '../store/Slices/productSlice'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../store/Slices/AddtoCardSlice'
import Navbar from '../components/Navbar'
function Product() {
    const navigate = useNavigate()
    const { allProducts, isLoading, isError, isSuccess } = useSelector((state) => state.AnusProductsApi)
    const dispatch = useDispatch()
    console.log(allProducts, isLoading, isError, isSuccess)
    useEffect(() => {
        dispatch(fetchProductData())
    }, [dispatch])

    return (
        <>
            <Navbar />
            <div style={{ padding: '20px' }}>
                <h1>Product Data</h1>
                {isLoading && <h2>Loading...</h2>}
                {isError && <h2>Error fetching products</h2>}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {allProducts && allProducts.map((item) => (
                        <div key={item.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
                            <img src={item.image} alt={item.title.slice(0, 10)} style={{ width: '100px' }} />
                            <hr />
                            <h3 style={{ fontSize: '1rem' }}>{item.title.slice(0, 10)}</h3>
                            <h3 style={{ fontSize: '0.8rem' }}>{item.description.slice(0, 20)}</h3>
                            <p>${item.price}</p>
                            <button
                                onClick={() => navigate("/home")}
                                style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: 'royalblue', color: 'white', border: 'none' }}
                            >
                                Go to Home
                            </button><br />
                            <button
                                onClick={() => dispatch(addToCart(item))}
                                style={{ marginTop: '10px', padding: '10px 20px', cursor: 'pointer', backgroundColor: 'royalblue', color: 'white', border: 'none' }}
                            >
                                Add to Card
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Product