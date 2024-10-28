import localFont from "next/font/local";
import '@/app/styles/globals.css'
import { Providers } from "../providers";
import SiteNavbar from "@/_components/SiteNavbar";
import SiteFooter from "@/_components/footer/SiteFooter";
import ClientLayout from "@/_components/Home/ClientLayout";

export const metadata = {
  title: "Vinifera",
  description: "Vinifera Tours and Travels",
  icons: "/Vinifera.svg",
  other: {
    "facebook-domain-verification": "0cr9z5v0grizm39hs7fftxf0qvw66i"
  },
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
