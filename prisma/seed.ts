import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  await prisma.user.createMany({
    data: [
      {
        name: "fake",
        email: "fake@email.com",
        password: "password",
        age: 18,
        isMarried: false,
        nationality: "Canadian",
      },
      {
        name: "fake1",
        email: "fake1@email.com",
        password: "password1",
        age: 28,
        isMarried: true,
        nationality: "American",
      },
      {
        name: "fake2",
        email: "fake2@email.com",
        password: "password2",
        age: 30,
        isMarried: false,
        nationality: "Brazilian",
      },
    ],
  });
}

seed().then(() => prisma.$disconnect());
