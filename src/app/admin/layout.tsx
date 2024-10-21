
import Link from "next/link";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="pl-4 flex gap-4">
        <Link href="/admin/categories">Categories</Link>
        <Link href="/admin/word">Words</Link>
      </div>
      {children}
    </div>
  );
}
