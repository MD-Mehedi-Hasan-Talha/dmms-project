import "./globals.css";

export const metadata = {
  title: "Meal Management System",
  description:
    "An efficient and modern solution for managing meals in messes, hostels, and residential areas. Streamline meal planning, ordering, and billing with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
