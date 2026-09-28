// The site itself is the static page public/field-kit.html (served at "/" by a
// rewrite in next.config.ts). This layout wraps the access code page and the
// built-in 404 page.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
