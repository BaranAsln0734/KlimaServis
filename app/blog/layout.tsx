import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teknik Bilgi Bankası & Blog | Akan Enerji Jeneratör ve Güç Sistemleri",
  description: "Jeneratör arızaları, dizel yakıt tüketimleri, periyodik jeneratör bakımı ve kVA hesaplaması hakkında teknik makaleler.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
