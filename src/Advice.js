"use client"

import { useState, useEffect } from "react"
import "./Advice.css"

const Advice = () => {
  const [advice, setAdvice] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY; 
  const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

  useEffect(() => {
    getFinancialAdvice()
  }, [])

  const getFinancialAdvice = async () => {
    setLoading(true)
    setError(null)

    try {
      const entries = JSON.parse(localStorage.getItem("entries")) || []
      const categories = JSON.parse(localStorage.getItem("categories")) || []

      if (entries.length === 0) {
        setAdvice("No financial data available. Please add some transactions to get advice.")
        setLoading(false)
        return
      }

      const totalIncome = entries
        .filter((entry) => entry.type === "income")
        .reduce((sum, entry) => sum + entry.amount, 0)

      const totalExpense = entries
        .filter((entry) => entry.type === "expense")
        .reduce((sum, entry) => sum + entry.amount, 0)

      const categoryExpenses = entries
        .filter((entry) => entry.type === "expense")
        .reduce((acc, entry) => {
          acc[entry.category] = (acc[entry.category] || 0) + entry.amount
          return acc
        }, {})

        const prompt = `
        Analyze this financial data and provide personalized advice:
        
        Income and Expenses:
        Total Income: ₹${totalIncome.toFixed(2)}
        Total Expenses: ₹${totalExpense.toFixed(2)}
        
        Detailed Expenses:
        ${Object.entries(categoryExpenses)
          .map(([category, amount]) => `${category}: ₹${amount.toFixed(2)}`)
          .join("\n")}
        
        Response Rules:
        1. If ANY illegal expenses found:
           - Give NO financial advice
           - Warn about legal consequences
           - Provide guidance toward legal alternatives
        
        2. If cigarette/alcohol expenses found:
           - Give standard financial advice
           - Add gentle health-focused suggestions
           - Show potential savings if reduced
        
        3. If all expenses are legal/normal:
           - Provide detailed financial analysis
           - Suggest optimization strategies
           - Offer investment/savings tips
        
        Please write your response in clear paragraphs. No bullet points or special formatting. Keep the tone personal and conversational.
        
        Write your response like having a conversation with a friend - direct, honest, and caring. If you see concerning expenses, address them firmly but supportively and warn them about their tragic fate.
        
        `

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get advice from Gemini API")
      }

      const data = await response.json()
      const formattedAdvice = data.candidates[0].content.parts[0].text
      setAdvice(formattedAdvice)
    } catch (err) {
      console.error("Error fetching financial advice:", err)
      setError("Failed to get financial advice. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ai-advice-container">
      <div className="ai-advice-header">
        <h1 className="ai-advice-title">AI Financial Advisor</h1>
        <div className="ai-avatar"></div>
      </div>
      <div className="ai-advice-content">
        {loading && (
          <div className="ai-loading">
            <div className="ai-loading-spinner"></div>
            <p>Analyzing your financial data...</p>
          </div>
        )}
        {error && <p className="ai-error">{error}</p>}
        {!loading && !error && (
          <div className="ai-advice-text">
            {advice ? (
              <div dangerouslySetInnerHTML={{ __html: advice.replace(/\n/g, "<br>") }} />
            ) : (
              <p>No advice available. Try adding more transactions for better insights.</p>
            )}
          </div>
        )}
      </div>
      <button className="ai-refresh-button" onClick={getFinancialAdvice} disabled={loading}>
        <span className="ai-refresh-icon"></span>
        Refresh Advice
      </button>
    </div>
  )
}

export default Advice