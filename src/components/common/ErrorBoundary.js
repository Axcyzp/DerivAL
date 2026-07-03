import React from "react";

// Catches any render/runtime error anywhere below it in the tree.
// Without this, an uncaught error unmounts the whole app and the user
// just sees the dark page background (i.e. a "black screen") with no
// indication anything went wrong. This also gives us a place to log
// the real error so it can be diagnosed on devices we can't test on
// directly (older iOS/Android).
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("Uncaught app error:", error, info?.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            padding: "24px",
            boxSizing: "border-box",
            textAlign: "center",
            color: "#fff",
            background: "#050508",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          <h1 style={{ fontSize: "1.25rem", margin: 0 }}>
            Something went wrong
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: "360px", margin: 0 }}>
            Please try reloading the page. If this keeps happening, it may
            not work on this device/browser version yet.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "8px",
              padding: "10px 20px",
              borderRadius: "24px",
              border: "1px solid rgba(168,85,247,0.35)",
              background: "linear-gradient(135deg, #3d1060 0%, #6b1045 100%)",
              color: "#fff",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
