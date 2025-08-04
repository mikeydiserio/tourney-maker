import { createGlobalStyle } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    body: string;
    text: string;
    primary: string;
    accent: string;
    bracketLine: string;
    cardBg: string;
    cardBorder: string;
  }
}

export const theme = {
  light: {
    body: "#FFF",
    text: "#121212",
    primary: "#6200ee",
    accent: "#03dac6",
    bracketLine: "#E0E0E0",
    cardBg: "#F5F5F5",
    cardBorder: "#E0E0E0",
  },
  dark: {
    body: "#121212",
    text: "#E0E0E0",
    primary: "#bb86fc",
    accent: "#03dac6",
    bracketLine: "#333",
    cardBg: "#1E1E1E",
    cardBorder: "#2F2F2F",
  },
};

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 2rem;
    transition: all 0.25s linear;
  }
`;
