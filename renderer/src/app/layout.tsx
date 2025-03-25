import Head from "next/head";
import "./globals.css";

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
            {children}
        </body>
    </html>
  );
}