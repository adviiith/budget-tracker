import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSpring, animated, config } from "react-spring"
import { motion } from "framer-motion"
import Tilt from "react-parallax-tilt"
import { FaDollarSign, FaChartLine } from "react-icons/fa"
import Confetti from "react-confetti"
import "./MyToolsPage.css"

const MyToolsPage = ({ onLogout }) => {
  const navigate = useNavigate()
  const [showConfetti, setShowConfetti] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    } else {
      console.error("onLogout function is not available")
    }
  }

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  })

  const floatingAnimation = useSpring({
    from: { transform: "translateY(0px)" },
    to: { transform: "translateY(-10px)" },
    config: { duration: 1000, tension: 300, friction: 10 },
    loop: { reverse: true },
  })

  const toolButtonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0px 0px 15px rgb(255,255,255)",
      transition: {
        duration: 0.3,
        yoyo: Number.POSITIVE_INFINITY,
      },
    },
  }

  return (
    <animated.div style={fadeIn} className="tools-page">
      <div className="background-image" />
      <div className="content-overlay">
        <motion.h1 
          className="glowing-text"
          initial={{ y: -50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.8 }}
        >
          My Tools
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Select a tool to get started:
        </motion.p>
        <animated.div style={floatingAnimation} className="tools-grid">
          <Tilt tiltMaxAngleX={20} tiltMaxAngleY={20} scale={1.05} transitionSpeed={2000}>
            <motion.button
              onClick={() => navigate("/budgetflo")}
              className="tool-button"
              variants={toolButtonVariants}
              whileHover="hover"
            >
              <FaChartLine className="tool-icon" />
              BudgetFlo
            </motion.button>
          </Tilt>
          <Tilt tiltMaxAngleX={20} tiltMaxAngleY={20} scale={1.05} transitionSpeed={2000}>
            <motion.button
              onClick={() => {
                setShowConfetti(true)
                setTimeout(() => setShowConfetti(false), 5000)
                navigate("/currency-converter")
              }}
              className="tool-button new-tool"
              variants={toolButtonVariants}
              whileHover="hover"
            >
              <FaDollarSign className="tool-icon" />
              Currency Converter
              <span className="new-badge">NEW!</span>
            </motion.button>
          </Tilt>
        </animated.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link to="/" onClick={handleLogout}>
            <button className="logout-button">Logout</button>
          </Link>
        </motion.div>
      </div>
      {showConfetti && <Confetti />}
    </animated.div>
  )
}

export default MyToolsPage