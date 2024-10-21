import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const res = await prisma.word.findFirst({
    where: {
      id: +params.id,
    },
    include: {
      conjugations: {
        include: {
          translations: true,
        },
      },
    },
  });

  return Response.json(res);
}
