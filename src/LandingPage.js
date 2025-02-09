import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Navbar from "./Navbar";
import {
  FiBarChart2,
  FiDollarSign,
  FiBell,
  FiTrendingUp,
} from "react-icons/fi";
import "./LandingPage.css";
import { Link, useNavigate } from "react-router-dom";

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
);

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
);

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    setIsVisible(true);
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }));
  }, [controls]);

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
              BudgetFlo helps you track expenses, set budgets, and achieve your
              financial goals with powerful AI-driven insights.
            </p>
            <Link to="/tools">
              <motion.button
                className="cta-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 1 }}
                animate={{
                  opacity: [1, 0.95],
                  transition: { delay: 5, duration: 1 },
                }}
              >
                Get Started
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="laptop-mockup">
              <div className="laptop-screen">
                <video
                  src="/video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="laptop-video"
                ></video>
              </div>
              <div className="laptop-base"></div>
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
            icon={<FiBell />}
            title="Expense Tracking"
            description="Easily categorize and track your expenses across multiple custom categories."
          />
          <FeatureItem
            icon={<FiDollarSign />}
            title="Currency Converter"
            description="Convert to different currencies for a global perspective."
          />
          <FeatureItem
            icon={<FiTrendingUp />}
            title="Financial Goals"
            description="Set, track, and achieve your short-term and long-term financial goals."
          />
        </div>
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
          <div className="footer-social">
            {/* Add your social media icons here */}
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 BudgetFlo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
