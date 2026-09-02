import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Exam Platform Developer Portal",
  description: "Documentation and tools for the Exam Platform Public API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav style={{
          display: 'flex',
          gap: '24px',
          padding: '16px 24px',
          borderBottom: '1px solid #e5e7eb',
          alignItems: 'center'
        }}>
          <strong style={{ fontSize: '18px' }}>Exam Platform Docs</strong>
          <Link href="/" style={{ textDecoration: 'none', color: '#374151' }}>Home</Link>
          <Link href="/getting-started" style={{ textDecoration: 'none', color: '#374151' }}>Getting Started</Link>
          <Link href="/api-reference" style={{ textDecoration: 'none', color: '#374151' }}>API Reference</Link>
          <Link href="/webhooks" style={{ textDecoration: 'none', color: '#374151' }}>Webhooks</Link>
          <Link href="/keys" style={{ textDecoration: 'none', color: '#374151' }}>API Keys</Link>
          <Link href="/rate-limiting" style={{ textDecoration: 'none', color: '#374151' }}>Rate Limiting</Link>
          <Link href="/sandbox" style={{ textDecoration: 'none', color: '#374151' }}>Sandbox</Link>
          <Link href="/code-samples" style={{ textDecoration: 'none', color: '#374151' }}>Code Samples</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}