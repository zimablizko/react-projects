import React, {useEffect, useState} from "react";
import './App.css';
import CurrencyRow from "./CurrencyRow";

const BASE_URL = 'https://v6.exchangerate-api.com/v6/97e6563a2f17a6d150eaa584/latest/USD';

const PAIR_URL = 'https://v6.exchangerate-api.com/v6/97e6563a2f17a6d150eaa584/pair';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState(1)
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        setCurrencyOptions(Object.keys(data.conversion_rates));
        setToCurrency('RUB');
        setFromCurrency(data.base_code);
        setExchangeRate(data.conversion_rates['RUB']);
      })
  }, [])

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(`${PAIR_URL}/${fromCurrency}/${toCurrency}`)
        .then(res => res.json())
        .then(data => {
          setExchangeRate(data.conversion_rate)
        })
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}/>
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}/>
    </>
  );
}

export default App;
