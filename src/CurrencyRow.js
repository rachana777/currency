import React from "react";

export default function CurrencyRow(props) {
 const   {currencyOptions=[],
            selectCurrency,
            onChangeCurrency,
            amount,
            onChangeAmount
        }= props
return (
    
    <div>
        <input type="number" className="input" value={amount}
        onChange={onChangeAmount}/>
        <select value={selectCurrency} onChange={onChangeCurrency}>
        
        {currencyOptions.map(options =>(
            <option key={options} value={options}> {options} </option>

        ))}

        
        </select>
    </div>
    
    
);
}
