import { tokens } from "@/theme/tokens";
import "./globals.css";

export const metadata = {
  title: "GovernAI | Modern AI Confidence",
  description: "GovernAI provides the architectural framework to deploy, monitor, and scale AI systems with absolute compliance and zero bias.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: tokens.fonts.body, color: tokens.onSurface, background: tokens.surface }}>
        {children}
      </body>
    </html>
  );
}
