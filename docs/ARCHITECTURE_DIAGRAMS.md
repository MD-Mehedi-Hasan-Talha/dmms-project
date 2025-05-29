# প্রজেক্ট আর্কিটেকচার ও ডায়াগ্রাম

## 🏗️ সিস্টেম আর্কিটেকচার

### Overall System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        DMMS System Architecture                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    ┌─────────────────┐    ┌─────────────────┐ │
│  │   Frontend  │    │     Backend     │    │    Database     │ │
│  │   (React)   │◄──►│   (Node.js)     │◄──►│   (MongoDB)     │ │
│  │             │    │                 │    │                 │ │
│  │ ┌─────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │ │
│  │ │Dashboard│ │    │ │ Express API │ │    │ │Collections: │ │ │
│  │ │Members  │ │    │ │Controllers  │ │    │ │• Users      │ │ │
│  │ │Meals    │ │    │ │Middleware   │ │    │ │• Meals      │ │ │
│  │ │Finance  │ │    │ │Routes       │ │    │ │• Expenses   │ │ │
│  │ │Reports  │ │    │ │Models       │ │    │ │• Bills      │ │ │
│  │ └─────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │ │
│  └─────────────┘    └─────────────────┘    └─────────────────┘ │
│                                                                 │
│         ▲                       ▲                       ▲       │
│         │                       │                       │       │
│    HTTP Requests            REST API               MongoDB        │
│    (Axios/Fetch)           (JSON Data)            Queries        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 User Flow Diagrams

### 1. User Authentication Flow

```mermaid
graph TD
    A[ব্যবহারকারী সাইটে আসে] --> B{নিবন্ধিত?}
    B -->|হ্যাঁ| C[লগইন পেজ]
    B -->|না| D[রেজিস্ট্রেশন পেজ]

    C --> E[ইমেইল ও পাসওয়ার্ড দেয়]
    E --> F{তথ্য সঠিক?}
    F -->|হ্যাঁ| G[JWT Token জেনারেট]
    F -->|না| H[Error Message]
    H --> C

    D --> I[ব্যক্তিগত তথ্য পূরণ]
    I --> J[অ্যাকাউন্ট তৈরি]
    J --> G

    G --> K[ড্যাশবোর্ডে রিডিরেক্ট]
    K --> L[হোম পেজ লোড]
```

### 2. Meal Entry Flow

```mermaid
graph TD
    A[মিল এন্ট্রি পেজে যান] --> B[আজকের তারিখ নির্বাচন]
    B --> C[খাবারের ধরন নির্বাচন]
    C --> D{গেস্ট আছে?}
    D -->|হ্যাঁ| E[গেস্ট সংখ্যা লিখুন]
    D -->|না| F[শুধু নিজের মিল]
    E --> F
    F --> G[খাবারের দাম এন্ট্রি]
    G --> H[সাবমিট করুন]
    H --> I[ডাটাবেসে সেভ]
    I --> J[সফল বার্তা দেখান]
    J --> K[মিল লিস্ট আপডেট]
```

### 3. Monthly Bill Generation Flow

```mermaid
graph TD
    A[অ্যাডমিন বিল জেনারেট বাটন ক্লিক] --> B[মাস ও বছর নির্বাচন]
    B --> C[সিস্টেম মাসিক ডেটা সংগ্রহ করে]
    C --> D[প্রতিটি মেম্বারের মিল গণনা]
    D --> E[মোট খরচ ভাগ করে]
    E --> F[ইউটিলিটি কস্ট যোগ করে]
    F --> G[প্রতিটি মেম্বারের বিল তৈরি]
    G --> H[ডাটাবেসে বিল সেভ করে]
    H --> I[বিল রিপোর্ট জেনারেট]
    I --> J[ইমেইল/নোটিফিকেশন পাঠায়]
```

## 💾 Database Schema Design

### User Collection

```javascript
{
  _id: ObjectId("64a1b2c3d4e5f6789012345"),
  name: "আহমেদ হাসান",
  email: "ahmed@email.com",
  phone: "01712345678",
  room_number: "A-205",
  password: "$2b$10$encrypted_password_hash",
  role: "member", // enum: ['admin', 'member', 'cook']
  status: "active", // enum: ['active', 'inactive', 'suspended']
  join_date: ISODate("2025-01-15T00:00:00Z"),
  leave_date: null, // null if still active
  profile_picture: "https://example.com/profiles/ahmed.jpg",
  created_at: ISODate("2025-01-15T10:30:00Z"),
  updated_at: ISODate("2025-05-28T14:20:00Z"),

  // Additional fields for analytics
  last_login: ISODate("2025-05-28T09:15:00Z"),
  total_meals_lifetime: 450,
  total_payments_lifetime: 15000
}
```

### Meal Collection

```javascript
{
  _id: ObjectId("64a1b2c3d4e5f6789012346"),
  user_id: ObjectId("64a1b2c3d4e5f6789012345"),
  date: ISODate("2025-05-28T00:00:00Z"),
  meal_type: "lunch", // enum: ['breakfast', 'lunch', 'dinner']
  guest_count: 2,
  cost_per_meal: 45.00,
  total_cost: 135.00, // (1 + guest_count) * cost_per_meal
  notes: "বিশেষ অনুষ্ঠানের জন্য অতিরিক্ত খাবার",
  created_at: ISODate("2025-05-28T12:30:00Z"),
  updated_at: ISODate("2025-05-28T12:30:00Z"),
  created_by: ObjectId("64a1b2c3d4e5f6789012345"), // who entered this meal

  // For tracking purposes
  is_edited: false,
  edit_history: [] // array of edit logs
}
```

### Expense Collection

```javascript
{
  _id: ObjectId("64a1b2c3d4e5f6789012347"),
  date: ISODate("2025-05-28T00:00:00Z"),
  description: "সবজি কেনা - পালং শাক, গাজর, আলু",
  amount: 850.00,
  category: "groceries", // enum: ['groceries', 'gas', 'utilities', 'maintenance', 'other']
  subcategory: "vegetables", // optional subcategory
  payment_method: "cash", // enum: ['cash', 'bkash', 'bank_transfer', 'card']
  vendor: "স্থানীয় বাজার",
  receipt_image: "https://example.com/receipts/receipt_001.jpg",
  added_by: ObjectId("64a1b2c3d4e5f6789012345"),
  approved_by: ObjectId("64a1b2c3d4e5f6789012340"), // admin approval
  status: "approved", // enum: ['pending', 'approved', 'rejected']
  created_at: ISODate("2025-05-28T14:30:00Z"),
  updated_at: ISODate("2025-05-28T14:30:00Z")
}
```

### Bill Collection

```javascript
{
  _id: ObjectId("64a1b2c3d4e5f6789012348"),
  user_id: ObjectId("64a1b2c3d4e5f6789012345"),
  month: 5,
  year: 2025,

  // Meal calculations
  total_meals: 30,
  meal_rate: 45.00,
  meal_cost: 1350.00, // total_meals * meal_rate

  // Additional costs
  utility_cost: 150.00, // electricity, gas, water per member
  service_charge: 50.00, // cook salary, cleaning etc.
  maintenance_cost: 25.00, // repairs, improvements

  // Total calculation
  subtotal: 1575.00, // meal_cost + utility_cost + service_charge + maintenance_cost
  discount: 0.00, // any discount applied
  total_amount: 1575.00, // subtotal - discount

  // Payment tracking
  paid_amount: 1000.00,
  due_amount: 575.00, // total_amount - paid_amount
  payment_status: "partial", // enum: ['paid', 'partial', 'unpaid']

  // Payment history
  payments: [
    {
      amount: 500.00,
      payment_date: ISODate("2025-05-05T00:00:00Z"),
      payment_method: "bkash",
      transaction_id: "BKP123456789",
      received_by: ObjectId("64a1b2c3d4e5f6789012340")
    },
    {
      amount: 500.00,
      payment_date: ISODate("2025-05-15T00:00:00Z"),
      payment_method: "cash",
      received_by: ObjectId("64a1b2c3d4e5f6789012340")
    }
  ],

  // Bill metadata
  generated_at: ISODate("2025-06-01T10:00:00Z"),
  generated_by: ObjectId("64a1b2c3d4e5f6789012340"),
  due_date: ISODate("2025-06-10T00:00:00Z"),
  is_final: true, // false if bill can still be modified

  created_at: ISODate("2025-06-01T10:00:00Z"),
  updated_at: ISODate("2025-05-15T16:30:00Z")
}
```

### Menu Collection (Optional - for meal planning)

```javascript
{
  _id: ObjectId("64a1b2c3d4e5f6789012349"),
  date: ISODate("2025-05-28T00:00:00Z"),
  meal_type: "lunch",
  items: [
    {
      name: "ভাত",
      type: "main",
      quantity: "অল্ড"
    },
    {
      name: "মুরগির মাংস",
      type: "curry",
      quantity: "১ কেজি"
    },
    {
      name: "ডাল",
      type: "curry",
      quantity: "৫০০ গ্রাম"
    }
  ],
  estimated_cost: 45.00,
  actual_cost: 47.00,
  cook_id: ObjectId("64a1b2c3d4e5f6789012341"),
  created_at: ISODate("2025-05-27T20:00:00Z")
}
```

## 📊 Database Relationships

### Entity Relationship Diagram

```mermaid
erDiagram
    USER {
        ObjectId _id PK
        string name
        string email UK
        string phone
        string room_number
        string role
        string status
        date join_date
        date leave_date
    }

    MEAL {
        ObjectId _id PK
        ObjectId user_id FK
        date date
        string meal_type
        number guest_count
        number cost_per_meal
        number total_cost
    }

    EXPENSE {
        ObjectId _id PK
        date date
        string description
        number amount
        string category
        ObjectId added_by FK
    }

    BILL {
        ObjectId _id PK
        ObjectId user_id FK
        number month
        number year
        number total_meals
        number total_amount
        number paid_amount
        string payment_status
    }

    PAYMENT {
        ObjectId _id PK
        ObjectId bill_id FK
        ObjectId user_id FK
        number amount
        date payment_date
        string payment_method
    }

    USER ||--o{ MEAL : "has_meals"
    USER ||--o{ EXPENSE : "added_expenses"
    USER ||--o{ BILL : "has_bills"
    BILL ||--o{ PAYMENT : "has_payments"
```

## 🔄 Data Flow Architecture

### 1. Request-Response Cycle

```mermaid
sequenceDiagram
    participant Client as React Client
    participant API as Express API
    participant Auth as Auth Middleware
    participant Controller as Controller
    participant Model as Mongoose Model
    participant DB as MongoDB

    Client->>API: HTTP Request + JWT Token
    API->>Auth: Verify Token
    Auth->>API: Token Valid/Invalid

    alt Token Valid
        API->>Controller: Route to Controller
        Controller->>Model: Call Model Method
        Model->>DB: Execute Query
        DB->>Model: Return Data
        Model->>Controller: Processed Data
        Controller->>API: Response Data
        API->>Client: JSON Response
    else Token Invalid
        Auth->>Client: 401 Unauthorized
    end
```

### 2. Bill Generation Process

```mermaid
graph TD
    A[Start Bill Generation] --> B[Select Month & Year]
    B --> C[Get All Active Members]
    C --> D[Calculate Each Member's Meals]
    D --> E[Get Total Monthly Expenses]
    E --> F[Calculate Cost Per Meal]
    F --> G[Calculate Individual Bills]
    G --> H[Save Bills to Database]
    H --> I[Generate Bill Reports]
    I --> J[Send Notifications]
    J --> K[End Process]

    subgraph "Bill Calculation Logic"
        F --> F1[Total Expenses ÷ Total Meals = Cost Per Meal]
        G --> G1[Member Meals × Cost Per Meal = Meal Cost]
        G1 --> G2[Meal Cost + Utility Share = Total Bill]
    end
```

## 🏃‍♂️ Application Workflow

### Daily Operations Workflow

```mermaid
graph LR
    A[Morning] --> B[Breakfast Entry]
    B --> C[Expense Recording]
    C --> D[Lunch Entry]
    D --> E[More Expenses]
    E --> F[Dinner Entry]
    F --> G[Daily Summary]
    G --> H[End of Day]

    subgraph "Continuous Activities"
        I[Member Management]
        J[Payment Processing]
        K[Report Generation]
    end
```

### Monthly Operations Workflow

```mermaid
graph TD
    A[Month Start] --> B[Previous Month Bill Generation]
    B --> C[Send Bills to Members]
    C --> D[Daily Meal & Expense Tracking]
    D --> E[Payment Collection]
    E --> F[Weekly Reports]
    F --> G[Month End Summary]
    G --> H[Prepare for Next Month]

    D --> D1[Meal Entries]
    D --> D2[Expense Entries]
    D --> D3[Guest Meal Tracking]
```

## 🔐 Security Architecture

### Authentication & Authorization Flow

```mermaid
graph TD
    A[User Login] --> B[Verify Credentials]
    B --> C{Credentials Valid?}
    C -->|Yes| D[Generate JWT Token]
    C -->|No| E[Return Error]

    D --> F[Set Token Expiry]
    F --> G[Return Token to Client]
    G --> H[Client Stores Token]

    H --> I[Subsequent Requests]
    I --> J[Include Token in Header]
    J --> K[Server Verifies Token]
    K --> L{Token Valid?}
    L -->|Yes| M[Process Request]
    L -->|No| N[Return 401 Unauthorized]

    subgraph "Role-based Access"
        O[Check User Role]
        P[Admin Access]
        Q[Member Access]
        R[Cook Access]
    end

    M --> O
```

## 📱 Component Architecture (Frontend)

### React Component Hierarchy

```
App
├── Router
├── AuthProvider
├── ThemeProvider
└── Layout
    ├── Header
    │   ├── Navigation
    │   ├── UserProfile
    │   └── Notifications
    ├── Sidebar
    │   ├── MenuItems
    │   └── UserInfo
    └── MainContent
        ├── Dashboard
        │   ├── SummaryCards
        │   ├── RecentActivities
        │   └── QuickActions
        ├── Members
        │   ├── MemberList
        │   ├── MemberForm
        │   └── MemberDetails
        ├── Meals
        │   ├── MealEntry
        │   ├── MealHistory
        │   └── DailyMenu
        ├── Finance
        │   ├── ExpenseEntry
        │   ├── BillGeneration
        │   ├── PaymentTracking
        │   └── FinancialReports
        └── Reports
            ├── DashboardReports
            ├── MonthlyReports
            └── CustomReports
```

## 🔧 Technical Stack Integration

### Full Stack Integration

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[React Components]
        B[State Management]
        C[API Services]
        D[UI Components]
    end

    subgraph "Backend Layer"
        E[Express Routes]
        F[Controllers]
        G[Middleware]
        H[Models]
    end

    subgraph "Database Layer"
        I[MongoDB Collections]
        J[Indexes]
        K[Aggregation Pipelines]
    end

    A --> C
    C --> E
    E --> F
    F --> H
    H --> I

    B --> A
    G --> F
    J --> I
    K --> I
```

---

এই আর্কিটেকচার ডকুমেন্ট আপনার প্রজেক্টের সম্পূর্ণ কাঠামো এবং data flow বুঝতে সাহায্য করবে। প্রতিটি component এর ভূমিকা এবং তাদের মধ্যে সম্পর্ক স্পষ্টভাবে দেখানো হয়েছে।
