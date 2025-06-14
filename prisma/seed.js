const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

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
  // Clear existing data (optional, for development)
  await prisma.dailyMenu.deleteMany({});
  await prisma.messMonth.deleteMany({});
  await prisma.messMember.deleteMany({});
  await prisma.mess.deleteMany({});
  await prisma.mealEntry.deleteMany({});
  await prisma.feedback.deleteMany({});
  await prisma.user.deleteMany({});
  console.log("Cleared existing data.");

  // Seed User data
  const hashedPassword = await bcrypt.hash("password123", 10);
  await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
      phone: "1234567890",
      bio: "A test user account.",
      emergencyContact: "0987654321",
      dateOfBirth: new Date("1990-01-01T00:00:00.000Z"),
      bloodGroup: "A+",
      nidNumber: "12345678901234567",
      profession: "Software Engineer",
      address: "123 Test St, Test City",
      activeStatus: true,
      role: "admin",
    },
  });
  console.log("Seeded a test user.");

  // Seed Feedback data
  await prisma.feedback.createMany({
    data: [
      {
        userId: (await prisma.user.findFirst()).id,
        subject: "Website Navigation Issue",
        message:
          "The navigation bar is not intuitive, I struggled to find the settings page.",
        type: "BUG",
        status: "PENDING",
        isAnonymous: false,
      },
      {
        subject: "Feature Request: Dark Mode",
        message:
          "It would be great to have a dark mode option for better readability at night.",
        type: "FEATURE_REQUEST",
        status: "PENDING",
        isAnonymous: true,
      },
      {
        userId: (await prisma.user.findFirst()).id,
        subject: "General Appreciation",
        message: "I love the new updates! The UI is much cleaner and faster.",
        type: "COMPLAINT",
        status: "RESOLVED",
        adminNotes: "Thank you for your kind words!",
        isAnonymous: false,
      },
    ],
  });
  console.log("Seeded sample feedback data.");

  // Seed MealEntry data
  // Seed Meal data
  const testUser = await prisma.user.findUnique({
    where: { email: "test@example.com" },
  });
  if (testUser) {
    // Seed MealEntry data
    await prisma.mealEntry.createMany({
      data: [
        {
          userId: testUser.id,
          date: new Date("2024-05-01T00:00:00.000Z"),
          breakfastStatus: true,
          lunchStatus: true,
          dinnerStatus: false,
          guestCount: 0,
          status: "completed",
        },
        {
          userId: testUser.id,
          date: new Date("2024-05-02T00:00:00.000Z"),
          breakfastStatus: false,
          lunchStatus: true,
          dinnerStatus: true,
          guestCount: 1,
          status: "completed",
        },
      ],
    });
    console.log("Seeded meal entry data.");

    // Seed Mess data
    const newMess = await prisma.mess.create({
      data: {
        name: "Test Mess",
        description: "A mess for testing purposes",
      },
    });
    console.log("Seeded mess data.");

    // Seed MessMember data
    await prisma.messMember.createMany({
      data: [
        {
          messId: newMess.id,
          userId: testUser.id,
          role: "ADMIN",
        },
      ],
    });
    console.log("Seeded mess member data.");

    // Seed MessMonth data
    await prisma.messMonth.createMany({
      data: [
        {
          messId: newMess.id,
          month: new Date("2024-06-01T00:00:00.000Z"),
          mealManagerId: testUser.id,
        },
      ],
    });
    console.log("Seeded mess month data.");
  } else {
    console.log(
      "Test user not found, skipping meal, meal entry, mess, mess member, and mess month seeding."
    );
  }

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

  const messMonth = await prisma.messMonth.findFirst({
    where: { messId: newMess.id },
  });

  if (messMonth) {
    for (const menu of dailyMenus) {
      const menuDate = new Date(menu.date);
      const { dayNameEn, dayNameBn } = getLocalizedDayNames(menuDate);
      await prisma.dailyMenu.create({
        data: {
          ...menu,
          date: menuDate,
          dayNameEn,
          dayNameBn,
          messId: newMess.id,
          monthId: messMonth.id,
          deletedAt: null,
        },
      });
    }
    console.log("Seeded daily menu data.");
  } else {
    console.log("MessMonth not found, skipping daily menu seeding.");
  }
  console.log("Seeding finished.");

  // Disconnect Prisma client
  await prisma.$disconnect();
  console.log("Prisma client disconnected.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
