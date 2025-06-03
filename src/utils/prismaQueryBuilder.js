// utils/prismaQueryBuilder.js
/**
 * Prisma Query Builder Documentation
 *
 * This utility provides a flexible way to build Prisma queries from HTTP query parameters.
 *
 * Key Features:
 * 1. Query Building
 *    - Returns {where, orderBy, skip, take, select} for Prisma queries
 *    - Compatible with prisma.model.findMany() and prisma.model.count()
 *
 * 2. Filtering Capabilities
 *    - Search: Uses case-insensitive contains across multiple fields
 *    - Type Handling: Converts strings to appropriate types (number, boolean, date)
 *    - Exact Matching: Supports exact equality comparisons
 *
 * 3. Sorting
 *    - Multiple field support: sort=name:asc,createdAt:desc
 *    - Shorthand syntax: -fieldName for descending order
 *
 * 4. Field Selection
 *    - Selective column fetching: ?fields=id,name,email
 *    - Improves query performance by limiting returned data
 *
 * 5. Parameter Mapping
 *    - Maps API parameter names to Prisma model fields
 *    - Example: user_status (API) -> userStatus (Prisma)
 *
 * Usage Example:
 * const queryArgs = buildPrismaQuery(req.query, {
 *   searchableFields: ['name', 'description'],
 *   numericFields: ['price'],
 *   exactMatchFields: ['status']
 * });
 * const results = await prisma.product.findMany(queryArgs);
 *
 * Note: For serverless environments, ensure proper connection handling using
 * prisma.$disconnect() in finally blocks.
 */

/**
 * Parses query parameters and builds Prisma query arguments.
 *
 * @param {object} queryParams - The req.query object from Next.js.
 * @param {object} [options={}] - Configuration options.
 * @param {string[]} [options.searchableFields=[]] - Fields to include in text search (uses 'contains' and 'OR').
 * @param {string[]} [options.numericFields=[]] - Query params that should be treated as numbers.
 * @param {string[]} [options.booleanFields=[]] - Query params that should be treated as booleans.
 * @param {string[]} [options.dateFields=[]] - Query params that should be treated as dates (Prisma often handles ISO strings).
 * @param {string[]} [options.exactMatchFields=[]] - Fields for which filters should use exact 'equals'.
 * @param {string} [options.defaultSortField=null] - Default field to sort by if 'sort' param is not provided.
 * @param {'asc'|'desc'} [options.defaultSortOrder='asc'] - Default sort order.
 * @param {number} [options.defaultLimit=10] - Default items per page.
 * @param {object} [options.fieldMappings={}] - Map query param keys to Prisma model field names (e.g., { user_status: 'status' }).
 * @param {string[]} [options.excludedFilterKeys=['search', 'page', 'limit', 'sort', 'fields']] - Keys to exclude from direct filtering.
 * @returns {{
 *   where: object,
 *   orderBy: object | object[],
 *   skip: number | undefined,
 *   take: number | undefined,
 *   select: object | undefined
 * }} Prisma query arguments.
 */
export function buildPrismaQuery(queryParams, options = {}) {
  const {
    searchableFields = [],
    numericFields = [],
    booleanFields = [],
    dateFields = [], // Prisma often handles ISO strings directly for Date fields
    exactMatchFields = [],
    defaultSortField = null,
    defaultSortOrder = "asc",
    defaultLimit = 10,
    fieldMappings = {},
    excludedFilterKeys = ["search", "page", "limit", "sort", "fields"], // 'fields' for selecting specific fields
  } = options;

  const prismaQueryArgs = {
    where: {},
    orderBy: undefined,
    skip: undefined,
    take: undefined,
    select: undefined,
  };

  const whereConditions = []; // We'll build conditions and then use AND

  // 1. Search Logic
  const searchTerm = queryParams.search?.trim();
  if (searchTerm && searchableFields.length > 0) {
    const searchOrConditions = searchableFields.map((field) => {
      const prismaField = fieldMappings[field] || field;
      return { [prismaField]: { contains: searchTerm, mode: "insensitive" } };
    });
    if (searchOrConditions.length > 0) {
      whereConditions.push({ OR: searchOrConditions });
    }
  }

  // 2. Filtering Logic
  for (const key in queryParams) {
    if (excludedFilterKeys.includes(key) || !queryParams.hasOwnProperty(key)) {
      continue;
    }

    const prismaField = fieldMappings[key] || key;
    let value = queryParams[key];

    // Type conversion
    if (numericFields.includes(prismaField) || numericFields.includes(key)) {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) value = numValue;
      else continue; // Skip if not a valid number
    } else if (
      booleanFields.includes(prismaField) ||
      booleanFields.includes(key)
    ) {
      if (value === "true" || value === "1") value = true;
      else if (value === "false" || value === "0") value = false;
      else continue; // Skip if not a valid boolean string
    } else if (dateFields.includes(prismaField) || dateFields.includes(key)) {
      const dateValue = new Date(value);
      if (!isNaN(dateValue.getTime())) value = dateValue;
      else continue; // Skip if not a valid date string
    }

    // Build filter condition
    if (
      exactMatchFields.includes(prismaField) ||
      exactMatchFields.includes(key)
    ) {
      whereConditions.push({ [prismaField]: { equals: value } });
    } else if (typeof value === "string") {
      // Default for other string fields: case-insensitive contains
      whereConditions.push({
        [prismaField]: { contains: value, mode: "insensitive" },
      });
    } else {
      // For numbers, booleans, dates (already converted) after type conversion
      whereConditions.push({ [prismaField]: { equals: value } });
    }
  }

  if (whereConditions.length > 0) {
    prismaQueryArgs.where = { AND: whereConditions };
  }

  // 3. Sorting Logic
  // Example: sort=createdAt:desc or sort=name or sort=-name (for desc)
  const sortParam = queryParams.sort;
  if (sortParam) {
    const sortFields = [];
    sortParam.split(",").forEach((part) => {
      let field = part.trim();
      let order = "asc";
      if (field.startsWith("-")) {
        order = "desc";
        field = field.substring(1);
      } else if (field.endsWith(":asc")) {
        field = field.slice(0, -4);
      } else if (field.endsWith(":desc")) {
        order = "desc";
        field = field.slice(0, -5);
      }
      const prismaField = fieldMappings[field] || field;
      sortFields.push({ [prismaField]: order });
    });
    if (sortFields.length > 0) prismaQueryArgs.orderBy = sortFields;
  } else if (defaultSortField) {
    const prismaField = fieldMappings[defaultSortField] || defaultSortField;
    prismaQueryArgs.orderBy = { [prismaField]: defaultSortOrder };
  }

  // 4. Pagination Logic
  const page = parseInt(queryParams.page) || 1;
  const limit = parseInt(queryParams.limit) || defaultLimit;

  if (limit > 0) {
    // Allow limit=0 or no limit to fetch all (if desired, otherwise enforce a max)
    prismaQueryArgs.take = limit;
    prismaQueryArgs.skip = (page - 1) * limit;
  }

  // 5. Field Selection (Projection)
  // Example: fields=id,name,email
  const fieldsParam = queryParams.fields;
  if (fieldsParam) {
    const selectFields = {};
    fieldsParam.split(",").forEach((field) => {
      const trimmedField = field.trim();
      const prismaField = fieldMappings[trimmedField] || trimmedField;
      if (prismaField) selectFields[prismaField] = true;
    });
    if (Object.keys(selectFields).length > 0) {
      prismaQueryArgs.select = selectFields;
    }
  }

  return prismaQueryArgs;
}

/**
 * Helper to get pagination metadata after fetching total count.
 *
 * @param {number} totalItems - Total items matching the filters.
 * @param {object} queryParams - The req.query object.
 * @param {number} [defaultLimit=10] - Default items per page.
 * @returns {object} Pagination metadata.
 */
export function getPaginationMeta(totalItems, queryParams, defaultLimit = 10) {
  const page = parseInt(queryParams.page) || 1;
  const limit = parseInt(queryParams.limit) || defaultLimit;
  const pageSize = limit <= 0 ? totalItems : limit; // if limit is 0 or less, pageSize is totalItems for a single page
  const totalPages = pageSize > 0 ? Math.ceil(totalItems / pageSize) || 1 : 1;
  const currentPage = Math.min(page, totalPages);

  return {
    totalItems,
    totalPages,
    currentPage,
    pageSize: limit, // Reflects the requested limit
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}
