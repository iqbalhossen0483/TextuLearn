import Footer from "@/components/common/Footer"; // Import Footer
import NavBar from "@/components/common/NavBar";
import "./globals.css";

export const metadata = {
  title: "TextuLearn",
  description: "AI-Powered Learning and Writing Assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='flex flex-col min-h-screen'>
        <NavBar />
        <main className='flex-grow'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
