import React from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import toast from 'react-hot-toast';
import { Star, Zap, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Subscribe = () => {
  const { user, setCredits } = useAuth();

  const handlePayment = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5001/api"}/razorpay/create-subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      const subscriptionId = data.subscriptionId;

      if (!subscriptionId) {
        alert("Subscription creation failed. Try again.");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        subscription_id: subscriptionId,
        name: "ResumeRanker",
        description: "Credit Subscription (100 credits)",
        image: "/logo.svg",
        handler: async function (response) {
          const docRef = doc(db, "users", user.uid);
          await setDoc(docRef, { credits: 100 }, { merge: true });
          setCredits(100);
          toast.success("Payment successful! You now have 100 credits.");
        },
        prefill: {
          email: user.email,
        },
        theme: {
          color: "#4F46E5",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment setup failed. Try again.");
    }
  };

  const included = [
    "100 resume analyses",
    "GitHub profile scoring",
    "LeetCode & CodeChef stats",
    "BERT compatibility matching",
    "Unlimited job descriptions",
  ];

  return (
    <div
      style={{
        minHeight: "calc(100vh - 56px)",
        backgroundColor: "var(--color-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "400px" }}>

        {/* Back link */}
        <Link
          to="/upload"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.875rem",
            color: "var(--color-text-secondary)",
            textDecoration: "none",
            marginBottom: "24px",
          }}
        >
          <ArrowLeft size={14} />
          Back to Analyzer
        </Link>

        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ marginBottom: "8px" }}>
            <span className="badge badge-brand">Credits</span>
          </div>
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-sans)",
              marginBottom: "8px",
            }}
          >
            Top up your credits
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
            Your credits have run out. Purchase a credit pack to keep screening resumes.
          </p>
        </div>

        {/* Pricing Card */}
        <div
          className="card"
          style={{
            padding: "28px",
            borderColor: "rgba(79,70,229,0.25)",
            boxShadow: "0 0 0 1px rgba(79,70,229,0.1), var(--shadow-md)",
          }}
        >
          {/* Price */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "6px",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                fontSize: "2.5rem",
                fontWeight: 800,
                color: "var(--color-text-primary)",
                letterSpacing: "-0.04em",
                fontFamily: "var(--font-sans)",
                lineHeight: 1,
              }}
            >
              ₹100
            </span>
            <span
              style={{
                fontSize: "0.875rem",
                color: "var(--color-text-muted)",
                marginBottom: "4px",
              }}
            >
              one-time
            </span>
          </div>

          {/* Credits badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "var(--color-brand-light)",
              border: "1px solid rgba(79,70,229,0.2)",
              marginBottom: "20px",
            }}
          >
            <Star size={13} style={{ color: "#CA8A04", fill: "#CA8A04" }} />
            <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-brand-text)" }}>
              100 credits
            </span>
          </div>

          {/* Included features */}
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              listStyle: "none",
              padding: 0,
              margin: 0,
              marginBottom: "24px",
            }}
          >
            {included.map((item, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                <CheckCircle size={15} style={{ color: "var(--color-success)", flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>

          <button
            onClick={handlePayment}
            className="btn-primary"
            style={{ width: "100%", padding: "12px", fontSize: "0.9375rem" }}
          >
            <Zap size={16} />
            Pay ₹100
          </button>

          <p
            style={{
              marginTop: "14px",
              fontSize: "0.75rem",
              color: "var(--color-text-muted)",
              textAlign: "center",
            }}
          >
            Secure payment via Razorpay
          </p>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
