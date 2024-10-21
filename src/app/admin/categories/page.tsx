import { Categories as CategoriesList } from "@/components/admin/Categories";
import { prisma } from "@/lib/prisma";

export default async function Categories() {
  const categories = await prisma.conjugationCategory.findMany({
    include: {
      conjugation: true,
    },
    orderBy: {
      id: "asc",
    },
  });
  return (
    <main>
      <div className="p-4">Categories</div>

      <CategoriesList categories={categories} />
    </main>
  );
}
