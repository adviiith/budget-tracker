'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, TrendingUp, History, DollarSign, RefreshCw, Moon, Sun, ZoomIn, ZoomOut } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './CurrencyConverter.css';

const BASE_URL = 'https://open.exchangerate-api.com/v6/latest';

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
  const [darkMode, setDarkMode] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const minRate = Math.min(...historicalData.map((d) => d.rate));
  const maxRate = Math.max(...historicalData.map((d) => d.rate));
  const [zoomLevel, setZoomLevel] = useState(1);
  const handleZoomIn = () => {
    setZoomLevel(zoomLevel * 1.2);
  };

  const handleZoomOut = () => {
    setZoomLevel(zoomLevel / 1.2);
  };

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
      fetchHistoricalData();
    }
  }, [showHistory, fromCurrency, toCurrency]);

  const fetchRates = async () => {
    try {
      setError('');
      setLoading(true);
      const response = await fetch(BASE_URL);
      if (!response.ok) throw new Error('Failed to fetch exchange rates');
      const data = await response.json();
      setRates(data.rates);
      setLastUpdated(new Date().toLocaleString());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching rates:', error);
      setError('Failed to load exchange rates. Please try again later.');
      setLoading(false);
    }
  };

  const fetchHistoricalData = async () => {
    try {
      setError('');
      const dates = [];
      const today = new Date();
      const historicalRates = [];

      // Generate dates for the last 30 days
      for (let i = 30; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
      }

      // Use current rates to generate simulated historical data
      const currentRate = rates[toCurrency] / rates[fromCurrency];

      dates.forEach((date) => {
        // Add random variation of ±3% to the current rate
        const randomVariation = 0.97 + Math.random() * 0.06;
        const historicalRate = currentRate * randomVariation;

        historicalRates.push({
          date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          rate: historicalRate,
        });
      });

      setHistoricalData(historicalRates.sort((a, b) => new Date(a.date) - new Date(b.date)));
    } catch (error) {
      console.error('Error generating historical data:', error);
      setError('Failed to load historical data');
    }
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  if (loading) {
    return (
      <div className="xyz">
        <div className="abc"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="def">
        <p className="ghi">{error}</p>
        <button onClick={fetchRates} className="jkl">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={`mno ${darkMode ? 'dark-mode' : ''}`}>
      <div className="pqr">
        <div className="stu">
          <DollarSign className="vwx" />
          <h1 className="yz1">Currency Converter</h1>
          <button onClick={toggleDarkMode} className="ab2">
            {darkMode ? <Sun className="cd3" /> : <Moon className="cd3" />}
          </button>
        </div>

        <div className="ef4">
          <div className="gh5">
            <div className="ij6">
              <label className="kl7">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="mn8"
                min="0"
                step="any"
              />
            </div>

            <div className="op9">
              <div className="qr0">
                <label className="kl7">From</label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="st1"
                >
                  {Object.keys(rates).map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>

              <button onClick={handleSwapCurrencies} className="uv2" aria-label="Swap currencies">
                <ArrowRightLeft className="wx3" />
              </button>

              <div className="qr0">
                <label className="kl7">To</label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="st1"
                >
                  {Object.keys(rates).map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="yz4">
              <div className="ab5">Converted Amount</div>
              <div className="cd6">
                {result.toFixed(2)} {toCurrency}
              </div>
              <div className="ef7">
                1 {fromCurrency} = {(rates[toCurrency] / rates[fromCurrency]).toFixed(4)} {toCurrency}
              </div>
            </div>
          </div>

          <div className="gh8">
            <div className="ij9">
              <div className="kl0">
                <TrendingUp className="mn1" />
                <h2 className="op2">Popular Currencies</h2>
              </div>
              <div className="qr3">
                {popularCurrencies.map((currency) => (
                  <div key={currency} className="st4">
                    <div className="uv5">{currency}</div>
                    <div className="wx6">
                      {(rates[currency] / rates[fromCurrency]).toFixed(4)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setShowHistory(!showHistory)} className="yz7">
              <History className="ab8" />
              {showHistory ? 'Hide' : 'Show'} Historical Rates
            </button>

            {showHistory && (
              <div className="cd9">
                <h3 className="ef0">30-Day Trend</h3>
                <div className="graph-container">
                  <button onClick={handleZoomIn} className="zoom-btn zoom-in"><ZoomIn /></button>
                  <button onClick={handleZoomOut} className="zoom-btn zoom-out"><ZoomOut /></button>
                  <ResponsiveContainer width="100%" height={300 * zoomLevel}>
                    <LineChart data={historicalData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" vertical={false} />
                      <XAxis dataKey="date" stroke="rgba(255, 255, 255, 0.5)" />
                      <YAxis
                        stroke="rgba(255, 255, 255, 0.5)"
                        domain={[minRate * 0.98, maxRate * 1.02]}
                        tickFormatter={(value) => value.toFixed(1)}
                      />
                      <Tooltip />
                      <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2.5} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="ij0">
          <button onClick={fetchRates} className="kl1">
            <RefreshCw className="mn2" />
            Refresh Rates
          </button>
          <div className="op3">Last updated: {lastUpdated}</div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;