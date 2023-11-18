import "./globals.css";

export const metadata = {
  title: "FreshFlow",
  description: "Optimizing agriculture: our platform streamlines supply chains with real-time monitoring, marketplace access, and logistics integration.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex h-full w-full flex-col items-center justify-center bg-white">
        {children}
      </body>
    </html>
  );
}
