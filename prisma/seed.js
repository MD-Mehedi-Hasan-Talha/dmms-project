const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function getLocalizedDayNames(dateObject) {
  const dayNameEn = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: "UTC",
  }).format(dateObject);
  const dayNameBn = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    timeZone: "UTC",
  }).format(dateObject);
  return { dayNameEn, dayNameBn };
}

async function main() {
  console.log("Start seeding...");

  // Clear existing data (optional, for development)
  await prisma.dailyMenu.deleteMany({});
  console.log("Cleared existing DailyMenu data.");

  const dailyMenus = [
    {
      date: new Date("2024-07-20T00:00:00.000Z"),
      breakfast: ["Paratha", "Egg Omelette", "Tea"],
      lunch: ["Rice", "Chicken Curry", "Dal", "Vegetable Mix"],
      dinner: ["Rice", "Fish Fry", "Dal", "Spinach"],
      notes: "Weekend special menu",
    },
    {
      date: new Date("2024-07-21T00:00:00.000Z"),
      breakfast: ["Bread", "Butter", "Coffee"],
      lunch: ["Biryani", "Raita"],
      dinner: ["Roti", "Paneer Butter Masala"],
      notes: "Sunday special biryani",
    },
    {
      date: new Date("2024-07-22T00:00:00.000Z"),
      breakfast: ["Idli", "Sambar", "Chutney"],
      lunch: ["Rice", "Sambar", "Papad", "Vegetable Curry"],
      dinner: ["Dosa", "Sambar", "Chutney"],
      notes: "South Indian Monday",
    },
  ];

  for (const menu of dailyMenus) {
    const menuDate = new Date(menu.date);
    const { dayNameEn, dayNameBn } = getLocalizedDayNames(menuDate);
    await prisma.dailyMenu.create({
      data: {
        ...menu,
        date: menuDate,
        dayNameEn,
        dayNameBn,
        deletedAt: null,
      },
    });
  }
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
