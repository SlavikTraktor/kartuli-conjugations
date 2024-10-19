import "../globals.css";
import { Search } from "@/components/Search";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Search />
      {children}
    </div>
  );
}
