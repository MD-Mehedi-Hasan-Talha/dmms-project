# 🌐 ডিজিটাল মেস ম্যানেজমেন্ট সিস্টেম V2.0 - API Documentation

**Complete REST API Reference for Professional Mess Management System**

![API Version](https://img.shields.io/badge/API-v2.0-blue)
![Framework](https://img.shields.io/badge/Framework-Next.js%2014-black)
![Database](https://img.shields.io/badge/Database-MongoDB-green)
![ORM](https://img.shields.io/badge/ORM-Prisma-2D3748)

---

## 🎯 API Overview

### Base URL

```
Development: http://localhost:3000/api
Production:  https://your-domain.vercel.app/api
```

### 🔐 Authentication

All protected endpoints require Clerk authentication token in the header:

```
Authorization: Bearer <clerk_session_token>
```

### 📝 Response Format

```typescript
// Success Response
{
  success: true,
  data: any,
  message?: string,
  meta?: {
    total?: number,
    page?: number,
    limit?: number
  }
}

// Error Response
{
  success: false,
  error: string,
  details?: any,
  code?: number
}
```

---

## 👥 Authentication & User Management

### 🔐 Authentication Endpoints

#### POST /api/auth/sync

Sync user data with Clerk webhook

```typescript
// Request Body
{
  type: 'user.created' | 'user.updated' | 'user.deleted',
  data: {
    id: string,
    email_addresses: Array<{email_address: string}>,
    first_name: string,
    last_name: string,
    image_url: string,
    phone_numbers: Array<{phone_number: string}>
  }
}

// Response
{
  success: true,
  data: {
    id: string,
    clerkId: string,
    email: string,
    name: string,
    isActive: boolean
  }
}
```

#### GET /api/auth/me

Get current user profile

```typescript
// Headers
Authorization: Bearer <token>

// Response
{
  success: true,
  data: {
    id: string,
    clerkId: string,
    email: string,
    name: string,
    phone?: string,
    avatar?: string,
    isActive: boolean,
    messMembers: Array<{
      messId: string,
      role: 'ADMIN' | 'SUB_ADMIN' | 'MEMBER' | 'COOK',
      mess: {
        id: string,
        name: string
      }
    }>
  }
}
```

---

## 🏠 Mess Management

### 🏗️ Mess CRUD Operations

#### POST /api/mess

Create new mess (Admin only)

```typescript
// Request Body
{
  name: string,
  description?: string,
  address?: string,
  rules?: string[]
}

// Response
{
  success: true,
  data: {
    id: string,
    name: string,
    description?: string,
    address?: string,
    rules: string[],
    isActive: boolean,
    createdAt: string
  }
}
```

#### GET /api/mess

Get user's messes

```typescript
// Response
{
  success: true,
  data: Array<{
    id: string,
    name: string,
    description?: string,
    memberCount: number,
    role: 'ADMIN' | 'SUB_ADMIN' | 'MEMBER' | 'COOK',
    isActive: boolean
  }>
}
```

#### GET /api/mess/[messId]

Get mess details

```typescript
// Response
{
  success: true,
  data: {
    id: string,
    name: string,
    description?: string,
    address?: string,
    rules: string[],
    isActive: boolean,
    members: Array<{
      id: string,
      user: {
        id: string,
        name: string,
        email: string,
        avatar?: string
      },
      role: string,
      isActive: boolean,
      joinedAt: string
    }>,
    createdAt: string
  }
}
```

#### PUT /api/mess/[messId]

Update mess details (Admin only)

```typescript
// Request Body
{
  name?: string,
  description?: string,
  address?: string,
  rules?: string[],
  isActive?: boolean
}

// Response
{
  success: true,
  data: {
    id: string,
    name: string,
    // ... updated fields
  }
}
```

### 👥 Member Management

#### POST /api/mess/[messId]/members

Add member to mess (Admin only)

```typescript
// Request Body
{
  email: string,
  role?: 'MEMBER' | 'SUB_ADMIN' | 'COOK'
}

// Response
{
  success: true,
  data: {
    id: string,
    userId: string,
    messId: string,
    role: string,
    isActive: boolean,
    joinedAt: string
  }
}
```

#### PUT /api/mess/[messId]/members/[memberId]

Update member role (Admin only)

```typescript
// Request Body
{
  role: 'ADMIN' | 'SUB_ADMIN' | 'MEMBER' | 'COOK',
  subAdminExpiresAt?: string, // For SUB_ADMIN role
  permissions?: string[]       // For SUB_ADMIN role
}

// Response
{
  success: true,
  data: {
    id: string,
    role: string,
    subAdminExpiresAt?: string,
    permissions?: string[]
  }
}
```

#### DELETE /api/mess/[messId]/members/[memberId]

Remove member from mess (Admin only)

```typescript
// Response
{
  success: true,
  message: "Member removed successfully"
}
```

---

## 🍛 Meal Management

### 📝 Meal Entry Operations

#### POST /api/mess/[messId]/meals

Add meal entry

```typescript
// Request Body
{
  userId?: string,        // If admin adding for others
  date: string,           // ISO date string
  mealType: 'BREAKFAST' | 'LUNCH' | 'DINNER',
  count: number,          // Can be 0.5 for half meal
  isGuest?: boolean
}

// Response
{
  success: true,
  data: {
    id: string,
    userId: string,
    messId: string,
    date: string,
    mealType: string,
    count: number,
    isGuest: boolean,
    enteredBy: string,
    createdAt: string
  }
}
```

#### GET /api/mess/[messId]/meals

Get meal entries with filters

```typescript
// Query Parameters
?userId=string          // Filter by user
&date=YYYY-MM-DD       // Filter by date
&dateFrom=YYYY-MM-DD   // Date range start
&dateTo=YYYY-MM-DD     // Date range end
&mealType=BREAKFAST|LUNCH|DINNER
&page=1                // Pagination
&limit=20              // Page size

// Response
{
  success: true,
  data: Array<{
    id: string,
    user: {
      id: string,
      name: string,
      email: string
    },
    date: string,
    mealType: string,
    count: number,
    isGuest: boolean,
    enteredBy: string,
    createdAt: string
  }>,
  meta: {
    total: number,
    page: number,
    limit: number,
    totalPages: number
  }
}
```

#### PUT /api/mess/[messId]/meals/[mealId]

Update meal entry

```typescript
// Request Body
{
  count?: number,
  isGuest?: boolean
}

// Response
{
  success: true,
  data: {
    id: string,
    count: number,
    isGuest: boolean,
    updatedAt: string
  }
}
```

#### DELETE /api/mess/[messId]/meals/[mealId]

Delete meal entry

```typescript
// Response
{
  success: true,
  message: "Meal entry deleted successfully"
}
```

### 📊 Meal Statistics

#### GET /api/mess/[messId]/meals/stats

Get meal statistics

```typescript
// Query Parameters
?period=daily|weekly|monthly
&date=YYYY-MM-DD

// Response
{
  success: true,
  data: {
    totalMeals: number,
    mealsByType: {
      BREAKFAST: number,
      LUNCH: number,
      DINNER: number
    },
    mealsByMember: Array<{
      userId: string,
      userName: string,
      totalMeals: number,
      mealsByType: {
        BREAKFAST: number,
        LUNCH: number,
        DINNER: number
      }
    }>,
    guestMeals: number,
    period: string
  }
}
```

---

## 🛒 Bazaar & Expense Management

### 🛍️ Bazaar Items

#### POST /api/mess/[messId]/bazaar

Add bazaar item

```typescript
// Request Body
{
  productName: string,
  quantity: number,
  unit: 'KG' | 'PCS' | 'LITER' | 'PACKET' | 'GRAM',
  unitPrice: number,
  totalPrice: number,
  category: string,
  purchaseDate: string,  // ISO date string
  purchasedBy?: string   // If admin adding for others
}

// Response
{
  success: true,
  data: {
    id: string,
    productName: string,
    quantity: number,
    unit: string,
    unitPrice: number,
    totalPrice: number,
    category: string,
    purchaseDate: string,
    purchasedBy: string,
    createdAt: string
  }
}
```

#### GET /api/mess/[messId]/bazaar

Get bazaar items with filters

```typescript
// Query Parameters
?category=string
&dateFrom=YYYY-MM-DD
&dateTo=YYYY-MM-DD
&purchasedBy=string
&page=1
&limit=20

// Response
{
  success: true,
  data: Array<{
    id: string,
    productName: string,
    quantity: number,
    unit: string,
    unitPrice: number,
    totalPrice: number,
    category: string,
    purchaseDate: string,
    purchaser: {
      id: string,
      name: string
    },
    createdAt: string
  }>,
  meta: {
    total: number,
    totalAmount: number,
    page: number,
    limit: number
  }
}
```

#### PUT /api/mess/[messId]/bazaar/[itemId]

Update bazaar item

```typescript
// Request Body (same as POST)
{
  productName?: string,
  quantity?: number,
  // ... other fields
}

// Response
{
  success: true,
  data: {
    id: string,
    // ... updated fields
  }
}
```

#### DELETE /api/mess/[messId]/bazaar/[itemId]

Delete bazaar item

```typescript
// Response
{
  success: true,
  message: "Bazaar item deleted successfully"
}
```

### 💰 Expenses

#### POST /api/mess/[messId]/expenses

Add expense

```typescript
// Request Body
{
  title: string,
  description?: string,
  amount: number,
  category: 'FOOD' | 'UTILITIES' | 'SALARY' | 'MAINTENANCE' | 'OTHER',
  isFixed: boolean,
  date: string
}

// Response
{
  success: true,
  data: {
    id: string,
    title: string,
    description?: string,
    amount: number,
    category: string,
    isFixed: boolean,
    date: string,
    addedBy: string,
    createdAt: string
  }
}
```

#### GET /api/mess/[messId]/expenses

Get expenses with filters

```typescript
// Query Parameters
?category=FOOD|UTILITIES|SALARY|MAINTENANCE|OTHER
&isFixed=true|false
&dateFrom=YYYY-MM-DD
&dateTo=YYYY-MM-DD
&page=1
&limit=20

// Response
{
  success: true,
  data: Array<{
    id: string,
    title: string,
    description?: string,
    amount: number,
    category: string,
    isFixed: boolean,
    date: string,
    createdAt: string
  }>,
  meta: {
    total: number,
    totalAmount: number,
    fixedAmount: number,
    variableAmount: number
  }
}
```

---

## 🧾 Bill Management

### 📊 Bill Generation

#### POST /api/mess/[messId]/bills/generate

Generate monthly bill

```typescript
// Request Body
{
  month: string,  // Format: "2025-01"
  fixedChargesPerMember?: number,
  additionalCharges?: Array<{
    userId: string,
    amount: number,
    description: string
  }>
}

// Response
{
  success: true,
  data: {
    id: string,
    messId: string,
    month: string,
    totalExpenses: number,
    totalMeals: number,
    mealRate: number,
    memberBills: Array<{
      userId: string,
      userName: string,
      totalMeals: number,
      mealCost: number,
      fixedCharges: number,
      additionalCharges: number,
      totalAmount: number,
      previousDue: number,
      finalAmount: number
    }>,
    generatedAt: string,
    generatedBy: string
  }
}
```

#### GET /api/mess/[messId]/bills

Get mess bills

```typescript
// Query Parameters
?month=2025-01
&year=2025

// Response
{
  success: true,
  data: Array<{
    id: string,
    month: string,
    totalExpenses: number,
    totalMeals: number,
    mealRate: number,
    memberCount: number,
    generatedAt: string
  }>
}
```

#### GET /api/mess/[messId]/bills/[billId]

Get detailed bill

```typescript
// Response
{
  success: true,
  data: {
    id: string,
    messId: string,
    month: string,
    totalExpenses: number,
    totalMeals: number,
    mealRate: number,
    memberBills: Array<{
      id: string,
      userId: string,
      user: {
        id: string,
        name: string,
        email: string
      },
      totalMeals: number,
      mealCost: number,
      fixedCharges: number,
      additionalCharges: number,
      totalAmount: number,
      previousDue: number,
      finalAmount: number,
      paymentStatus: 'PENDING' | 'PARTIAL' | 'PAID'
    }>,
    generatedAt: string,
    generatedBy: string
  }
}
```

---

## 💳 Payment Management

### 💰 Payment Operations

#### POST /api/mess/[messId]/payments

Record payment

```typescript
// Request Body
{
  userId?: string,        // If admin recording for others
  amount: number,
  paymentMethod: 'BKASH' | 'NAGAD' | 'ROCKET' | 'BANK' | 'CASH',
  transactionId?: string,
  billMonth: string,      // Format: "2025-01"
  description?: string
}

// Response
{
  success: true,
  data: {
    id: string,
    userId: string,
    messId: string,
    amount: number,
    paymentMethod: string,
    transactionId?: string,
    status: 'PENDING' | 'COMPLETED' | 'FAILED',
    paymentDate: string,
    billMonth: string,
    description?: string,
    createdAt: string
  }
}
```

#### GET /api/mess/[messId]/payments

Get payments with filters

```typescript
// Query Parameters
?userId=string
&billMonth=2025-01
&paymentMethod=BKASH|NAGAD|ROCKET|BANK|CASH
&status=PENDING|COMPLETED|FAILED
&page=1
&limit=20

// Response
{
  success: true,
  data: Array<{
    id: string,
    user: {
      id: string,
      name: string,
      email: string
    },
    amount: number,
    paymentMethod: string,
    transactionId?: string,
    status: string,
    paymentDate: string,
    billMonth: string,
    description?: string
  }>,
  meta: {
    total: number,
    totalAmount: number,
    completedAmount: number,
    pendingAmount: number
  }
}
```

#### PUT /api/mess/[messId]/payments/[paymentId]

Update payment status (Admin only)

```typescript
// Request Body
{
  status: 'COMPLETED' | 'FAILED',
  transactionId?: string,
  description?: string
}

// Response
{
  success: true,
  data: {
    id: string,
    status: string,
    updatedAt: string
  }
}
```

---

## 📊 Reports & Analytics

### 📈 Financial Reports

#### GET /api/mess/[messId]/reports/financial

Get financial report

```typescript
// Query Parameters
?period=monthly|yearly
&month=2025-01
&year=2025

// Response
{
  success: true,
  data: {
    period: string,
    totalIncome: number,
    totalExpenses: number,
    balance: number,
    expensesByCategory: {
      FOOD: number,
      UTILITIES: number,
      SALARY: number,
      MAINTENANCE: number,
      OTHER: number
    },
    paymentsByMethod: {
      BKASH: number,
      NAGAD: number,
      ROCKET: number,
      BANK: number,
      CASH: number
    },
    memberPaymentStatus: Array<{
      userId: string,
      userName: string,
      totalDue: number,
      totalPaid: number,
      balance: number,
      paymentPercentage: number
    }>
  }
}
```

#### GET /api/mess/[messId]/reports/meals

Get meal report

```typescript
// Query Parameters
?period=monthly|yearly
&month=2025-01
&year=2025

// Response
{
  success: true,
  data: {
    period: string,
    totalMeals: number,
    averageMealsPerDay: number,
    mealsByType: {
      BREAKFAST: number,
      LUNCH: number,
      DINNER: number
    },
    memberMealAnalysis: Array<{
      userId: string,
      userName: string,
      totalMeals: number,
      averagePerDay: number,
      mealsByType: {
        BREAKFAST: number,
        LUNCH: number,
        DINNER: number
      },
      mealPercentage: number
    }>,
    mealTrends: Array<{
      date: string,
      totalMeals: number,
      mealsByType: object
    }>
  }
}
```

### 📄 Export Reports

#### GET /api/mess/[messId]/reports/export

Export report as PDF/Excel

```typescript
// Query Parameters
?type=financial|meals|complete
&format=pdf|excel
&month=2025-01
&year=2025

// Response (File Download)
Content-Type: application/pdf | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
Content-Disposition: attachment; filename="mess-report-2025-01.pdf"
```

---

## 📢 Notice Management

### 📝 Notice Operations

#### POST /api/mess/[messId]/notices

Create notice (Admin/Sub-admin only)

```typescript
// Request Body
{
  title: string,
  content: string,
  category: 'GENERAL' | 'EMERGENCY' | 'MEAL_UPDATE' | 'PAYMENT_REMINDER',
  priority: 'HIGH' | 'MEDIUM' | 'LOW',
  expiresAt?: string  // ISO date string
}

// Response
{
  success: true,
  data: {
    id: string,
    title: string,
    content: string,
    category: string,
    priority: string,
    isActive: boolean,
    createdBy: string,
    createdAt: string,
    expiresAt?: string
  }
}
```

#### GET /api/mess/[messId]/notices

Get notices

```typescript
// Query Parameters
?category=GENERAL|EMERGENCY|MEAL_UPDATE|PAYMENT_REMINDER
&priority=HIGH|MEDIUM|LOW
&isActive=true|false
&page=1
&limit=10

// Response
{
  success: true,
  data: Array<{
    id: string,
    title: string,
    content: string,
    category: string,
    priority: string,
    isActive: boolean,
    createdBy: string,
    createdAt: string,
    expiresAt?: string
  }>
}
```

#### PUT /api/mess/[messId]/notices/[noticeId]

Update notice

```typescript
// Request Body (same as POST)
{
  title?: string,
  content?: string,
  // ... other fields
}
```

#### DELETE /api/mess/[messId]/notices/[noticeId]

Delete notice

```typescript
// Response
{
  success: true,
  message: "Notice deleted successfully"
}
```

---

## 💬 Feedback Management

### 🗣️ Feedback Operations

#### POST /api/mess/[messId]/feedback

Submit feedback

```typescript
// Request Body
{
  category: 'FOOD_QUALITY' | 'FINANCIAL' | 'MANAGEMENT' | 'TECHNICAL' | 'SUGGESTION',
  title: string,
  description: string,
  rating: number,        // 1-5 stars
  isAnonymous: boolean
}

// Response
{
  success: true,
  data: {
    id: string,
    category: string,
    title: string,
    description: string,
    rating: number,
    isAnonymous: boolean,
    status: 'PENDING' | 'REVIEWED' | 'RESOLVED',
    createdAt: string
  }
}
```

#### GET /api/mess/[messId]/feedback

Get feedback (Admin view)

```typescript
// Query Parameters
?category=FOOD_QUALITY|FINANCIAL|MANAGEMENT|TECHNICAL|SUGGESTION
&status=PENDING|REVIEWED|RESOLVED
&rating=1|2|3|4|5
&page=1
&limit=20

// Response
{
  success: true,
  data: Array<{
    id: string,
    user: {
      id: string,
      name: string,  // Hidden if anonymous
      email: string  // Hidden if anonymous
    },
    category: string,
    title: string,
    description: string,
    rating: number,
    isAnonymous: boolean,
    status: string,
    adminResponse?: string,
    createdAt: string,
    updatedAt: string
  }>,
  meta: {
    total: number,
    averageRating: number,
    ratingDistribution: {
      1: number,
      2: number,
      3: number,
      4: number,
      5: number
    }
  }
}
```

#### PUT /api/mess/[messId]/feedback/[feedbackId]

Respond to feedback (Admin only)

```typescript
// Request Body
{
  adminResponse: string,
  status: 'REVIEWED' | 'RESOLVED'
}

// Response
{
  success: true,
  data: {
    id: string,
    adminResponse: string,
    status: string,
    updatedAt: string
  }
}
```

---

## 🔔 Notification System

### 📲 Notification Operations

#### GET /api/notifications

Get user notifications

```typescript
// Query Parameters
?isRead=true|false
&type=MEAL|PAYMENT|BILL|FEEDBACK|GENERAL
&page=1
&limit=20

// Response
{
  success: true,
  data: Array<{
    id: string,
    title: string,
    message: string,
    type: string,
    isRead: boolean,
    data?: object,     // Additional notification data
    createdAt: string
  }>,
  meta: {
    total: number,
    unreadCount: number
  }
}
```

#### PUT /api/notifications/[notificationId]/read

Mark notification as read

```typescript
// Response
{
  success: true,
  data: {
    id: string,
    isRead: true,
    readAt: string
  }
}
```

#### PUT /api/notifications/mark-all-read

Mark all notifications as read

```typescript
// Response
{
  success: true,
  message: "All notifications marked as read",
  count: number
}
```

---

## 🔍 Search & Filters

### 🔎 Global Search

#### GET /api/mess/[messId]/search

Search across mess data

```typescript
// Query Parameters
?q=search_term
&type=members|meals|bazaar|expenses|payments
&limit=20

// Response
{
  success: true,
  data: {
    members: Array<{
      id: string,
      name: string,
      email: string,
      role: string
    }>,
    meals: Array<{
      id: string,
      userName: string,
      date: string,
      mealType: string,
      count: number
    }>,
    bazaarItems: Array<{
      id: string,
      productName: string,
      category: string,
      totalPrice: number,
      purchaseDate: string
    }>,
    expenses: Array<{
      id: string,
      title: string,
      amount: number,
      category: string,
      date: string
    }>,
    payments: Array<{
      id: string,
      userName: string,
      amount: number,
      paymentMethod: string,
      paymentDate: string
    }>
  }
}
```

---

## 📊 Dashboard Data

### 🏠 Dashboard Overview

#### GET /api/mess/[messId]/dashboard

Get dashboard data

```typescript
// Response
{
  success: true,
  data: {
    messInfo: {
      id: string,
      name: string,
      memberCount: number,
      activeMembers: number
    },
    currentMonth: {
      totalMeals: number,
      totalExpenses: number,
      mealRate: number,
      averageMealsPerDay: number
    },
    recentActivity: {
      recentMeals: Array<object>,
      recentBazaar: Array<object>,
      recentPayments: Array<object>
    },
    notifications: {
      unreadCount: number,
      recent: Array<object>
    },
    quickStats: {
      todayMeals: number,
      pendingPayments: number,
      monthlyBalance: number,
      averageRating: number
    }
  }
}
```

---

## 🔧 Utility Endpoints

### 🛠️ Helper APIs

#### GET /api/utils/bangladesh-payments

Get Bangladesh payment methods

```typescript
// Response
{
  success: true,
  data: Array<{
    method: 'BKASH' | 'NAGAD' | 'ROCKET',
    name: string,
    logo: string,
    isActive: boolean
  }>
}
```

#### GET /api/utils/product-categories

Get product categories for bazaar

```typescript
// Response
{
  success: true,
  data: Array<{
    category: string,
    products: string[]
  }>
}
```

#### GET /api/utils/expense-categories

Get expense categories

```typescript
// Response
{
  success: true,
  data: Array<{
    category: 'FOOD' | 'UTILITIES' | 'SALARY' | 'MAINTENANCE' | 'OTHER',
    description: string,
    isFixed: boolean
  }>
}
```

---

## 🚨 Error Codes

### 📋 Standard Error Responses

```typescript
// Authentication Errors
401: "Unauthorized - Invalid or missing token"
403: "Forbidden - Insufficient permissions"

// Validation Errors
400: "Bad Request - Invalid input data"
422: "Unprocessable Entity - Validation failed"

// Resource Errors
404: "Not Found - Resource does not exist"
409: "Conflict - Resource already exists"

// Server Errors
500: "Internal Server Error"
503: "Service Unavailable"

// Custom Error Codes
1001: "Mess not found"
1002: "User not a member of this mess"
1003: "Sub-admin permissions expired"
1004: "Meal entry already exists for this date"
1005: "Bill already generated for this month"
1006: "Insufficient balance for payment"
1007: "Invalid payment method"
1008: "Duplicate transaction ID"
```

---

## 🔒 Rate Limiting

### 🛡️ API Rate Limits

```typescript
// General API endpoints
Limit: 100 requests per minute per IP
Header: X-RateLimit-Remaining

// Authentication endpoints
Limit: 10 requests per minute per IP
Header: X-RateLimit-Auth-Remaining

// File upload endpoints
Limit: 20 requests per minute per user
Header: X-RateLimit-Upload-Remaining
```

---

## 📝 API Testing

### 🧪 Example API Calls

#### Using Thunder Client (VS Code)

```typescript
// 1. Create Mess
POST http://localhost:3000/api/mess
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "আমার মেস",
  "description": "ছাত্রদের জন্য মেস",
  "address": "ঢাকা, বাংলাদেশ",
  "rules": [
    "সকাল ৮টার মধ্যে নাস্তা",
    "দুপুর ২টার মধ্যে দুপুরের খাবার",
    "রাত ৯টার মধ্যে রাতের খাবার"
  ]
}

// 2. Add Meal Entry
POST http://localhost:3000/api/mess/{{messId}}/meals
Authorization: Bearer <token>
Content-Type: application/json

{
  "date": "2025-01-15",
  "mealType": "LUNCH",
  "count": 1
}

// 3. Add Bazaar Item
POST http://localhost:3000/api/mess/{{messId}}/bazaar
Authorization: Bearer <token>
Content-Type: application/json

{
  "productName": "চাল",
  "quantity": 5,
  "unit": "KG",
  "unitPrice": 65,
  "totalPrice": 325,
  "category": "চাল-ডাল",
  "purchaseDate": "2025-01-15"
}
```

---

## 📚 API Client Libraries

### 🔧 TypeScript API Client

```typescript
// lib/api-client.ts
import { auth } from "@clerk/nextjs";

class MessAPIClient {
  private baseURL = process.env.NEXT_PUBLIC_APP_URL + "/api";

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const { getToken } = auth();
    const token = await getToken();

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  // Mess operations
  async createMess(data: CreateMessData) {
    return this.request("/mess", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getUserMesses() {
    return this.request("/mess");
  }

  // Meal operations
  async addMealEntry(messId: string, data: MealEntryData) {
    return this.request(`/mess/${messId}/meals`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Add more methods as needed...
}

export const apiClient = new MessAPIClient();
```

---

**🎯 This comprehensive API documentation provides all the endpoints needed for the professional Mess Management System V2.0. All endpoints are designed for production use with proper error handling, validation, and security measures.**

---

_API Documentation Version: 2.0.0_
_Last Updated: May 29, 2025_
_Framework: Next.js 14 with App Router_
