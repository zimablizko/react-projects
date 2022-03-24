import React from 'react';

function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount
  } = props;
  return (
   <div>
     <input type="number" className="input" value={amount} onChange={onChangeAmount}/>
     <select value={selectedCurrency} onChange={onChangeCurrency}>
       {currencyOptions.map(option => (
         <option value={option} key={option}>{option}</option>
       ))}
     </select>
   </div>
  );
}

export default CurrencyRow;