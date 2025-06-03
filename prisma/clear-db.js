const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Clearing database...");
  try {
    await prisma.dailyMenu.deleteMany({});
    console.log("All DailyMenu data cleared successfully.");
  } catch (error) {
    console.error("Error clearing DailyMenu data:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
