import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, TrendingUp, History, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './CurrencyConverter.css';

const API_KEY = 'c2a756cc7a75483bb9ef16eab5c2fe19'; 
const BASE_URL = 'https://open.exchangerate-api.com/v6';

const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR'];

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [historicalData, setHistoricalData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRates();
  }, []);

  useEffect(() => {
    if (rates[toCurrency]) {
      const rate = rates[toCurrency] / rates[fromCurrency];
      setResult(amount * rate);
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  useEffect(() => {
    if (showHistory) {
      generateHistoricalData();
    }
  }, [showHistory, fromCurrency, toCurrency]);

  const fetchRates = async () => {
    try {
      setError('');
      const response = await fetch(`${BASE_URL}/latest`);
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }
      const data = await response.json();
      setRates(data.rates);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching rates:', error);
      setError('Failed to load exchange rates. Please try again later.');
      setLoading(false);
    }
  };

  const generateHistoricalData = () => {
    const data = [];
    const currentRate = rates[toCurrency] / rates[fromCurrency];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Generate slightly varying rates around the current rate
      const randomVariation = 0.95 + Math.random() * 0.1; // Random value between 0.95 and 1.05
      const historicalRate = currentRate * randomVariation;
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        rate: parseFloat(historicalRate.toFixed(4))
      });
    }
    
    setHistoricalData(data);
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-date">{label}</p>
          <p className="tooltip-rate">
            1 {fromCurrency} = {payload[0].value} {toCurrency}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={fetchRates} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="converter-container">
      <div className="converter-card">
        <div className="header">
          <DollarSign className="header-icon" />
          <h1 className="header-title">Currency Converter</h1>
        </div>

        <div className="main-grid">
          <div className="converter-section">
            <div className="input-group">
              <label className="input-label">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="input-field"
                min="0"
                step="any"
              />
            </div>

            <div className="currency-selection">
              <div className="currency-input">
                <label className="input-label">From</label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="select-field"
                >
                  {Object.keys(rates).map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSwapCurrencies}
                className="swap-button"
                aria-label="Swap currencies"
              >
                <ArrowRightLeft className="swap-icon" />
              </button>

              <div className="currency-input">
                <label className="input-label">To</label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="select-field"
                >
                  {Object.keys(rates).map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="result-box">
              <div className="result-label">Converted Amount</div>
              <div className="result-amount">
                {result.toFixed(2)} {toCurrency}
              </div>
              <div className="conversion-rate">
                1 {fromCurrency} = {(rates[toCurrency] / rates[fromCurrency]).toFixed(4)} {toCurrency}
              </div>
            </div>
          </div>

          <div className="sidebar">
            <div className="popular-currencies">
              <div className="section-header">
                <TrendingUp className="section-icon" />
                <h2 className="section-title">Popular Currencies</h2>
              </div>
              <div className="currency-grid">
                {popularCurrencies.map((currency) => (
                  <div key={currency} className="currency-card">
                    <div className="currency-code">{currency}</div>
                    <div className="currency-rate">
                      {(rates[currency] / rates[fromCurrency]).toFixed(4)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowHistory(!showHistory)}
              className="history-button"
            >
              <History className="history-icon" />
              {showHistory ? 'Hide' : 'Show'} Historical Rates
            </button>

            {showHistory && (
              <div className="history-section">
                <h3 className="history-title">30-Day Trend</h3>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        interval="preserveStartEnd"
                        stroke="#9ca3af"
                      />
                      <YAxis 
                        domain={['auto', 'auto']}
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        stroke="#9ca3af"
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="#4f46e5"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4, fill: '#4f46e5' }}
                        name={`${fromCurrency} to ${toCurrency}`}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;