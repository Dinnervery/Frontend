import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "dinnervery",
  description: "오늘 저녁, 가볍게.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}