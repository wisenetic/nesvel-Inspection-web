import React from "react";

const HelpCenterListPage: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: 900,
        margin: "2rem",
        padding: "2rem",
        borderRadius: 12,
        border: "1px solid #e5e7eb",
        background: "#ffffff",
        fontFamily: "system-ui, sans-serif"
      }}
    >
      {/* Header */}
      <h1
        style={{
          marginBottom: "1rem",
          fontSize: "2rem",
          fontWeight: 600,
          color: "#111827"
        }}
      >
        Help Center
      </h1>

      <p
        style={{
          marginBottom: "2rem",
          fontSize: "1rem",
          color: "#4b5563"
        }}
      >
        Find answers, guides, and support resources for using the system.
      </p>

      {/* Help Articles Section */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2
          style={{
            fontSize: "1.4rem",
            marginBottom: "0.75rem",
            color: "#1f2937"
          }}
        >
          Help Articles
        </h2>

        <p style={{ marginBottom: "1rem", color: "#4b5563" }}>
          Browse common topics and how‑to guides.
        </p>

        <ul style={{ paddingLeft: "1.2rem", color: "#374151", lineHeight: 1.6 }}>
          <li>How to log in and access your dashboard</li>
          <li>Managing inspectors and supervisors</li>
          <li>Creating and updating facilities</li>
          <li>Understanding service areas</li>
          <li>Submitting inspection reports</li>
          <li>Troubleshooting common issues</li>
        </ul>
      </section>

      {/* Contact Support Section */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2
          style={{
            fontSize: "1.4rem",
            marginBottom: "0.75rem",
            color: "#1f2937"
          }}
        >
          Contact Support
        </h2>

        <p style={{ marginBottom: "1rem", color: "#4b5563" }}>
          Need help? Reach out to our support team.
        </p>

        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ margin: 0, marginBottom: "0.5rem", color: "#374151" }}>
            Email: <strong>support@example.com</strong>
          </p>
          <p style={{ margin: 0, marginBottom: "0.5rem", color: "#374151" }}>
            Phone: <strong>+1 (555) 123‑4567</strong>
          </p>
          <p style={{ margin: 0, color: "#374151" }}>
            Hours: Monday–Friday, 9 AM – 5 PM (EST)
          </p>
        </div>

        <button
          style={{
            padding: "0.6rem 1.2rem",
            borderRadius: 8,
            border: "none",
            background: "#2563eb",
            color: "#ffffff",
            cursor: "pointer",
            fontSize: "0.95rem"
          }}
        >
          Submit a Support Ticket
        </button>
      </section>

      {/* Footer */}
      <footer
        style={{
          marginTop: "2rem",
          paddingTop: "1rem",
          borderTop: "1px solid #e5e7eb",
          fontSize: "0.9rem",
          color: "#6b7280"
        }}
      >
        For more help, explore the documentation or contact your administrator.
      </footer>
    </div>
  );
};

export default HelpCenterListPage;
