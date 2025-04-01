import Head from "next/head";
import "./globals.css";
import BodyThemeProvider from "./_provider/BodyThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <Head>
        <title>notary</title>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';"
        />
      </Head>
      <body>
        <BodyThemeProvider />
        {children}
      </body>
    </html>
  );
}
