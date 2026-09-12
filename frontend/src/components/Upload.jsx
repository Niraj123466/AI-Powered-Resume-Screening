"use client"

import { useState } from "react"
import { uploadFiles, triggerPythonScript } from "./fileUploadService"
import {
  UploadIcon,
  FileText,
  Play,
  CheckCircle,
  AlertCircle,
  Github,
  Code,
  Award,
  ChevronDown,
  ChevronUp,
  FileUp,
  X,
  Star,
  BarChart2,
} from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'

/* ─── Score color helper ─────────────────────────────────────────────────────── */
function scoreColor(pct) {
  if (pct >= 75) return { bar: "#16A34A", text: "#16A34A" }
  if (pct >= 50) return { bar: "#CA8A04", text: "#CA8A04" }
  return { bar: "#DC2626", text: "#DC2626" }
}

/* ─── Skeleton Card ──────────────────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div
      className="card"
      style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="skeleton" style={{ height: "20px", width: "55%", borderRadius: "var(--radius-sm)" }} />
        <div className="skeleton" style={{ height: "28px", width: "28px", borderRadius: "50%" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div className="skeleton" style={{ height: "10px", width: "100%", borderRadius: "var(--radius-sm)" }} />
        <div className="skeleton" style={{ height: "10px", width: "80%", borderRadius: "var(--radius-sm)" }} />
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <div className="skeleton" style={{ height: "24px", width: "72px", borderRadius: "var(--radius-full)" }} />
        <div className="skeleton" style={{ height: "24px", width: "72px", borderRadius: "var(--radius-full)" }} />
      </div>
    </div>
  )
}

/* ─── Resume Result Card ─────────────────────────────────────────────────────── */
function ResumeCard({ resume, index }) {
  const compatPct = Math.round(resume.compatibility_score * 100)
  const codingPct = Math.round(resume.coding_score * 100)
  const compatColors = scoreColor(compatPct)
  const codingColors = scoreColor(codingPct)

  return (
    <div
      className="card card-hover animate-fade-in-up"
      style={{ animationDelay: `${index * 60}ms`, overflow: "hidden" }}
    >
      {/* Top accent bar based on score */}
      <div
        style={{
          height: "3px",
          backgroundColor: compatColors.bar,
          opacity: 0.7,
        }}
      />

      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-sans)",
              letterSpacing: "-0.01em",
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {resume.name}
          </h3>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              backgroundColor: "var(--color-brand-light)",
              color: "var(--color-brand-text)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            #{index + 1}
          </div>
        </div>

        {/* Score Bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Compatibility */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "6px",
              }}
            >
              <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-text-secondary)" }}>
                Job Compatibility
              </span>
              <span
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  color: compatColors.text,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {compatPct}%
              </span>
            </div>
            <div className="score-bar-track">
              <div
                className="score-bar-fill"
                style={{ width: `${compatPct}%`, backgroundColor: compatColors.bar }}
              />
            </div>
          </div>

          {/* Coding */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "6px",
              }}
            >
              <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-text-secondary)" }}>
                Coding Proficiency
              </span>
              <span
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  color: codingColors.text,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {codingPct}%
              </span>
            </div>
            <div className="score-bar-track">
              <div
                className="score-bar-fill"
                style={{ width: `${codingPct}%`, backgroundColor: codingColors.bar }}
              />
            </div>
          </div>
        </div>

        {/* Coding Profiles */}
        {(resume.coding_profiles?.github || resume.coding_profiles?.leetcode || resume.coding_profiles?.codechef) && (
          <div>
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--color-text-muted)",
                marginBottom: "8px",
              }}
            >
              Profiles
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {resume.coding_profiles.github && (
                <a
                  href={resume.coding_profiles.github}
                  target="_blank"
                  rel="noreferrer"
                  className="badge"
                  style={{
                    backgroundColor: "var(--color-surface-2)",
                    color: "var(--color-text-secondary)",
                    border: "1px solid var(--color-border)",
                    textDecoration: "none",
                    transition: "border-color 0.15s ease, color 0.15s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "var(--color-brand)"
                    e.currentTarget.style.color = "var(--color-brand-text)"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "var(--color-border)"
                    e.currentTarget.style.color = "var(--color-text-secondary)"
                  }}
                >
                  <Github size={12} />
                  GitHub
                </a>
              )}
              {resume.coding_profiles.leetcode && (
                <a
                  href={resume.coding_profiles.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="badge"
                  style={{
                    backgroundColor: "#FFFBEB",
                    color: "#92400E",
                    border: "1px solid #FDE68A",
                    textDecoration: "none",
                  }}
                >
                  <Code size={12} />
                  LeetCode
                </a>
              )}
              {resume.coding_profiles.codechef && (
                <a
                  href={resume.coding_profiles.codechef}
                  target="_blank"
                  rel="noreferrer"
                  className="badge"
                  style={{
                    backgroundColor: "#FFF7ED",
                    color: "#9A3412",
                    border: "1px solid #FED7AA",
                    textDecoration: "none",
                  }}
                >
                  <Award size={12} />
                  CodeChef
                </a>
              )}
            </div>
          </div>
        )}

        {/* Stats */}
        {(resume.github_stats?.total_contributions !== undefined ||
          resume.leetcode_stats?.total_problems_solved !== undefined ||
          resume.codechef_stats?.rating !== undefined) && (
          <div
            style={{
              paddingTop: "16px",
              borderTop: "1px solid var(--color-border)",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {resume.github_stats?.total_contributions !== undefined && (
              <div>
                <p
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--color-text-muted)",
                    marginBottom: "6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <Github size={11} /> GitHub
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {[
                    ["Contributions", resume.github_stats.total_contributions],
                    ["Active Days", resume.github_stats.active_days],
                    ["Repositories", resume.github_stats.public_repos],
                  ].map(([label, val]) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "0.8125rem",
                      }}
                    >
                      <span style={{ color: "var(--color-text-secondary)" }}>{label}</span>
                      <span
                        style={{
                          fontWeight: 600,
                          color: "var(--color-text-primary)",
                          fontVariantNumeric: "tabular-nums",
                          backgroundColor: "var(--color-surface-2)",
                          padding: "1px 7px",
                          borderRadius: "var(--radius-sm)",
                          fontSize: "0.75rem",
                        }}
                      >
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resume.leetcode_stats?.total_problems_solved !== undefined && (
              <div>
                <p
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--color-text-muted)",
                    marginBottom: "6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <Code size={11} /> LeetCode
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {[
                    ["Solved", resume.leetcode_stats.total_problems_solved],
                    ["Ranking", resume.leetcode_stats.ranking],
                  ].map(([label, val]) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "0.8125rem",
                      }}
                    >
                      <span style={{ color: "var(--color-text-secondary)" }}>{label}</span>
                      <span
                        style={{
                          fontWeight: 600,
                          color: "var(--color-text-primary)",
                          fontVariantNumeric: "tabular-nums",
                          backgroundColor: "var(--color-surface-2)",
                          padding: "1px 7px",
                          borderRadius: "var(--radius-sm)",
                          fontSize: "0.75rem",
                        }}
                      >
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resume.codechef_stats?.rating !== undefined && (
              <div>
                <p
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--color-text-muted)",
                    marginBottom: "6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <Award size={11} /> CodeChef
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {[
                    ["Rating", resume.codechef_stats.rating],
                    ["Solved", resume.codechef_stats.fully_solved],
                  ].map(([label, val]) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "0.8125rem",
                      }}
                    >
                      <span style={{ color: "var(--color-text-secondary)" }}>{label}</span>
                      <span
                        style={{
                          fontWeight: 600,
                          color: "var(--color-text-primary)",
                          fontVariantNumeric: "tabular-nums",
                          backgroundColor: "var(--color-surface-2)",
                          padding: "1px 7px",
                          borderRadius: "var(--radius-sm)",
                          fontSize: "0.75rem",
                        }}
                      >
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Main Upload Component ──────────────────────────────────────────────────── */
const Upload = () => {
  const { decrementCredits, credits } = useAuth()
  const [files, setFiles] = useState(null)
  const [jobDescription, setJobDescription] = useState("")
  const [filePaths, setFilePaths] = useState([])
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("success")
  const [scriptOutput, setScriptOutput] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isRunningScript, setIsRunningScript] = useState(false)
  const [resumeData, setResumeData] = useState([])
  const [outputExpanded, setOutputExpanded] = useState(false)
  const navigate = useNavigate()

  const handleFileChange = (e) => setFiles(e.target.files)
  const handleJobDescriptionChange = (e) => setJobDescription(e.target.value)

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      setMessage("Please select at least one PDF file.")
      setMessageType("error")
      return
    }
    setIsUploading(true)
    setMessage("")
    try {
      const res = await uploadFiles(files, jobDescription)
      setMessage(res.message)
      setMessageType("success")
      setFilePaths(res.filePaths)
    } catch (error) {
      setMessage("Failed to upload files: " + error?.message)
      setMessageType("error")
    } finally {
      setIsUploading(false)
    }
  }

  const handleRunScript = async () => {
    if (credits <= 0) {
      toast.error('Credits Exhausted!')
      navigate("/subscribe")
      return
    }
    if (filePaths.length === 0) {
      setMessage("Please upload files first.")
      setMessageType("error")
      return
    }
    setIsRunningScript(true)
    setMessage("")
    try {
      const res = await triggerPythonScript(filePaths)
      setMessage(res.message)
      setMessageType("success")
      setScriptOutput(res.output)

      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5001/api"}/resume-data`)
      const data = await response.json()
      decrementCredits()
      setResumeData(data)
    } catch (error) {
      setMessage("Failed to run analysis: " + error?.message)
      setMessageType("error")
    } finally {
      setIsRunningScript(false)
    }
  }

  const fileCount = files ? files.length : 0

  return (
    <div
      style={{
        backgroundColor: "var(--color-bg)",
        minHeight: "calc(100vh - 56px)",
        paddingBottom: "80px",
      }}
    >
      {/* Page Header */}
      <div
        style={{
          backgroundColor: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        <div className="page-container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <h1
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-sans)",
                  marginBottom: "4px",
                }}
              >
                Resume Analyzer
              </h1>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                Upload candidate resumes and match them against your job description
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "var(--radius-full)",
                backgroundColor: credits <= 0 ? "var(--color-error-bg)" : "var(--color-brand-light)",
                border: `1px solid ${credits <= 0 ? "var(--color-error-border)" : "rgba(79,70,229,0.2)"}`,
              }}
            >
              <Star
                size={13}
                style={{
                  color: credits <= 0 ? "var(--color-error)" : "#CA8A04",
                  fill: credits <= 0 ? "var(--color-error)" : "#CA8A04",
                }}
              />
              <span
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: credits <= 0 ? "var(--color-error)" : "var(--color-brand-text)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {credits !== null ? `${credits} credits` : "—"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="page-container" style={{ paddingTop: "32px" }}>
        {/* Upload Form Card */}
        <div
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            marginBottom: "40px",
          }}
        >
          <div className="card" style={{ padding: "28px" }}>
            {/* Job Description */}
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="jobDescription" className="form-label">
                Job Description
              </label>
              <textarea
                id="jobDescription"
                value={jobDescription}
                onChange={handleJobDescriptionChange}
                placeholder="Paste the job description here — include required skills, experience, and responsibilities..."
                rows={6}
                className="form-input"
                style={{
                  resize: "vertical",
                  minHeight: "120px",
                  lineHeight: 1.6,
                }}
              />
            </div>

            {/* File Upload Zone */}
            <div style={{ marginBottom: "24px" }}>
              <label className="form-label">Resume Files (PDF)</label>
              <label
                htmlFor="file-upload"
                style={{
                  display: "block",
                  border: `2px dashed ${fileCount > 0 ? "var(--color-brand)" : "var(--color-border)"}`,
                  borderRadius: "var(--radius-lg)",
                  backgroundColor: fileCount > 0 ? "var(--color-brand-light)" : "var(--color-surface-2)",
                  padding: "32px 24px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "border-color 0.2s ease, background-color 0.2s ease",
                }}
                onMouseEnter={e => {
                  if (fileCount === 0) {
                    e.currentTarget.style.borderColor = "var(--color-brand)"
                    e.currentTarget.style.backgroundColor = "var(--color-brand-light)"
                  }
                }}
                onMouseLeave={e => {
                  if (fileCount === 0) {
                    e.currentTarget.style.borderColor = "var(--color-border)"
                    e.currentTarget.style.backgroundColor = "var(--color-surface-2)"
                  }
                }}
              >
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                {fileCount > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                    <CheckCircle size={28} style={{ color: "var(--color-brand)" }} />
                    <span
                      style={{
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                        color: "var(--color-brand-text)",
                      }}
                    >
                      {fileCount} file{fileCount !== 1 ? "s" : ""} selected
                    </span>
                    <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
                      Click to change files
                    </span>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                    <FileUp size={28} style={{ color: "var(--color-text-muted)" }} />
                    <div>
                      <span
                        style={{
                          fontSize: "0.9375rem",
                          fontWeight: 500,
                          color: "var(--color-brand-text)",
                        }}
                      >
                        Click to select files
                      </span>
                      <span style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)" }}> or drag & drop</span>
                    </div>
                    <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
                      PDF files only — multiple supported
                    </span>
                  </div>
                )}
              </label>

              {/* File list */}
              {files && fileCount > 0 && (
                <ul style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "4px" }}>
                  {Array.from(files).map((file, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "6px 10px",
                        borderRadius: "var(--radius-sm)",
                        backgroundColor: "var(--color-surface-2)",
                        fontSize: "0.8125rem",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      <FileText size={13} style={{ color: "var(--color-brand)", flexShrink: 0 }} />
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {file.name}
                      </span>
                      <span style={{ marginLeft: "auto", flexShrink: 0, color: "var(--color-text-muted)" }}>
                        {(file.size / 1024).toFixed(0)} KB
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="btn-secondary"
                  style={{ flex: "1 1 140px", minWidth: 0 }}
                >
                  {isUploading ? (
                    <>
                      <span className="spinner" style={{ borderTopColor: "var(--color-brand)", borderColor: "rgba(79,70,229,0.2)" }} />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <UploadIcon size={15} />
                      Upload Resumes
                    </>
                  )}
                </button>

                <button
                  onClick={handleRunScript}
                  disabled={isRunningScript || filePaths.length === 0}
                  className="btn-primary"
                  style={{ flex: "1 1 140px", minWidth: 0 }}
                >
                  {isRunningScript ? (
                    <>
                      <span className="spinner" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Play size={15} />
                      Analyze Resumes
                    </>
                  )}
                </button>
              </div>

              {filePaths.length === 0 && fileCount === 0 && (
                <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textAlign: "center" }}>
                  Upload resumes first, then run the analysis
                </p>
              )}
              {filePaths.length > 0 && !isRunningScript && resumeData.length === 0 && (
                <p style={{ fontSize: "0.75rem", color: "var(--color-success)", textAlign: "center" }}>
                  ✓ {filePaths.length} file{filePaths.length !== 1 ? "s" : ""} uploaded — ready to analyze
                </p>
              )}
            </div>

            {/* Status Message */}
            {message && (
              <div
                className={messageType === "success" ? "status-success" : "status-error"}
                style={{ marginTop: "16px" }}
              >
                {messageType === "success" ? (
                  <CheckCircle size={16} style={{ flexShrink: 0, marginTop: "1px" }} />
                ) : (
                  <AlertCircle size={16} style={{ flexShrink: 0, marginTop: "1px" }} />
                )}
                <span>{message}</span>
              </div>
            )}
          </div>

          {/* Script Output — collapsible */}
          {scriptOutput && (
            <div className="card" style={{ marginTop: "12px", overflow: "hidden" }}>
              <button
                onClick={() => setOutputExpanded(!outputExpanded)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "14px 20px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-text-secondary)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  fontFamily: "var(--font-sans)",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <BarChart2 size={15} />
                  Processing Log
                </span>
                {outputExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>
              {outputExpanded && (
                <div style={{ borderTop: "1px solid var(--color-border)" }}>
                  <pre
                    style={{
                      padding: "16px 20px",
                      fontSize: "0.8125rem",
                      color: "var(--color-text-secondary)",
                      backgroundColor: "var(--color-surface-2)",
                      overflowX: "auto",
                      maxHeight: "240px",
                      overflowY: "auto",
                      margin: 0,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      fontFamily: "'SF Mono', 'Fira Code', 'Cascadia Code', monospace",
                      lineHeight: 1.7,
                    }}
                  >
                    {scriptOutput}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results Section */}
        {isRunningScript && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-text-primary)", fontFamily: "var(--font-sans)" }}>
                Analyzing Candidates…
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "16px",
              }}
            >
              {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
            </div>
          </div>
        )}

        {!isRunningScript && resumeData.length > 0 && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    color: "var(--color-text-primary)",
                    fontFamily: "var(--font-sans)",
                    letterSpacing: "-0.01em",
                    marginBottom: "2px",
                  }}
                >
                  Analysis Results
                </h2>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
                  {resumeData.length} candidate{resumeData.length !== 1 ? "s" : ""} ranked by job compatibility
                </p>
              </div>
              <button
                onClick={() => setResumeData([])}
                className="btn-ghost"
                style={{ fontSize: "0.8125rem", gap: "6px", color: "var(--color-text-muted)" }}
              >
                <X size={14} />
                Clear results
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "16px",
              }}
            >
              {resumeData.map((resume, index) => (
                <ResumeCard key={index} resume={resume} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State — before any analysis */}
        {!isRunningScript && resumeData.length === 0 && filePaths.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 24px",
              maxWidth: "440px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "var(--radius-xl)",
                backgroundColor: "var(--color-brand-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <FileText size={24} style={{ color: "var(--color-brand)" }} />
            </div>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-sans)",
                marginBottom: "8px",
              }}
            >
              No results yet
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.65 }}>
              Upload candidate resumes and add a job description above, then click{" "}
              <strong>Analyze Resumes</strong> to see ranked results.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Upload
