import PageShell from "@/components/layout/PageShell";
import "./globals.css";

export const metadata = {
  title: "TextuLearn",
  description: "AI-Powered Learning and Writing Assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='flex flex-col min-h-screen'>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
