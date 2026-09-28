// The site itself is the static page public/field-kit.html (served at "/" by a
// rewrite in next.config.ts). This layout only exists because Next.js needs an
// app directory; it wraps the built-in 404 page.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
