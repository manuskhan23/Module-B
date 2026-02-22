import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductData } from '../store/Slices/productSlice'
function Product() {
    const { allProducts, isLoading, isError, isSuccess } = useSelector((state) => state.AnusProductsApi)
    const dispatch = useDispatch()
    console.log(allProducts, isLoading, isError, isSuccess)
    useEffect(() => {
        dispatch(fetchProductData())
    }, [dispatch])

    return (
        <div style={{ padding: '20px' }}>
            <h1>Product Data</h1>
            {isLoading && <h2>Loading...</h2>}
            {isError && <h2>Error fetching products</h2>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {allProducts && allProducts.map((item) => (
                    <div key={item.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
                        <img src={item.image} alt={item.title} style={{ width: '100px' }} />
                        <hr />
                        <h3 style={{ fontSize: '1rem' }}>{item.title}</h3>
                        <p>${item.price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Product