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
  await prisma.mealEntry.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.noticeBoard.deleteMany({});
  await prisma.feedback.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.messMonth.deleteMany({});
  await prisma.messMember.deleteMany({});
  await prisma.mess.deleteMany({});
  await prisma.user.deleteMany({});
  console.log("Cleared existing data.");

  // Seed User data
  const hashedPassword = await bcrypt.hash("password123", 10);

  const adminUser = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      phone: "1111111111",
      bio: "An admin user account.",
      role: "admin",
    },
  });

  const subAdminUser = await prisma.user.create({
    data: {
      name: "SubAdmin User",
      email: "subadmin@example.com",
      password: hashedPassword,
      phone: "2222222222",
      bio: "A sub-admin user account.",
      role: "subadmin",
    },
  });

  const memberUser = await prisma.user.create({
    data: {
      name: "Member User",
      email: "member@example.com",
      password: hashedPassword,
      phone: "3333333333",
      bio: "A regular member account.",
      role: "member",
    },
  });

  const messManagerUser = await prisma.user.create({
    data: {
      name: "Mess Manager User",
      email: "manager@example.com",
      password: hashedPassword,
      phone: "4444444444",
      bio: "A member who is also a mess manager.",
      role: "member",
    },
  });
  console.log("Seeded multiple users with different roles.");

  // Seed Feedback data
  await prisma.feedback.createMany({
    data: [
      {
        userId: memberUser.id,
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
        userId: adminUser.id,
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
  const adminMessMember = await prisma.messMember.create({
    data: {
      messId: newMess.id,
      userId: adminUser.id,
      role: "ADMIN",
    },
  });

  const subAdminMessMember = await prisma.messMember.create({
    data: {
      messId: newMess.id,
      userId: subAdminUser.id,
      role: "SUB_ADMIN",
    },
  });

  const memberMessMember = await prisma.messMember.create({
    data: {
      messId: newMess.id,
      userId: memberUser.id,
      role: "MEMBER",
    },
  });

  const messManagerMessMember = await prisma.messMember.create({
    data: {
      messId: newMess.id,
      userId: messManagerUser.id,
      role: "MEMBER",
    },
  });
  console.log("Seeded mess member data for all users.");

  console.log("memberMessMember.id:", memberMessMember.id);
  console.log("messManagerMessMember.id:", messManagerMessMember.id);

  // Seed MealEntry data
  await prisma.mealEntry.createMany({
    data: [
      {
        memberId: memberMessMember.id,
        messId: newMess.id,
        date: new Date("2024-05-01T00:00:00.000Z"),
        breakfastStatus: 1,
        lunchStatus: 1,
        dinnerStatus: 0,
        guestCount: 0,
        status: "FULL",
      },
      {
        memberId: messManagerMessMember.id,
        messId: newMess.id,
        date: new Date("2024-05-02T00:00:00.000Z"),
        breakfastStatus: 0,
        lunchStatus: 1,
        dinnerStatus: 1,
        guestCount: 1,
        status: "FULL",
      },
    ],
  });
  console.log("Seeded meal entry data.");

  // Seed MessMonth data
  const messMonth = await prisma.messMonth.create({
    data: {
      messId: newMess.id,
      month: new Date("2024-06-01T00:00:00.000Z"),
      mealManagerId: messManagerUser.id,
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

  // Seed Notification data
  await prisma.notification.createMany({
    data: [
      {
        userId: adminUser.id,
        type: "MESS",
        title: "Welcome Admin!",
        message: "You have been added as an admin to the system.",
        link: "/dashboard",
        read: false,
      },
      {
        userId: subAdminUser.id,
        type: "MESS",
        title: "Welcome Sub-Admin!",
        message: "You have been added as a sub-admin to the system.",
        link: "/dashboard",
        read: false,
      },
      {
        userId: memberUser.id,
        type: "MESS",
        title: "Welcome Member!",
        message: "You have joined the mess as a member.",
        link: "/dashboard",
        read: false,
      },
      {
        userId: messManagerUser.id,
        type: "MESS",
        title: "Welcome Mess Manager!",
        message: "You have been assigned as the mess manager.",
        link: "/dashboard",
        read: false,
      },
      {
        userId: adminUser.id,
        type: "MESS",
        title: "Welcome to DMMS!",
        message: "Explore the new features and manage your mess efficiently.",
        link: "/dashboard",
        read: false,
      },
      {
        userId: memberUser.id,
        type: "MESS",
        title: "Upcoming Bill Due",
        message: "Your monthly mess bill is due on July 31st.",
        link: "/bills",
        read: false,
      },
      {
        userId: memberUser.id,
        type: "EVENT",
        title: "Mess Cleaning Drive",
        message: "Join us for a mess cleaning drive this Saturday.",
        link: "/events",
        read: true,
      },
    ],
  });
  console.log("Seeded sample notification data.");

  // Seed Event data
  await prisma.event.createMany({
    data: [
      {
        messId: newMess.id,
        title: "Monthly Mess Meeting",
        // titleBn: "মাসিক মেস মিটিং",
        description: "Discussion about next month's menu and expenses.",
        // descriptionBn: "পরবর্তী মাসের মেনু এবং খরচ নিয়ে আলোচনা।",
        date: new Date("2024-08-10T18:00:00Z"),
        time: "6:00 PM",
        location: "Mess Common Room",
      },
      {
        messId: newMess.id,
        title: "Sports Day",
        // titleBn: "ক্রীড়া দিবস",
        description: "Annual sports event for all mess members.",
        // descriptionBn: "সকল মেস সদস্যদের জন্য বার্ষিক ক্রীড়া প্রতিযোগিতা।",
        date: new Date("2024-09-01T09:00:00Z"),
        time: "9:00 AM",
        location: "Local Park",
      },
    ],
  });
  console.log("Seeded sample event data.");

  // Seed NoticeBoard data
  await prisma.noticeBoard.createMany({
    data: [
      {
        title: "Important Mess Meeting",
        description:
          "There will be an important meeting to discuss monthly expenses and new rules.",
        creator_role: "ADMIN",
        creator_id: adminUser.id,
        expiry_date: new Date("2024-08-15T00:00:00.000Z"),
        label: "Meeting",
        type: "GENERAL",
      },
      {
        title: "Maintenance Work Notice",
        description:
          "The water supply will be interrupted on Saturday from 10 AM to 2 PM due to maintenance work.",
        creator_role: "ADMIN",
        creator_id: adminUser.id,
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
