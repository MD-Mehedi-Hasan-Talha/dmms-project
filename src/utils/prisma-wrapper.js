const { PrismaClient } = require("@prisma/client");

// Main Prisma wrapper class
class PrismaWrapper {
  constructor(prisma, model) {
    this.prisma = prisma;
    this.model = model;
    this.hooks = [];
  }

  // Register hooks
  setupHooks(hooks) {
    this.hooks = hooks;
  }

  // Run hooks
  async runHooks(type, operation, context) {
    const relevantHooks = this.hooks.filter(
      (h) => h.type === type && h.operation === operation
    );
    for (const hook of relevantHooks) {
      await hook.fn(context);
    }
  }

  // Exclude fields
  excludeFields(data, fields) {
    const result = { ...data };
    fields.forEach((field) => delete result[field]);
    return result;
  }

  // Find many with wrapper features
  async findManyX({
    where = {},
    select,
    include,
    orderBy,
    exclude = [],
    paginate,
    transform,
    withDeleted = false,
  }) {
    await this.runHooks("pre", "find", {
      query: { where, select, include, orderBy },
    });

    // Apply soft delete filter unless withDeleted is true
    const softDeleteWhere = withDeleted ? where : { ...where, deletedAt: null };

    // Handle pagination
    let skip;
    let take;
    let paginationMeta;

    if (paginate) {
      if (paginate.page < 1 || paginate.pageSize <= 0) {
        throw new Error(
          "Invalid pagination parameters: page must be >= 1, pageSize must be > 0"
        );
      }
      skip = (paginate.page - 1) * paginate.pageSize;
      take = paginate.pageSize;

      const total = await this.prisma[this.model].count({
        where: withDeleted ? softDeleteWhere : where,
      });
      paginationMeta = {
        data: [],
        total,
        page: paginate.page,
        pageSize: paginate.pageSize,
        totalPages: Math.ceil(total / paginate.pageSize),
      };
    }

    // Execute query
    const results = await this.prisma[this.model].findMany({
      where: withDeleted ? softDeleteWhere : where,
      select,
      include,
      orderBy,
      skip,
      take,
    });

    // Apply exclude and transform
    let processedResults = results.map((result) => {
      let processed = result;
      if (exclude.length > 0) {
        processed = this.excludeFields(result, exclude);
      }
      if (transform) {
        processed = transform(processed);
      }
      return processed;
    });

    await this.runHooks("post", "find", {
      query: { where, select, include, orderBy },
      result: processedResults,
    });

    return paginationMeta
      ? { ...paginationMeta, data: processedResults }
      : processedResults;
  }

  // Find single record
  async findX({
    where = {},
    select,
    include,
    exclude = [],
    transform,
    withDeleted = false,
  }) {
    await this.runHooks("pre", "find", { query: { where, select, include } });

    const softDeleteWhere = withDeleted ? where : { ...where, deletedAt: null };

    let result = await this.prisma[this.model].findFirst({
      where: softDeleteWhere,
      select,
      include,
    });

    if (result) {
      if (exclude.length > 0) {
        result = this.excludeFields(result, exclude);
      }
      if (transform) {
        result = transform(result);
      }
    }

    await this.runHooks("post", "find", {
      query: { where, select, include },
      result,
    });
    return result;
  }

  // Find by ID
  async findById(id, options = {}) {
    return this.findX({ where: { id }, ...options });
  }

  // Find or create
  async findOrCreateX({
    where,
    create,
    select,
    include,
    exclude = [],
    transform,
  }) {
    await this.runHooks("pre", "create", { query: { where, create } });

    let result = await this.prisma[this.model].findFirst({ where });

    if (!result) {
      result = await this.prisma[this.model].create({
        data: create,
        select,
        include,
      });
    }

    if (exclude.length > 0) {
      result = this.excludeFields(result, exclude);
    }
    if (transform) {
      result = transform(result);
    }

    await this.runHooks("post", "create", { query: { where, create }, result });
    return result;
  }

  // Soft delete
  async softDeleteX({ where }) {
    await this.runHooks("pre", "delete", { query: { where } });

    await this.prisma[this.model].updateMany({
      where,
      data: { deletedAt: new Date() },
    });

    await this.runHooks("post", "delete", { query: { where } });
  }

  // Count records
  async countX({ where = {}, withDeleted = false }) {
    const softDeleteWhere = withDeleted ? where : { ...where, deletedAt: null };
    return this.prisma[this.model].count({ where: softDeleteWhere });
  }

  // Lean results (strip Prisma metadata)
  async lean(query) {
    const results = await this.prisma[this.model].findMany(query);
    return results.map((result) => JSON.parse(JSON.stringify(result)));
  }

  // Global middleware for logging
  useLogging(logger) {
    this.setupHooks([
      {
        type: "pre",
        operation: "find",
        fn: async ({ query }) =>
          logger(`Executing query: ${JSON.stringify(query)}`),
      },
      {
        type: "post",
        operation: "find",
        fn: async ({ result }) =>
          logger(`Query result: ${JSON.stringify(result)}`),
      },
    ]);
  }
}

// Factory to wrap all models
function wrapAllModels(prisma) {
  const models = Object.keys(prisma).filter(
    (key) => !key.startsWith("_") && !key.startsWith("$")
  );
  const wrapped = {};
  for (const model of models) {
    wrapped[model] = new PrismaWrapper(prisma, model);
  }
  return wrapped;
}

// Example usage
const prisma = new PrismaClient();
const db = wrapAllModels(prisma);

module.exports = { PrismaWrapper, wrapAllModels, db };
