/**
 * HomeFlow Design System
 * ----------------------
 * Központi design tokenek.
 * Az egész alkalmazás ezekre épül.
 */

export const theme = {
  colors: {
    business: {
      primary: "#2563EB",
      success: "#16A34A",
      warning: "#D97706",
      danger: "#DC2626",

      background: "#F8FAFC",
      surface: "#FFFFFF",
      surfaceAlt: "#F1F5F9",

      border: "#E2E8F0",

      text: "#0F172A",
      textSecondary: "#64748B",
    },

    premium: {
      primary: "#C9A46A",
      primaryHover: "#D7B57E",

      background: "#14110F",
      surface: "#1D1916",
      surfaceAlt: "#27211D",

      border: "#3A322C",

      text: "#F5E8D6",
      textSecondary: "#B79F86",

      success: "#6FAF78",
      warning: "#D3A64D",
      danger: "#C96B5D",
    },
  },

  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  shadow: {
    sm: "0 1px 3px rgba(15,23,42,.08)",

    md: "0 8px 24px rgba(15,23,42,.08)",

    lg: "0 20px 40px rgba(15,23,42,.12)",
  },

  transition: {
    fast: "150ms ease",
    normal: "250ms ease",
    slow: "400ms ease",
  },

  typography: {
    hero: "48px",
    h1: "32px",
    h2: "24px",
    h3: "20px",

    body: "15px",

    small: "13px",
  },
} as const;

export type Theme = typeof theme;