const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Clearing database...");
  try {
    await prisma.dailyMenu.deleteMany({});
    await prisma.mealEntry.deleteMany({});
    await prisma.messMonth.deleteMany({});
    await prisma.messMember.deleteMany({});
    await prisma.mess.deleteMany({});
    await prisma.feedback.deleteMany({});
    await prisma.noticeBoard.deleteMany({});
    await prisma.user.deleteMany({});
  } catch (error) {
    console.error("Error clearing database data:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
