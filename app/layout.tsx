import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Crestovix Studio | Custom Web Development & No-Code Solutions',
    template: '%s | Crestovix Studio'
  },
  description: 'Crafting exceptional digital experiences through custom web development, no-code solutions, and brand identity design. Transform your digital presence with Crestovix Studio.',
  keywords: [
    'web development',
    'no-code development', 
    'custom websites',
    'React development',
    'Next.js development',
    'Webflow development',
    'Wix development',
    'UI/UX design',
    'brand identity',
    'web design',
    'frontend development',
    'full-stack development',
    'Kerala web development',
    'India web agency',
    'responsive web design',
    'e-commerce development',
    'website redesign',
    'digital agency'
  ],
  authors: [
    { 
      name: 'Crestovix Studio',
      url: 'https://crestovix.com' 
    }
  ],
  creator: 'Crestovix Studio',
  publisher: 'Crestovix Studio',
  formatDetection: {
    email: true,
    address: false,
    telephone: true,
  },
  metadataBase: new URL('https://crestovix.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-IN': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://crestovix.com',
    siteName: 'Crestovix Studio',
    title: 'Crestovix Studio | Custom Web Development & No-Code Solutions',
    description: 'Crafting exceptional digital experiences through custom web development, no-code solutions, and brand identity design.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Crestovix Studio - Digital Excellence in Web Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crestovix Studio | Custom Web Development & No-Code Solutions',
    description: 'Crafting exceptional digital experiences through custom web development, no-code solutions, and brand identity design.',
    creator: '@crestovix',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-search-console-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
    // other: {
    //   me: ['your-email@crestovix.com'],
    // },
  },
  category: 'technology',
  classification: 'Web Development & Design Services',
  abstract: 'Premium web development and branding agency specializing in custom coding and no-code solutions for businesses worldwide.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme Color for Mobile Browsers */}
        <meta name="theme-color" content="#1e293b" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#6366f1" media="(prefers-color-scheme: light)" />
        
        {/* Additional Meta Tags for Better SEO */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        
        {/* Geo and Business Information */}
        <meta name="geo.region" content="IN-KL" />
        <meta name="geo.placename" content="Malappuram, Kerala, India" />
        <meta name="geo.position" content="11.050976;76.071096" />
        <meta name="ICBM" content="11.050976, 76.071096" />
        
        {/* Business Contact Information */}
        <meta name="twitter:label1" content="Email" />
        <meta name="twitter:data1" content="crestovixstudio@gmail.com" />
        <meta name="twitter:label2" content="Location" />
        <meta name="twitter:data2" content="Kerala, India" />
        
        {/* Structured Data for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Crestovix Studio",
              "description": "Crafting exceptional digital experiences through custom web development, no-code solutions, and brand identity design.",
              "url": "https://crestovix.com",
              "logo": "https://crestovix.com/logo.png",
              "telephone": "+91-7907456218",
              "email": "crestovixstudio@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Munduparamb",
                "addressLocality": "Malappuram",
                "addressRegion": "Kerala",
                "postalCode": "676509",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "11.050976",
                "longitude": "76.071096"
              },
              "openingHours": "Mo-Fr 09:00-18:00",
              "serviceType": [
                "Web Development",
                "UI/UX Design", 
                "No-Code Development",
                "Brand Identity Design",
                "Digital Marketing"
              ],
              "areaServed": ["IN", "Worldwide"],
              "sameAs": [
                "https://twitter.com/crestovix",
                "https://instagram.com/crestovix",
                "https://linkedin.com/company/crestovix",
                "https://github.com/crestovix"
              ]
            })
          }}
        />
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Crestovix Studio",
              "alternateName": "Crestovix",
              "url": "https://crestovix.com",
              "logo": "https://crestovix.com/logo.png",
              "description": "Premium web development and design studio specializing in custom and no-code solutions.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Malappuram",
                "addressRegion": "Kerala",
                "addressCountry": "India"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-7907456218",
                "contactType": "customer service",
                "email": "crestovixstudio@gmail.com",
                "areaServed": "IN",
                "availableLanguage": ["en", "malayalam"]
              },
              "sameAs": [
                "https://twitter.com/crestovix",
                "https://instagram.com/crestovix",
                "https://linkedin.com/company/crestovix"
              ]
            })
          }}
        />
      </head>
      <body className={`${poppins.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}