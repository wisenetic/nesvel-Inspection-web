import React from "react";

const VersionListPage: React.FC = () => {
  return (
     <div
      style={{
        maxWidth: 480,
        margin: "2rem",
        padding: "1.5rem 2rem",
        borderRadius: 12,
        border: "1px solid #e2e8f0",
        backgroundColor: "#ffffff",
        boxShadow: "0 10px 25px rgba(15, 23, 42, 0.06)",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
      }}
    >
      <h1
        style={{
          margin: 0,
          marginBottom: "0.75rem",
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "#0f172a"
        }}
      >
        Inspection Management Portal
      </h1>

      <p
        style={{
          margin: 0,
          marginBottom: "1.25rem",
          fontSize: "0.9rem",
          color: "#64748b"
        }}
      >
        Application version details and environment information.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          rowGap: "0.5rem",
          columnGap: "1rem",
          fontSize: "0.9rem"
        }}
      >
        <span style={{ fontWeight: 500, color: "#475569" }}>Version</span>
        <span style={{ color: "#0f172a" }}>v1.3.2</span>

        <span style={{ fontWeight: 500, color: "#475569" }}>Build</span>
        <span style={{ color: "#0f172a" }}>2025.03.14.1742</span>

        <span style={{ fontWeight: 500, color: "#475569" }}>Environment</span>
        <span style={{ color: "#0f172a" }}>Dev</span>

        <span style={{ fontWeight: 500, color: "#475569" }}>Release Date</span>
        <span style={{ color: "#0f172a" }}>2025-03-14</span>
      </div>
    </div>
  );
};

export default VersionListPage;
