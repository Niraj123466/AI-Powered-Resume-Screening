"use client"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { Star, Zap, Sun, Moon, Menu, X, LogOut, Upload, Home, Info } from "lucide-react"

const Navbar = () => {
  const { credits } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "wireframe")
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleToggle = () => {
    const newTheme = theme === "night" ? "wireframe" : "night"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.querySelector("html").setAttribute("data-theme", newTheme)
  }

  const isDark = theme === "night"

  const handleNavigation = (path) => {
    navigate(path)
    setMobileOpen(false)
  }

  const handleLogout = async () => {
    await signOut(auth)
    navigate("/login")
    setMobileOpen(false)
  }

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/upload", label: "Analyzer", icon: Upload },
    { path: "/about", label: "About", icon: Info },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="page-container">
          <div style={{ display: "flex", alignItems: "center", height: "56px", gap: "8px" }}>

            {/* Logo */}
            <button
              onClick={() => handleNavigation("/")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 8px",
                borderRadius: "var(--radius-md)",
                marginRight: "auto",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-brand)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Zap size={15} color="white" fill="white" />
              </div>
              <span
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  letterSpacing: "-0.02em",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Resume<span style={{ color: "var(--color-brand)" }}>Ranker</span>
              </span>
            </button>

            {/* Desktop Nav Links */}
            <div style={{ display: "flex", alignItems: "center", gap: "2px" }} className="hidden lg:flex">
              {navLinks.map(({ path, label }) => (
                <button
                  key={path}
                  onClick={() => handleNavigation(path)}
                  className={`nav-link${isActive(path) ? " active" : ""}`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "8px" }}>

              {/* Credits Badge */}
              {user && credits !== null && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "4px 10px",
                    borderRadius: "var(--radius-full)",
                    backgroundColor: "var(--color-brand-light)",
                    border: "1px solid var(--color-brand)",
                    borderColor: "rgba(79,70,229,0.2)",
                  }}
                >
                  <Star
                    size={13}
                    style={{ color: "#CA8A04", fill: "#CA8A04", flexShrink: 0 }}
                  />
                  <span
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      color: "var(--color-brand-text)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {credits}
                  </span>
                </div>
              )}

              {/* Theme Toggle */}
              <button
                onClick={handleToggle}
                className="btn-ghost"
                style={{ padding: "6px", borderRadius: "var(--radius-md)" }}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? (
                  <Sun size={16} style={{ color: "#CA8A04" }} />
                ) : (
                  <Moon size={16} style={{ color: "var(--color-text-secondary)" }} />
                )}
              </button>

              {/* Auth — Desktop */}

              {!user ? (
                <div className="hidden sm:flex" style={{ alignItems: "center", gap: "6px" }}>
                  <button
                    onClick={() => handleNavigation("/login")}
                    className="btn-ghost"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => handleNavigation("/signup")}
                    className="btn-primary"
                  >
                    Sign up
                  </button>
                </div>
              ) : (
                <div className="hidden sm:flex" style={{ alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--color-text-muted)",
                      maxWidth: "160px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    className="hidden md:block"
                  >
                    {user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="btn-secondary"
                    style={{ gap: "6px" }}
                  >
                    <LogOut size={14} />
                    Sign out
                  </button>
                </div>
              )}

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="btn-ghost lg:hidden"
                style={{ padding: "6px" }}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            style={{
              borderTop: "1px solid var(--color-border)",
              backgroundColor: "var(--color-surface)",
              padding: "12px 16px 16px",
            }}
            className="lg:hidden animate-fade-in"
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {navLinks.map(({ path, label, icon: Icon }) => (
                <button
                  key={path}
                  onClick={() => handleNavigation(path)}
                  className={`nav-link${isActive(path) ? " active" : ""}`}
                  style={{ justifyContent: "flex-start", gap: "10px", padding: "10px 12px" }}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}

              <div style={{ height: "1px", backgroundColor: "var(--color-border)", margin: "8px 0" }} />

              {!user ? (
                <>
                  <button
                    onClick={() => handleNavigation("/login")}
                    className="btn-ghost"
                    style={{ justifyContent: "flex-start" }}
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => handleNavigation("/signup")}
                    className="btn-primary"
                    style={{ justifyContent: "flex-start" }}
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", padding: "0 12px" }}>
                    {user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="btn-ghost"
                    style={{ justifyContent: "flex-start", color: "var(--color-error)", gap: "8px" }}
                  >
                    <LogOut size={15} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar
