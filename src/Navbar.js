import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import "./Navbar.css"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
        setIsAtTop(false)
      } else if (window.scrollY === 0) {
        setIsAtTop(true)
      } else {
        setIsScrolled(false)
        setIsAtTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      className={`navbar ${isScrolled ? "scrolled" : ""} ${isAtTop ? "at-top" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        <Link to="/" className="nav-logo">
          <span className="logo-text">Budget</span>
          <span className="logo-highlight">Flo</span>
        </Link>
        <div className="nav-links">
          <Link to="/signup" className="nav-item signup">
            Register
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar

