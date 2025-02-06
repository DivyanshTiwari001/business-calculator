import React, { useState } from 'react'

function BusinessCalculator() {
  const [unit, setUnit] = useState("kg")
  const [costUnit, setCostUnit] = useState("kg") //kg -> per kg , Quintal -> per Quintal 
  const [amount, setAmount] = useState(0)
  const [cost, setCost] = useState(0)
  const [result, setResult] = useState(null)
  const [isClicked, setIsClicked] = useState(false);
  
  const computeResult = ()=>{
    let modifiedAmount = amount
    let modifiedCost = cost
    if(unit != costUnit){
      console.log("mismatch")
      if (unit === "quintal") modifiedAmount = amount * 100;
      else modifiedCost = cost / 100
    }
    let adjustedAmount = (49*modifiedAmount) / 50 
    let tempCost = (adjustedAmount * modifiedCost)
    let deduction = (modifiedAmount/10) + (tempCost/100)
    tempCost = tempCost - deduction
    setResult(prev=>tempCost.toFixed(2))  
  }

  return (
    <div className='w-screen h-screen bg-black flex flex-col items-center'>
      <h1 className='text-white text-4xl font-serif mt-10'>Business Calculator</h1>
      <div className='w-[45%] h-[60%] bg-orange-400 mt-5 rounded-xl shadow-xl flex flex-col gap-10 justify-center items-center'>
        <div className="w-[80%] h-[40px] flex flex-row justify-between items-center">
          <label htmlFor="amount" className='text-2xl font-bold font-serif'>
            Amount
          </label>
          <div className='flex flex-row w-[60%] h-[100%]'>
            <input type="number" id='amount' className='bg-white rounded-l-md w-[60%] text-xl text-center outline-0 border-0'
              value={amount} onChange={(e)=>{setResult(prev=>null);setAmount(prev=>e.target.value)}}
            />
            <select value={unit} onChange={(e) => { setUnit(prev => e.target.value); }} className='bg-white font-serif text-center text-xl rounded-r-md outline-0 border-0 w-[40%]' >
              <option value="kg">Kg</option>
              <option value="quintal">Quintal</option>
            </select>
          </div>
        </div>
        <div className="w-[80%] h-[40px] flex flex-row justify-between items-center">
          <label htmlFor="cost" className='text-2xl font-bold font-serif'>
            Cost
          </label>
          <div className='flex flex-row w-[60%] h-[100%]'>
            <input type="number" id='cost' className='bg-white rounded-l-md w-[60%] text-xl text-center outline-0 border-0' 
              value={cost} onChange={(e)=>{setResult(prev=>null);setCost(prev=>e.target.value)}}
            />
            <select value={costUnit} onChange={(e) => { setCostUnit(prev => e.target.value); }} className='bg-white font-serif text-center text-xl rounded-r-md outline-0 border-0 w-[40%]' >
              <option value="kg">Per Kg</option>
              <option value="quintal">Per Quintal</option>
            </select>
          </div>
        </div>
        {
          result && <div className="w-[80%] h-[40px] flex flex-row justify-between items-center">
            <label htmlFor="result" className='text-2xl font-bold font-serif'>
              Result
            </label>
            <div className='flex flex-row w-[60%] h-[100%]'>
              <p id='result' className='bg-white rounded-md w-[100%] text-xl text-center outline-0 border-0'>{result}</p>
            </div>
          </div>
        }
        <button
          onClick={() => {
            setIsClicked(true);
            computeResult()
            setTimeout(() => setIsClicked(false), 200); // Reset effect after 200ms
          }}
          className={`px-6 py-3 text-white font-bold text-lg rounded-lg bg-blue-500 transition-transform duration-150 ${isClicked ? "scale-90" : "scale-100"
            }`}
        >
          Calculate Result
        </button>
      </div>
    </div>
  )
}

export default BusinessCalculator