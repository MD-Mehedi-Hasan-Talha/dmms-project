# PrismaWrapper Documentation

`PrismaWrapper` is a utility class designed to extend Prisma's functionality with common features like soft deletes, pagination, and hooks for pre/post-query operations. It provides a consistent interface for interacting with your Prisma models.

## Installation

No special installation is required beyond your existing Prisma setup. Ensure `prisma-wrapper.js` is accessible in your project, typically in a `utils` or `lib` directory.

## Usage

To use the `PrismaWrapper`, you need to instantiate it with a Prisma client instance and the model name. A common pattern is to wrap all your Prisma models at application startup.

### Example: Wrapping Prisma Models

```javascript
// src/lib/prisma.js (or similar)
import { PrismaClient } from "@prisma/client";
import PrismaWrapper from "@/utils/prisma-wrapper"; // Adjust path as needed

const prisma = new PrismaClient();

// Function to wrap all Prisma models
function wrapAllModels(prismaClient) {
  const wrappedModels = {};
  for (const modelName in prismaClient) {
    if (typeof prismaClient[modelName] === "object" && modelName[0] !== "_") {
      wrappedModels[modelName] = new PrismaWrapper(prismaClient, modelName);
    }
  }
  return { ...prismaClient, ...wrappedModels };
}

const db = wrapAllModels(prisma);

export default db;
```

### Core Methods

`PrismaWrapper` extends the standard Prisma client methods with additional features. Here are the key methods and their functionalities:

#### `findManyX(options)`

This method is an enhanced version of Prisma's `findMany`. It supports:

- **`where`**: Standard Prisma `where` clause for filtering.
- **`select`**: Standard Prisma `select` clause for field selection.
- **`include`**: Standard Prisma `include` clause for including related records.
- **`orderBy`**: Standard Prisma `orderBy` clause for sorting.
- **`exclude`**: An array of strings specifying fields to exclude from the result.
- **`paginate`**: An object `{ page: number, pageSize: number }` for pagination. Returns `total`, `page`, `pageSize`, `totalPages`, and `data`.
- **`transform`**: A function to apply transformations to each result.
- **`withDeleted`**: A boolean (default `false`). If `true`, includes soft-deleted records in the results.

**Example:**

```javascript
const mealEntries = await db.mealEntry.findManyX({
  where: { messId: "someMessId" },
  paginate: { page: 1, pageSize: 10 },
  orderBy: { date: "desc" },
  include: {
    member: { include: { user: { select: { name: true } } } },
    mess: { select: { id: true, name: true } },
  },
  exclude: ["createdAt", "updatedAt"],
});
```

#### `findX(options)`

An enhanced version of Prisma's `findFirst` (or `findUnique` if a unique identifier is provided in `where`). It supports:

- **`where`**: Standard Prisma `where` clause.
- **`select`**: Standard Prisma `select` clause.
- **`include`**: Standard Prisma `include` clause.
- **`exclude`**: An array of strings specifying fields to exclude.
- **`transform`**: A function to transform the single result.
- **`withDeleted`**: A boolean (default `false`). If `true`, includes soft-deleted records.

**Example:**

```javascript
const user = await db.user.findX({
  where: { email: "test@example.com" },
  select: { id: true, name: true, email: true },
});
```

#### `findById(id, options)`

A convenience method to find a record by its `id`. It internally calls `findX`.

- **`id`**: The ID of the record to find.
- **`options`**: Same options as `findX` (e.g., `select`, `include`, `exclude`, `transform`, `withDeleted`).

**Example:**

```javascript
const mealEntry = await db.mealEntry.findById("someMealEntryId", {
  include: { member: true },
});
```

#### `findOrCreateX(options)`

Attempts to find a record based on the `where` clause. If not found, it creates a new record using the `create` data.

- **`where`**: The criteria to find an existing record.
- **`create`**: The data to use if a new record needs to be created.
- **`select`**, **`include`**, **`exclude`**, **`transform`**: Same as `findX`.

**Example:**

```javascript
const user = await db.user.findOrCreateX({
  where: { email: "newuser@example.com" },
  create: { name: "New User", email: "newuser@example.com" },
});
```

#### `softDeleteX(options)`

Performs a soft delete by setting the `deletedAt` field to the current timestamp. Requires a `deletedAt` field in your Prisma model schema.

- **`where`**: The criteria to select records for soft deletion.

**Example:**

```javascript
await db.mealEntry.softDeleteX({ where: { id: "mealEntryToDeleteId" } });
```

#### `countX(options)`

Counts records, respecting the soft delete logic by default.

- **`where`**: Standard Prisma `where` clause.
- **`withDeleted`**: A boolean (default `false`). If `true`, counts all records including soft-deleted ones.

**Example:**

```javascript
const activeMealEntriesCount = await db.mealEntry.countX({});
const allMealEntriesCount = await db.mealEntry.countX({ withDeleted: true });
```

### Hooks

`PrismaWrapper` supports `pre` and `post` hooks for `find` and `create` operations, allowing you to execute custom logic before or after a query.

**Hook Structure:**

```javascript
{
  type: 'pre' | 'post', // When the hook runs
  operation: 'find' | 'create', // Which operation triggers the hook
  fn: async (context) => { /* your logic */ } // The hook function
}
```

**Example: Setting up Hooks**

```javascript
// In your application setup or where you initialize PrismaWrapper
const myHooks = [
  {
    type: "pre",
    operation: "find",
    fn: async (context) => {
      console.log("Before find operation:", context.query);
    },
  },
  {
    type: "post",
    operation: "create",
    fn: async (context) => {
      console.log("After create operation, new record:", context.result);
    },
  },
];

db.mealEntry.setupHooks(myHooks);
```

### `excludeFields(data, fields)`

A utility method used internally to remove specified fields from an object. Can be used externally if needed.

- **`data`**: The object from which to exclude fields.
- **`fields`**: An array of field names (strings) to exclude.

**Example:**

```javascript
const sensitiveData = { id: 1, name: "John Doe", passwordHash: "abc" };
const publicData = db.user.excludeFields(sensitiveData, ["passwordHash"]);
// publicData will be { id: 1, name: 'John Doe' }
```

This documentation covers the main functionalities of the `PrismaWrapper`. For more detailed usage, refer to the source code of `src/utils/prisma-wrapper.js` and your Prisma schema.
