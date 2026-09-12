"use client"

import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "../firebase"
import { Link, useNavigate } from "react-router-dom"
import { Zap, AlertCircle, Eye, EyeOff, CheckCircle } from "lucide-react"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCred.user
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: user.email,
        createdAt: new Date(),
      })
      navigate("/upload")
    } catch (err) {
      console.error(err)
      setError(err.message.replace("Firebase: ", "").replace(/ \(auth\/.*\)\./, ""))
    } finally {
      setIsLoading(false)
    }
  }

  const perks = [
    "5 free resume analyses on signup",
    "GitHub & LeetCode profile scoring",
    "AI-powered job compatibility ranking",
  ]

  return (
    <div
      style={{
        minHeight: "calc(100vh - 56px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--color-bg)",
        padding: "24px 16px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "400px" }}>

        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "var(--radius-lg)",
              backgroundColor: "var(--color-brand)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              boxShadow: "0 4px 14px rgba(79,70,229,0.35)",
            }}
          >
            <Zap size={22} color="white" fill="white" />
          </div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-sans)",
              marginBottom: "6px",
            }}
          >
            Create your account
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
            Start screening smarter with AI
          </p>
        </div>

        {/* Perks */}
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            marginBottom: "20px",
            padding: 0,
            listStyle: "none",
          }}
        >
          {perks.map((p, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.8125rem",
                color: "var(--color-text-secondary)",
              }}
            >
              <CheckCircle size={14} style={{ color: "var(--color-success)", flexShrink: 0 }} />
              {p}
            </li>
          ))}
        </ul>

        {/* Form Card */}
        <div className="card" style={{ padding: "28px" }}>
          {error && (
            <div className="status-error" style={{ marginBottom: "20px" }}>
              <AlertCircle size={15} style={{ flexShrink: 0, marginTop: "1px" }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-input"
                autoComplete="name"
              />
            </div>

            <div>
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input"
                  style={{ paddingRight: "40px" }}
                  autoComplete="new-password"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--color-text-muted)",
                    padding: "2px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
              style={{ width: "100%", marginTop: "4px", padding: "11px" }}
            >
              {isLoading ? (
                <>
                  <span className="spinner" />
                  Creating account…
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <div
            style={{
              marginTop: "20px",
              paddingTop: "20px",
              borderTop: "1px solid var(--color-border)",
              textAlign: "center",
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "var(--color-brand-text)", fontWeight: 500, textDecoration: "none" }}
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup