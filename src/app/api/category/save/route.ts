import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const categories = await request.json();

  for (let i = 0; i < categories.length; i++) {
    await prisma.conjugationCategory.update({
      where: {
        id: categories[i].id,
      },
      data: {
        slug: categories[i].slug,
      },
    });
  }
  return Response.json({ success: true });
}
