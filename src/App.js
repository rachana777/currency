import React , {useEffect, useState}from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow"

const RATE_URL='https://api.exchangerate-api.com/v6/latest'



function App() {
  const [currencyOptions, setCurrencyOptions]=useState([])
  const [fromCurrency, setFromCurrency]=useState()
  const [toCurrency,setToCurrency]=useState()
  const [exchangeRate, setExchangeRate]=useState()
  const [amount, setAmount]=useState(1)
  const [amountInFomCurrency, setAmountInFromCurrency]=useState(true)
  
  let fromAmount, toAmount
  if (amountInFomCurrency){
    fromAmount= amount
    toAmount= amount * exchangeRate
  } else{
    toAmount= amount
    fromAmount= amount / exchangeRate
  }

  
  useEffect(()=>{
    fetch(RATE_URL)
    .then(res=>res.json())
    .then(data=>{
      const firstCurrency=Object.keys(data.rates)[1]
      setCurrencyOptions([data.base_code,...Object.keys(data.rates)])
      setFromCurrency(data.base_code)
      setToCurrency(firstCurrency)
      setExchangeRate(data.rates[firstCurrency])
    })
  },[])

  useEffect(()=>{
    if(fromCurrency !=null && toCurrency!=null){
      fetch(RATE_URL)
    .then(res=>res.json())
    .then(data =>setExchangeRate(data.rates[toCurrency]))
    }
  },[fromCurrency,toCurrency])

function handleFromAmountChange(e){
  setAmount(e.target.value)
  setAmountInFromCurrency(true)
}

function handleToAmountChange(e){
  setAmount(e.target.value)
  setAmountInFromCurrency(false)
}



  return (
    <>
    <div id="frontend">
      <h2> Convert Currencies</h2>
      <br/>
      <CurrencyRow currencyOptions={currencyOptions}
                    selectCurrency={fromCurrency}
                    onChangeCurrency={e =>
                      setFromCurrency(e.target.value)
                    }
                    amount={fromAmount} 
                    onChangeAmount={handleFromAmountChange}/>
      <div className="equals">=</div>
      <CurrencyRow currencyOptions={currencyOptions}
                    selectCurrency={toCurrency} 
                    onChangeCurrency={e=>
                      setToCurrency(e.target.value)
                    }
                    amount={toAmount}
                    onChangeAmount={handleToAmountChange}/>
    </div>
    </>
  );
}

export default App;
