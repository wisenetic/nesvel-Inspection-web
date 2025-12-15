import React from "react";

const DocumentationListPage: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: 800,
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
          fontSize: "2rem",
          fontWeight: 600,
          color: "#111827"
        }}
      >
        Documentation
      </h1>

      <p
        style={{
          margin: 0,
          marginBottom: "1.5rem",
          fontSize: "1rem",
          color: "#4b5563"
        }}
      >
        This page provides basic documentation and guidance for using the
        Inspection Management Portal.
      </p>

      {/* Section 1 */}
      <section style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.3rem",
            marginBottom: "0.5rem",
            color: "#1f2937"
          }}
        >
          Getting Started
        </h2>

        <p style={{ margin: 0, marginBottom: "0.75rem", color: "#4b5563" }}>
          Learn how to navigate the system, manage inspections, and access
          essential tools.
        </p>

        <ul style={{ paddingLeft: "1.2rem", color: "#374151" }}>
          <li>Logging in and accessing your dashboard</li>
          <li>Understanding the navigation menu</li>
          <li>Viewing assigned inspections</li>
          <li>Submitting inspection reports</li>
        </ul>
      </section>

      {/* Section 2 */}
      <section style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.3rem",
            marginBottom: "0.5rem",
            color: "#1f2937"
          }}
        >
          Managing Inspectors
        </h2>

        <p style={{ margin: 0, marginBottom: "0.75rem", color: "#4b5563" }}>
          Information on adding, editing, and organizing inspectors.
        </p>

        <ul style={{ paddingLeft: "1.2rem", color: "#374151" }}>
          <li>Adding new inspectors</li>
          <li>Assigning supervisors</li>
          <li>Updating inspector details</li>
          <li>Viewing inspector activity logs</li>
        </ul>
      </section>

      {/* Section 3 */}
      <section style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.3rem",
            marginBottom: "0.5rem",
            color: "#1f2937"
          }}
        >
          Facilities & Service Areas
        </h2>

        <p style={{ margin: 0, marginBottom: "0.75rem", color: "#4b5563" }}>
          Learn how to manage facilities and service areas within the system.
        </p>

        <ul style={{ paddingLeft: "1.2rem", color: "#374151" }}>
          <li>Creating new facilities</li>
          <li>Assigning service areas</li>
          <li>Updating facility information</li>
          <li>Viewing facility inspection history</li>
        </ul>
      </section>

      {/* Section 4 */}
      <section style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.3rem",
            marginBottom: "0.5rem",
            color: "#1f2937"
          }}
        >
          Troubleshooting
        </h2>

        <p style={{ margin: 0, marginBottom: "0.75rem", color: "#4b5563" }}>
          Common issues and how to resolve them.
        </p>

        <ul style={{ paddingLeft: "1.2rem", color: "#374151" }}>
          <li>Unable to log in</li>
          <li>Missing inspection assignments</li>
          <li>Data not updating or syncing</li>
          <li>Permission or access errors</li>
        </ul>
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
        For additional help, visit the Support page or contact your system
        administrator.
      </footer>
    </div>
  );
};

export default DocumentationListPage;
