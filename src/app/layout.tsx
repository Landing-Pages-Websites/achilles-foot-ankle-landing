import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Richmond Podiatrist | Achilles Foot and Ankle Center — Same-Day Appointments",
  description:
    "Board-certified podiatrists in Richmond, VA. Same-day appointments at our Mechanicsville and West End offices for heel pain, ingrown toenails, diabetic foot care, plantar fasciitis and more. Call (804) 273-1717.",
  openGraph: {
    title: "Richmond Podiatrist | Achilles Foot and Ankle Center",
    description:
      "Same-day podiatry appointments in Richmond. Two locations — Mechanicsville and West End. Board-certified foot and ankle specialists.",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Registered 2026-05-19 via `mega site-tracking enable`.
  const SITE_ID = "2e19f854-ef19-49fe-b220-4a55e63fe384";
  const SITE_KEY = "q0jvilg761pce0db";
  // Customer's own GTM (per Atlas task comment 2026-05-19).
  const CUSTOMER_GTM_ID = "GTM-K22KLGK";

  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <meta name="mega-site-id" content={SITE_ID} />
        {/* MegaTag config — set BEFORE optimizer loads */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.MEGA_TAG_CONFIG={siteKey:"${SITE_KEY}",siteId:"${SITE_ID}",gtmId:"${CUSTOMER_GTM_ID}"};window.dataLayer=window.dataLayer||[];`,
          }}
        />
        <script
          id="optimizer-script"
          src="https://cdn.gomega.ai/scripts/optimizer.min.js"
          data-site-id={SITE_ID}
          async
        />
        {/* Customer GTM — optimizer reads from MEGA_TAG_CONFIG.gtmId, but we ALSO
            load it manually so non-optimizer pageviews still flow into GTM. */}
        <Script
          id="customer-gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${CUSTOMER_GTM_ID}');`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white">
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${CUSTOMER_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        {/* CTM tracking — Universal Mega CallTrackingMetrics */}
        <Script
          src="https://572388.tctm.co/t.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
