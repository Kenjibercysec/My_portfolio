import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Silas Portfolio | Cybersecurity & Development',
  description: 'Portfolio showcasing my skills in cybersecurity, development, and various technical domains.',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
