import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const userRole = await prisma.role.upsert({
    where: { code: "user" },
    update: {},
    create: { code: "user" },
  });

  const adminRole = await prisma.role.upsert({
    where: { code: "admin" },
    update: {},
    create: { code: "admin" },
  });

  const hashedPassword = await bcrypt.hash("Admin123", 10);

  const adminUser = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedPassword,
      isAdmin: true,
      roles: {
        create: [{ roleId: userRole.id }],
      },
    },
  });

  console.log(
    "The admin user has been created with the role 'admin' and password 'Admin123'"
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
