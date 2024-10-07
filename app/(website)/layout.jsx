import localFont from "next/font/local";
import '@/app/styles/globals.css'
import { Providers } from "../providers";
import SiteNavbar from "@/_components/SiteNavbar";
import SiteFooter from "@/_components/footer/SiteFooter";
import ClientLayout from "@/_components/Home/ClientLayout";

export const metadata = {
  title: "Vinifera",
  description: "Vinifera",
  icons: "/Vinifera.svg"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ClientLayout>
            <SiteNavbar />
            {children}
            <SiteFooter />
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
