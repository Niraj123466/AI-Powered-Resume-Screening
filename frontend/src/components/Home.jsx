'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Upload, BarChart2, FileSearch, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const images = [
  "src/assets/undraw_updated_resume_re_7r9j.svg",
  "src/assets/undraw_job_offers_re_634p.svg",
  "src/assets/undraw_statistic_chart_re_w0pk.svg",
];

const features = [
  { icon: Upload, text: "Easy Resume Upload" },
  { icon: FileSearch, text: "AI-Powered Analysis" },
  { icon: BarChart2, text: "Detailed Insights" },
];

const highlights = [
  "Rank candidates by job fit in seconds",
  "GitHub & LeetCode profile scoring",
  "BERT-powered resume matching",
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        minHeight: "calc(100vh - 56px)",
        backgroundColor: "var(--color-bg)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="page-container" style={{ paddingTop: "64px", paddingBottom: "80px", width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "64px",
            flexWrap: "wrap",
          }}
        >
          {/* Left: Text Content */}
          <motion.div
            style={{ flex: "1 1 340px", minWidth: 0 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            {/* Badge */}
            <div style={{ marginBottom: "20px" }}>
              <span className="badge badge-brand" style={{ fontSize: "0.75rem" }}>
                AI-Powered Hiring Tool
              </span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                color: "var(--color-text-primary)",
                marginBottom: "16px",
                fontFamily: "var(--font-sans)",
              }}
            >
              Screen resumes{" "}
              <span style={{ color: "var(--color-brand)" }}>10x faster</span>{" "}
              with AI
            </h1>

            {/* Subtext */}
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "var(--color-text-secondary)",
                marginBottom: "28px",
                maxWidth: "480px",
              }}
            >
              Upload resumes, paste your job description, and let our AI rank candidates 
              by compatibility — including GitHub and coding platform analysis.
            </p>

            {/* Highlights */}
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
              {highlights.map((item, i) => (
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
                  <CheckCircle
                    size={16}
                    style={{ color: "var(--color-success)", flexShrink: 0 }}
                  />
                  {item}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <Link
                to="/upload"
                className="btn-primary"
                style={{ fontSize: "0.9375rem", padding: "10px 20px" }}
              >
                Get Started
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/about"
                className="btn-ghost"
                style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}
              >
                How it works
              </Link>
            </div>

            {/* Feature Chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "40px" }}>
              {features.map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -1 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 12px",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid var(--color-border)",
                    backgroundColor: "var(--color-surface)",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    color: "var(--color-text-secondary)",
                    cursor: "default",
                    boxShadow: "var(--shadow-xs)",
                  }}
                >
                  <Icon size={14} style={{ color: "var(--color-brand)", flexShrink: 0 }} />
                  {text}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Illustration Carousel */}
          <motion.div
            style={{
              flex: "1 1 300px",
              minWidth: 0,
              position: "relative",
              height: "360px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
          >
            {/* Subtle background circle */}
            <div
              style={{
                position: "absolute",
                inset: "10%",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt="Resume screening illustration"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  position: "relative",
                  zIndex: 1,
                }}
              />
            </AnimatePresence>
            {/* Dots */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "6px",
              }}
            >
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  aria-label={`Slide ${i + 1}`}
                  style={{
                    width: i === currentImageIndex ? "20px" : "6px",
                    height: "6px",
                    borderRadius: "3px",
                    backgroundColor: i === currentImageIndex ? "var(--color-brand)" : "var(--color-border)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
