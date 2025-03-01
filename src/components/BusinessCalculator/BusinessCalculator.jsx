import React, { useState } from 'react'

function BusinessCalculator() {
  const [unit, setUnit] = useState("kg")
  const [costUnit, setCostUnit] = useState("kg") //kg -> per kg , Quintal -> per Quintal 
  const [amount, setAmount] = useState(0)
  const [cost, setCost] = useState(0)
  const [result, setResult] = useState(null)
  const [isClicked, setIsClicked] = useState(false);

  const computeResult = () => {
    let modifiedAmount = amount
    let modifiedCost = cost
    if(unit === "quintal")modifiedAmount = modifiedAmount * 100;
    if(costUnit === "quintal")modifiedCost = modifiedCost / 100;
    let adjustedAmount = (49 * modifiedAmount) / 50
    let tempCost = (adjustedAmount * modifiedCost)
    let deduction = (modifiedAmount / 10) + (tempCost / 100)
    tempCost = tempCost - deduction
    setResult(prev => tempCost.toFixed(2))
  }

  return (
    <div className='w-screen h-screen bg-black flex flex-col items-center'>
      <h1 className='text-white text-4xl font-serif mt-10'>Business Calculator</h1>
      <div className='w-screen sm:w-[45%] h-[60%] p-2 bg-orange-400 mt-5 rounded-xl shadow-xl flex flex-col gap-10 justify-center items-center'>
        <div className="w-[100%] md:w-[80%] h-[40px] flex flex-row justify-between items-center">
          <label htmlFor="amount" className='text-2xl font-bold font-serif w-[35%] md:w-[40%]'>
            Weight
          </label>
          <div className='flex flex-row w-[80%] sm:w-[60%] h-[100%]'>
            <input type="number" id='amount' className='bg-white rounded-l-md w-[60%] text-xl text-center outline-0 border-0'
              value={amount} 
              onChange={(e) => {
                let inputValue = e.target.value;
                // Remove leading zero unless it's "0" alone
                if (inputValue.length > 1 && inputValue.startsWith("0")) {
                  inputValue = inputValue.replace(/^0+/, "");
                }
                setResult(prev => null);
                setAmount(prev => inputValue)
              }}
            />
            <select value={unit} onChange={(e) => { setUnit(prev => e.target.value); }} className='bg-white font-serif text-center text-xl rounded-r-md outline-0 border-0 w-[40%]' >
              <option value="kg">Kg</option>
              <option value="quintal">Qt</option>
            </select>
          </div>
        </div>
        <div className="w-[100%] sm:w-[80%] h-[40px] flex flex-row justify-between items-center">
          <label htmlFor="cost" className='text-2xl font-bold font-serif w-[35%] sm:w-[40%]'>
            Rate
          </label>
          <div className='flex flex-row w-[80%] sm:w-[60%] h-[100%]'>
            <input type="number" id='cost' className='bg-white rounded-l-md w-[60%] text-xl text-center outline-0 border-0'
              value={cost} onChange={(e) => {
                let inputValue = e.target.value;
                // Remove leading zero unless it's "0" alone
                if (inputValue.length > 1 && inputValue.startsWith("0")) {
                  inputValue = inputValue.replace(/^0+/, "");
                }
                setResult(prev => null);
                setCost(prev => inputValue)
              }}
            />
            <select value={costUnit} onChange={(e) => { setCostUnit(prev => e.target.value); }} className='bg-white font-serif text-center text-xl rounded-r-md outline-0 border-0 w-[40%]' >
              <option value="kg">Per Kg</option>
              <option value="quintal">Per Qt</option>
            </select>
          </div>
        </div>
        {
          result && <div className="w-[100%] sm:w-[80%] h-[40px] flex flex-row justify-between items-center">
            <label htmlFor="result" className='text-2xl font-bold font-serif w-[35%] sm:wd-[40%]'>
              Result
            </label>
            <div className='flex flex-row w-[80%] sm:w-[60%] h-[100%]'>
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