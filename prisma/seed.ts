import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  await prisma.user.createMany({
    data: [
      {
        name: "fake",
        email: "fake@email.com",
        password: "password",
      },
      {
        name: "fake1",
        email: "fake1@email.com",
        password: "password1",
      },
      {
        name: "fake2",
        email: "fake2@email.com",
        password: "password2",
      },
    ],
  });
}

seed().then(() => prisma.$disconnect());
