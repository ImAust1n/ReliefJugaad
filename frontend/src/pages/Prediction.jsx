import React from 'react'
import { usePredictStore } from '../store/usePredictStore'

const Prediction = () => {
  const { result, loading, error, fetchHello } = usePredictStore()
  return (
    <div>
      <h1>Prediction</h1>
      <button onClick={fetchHello}>Fetch Hello</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {result && <p>Result: {result}</p>}
    </div>
  )
}

export default Prediction
