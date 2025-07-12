import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تسجيل الدخول | جامعة الريادة",
  description: "صفحة تسجيل الدخول لموقع جامعة الريادة",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
} 