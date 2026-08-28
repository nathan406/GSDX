import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "GSDX — Global Sustainable Development Exchange",
  description:
    "A global development and capital-mobilization platform connecting developing countries with development finance, private investment, businesses, and citizens.",
  other: {
    "netlify-banners": "none",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-body">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
