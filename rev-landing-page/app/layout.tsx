import type { Metadata } from "next";
import Script from "next/script";
import { Sora, Handlee, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sora",
});

const handlee = Handlee({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-handlee",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-poppins",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rev-design-agency.com"),
  title: "Rev Design Agency | Premium Website Design & UI/UX — Cairo, Egypt",
  description: "Rev Design Agency builds high-end websites and digital experiences in Cairo. From strategic UI/UX design to full development, we help MENA businesses turn visitors into customers.",
  openGraph: {
    title: "Rev Design Agency | Premium Website Design & UI/UX",
    description: "Helping businesses across Egypt and MENA turn visitors into customers.",
    url: "https://rev-design-agency.com",
    siteName: "Rev Design Agency",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rev Design Agency - Premium Web Design",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rev Design Agency | Premium Website Design & UI/UX",
    description: "Helping businesses across Egypt and MENA turn visitors into customers.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external origins used by images and media */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://res.cloudinary.com" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Rev Design Agency",
          "description": "Cairo-based web design agency building custom websites for businesses across the MENA region.",
          "url": "https://revdesign.agency",
          "foundingLocation": { "@type": "Place", "name": "Cairo, Egypt" },
          "areaServed": "MENA",
          "founder": { "@type": "Person", "name": "Youssef", "jobTitle": "Founder & Lead Designer" },
          "serviceType": ["Web Design", "Web Development", "Shopify Store Setup"]
        })}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How much does a website cost?", "acceptedAnswer": { "@type": "Answer", "text": "Custom websites at Rev start from 15,000 EGP. The final price depends on scope, number of pages, and whether development is included. We always discuss budget in the first call — no surprises, no hidden fees. We also offer Shopify builds at a lower price point for businesses that are just starting out." }},
            { "@type": "Question", "name": "How long does it take?", "acceptedAnswer": { "@type": "Answer", "text": "A standard custom website takes 3 to 6 weeks from kickoff to delivery. The timeline depends on scope and how quickly feedback rounds move. We agree on a schedule upfront and keep to it." }},
            { "@type": "Question", "name": "Do you use templates?", "acceptedAnswer": { "@type": "Answer", "text": "Never. Every website at Rev is designed from scratch in Figma, specific to your brand and your audience. Off-the-shelf templates are built for everyone — which means they fit no one particularly well." }},
            { "@type": "Question", "name": "Who will I be working with?", "acceptedAnswer": { "@type": "Answer", "text": "You work directly with Youssef, Rev's founder and lead designer. No handoffs to junior designers, no account managers in between. You get the same person from the first call to the final delivery." }},
            { "@type": "Question", "name": "What happens after launch?", "acceptedAnswer": { "@type": "Answer", "text": "We deliver the final Figma design file and the live website. We're available after launch for questions and minor adjustments. Need ongoing support? Ask us about retainer options." }}
          ]
        })}} />
      </head>
      <body className={`antialiased ${sora.variable} ${handlee.variable} ${poppins.variable} ${jetbrainsMono.variable}`}>
        {children}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JF8LZLVDG9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = function(){window.dataLayer.push(arguments);};
            window.gtag('js', new Date());
            window.gtag('config', 'G-JF8LZLVDG9');
          `}
        </Script>

        {/* Meta Pixel — lazyOnload defers until browser is idle, after all critical JS */}
        <Script id="meta-pixel" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '951781714024245');
            fbq('track', 'PageView');
          `}
        </Script>
      </body>
    </html>
  );
}
