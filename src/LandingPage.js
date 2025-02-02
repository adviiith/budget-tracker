import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import Navbar from "./Navbar"
import { FiBarChart2, FiDollarSign, FiBell, FiTrendingUp } from "react-icons/fi"
import "./LandingPage.css"

const FeatureItem = ({ icon, title, description }) => (
  <motion.div
    className="feature-item"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="feature-icon">{icon}</div>
    <h3 className="feature-title">{title}</h3>
    <p className="feature-description">{description}</p>
  </motion.div>
)

const TestimonialItem = ({ name, role, content }) => (
  <motion.div
    className="testimonial-item"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <p className="testimonial-content">{content}</p>
    <div className="testimonial-author">
      <strong>{name}</strong>
      <span>{role}</span>
    </div>
  </motion.div>
)

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    setIsVisible(true)
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }))
  }, [controls])

  return (
    <div className="landing-page">
      <Navbar />
      <section className="hero-section">
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>Take Control of Your Finances</h1>
            <p>
              BudgetFlo helps you track expenses, set budgets, and achieve your financial goals with powerful AI-driven
              insights.
            </p>
            <motion.button
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 0.95], transition: { delay: 5, duration: 1 } }}
            >
              Get Started
            </motion.button>
          </motion.div>

          <motion.div
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="phone-mockup">
              <div className="phone-screen">
                <img src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2023/06/instagram-update-downloading.jpg" alt="BudgetFlo App" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose BudgetFlo?</h2>
        <div className="features-grid">
          <FeatureItem
            icon={<FiBarChart2 />}
            title="Smart Budgeting"
            description="Set and manage budgets with AI-powered insights tailored to your spending habits."
          />
          <FeatureItem
            icon={<FiDollarSign />}
            title="Expense Tracking"
            description="Easily categorize and track your expenses across multiple accounts and cards."
          />
          <FeatureItem
            icon={<FiBell />}
            title="Bill Reminders"
            description="Never miss a payment with customizable alerts and notifications."
          />
          <FeatureItem
            icon={<FiTrendingUp />}
            title="Financial Goals"
            description="Set, track, and achieve your short-term and long-term financial goals."
          />
        </div>
      </section>

      <section className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Connect Your Accounts</h3>
            <p>Securely link your bank accounts and credit cards to get a complete financial picture.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Categorize Expenses</h3>
            <p>BudgetFlo automatically categorizes your transactions and learns from your adjustments.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Set Budgets & Goals</h3>
            <p>Create custom budgets and financial goals based on your income and spending habits.</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Track & Optimize</h3>
            <p>Monitor your progress and receive AI-powered suggestions to optimize your finances.</p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          <TestimonialItem
            name="Sarah Johnson"
            role="Small Business Owner"
            content="BudgetFlo has transformed the way I manage my personal and business finances. The insights are invaluable!"
          />
          <TestimonialItem
            name="Michael Chen"
            role="Recent Graduate"
            content="As a recent grad with student loans, BudgetFlo has been a lifesaver in helping me budget and save."
          />
          <TestimonialItem
            name="Emily Rodriguez"
            role="Freelance Designer"
            content="The ability to track multiple income sources and expenses has made tax time so much easier. Highly recommended!"
          />
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Take Control of Your Finances?</h2>
        <p>Join thousands of users who have already transformed their financial lives with BudgetFlo.</p>
        <motion.button className="cta-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Start Your Free Trial
        </motion.button>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-text">Budget</span>
            <span className="logo-highlight">Flo</span>
          </div>
          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-social">{/* Add your social media icons here */}</div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 BudgetFlo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

