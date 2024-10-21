
import { prisma } from "@/lib/prisma";

export async function POST() {

  const res = await prisma.word.create({
    include: {
      conjugations: true,
    },
  });

  return Response.json(res);
}
