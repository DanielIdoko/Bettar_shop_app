import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

type Variant = "success" | "error" | "info" | "warning";

type Action = {
  label?: string;
  onClick?: () => void;
};

type MessageModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: React.ReactNode;
  variant?: Variant;
  autoCloseMs?: number; // if provided, modal will auto-close after ms
  confirm?: Action; // primary action
  cancel?: Action; // optional secondary action (calls onClose by default)
  showCloseButton?: boolean;
};


export default function MessageModal({
  open,
  onClose,
  title,
  message,
  variant = "info",
  autoCloseMs,
  confirm,
  cancel,
  showCloseButton = true,
}: MessageModalProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const autoCloseTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!open) return;

    // Escape key handler
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    // focus the dialog (basic focus management)
    const prevActive = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      prevActive?.focus();
      if (autoCloseTimer.current) {
        window.clearTimeout(autoCloseTimer.current);
        autoCloseTimer.current = null;
      }
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !autoCloseMs) return;
    autoCloseTimer.current = window.setTimeout(() => {
      onClose();
    }, autoCloseMs);
    return () => {
      if (autoCloseTimer.current) {
        window.clearTimeout(autoCloseTimer.current);
        autoCloseTimer.current = null;
      }
    };
  }, [open, autoCloseMs, onClose]);

  if (!open) return null;
  if (typeof document === "undefined") return null;

  const colorByVariant = {
    success: {
      bg: "#ECFDF5",
      ring: "#10B981",
      text: "#065F46",
      button: "#10B981",
    },
    error: {
      bg: "#FEF2F2",
      ring: "#EF4444",
      text: "#7F1D1D",
      button: "#EF4444",
    },
    info: {
      bg: "#EFF6FF",
      ring: "#3B82F6",
      text: "#1E3A8A",
      button: "#3B82F6",
    },
    warning: {
      bg: "#FFFBEB",
      ring: "#F59E0B",
      text: "#92400E",
      button: "#F59E0B",
    },
  }[variant];

  const icon = {
    success: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path
          d="M4 10l3 3 9-9"
          stroke={colorByVariant.button}
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    error: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path
          d="M6 6l8 8M14 6L6 14"
          stroke={colorByVariant.button}
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    info: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path
          d="M10 7.5v.01"
          stroke={colorByVariant.button}
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9.25 11h1.5v3h-1.5z" fill={colorByVariant.button} />
        <circle
          cx="10"
          cy="10"
          r="8"
          stroke={colorByVariant.button}
          strokeWidth="1.2"
        />
      </svg>
    ),
    warning: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path
          d="M10 4l6 12H4L10 4z"
          stroke={colorByVariant.button}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 8v2"
          stroke={colorByVariant.button}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M10 12.5h.01"
          stroke={colorByVariant.button}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  }[variant];

  const content = (
    <div
      ref={overlayRef}
      onMouseDown={(e) => {
        // close if clicking on overlay (not inside dialog)
        if (e.target === overlayRef.current) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: 20,
      }}
      aria-hidden={false}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        style={{
          width: "100%",
          maxWidth: 520,
          background: "white",
          borderRadius: 10,
          boxShadow: "0 10px 30px rgba(2,6,23,0.2)",
          padding: 20,
          outline: "none",
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div
            style={{
              background: colorByVariant.bg,
              borderRadius: 8,
              padding: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 44,
              minHeight: 44,
              boxShadow: `inset 0 0 0 1px ${colorByVariant.ring}10`,
            }}
          >
            {icon}
          </div>

          <div style={{ flex: 1 }}>
            {title ? (
              <h3
                style={{
                  margin: 0,
                  color: colorByVariant.text,
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                {title}
              </h3>
            ) : null}
            {message ? (
              <div
                style={{
                  marginTop: title ? 8 : 0,
                  color: "#374151",
                  fontSize: 14,
                  lineHeight: 1.4,
                }}
              >
                {message}
              </div>
            ) : null}

            <div
              style={{
                marginTop: 16,
                display: "flex",
                gap: 8,
                justifyContent: "flex-end",
              }}
            >
              {/* Cancel / Close */}
              <button
                onClick={() => {
                  (cancel?.onClick ?? onClose)();
                }}
                style={{
                  background: "transparent",
                  border: "1px solid #E5E7EB",
                  padding: "8px 12px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                {cancel?.label ?? (showCloseButton ? "Close" : "Cancel")}
              </button>

              {/* Confirm (optional) */}
              {confirm ? (
                <button
                  onClick={() => {
                    confirm.onClick?.();
                  }}
                  style={{
                    background: colorByVariant.button,
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  {confirm.label ?? "OK"}
                </button>
              ) : null}
            </div>
          </div>

          {/* optional small close icon on top-right */}
          {showCloseButton ? (
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                marginLeft: 8,
                background: "transparent",
                border: "none",
                color: "#6B7280",
                cursor: "pointer",
                padding: 6,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden
              >
                <path
                  d="M6 6l8 8M14 6L6 14"
                  stroke="#6B7280"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
}
