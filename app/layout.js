import { ClerkProvider } from "@clerk/nextjs";
import Nav from "./(components)/Nav";
import "./globals.css";

export const metadata = {
  title: "Project Management Board",
  description: "Keep Track of Your Projects Progress",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Nav />
          <div>{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
