export const metadata = {
  title: "English Academy",
  description: "Learn English online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}