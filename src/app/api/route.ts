import { prisma } from "@/lib/prisma";

export async function POST() {
  const res = await prisma.test.findMany()

  return Response.json(res);
}
