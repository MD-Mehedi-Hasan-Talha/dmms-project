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
  await prisma.dailyMenu.deleteMany({});
  await prisma.messMonth.deleteMany({});
  await prisma.messMember.deleteMany({});
  await prisma.mess.deleteMany({});
  await prisma.mealEntry.deleteMany({});
  await prisma.feedback.deleteMany({});
  await prisma.noticeBoard.deleteMany({}); // Add this line
  await prisma.user.deleteMany({});
  console.log("Cleared existing data.");

  // Seed User data
  const hashedPassword = await bcrypt.hash("password123", 10);
  const testUser = await prisma.user.create({
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
        userId: testUser.id,
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
        userId: testUser.id,
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

  // Seed Mess data
  const newMess = await prisma.mess.create({
    data: {
      name: "Test Mess",
      description: "A mess for testing purposes",
    },
  });
  console.log("Seeded mess data.");

  // Seed MessMember data
  let testMessMember = null;
  if (testUser) {
    testMessMember = await prisma.messMember.create({
      data: {
        messId: newMess.id,
        userId: testUser.id,
        role: "ADMIN",
      },
    });
    console.log("Seeded mess member data.");
  } else {
    console.log("Test user not found, skipping mess member seeding.");
  }

  // Seed MealEntry data
  if (testMessMember) {
    await prisma.mealEntry.createMany({
      data: [
        {
          memberId: testMessMember.id,
          messId: newMess.id,
          date: new Date("2024-05-01T00:00:00.000Z"),
          breakfastStatus: 1,
          lunchStatus: 1,
          dinnerStatus: 0,
          guestCount: 0,
          status: "completed",
        },
        {
          memberId: testMessMember.id,
          messId: newMess.id,
          date: new Date("2024-05-02T00:00:00.000Z"),
          breakfastStatus: 0,
          lunchStatus: 1,
          dinnerStatus: 1,
          guestCount: 1,
          status: "completed",
        },
      ],
    });
    console.log("Seeded meal entry data.");
  } else {
    console.log("Test mess member not found, skipping meal entry seeding.");
  }

  // Seed MessMonth data
  const messMonth = await prisma.messMonth.create({
    data: {
      messId: newMess.id,
      month: new Date("2024-06-01T00:00:00.000Z"),
      mealManagerId: testUser.id,
    },
  });
  console.log("Seeded mess month data.");

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

  // Seed NoticeBoard data
  await prisma.noticeBoard.createMany({
    data: [
      {
        title: "Important Mess Meeting",
        description:
          "There will be an important meeting to discuss monthly expenses and new rules.",
        creator_role: "ADMIN",
        creator_id: testUser.id,
        expiry_date: new Date("2024-08-15T00:00:00.000Z"),
        label: "Meeting",
        type: "GENERAL",
      },
      {
        title: "Maintenance Work Notice",
        description:
          "The water supply will be interrupted on Saturday from 10 AM to 2 PM due to maintenance work.",
        creator_role: "ADMIN",
        creator_id: testUser.id,
        expiry_date: new Date("2024-07-30T00:00:00.000Z"),
        label: "Maintenance",
        type: "URGENT",
      },
    ],
  });
  console.log("Seeded notice board data.");

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
