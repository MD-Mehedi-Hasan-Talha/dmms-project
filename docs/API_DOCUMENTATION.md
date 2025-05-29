# API Documentation - Mess Management System

## 🔗 Base URL

```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## 🔐 Authentication

এই API JWT (JSON Web Token) ভিত্তিক authentication ব্যবহার করে। সকল protected endpoints এর জন্য Authorization header এ Bearer token পাঠাতে হবে।

```javascript
headers: {
  'Authorization': 'Bearer YOUR_JWT_TOKEN',
  'Content-Type': 'application/json'
}
```

---

## 📍 Authentication Endpoints

### 1. User Registration

**POST** `/auth/register`

**Request Body:**

```json
{
  "name": "আহমেদ হাসান",
  "email": "ahmed@email.com",
  "phone": "01712345678",
  "room_number": "A-205",
  "password": "securePassword123"
}
```

**Response (Success - 201):**

```json
{
  "success": true,
  "message": "ব্যবহারকারী সফলভাবে নিবন্ধিত হয়েছে",
  "data": {
    "user": {
      "_id": "64a1b2c3d4e5f6789012345",
      "name": "আহমেদ হাসান",
      "email": "ahmed@email.com",
      "phone": "01712345678",
      "room_number": "A-205",
      "role": "member",
      "status": "active",
      "join_date": "2025-05-28T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response (Error - 400):**

```json
{
  "success": false,
  "message": "ইমেইল অ্যাড্রেস ইতিমধ্যে ব্যবহৃত হয়েছে"
}
```

### 2. User Login

**POST** `/auth/login`

**Request Body:**

```json
{
  "email": "ahmed@email.com",
  "password": "securePassword123"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "সফলভাবে লগইন হয়েছে",
  "data": {
    "user": {
      "_id": "64a1b2c3d4e5f6789012345",
      "name": "আহমেদ হাসান",
      "email": "ahmed@email.com",
      "role": "member"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Get Current User

**GET** `/auth/me`
_🔒 Protected Route_

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "64a1b2c3d4e5f6789012345",
      "name": "আহমেদ হাসান",
      "email": "ahmed@email.com",
      "phone": "01712345678",
      "room_number": "A-205",
      "role": "member",
      "status": "active",
      "join_date": "2025-05-28T10:30:00.000Z"
    }
  }
}
```

---

## 👥 User Management Endpoints

### 1. Get All Users

**GET** `/users`
_🔒 Protected Route (Admin Only)_

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): active, inactive
- `role` (optional): admin, member, cook

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "users": [
      {
        "_id": "64a1b2c3d4e5f6789012345",
        "name": "আহমেদ হাসান",
        "email": "ahmed@email.com",
        "phone": "01712345678",
        "room_number": "A-205",
        "role": "member",
        "status": "active",
        "join_date": "2025-05-28T10:30:00.000Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 3,
      "total_users": 25,
      "has_next": true,
      "has_prev": false
    }
  }
}
```

### 2. Get Single User

**GET** `/users/:id`
_🔒 Protected Route_

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "64a1b2c3d4e5f6789012345",
      "name": "আহমেদ হাসান",
      "email": "ahmed@email.com",
      "phone": "01712345678",
      "room_number": "A-205",
      "role": "member",
      "status": "active",
      "join_date": "2025-05-28T10:30:00.000Z",
      "total_meals_this_month": 45,
      "total_bill_this_month": 2500
    }
  }
}
```

### 3. Update User

**PUT** `/users/:id`
_🔒 Protected Route_

**Request Body:**

```json
{
  "name": "আহমেদ হাসান নতুন",
  "phone": "01787654321",
  "room_number": "B-301"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "ব্যবহারকারীর তথ্য আপডেট হয়েছে",
  "data": {
    "user": {
      "_id": "64a1b2c3d4e5f6789012345",
      "name": "আহমেদ হাসান নতুন",
      "email": "ahmed@email.com",
      "phone": "01787654321",
      "room_number": "B-301",
      "role": "member",
      "status": "active"
    }
  }
}
```

### 4. Update User Status

**PATCH** `/users/:id/status`
_🔒 Protected Route (Admin Only)_

**Request Body:**

```json
{
  "status": "inactive"
}
```

---

## 🍽️ Meal Management Endpoints

### 1. Add Meal Entry

**POST** `/meals`
_🔒 Protected Route_

**Request Body:**

```json
{
  "date": "2025-05-28",
  "meal_type": "lunch",
  "guest_count": 2,
  "cost_per_meal": 45
}
```

**Response (Success - 201):**

```json
{
  "success": true,
  "message": "খাবারের এন্ট্রি সফলভাবে যোগ হয়েছে",
  "data": {
    "meal": {
      "_id": "64a1b2c3d4e5f6789012346",
      "user_id": "64a1b2c3d4e5f6789012345",
      "date": "2025-05-28T00:00:00.000Z",
      "meal_type": "lunch",
      "guest_count": 2,
      "cost_per_meal": 45,
      "total_cost": 135,
      "created_at": "2025-05-28T12:30:00.000Z"
    }
  }
}
```

### 2. Get Meals

**GET** `/meals`
_🔒 Protected Route_

**Query Parameters:**

- `date` (optional): YYYY-MM-DD format
- `meal_type` (optional): breakfast, lunch, dinner
- `user_id` (optional): Specific user's meals
- `month` (optional): YYYY-MM format
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "meals": [
      {
        "_id": "64a1b2c3d4e5f6789012346",
        "user": {
          "_id": "64a1b2c3d4e5f6789012345",
          "name": "আহমেদ হাসান",
          "room_number": "A-205"
        },
        "date": "2025-05-28T00:00:00.000Z",
        "meal_type": "lunch",
        "guest_count": 2,
        "cost_per_meal": 45,
        "total_cost": 135
      }
    ],
    "summary": {
      "total_meals": 125,
      "total_cost": 5625,
      "average_cost_per_meal": 45
    }
  }
}
```

### 3. Update Meal Entry

**PUT** `/meals/:id`
_🔒 Protected Route_

**Request Body:**

```json
{
  "guest_count": 1,
  "cost_per_meal": 50
}
```

### 4. Delete Meal Entry

**DELETE** `/meals/:id`
_🔒 Protected Route_

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "খাবারের এন্ট্রি মুছে ফেলা হয়েছে"
}
```

### 5. Get Daily Meal Summary

**GET** `/meals/daily-summary`
_🔒 Protected Route_

**Query Parameters:**

- `date` (optional): YYYY-MM-DD format (default: today)

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "date": "2025-05-28",
    "summary": {
      "breakfast": {
        "total_members": 12,
        "total_guests": 3,
        "total_meals": 15,
        "cost_per_meal": 25,
        "total_cost": 375
      },
      "lunch": {
        "total_members": 15,
        "total_guests": 5,
        "total_meals": 20,
        "cost_per_meal": 45,
        "total_cost": 900
      },
      "dinner": {
        "total_members": 14,
        "total_guests": 2,
        "total_meals": 16,
        "cost_per_meal": 40,
        "total_cost": 640
      }
    },
    "grand_total": {
      "total_meals": 51,
      "total_cost": 1915,
      "average_cost": 37.5
    }
  }
}
```

---

## 💰 Financial Management Endpoints

### 1. Add Expense

**POST** `/expenses`
_🔒 Protected Route (Admin/Cook)_

**Request Body:**

```json
{
  "date": "2025-05-28",
  "description": "সবজি কেনা",
  "amount": 850,
  "category": "groceries"
}
```

**Response (Success - 201):**

```json
{
  "success": true,
  "message": "খরচের এন্ট্রি যোগ হয়েছে",
  "data": {
    "expense": {
      "_id": "64a1b2c3d4e5f6789012347",
      "date": "2025-05-28T00:00:00.000Z",
      "description": "সবজি কেনা",
      "amount": 850,
      "category": "groceries",
      "added_by": "64a1b2c3d4e5f6789012345",
      "created_at": "2025-05-28T14:30:00.000Z"
    }
  }
}
```

### 2. Get Expenses

**GET** `/expenses`
_🔒 Protected Route_

**Query Parameters:**

- `date` (optional): YYYY-MM-DD format
- `month` (optional): YYYY-MM format
- `category` (optional): groceries, gas, utilities, other
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "expenses": [
      {
        "_id": "64a1b2c3d4e5f6789012347",
        "date": "2025-05-28T00:00:00.000Z",
        "description": "সবজি কেনা",
        "amount": 850,
        "category": "groceries",
        "added_by": {
          "_id": "64a1b2c3d4e5f6789012345",
          "name": "আহমেদ হাসান"
        }
      }
    ],
    "summary": {
      "total_expenses": 15750,
      "category_wise": {
        "groceries": 12500,
        "gas": 2000,
        "utilities": 1250
      }
    }
  }
}
```

### 3. Generate Monthly Bill

**POST** `/bills/generate`
_🔒 Protected Route (Admin Only)_

**Request Body:**

```json
{
  "month": 5,
  "year": 2025
}
```

**Response (Success - 201):**

```json
{
  "success": true,
  "message": "মাসিক বিল তৈরি হয়েছে",
  "data": {
    "bills_generated": 15,
    "total_amount": 37500,
    "month": 5,
    "year": 2025,
    "summary": {
      "total_meals": 450,
      "total_expenses": 20250,
      "cost_per_meal": 45,
      "utility_cost_per_member": 150
    }
  }
}
```

### 4. Get Bills

**GET** `/bills`
_🔒 Protected Route_

**Query Parameters:**

- `user_id` (optional): Specific user's bills
- `month` (optional): Month number (1-12)
- `year` (optional): Year
- `status` (optional): paid, partial, unpaid

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "bills": [
      {
        "_id": "64a1b2c3d4e5f6789012348",
        "user": {
          "_id": "64a1b2c3d4e5f6789012345",
          "name": "আহমেদ হাসান",
          "room_number": "A-205"
        },
        "month": 5,
        "year": 2025,
        "total_meals": 30,
        "meal_cost": 1350,
        "utility_cost": 150,
        "total_amount": 1500,
        "paid_amount": 1000,
        "due_amount": 500,
        "payment_status": "partial"
      }
    ]
  }
}
```

### 5. Update Payment

**PATCH** `/bills/:id/payment`
_🔒 Protected Route_

**Request Body:**

```json
{
  "paid_amount": 1500,
  "payment_method": "cash",
  "payment_date": "2025-05-28"
}
```

---

## 📊 Reports & Analytics Endpoints

### 1. Dashboard Summary

**GET** `/reports/dashboard`
_🔒 Protected Route_

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "today": {
      "total_meals": 45,
      "total_cost": 2025,
      "active_members": 15
    },
    "this_month": {
      "total_meals": 1350,
      "total_expenses": 60750,
      "total_members": 15,
      "average_meal_cost": 45
    },
    "recent_activities": [
      {
        "type": "meal_entry",
        "user": "আহমেদ হাসান",
        "description": "লাঞ্চ এন্ট্রি যোগ করেছেন",
        "timestamp": "2025-05-28T12:30:00.000Z"
      },
      {
        "type": "payment",
        "user": "করিম উদ্দিন",
        "description": "১৫০০ টাকা পেমেন্ট করেছেন",
        "timestamp": "2025-05-28T10:15:00.000Z"
      }
    ]
  }
}
```

### 2. Monthly Report

**GET** `/reports/monthly`
_🔒 Protected Route_

**Query Parameters:**

- `month` (required): Month number (1-12)
- `year` (required): Year

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "month": 5,
    "year": 2025,
    "summary": {
      "total_members": 15,
      "total_meals": 1350,
      "total_expenses": 60750,
      "cost_per_meal": 45,
      "total_bills_generated": 22500,
      "total_payments_received": 18000,
      "outstanding_amount": 4500
    },
    "daily_breakdown": [
      {
        "date": "2025-05-01",
        "meals": 45,
        "expenses": 2025,
        "cost_per_meal": 45
      }
    ],
    "member_wise_summary": [
      {
        "user": {
          "_id": "64a1b2c3d4e5f6789012345",
          "name": "আহমেদ হাসান"
        },
        "total_meals": 30,
        "total_bill": 1500,
        "paid_amount": 1000,
        "due_amount": 500
      }
    ]
  }
}
```

### 3. Expense Analysis

**GET** `/reports/expenses`
_🔒 Protected Route_

**Query Parameters:**

- `start_date` (optional): YYYY-MM-DD format
- `end_date` (optional): YYYY-MM-DD format
- `category` (optional): groceries, gas, utilities, other

---

## ⚠️ Error Handling

### Standard Error Response Format:

```json
{
  "success": false,
  "message": "Error message in Bengali",
  "error_code": "VALIDATION_ERROR",
  "details": {
    "field": "email",
    "issue": "Invalid email format"
  }
}
```

### Common HTTP Status Codes:

- **200**: Success
- **201**: Created
- **400**: Bad Request (Validation Error)
- **401**: Unauthorized (Authentication Required)
- **403**: Forbidden (Insufficient Permission)
- **404**: Not Found
- **500**: Internal Server Error

### Common Error Codes:

- `VALIDATION_ERROR`: Input validation failed
- `AUTHENTICATION_REQUIRED`: JWT token missing or invalid
- `PERMISSION_DENIED`: User doesn't have required permissions
- `RESOURCE_NOT_FOUND`: Requested resource doesn't exist
- `DUPLICATE_ENTRY`: Trying to create duplicate record

---

## 🔧 Rate Limiting

- **Authentication endpoints**: 5 requests per minute
- **Other endpoints**: 100 requests per minute
- **Reports endpoints**: 10 requests per minute

## 📝 Request/Response Examples

### JavaScript (Fetch API)

```javascript
// Login request
const loginUser = async (email, password) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("token", data.data.token);
      return data.data.user;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Authenticated request
const getMeals = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:5000/api/meals", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching meals:", error);
    throw error;
  }
};
```

---

**Version**: 1.0  
**Last Updated**: May 28, 2025  
**Contact**: [Your Email] for API support
