'use client';

import { motion } from 'framer-motion';
import {
  Code,
  Github,
  Linkedin,
  Server,
  Zap,
  Award,
  Shield,
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    icon: Code,
    iconColor: "#16A34A",
    iconBg: "#F0FDF4",
    title: 'Fine-Tuned BERT Model',
    description:
      'Accurately matches resumes with job descriptions using advanced NLP techniques.',
  },
  {
    icon: Linkedin,
    iconColor: "#2563EB",
    iconBg: "#EFF6FF",
    title: 'Online Profile Analysis',
    description:
      'Integrates insights from LinkedIn and GitHub profiles for better candidate assessment.',
  },
  {
    icon: Github,
    iconColor: "var(--color-text-primary)",
    iconBg: "var(--color-surface-2)",
    title: 'Custom Scoring',
    description:
      'Generates scores based on skills, experiences, and key job description keywords.',
  },
  {
    icon: Zap,
    iconColor: "#CA8A04",
    iconBg: "#FEFCE8",
    title: 'Dynamic Compatibility Check',
    description:
      'Provides a compatibility rating for resumes and job descriptions.',
  },
  {
    icon: Shield,
    iconColor: "#7C3AED",
    iconBg: "#F5F3FF",
    title: 'Robust Error Handling',
    description:
      'Ensures reliable performance with incomplete or missing candidate data.',
  },
];

const requirements = [
  'Python 3.7+',
  'PyTorch',
  'Transformers (Hugging Face)',
  'BeautifulSoup4',
  'Requests',
  'Pandas',
  'NumPy',
  'Scikit-learn',
];

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.07 } },
};

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>

      {/* Page Header */}
      <div
        style={{
          borderBottom: "1px solid var(--color-border)",
          backgroundColor: "var(--color-surface)",
          paddingTop: "52px",
          paddingBottom: "52px",
        }}
      >
        <div className="page-container" style={{ textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div style={{ marginBottom: "12px" }}>
              <span className="badge badge-brand">AI Resume Screening</span>
            </div>
            <h1
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-sans)",
                marginBottom: "14px",
                lineHeight: 1.2,
              }}
            >
              How ResumeRanker works
            </h1>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--color-text-secondary)",
                maxWidth: "540px",
                margin: "0 auto",
                lineHeight: 1.65,
              }}
            >
              Revolutionizing the hiring process with advanced NLP and comprehensive
              candidate evaluation powered by a fine-tuned BERT model.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        className="page-container"
        style={{ paddingTop: "56px", paddingBottom: "80px" }}
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={stagger}
      >
        {/* Overview */}
        <motion.section style={{ marginBottom: "56px" }} variants={fadeInUp}>
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              marginBottom: "12px",
              fontFamily: "var(--font-sans)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Zap size={18} style={{ color: "#CA8A04" }} />
            Overview
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              lineHeight: 1.75,
              color: "var(--color-text-secondary)",
              maxWidth: "680px",
            }}
          >
            Our AI-powered system streamlines the resume screening process for Full-Stack Developer
            roles. Leveraging Natural Language Processing (NLP) with a fine-tuned BERT model, the
            platform evaluates resumes based on their alignment with job descriptions and analyzes
            candidates&apos; LinkedIn and GitHub profiles for a comprehensive evaluation.
          </p>
        </motion.section>

        {/* Features */}
        <motion.section style={{ marginBottom: "56px" }} variants={fadeInUp}>
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              marginBottom: "20px",
              fontFamily: "var(--font-sans)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Server size={18} style={{ color: "var(--color-brand)" }} />
            Key Features
          </h2>
          <motion.ul
            style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none", padding: 0, margin: 0 }}
            variants={stagger}
          >
            {features.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.li
                  key={index}
                  variants={fadeInUp}
                  className="card"
                  style={{
                    padding: "18px 20px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: item.iconBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "1px",
                    }}
                  >
                    <Icon size={17} style={{ color: item.iconColor }} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                        color: "var(--color-text-primary)",
                        marginBottom: "4px",
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                      {item.description}
                    </p>
                  </div>
                </motion.li>
              )
            })}
          </motion.ul>
        </motion.section>

        {/* System Requirements */}
        <motion.section variants={fadeInUp}>
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              marginBottom: "20px",
              fontFamily: "var(--font-sans)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Award size={18} style={{ color: "#DC2626" }} />
            System Requirements
          </h2>
          <motion.ul
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "8px",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
            variants={stagger}
          >
            {requirements.map((item, index) => (
              <motion.li
                key={index}
                variants={fadeInUp}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 14px",
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "var(--color-text-secondary)",
                  boxShadow: "var(--shadow-xs)",
                }}
              >
                <Code size={14} style={{ color: "var(--color-brand)", flexShrink: 0 }} />
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>
      </motion.div>
    </div>
  );
}
