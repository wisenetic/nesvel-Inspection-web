import React from "react";

const SupportListPage: React.FC = () => {
   return (
    <div
      style={{
        maxWidth: 700,
        margin: "2rem",
        padding: "2rem",
        borderRadius: 12,
        border: "1px solid #e5e7eb",
        background: "#ffffff",
        fontFamily: "system-ui, sans-serif"
      }}
    >
      <h1
        style={{
          margin: 0,
          marginBottom: "1rem",
          fontSize: "1.8rem",
          fontWeight: 600,
          color: "#111827"
        }}
      >
        Support Center
      </h1>

      <p
        style={{
          margin: 0,
          marginBottom: "1.5rem",
          fontSize: "1rem",
          color: "#4b5563"
        }}
      >
        Welcome to the support page. If you're experiencing issues or need help,
        you can find basic information below.
      </p>

      <section style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.2rem",
            marginBottom: "0.5rem",
            color: "#1f2937"
          }}
        >
          Frequently Asked Questions
        </h2>

        <ul style={{ paddingLeft: "1.2rem", color: "#374151" }}>
          <li>How do I reset my password?</li>
          <li>Where can I find my inspection reports?</li>
          <li>How do I update my profile information?</li>
          <li>Who do I contact for technical issues?</li>
        </ul>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.2rem",
            marginBottom: "0.5rem",
            color: "#1f2937"
          }}
        >
          Contact Support
        </h2>

        <p style={{ margin: 0, marginBottom: "0.5rem", color: "#4b5563" }}>
          Email: <strong>support@example.com</strong>
        </p>
        <p style={{ margin: 0, marginBottom: "0.5rem", color: "#4b5563" }}>
          Phone: <strong>+1 (555) 123‑4567</strong>
        </p>
        <p style={{ margin: 0, color: "#4b5563" }}>
          Hours: Monday–Friday, 9 AM – 5 PM (EST)
        </p>
      </section>

      <section>
        <h2
          style={{
            fontSize: "1.2rem",
            marginBottom: "0.5rem",
            color: "#1f2937"
          }}
        >
          Submit a Ticket
        </h2>

        <p style={{ margin: 0, marginBottom: "1rem", color: "#4b5563" }}>
          For detailed issues, please submit a support ticket.
        </p>

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
          Create Ticket
        </button>
      </section>
    </div>
  );
};

export default SupportListPage;
