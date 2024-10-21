import { prisma } from "@/lib/prisma";

export async function POST() {
  const lastCategory = await prisma.conjugationCategory.findFirst({
    orderBy: {
      id: "desc",
    },
  });
  const lastCategoryId = lastCategory?.id || 0
  const res = await prisma.conjugationCategory.create({
    data: {
      slug: `${lastCategoryId+1}`,
    },
    include: {
      conjugation: true,
    },
  });
  return Response.json(res);
}
