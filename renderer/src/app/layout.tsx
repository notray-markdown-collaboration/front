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
      </Head>
      <body>
        <BodyThemeProvider />
        {children}
      </body>
    </html>
  );
}
