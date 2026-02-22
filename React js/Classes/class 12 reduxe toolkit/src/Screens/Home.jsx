import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset } from '../store/Slices/counterSlice'

function Home() {
    const dispatch = useDispatch()
    const count = useSelector((state) => state.AnusKhan.count)
    const add = () => {
        dispatch(increment())
    }
    const sub = () => {
        dispatch(decrement())
    }
    const res = () => {
        dispatch(reset())
    }
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Counter App</h1>
            <h2 style={{ fontSize: '3rem' }}>{count}</h2>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                    onClick={add}
                    style={{ padding: '10px 20px', cursor: 'pointer' }}
                >
                    Increment
                </button>
                <button
                    onClick={sub}
                    style={{ padding: '10px 20px', cursor: 'pointer' }}
                >
                    Decrement
                </button>
                <button
                    onClick={res}
                    style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#ff4d4d', color: 'white', border: 'none' }}
                >
                    Reset
                </button>
            </div>
        </div>
    )
}

export default Home