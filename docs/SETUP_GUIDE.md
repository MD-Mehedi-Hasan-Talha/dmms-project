# প্রজেক্ট সেটআপ গাইড

## 🚀 দ্রুত শুরু করার জন্য স্টেপ-বাই-স্টেপ গাইড

### ধাপ ১: প্রয়োজনীয় টুলস ইনস্টল করুন

#### Node.js ইনস্টলেশন

1. [Node.js অফিসিয়াল ওয়েবসাইট](https://nodejs.org/) থেকে LTS ভার্সন ডাউনলোড করুন
2. ইনস্টল করুন এবং ভেরিফাই করুন:

```powershell
node --version
npm --version
```

#### MongoDB ইনস্টলেশন

```powershell
# MongoDB Community Server ইনস্টল করুন অথবা
# MongoDB Atlas (cloud) ব্যবহার করুন
```

#### Git ইনস্টলেশন

```powershell
# Git for Windows ইনস্টল করুন
git --version
```

### ধাপ ২: প্রজেক্ট ফোল্ডার স্ট্রাকচার তৈরি

```
mess-management-system/
├── 📁 client/                    # Frontend React Application
├── 📁 server/                    # Backend Node.js Application
├── 📁 docs/                      # Project Documentation
├── 📁 assets/                    # Images, Icons, etc.
├── 📄 README.md                  # Main project documentation
├── 📄 .gitignore                 # Git ignore rules
└── 📄 package.json               # Root package.json for scripts
```

### ধাপ ৩: Frontend (React) সেটআপ

```powershell
# প্রজেক্ট রুট ডিরেক্টরিতে
npx create-react-app client
cd client

# প্রয়োজনীয় packages ইনস্টল
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install axios react-router-dom
npm install recharts # Charts জন্য
npm install date-fns # Date manipulation জন্য
```

### ধাপ ৪: Backend (Node.js/Express) সেটআপ

```powershell
# প্রজেক্ট রুট ডিরেক্টরিতে
mkdir server
cd server
npm init -y

# প্রয়োজনীয় packages ইনস্টল
npm install express mongoose bcryptjs jsonwebtoken
npm install cors dotenv multer
npm install express-validator
npm install --save-dev nodemon
```

### ধাপ ৫: প্রাথমিক ফাইল স্ট্রাকচার তৈরি

#### Server ফোল্ডার স্ট্রাকচার:

```
server/
├── 📁 controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── mealController.js
│   └── billController.js
├── 📁 models/
│   ├── User.js
│   ├── Meal.js
│   ├── Expense.js
│   └── Bill.js
├── 📁 routes/
│   ├── auth.js
│   ├── users.js
│   ├── meals.js
│   └── bills.js
├── 📁 middleware/
│   ├── auth.js
│   └── validation.js
├── 📁 config/
│   └── database.js
├── 📁 utils/
│   └── helpers.js
├── 📄 server.js
├── 📄 .env
└── 📄 package.json
```

#### Client ফোল্ডার স্ট্রাকচার:

```
client/src/
├── 📁 components/
│   ├── 📁 Auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── 📁 Dashboard/
│   │   ├── Dashboard.jsx
│   │   └── SummaryCards.jsx
│   ├── 📁 Members/
│   │   ├── MemberList.jsx
│   │   └── MemberForm.jsx
│   ├── 📁 Meals/
│   │   ├── MealEntry.jsx
│   │   └── MealHistory.jsx
│   ├── 📁 Finance/
│   │   ├── ExpenseEntry.jsx
│   │   └── BillCalculation.jsx
│   └── 📁 Common/
│       ├── Header.jsx
│       ├── Sidebar.jsx
│       └── Loading.jsx
├── 📁 pages/
│   ├── HomePage.jsx
│   ├── MembersPage.jsx
│   ├── MealsPage.jsx
│   └── FinancePage.jsx
├── 📁 services/
│   ├── api.js
│   ├── authService.js
│   └── dataService.js
├── 📁 hooks/
│   ├── useAuth.js
│   └── useApi.js
├── 📁 utils/
│   ├── constants.js
│   └── helpers.js
├── 📁 styles/
│   ├── globals.css
│   └── components.css
└── App.js
```

## 🛠️ প্রাথমিক কোড সেটআপ

### Backend: server.js

```javascript
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/meals", require("./routes/meals"));
app.use("/api/bills", require("./routes/bills"));

// Database connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/mess_management",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Frontend: App.js

```javascript
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import MembersPage from "./pages/MembersPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
```

## 📋 ডেভেলপমেন্ট চেকলিস্ট

### Week 1-2: Project Setup ✅

- [ ] Node.js & MongoDB ইনস্টল
- [ ] প্রজেক্ট ফোল্ডার স্ট্রাকচার তৈরি
- [ ] Frontend (React) প্রজেক্ট সেটআপ
- [ ] Backend (Express) প্রজেক্ট সেটআপ
- [ ] Git repository ইনিশিয়ালাইজ
- [ ] Basic project structure কমিট

### Week 3-4: Authentication System

- [ ] User model তৈরি
- [ ] Registration API endpoint
- [ ] Login API endpoint
- [ ] JWT token implementation
- [ ] Frontend login/register forms
- [ ] Protected routes

### Week 5-6: User Management

- [ ] User CRUD operations
- [ ] Profile management
- [ ] Role-based access control
- [ ] Member list with filters

### Week 7-8: Meal Management

- [ ] Meal entry system
- [ ] Daily menu management
- [ ] Guest meal tracking
- [ ] Meal history & reports

### Week 9-10: Financial Management

- [ ] Expense entry system
- [ ] Monthly bill calculation
- [ ] Payment tracking
- [ ] Due amount management

### Week 11-12: Reporting System

- [ ] Dashboard with summary
- [ ] Charts & graphs
- [ ] Report generation
- [ ] PDF export

### Week 13-14: Testing & Deployment

- [ ] Unit testing
- [ ] Integration testing
- [ ] Bug fixes
- [ ] Production deployment

## 🚀 ডেভেলপমেন্ট কমান্ডস

### Backend Development

```powershell
cd server
npm run dev          # Start development server with nodemon
npm start           # Start production server
npm test            # Run tests
```

### Frontend Development

```powershell
cd client
npm start           # Start development server
npm run build       # Build for production
npm test            # Run tests
```

### Full Stack Development

```powershell
# Root directory থেকে (concurrent package দিয়ে)
npm run dev         # Start both frontend and backend
npm run build       # Build both projects
```

## 🔍 ডিবাগিং টিপস

### Common Issues:

1. **CORS Error**: Backend এ cors middleware যোগ করুন
2. **MongoDB Connection**: .env ফাইলে সঠিক URI দিন
3. **Port Conflicts**: Different ports ব্যবহার করুন (Frontend: 3000, Backend: 5000)

### Development Tools:

- **VS Code Extensions**: ES7+ React/Redux/React-Native snippets, Prettier, ESLint
- **Chrome Extensions**: React Developer Tools, Redux DevTools
- **Postman**: API testing

## 📚 Learning Resources

### React.js

- [Official React Documentation](https://reactjs.org/docs/)
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)

### Node.js/Express

- [Express.js Guide](https://expressjs.com/en/guide/)
- [MongoDB with Mongoose](https://mongoosejs.com/docs/guide.html)

### Material-UI

- [MUI Component Documentation](https://mui.com/material-ui/getting-started/overview/)

---

এই গাইড অনুসরণ করে আপনি সহজেই আপনার মেস ম্যানেজমেন্ট সিস্টেম প্রজেক্ট শুরু করতে পারবেন। প্রতিটি ধাপ সম্পন্ন করার পর পরবর্তী ধাপে এগিয়ে যান।
