import "./globals.css";
import BodyThemeProvider from "./_provider/BodyThemeProvider";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Providers } from "./provider";
import type { Metadata } from "next";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "notary",
  // CSP 정책 등 다른 메타 태그도 여기에 추가할 수 있습니다.
  // 단, CSP는 next.config.js에서 설정하는 것이 더 권장됩니다.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <BodyThemeProvider > 
            {children}
          </BodyThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
