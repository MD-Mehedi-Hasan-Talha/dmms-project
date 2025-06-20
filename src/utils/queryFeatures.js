// utils/queryFeatures.js

/**
 * Configuration Options for applyQueryFeatures
 * ==========================================
 *
 * @searchableFields
 * - Array of strings representing searchable data object keys
 * - Example: ['dayNameEn', 'dayNameBn', 'notes']
 * - Usage: ?search=Sunday searches within specified fields
 *
 * @exactMatchFields
 * - Array of fields requiring exact, case-sensitive matches
 * - Example: ['status']
 * - Usage: ?status=published must match exactly
 *
 * @defaultLimit
 * - Default number of items per page if limit not specified
 * - Usage: Defaults to value if ?limit not provided
 *
 * @excludedFilterKeys
 * - Query params that control behavior rather than filter data
 * - Default: ['search', 'page', 'limit', 'sort', 'fields']
 *
 * Example API Usage
 * ================
 *
 * Pagination:
 * ----------
 * /api/menus              -> Page 1, limit 7 (default)
 * /api/menus?page=2       -> Second page
 * /api/menus?page=3&limit=5  -> Third page, 5 items
 *
 * Search:
 * -------
 * /api/menus?search=Sunday     -> Search in all searchable fields
 * /api/menus?search=Item%20A1  -> Search in breakfast items
 * /api/menus?search=special    -> Search in notes
 *
 * Filtering:
 * ---------
 * /api/menus?dayNameEn=Monday     -> Case-insensitive partial match
 * /api/menus?status=published     -> Exact match (in exactMatchFields)
 * /api/menus?calories=520         -> Numeric match
 * /api/menus?isSpecial=true       -> Boolean match
 *
 * Combined Queries:
 * ---------------
 * /api/menus?search=Monday&status=published&page=1
 * /api/menus?dayNameEn=Tuesday&limit=3
 *
 * Note: Can be extended to support sorting via ?sort=date:asc
 */

/**
 * Applies search, filter, and pagination features to an array of data.
 *
 * @param {Array<object>} dataArray - The array of data objects to process.
 * @param {object} queryParams - The query parameters object (e.g., req.query from Next.js).
 * @param {object} [options={}] - Configuration options.
 * @param {Array<string>} [options.searchableFields=[]] - Fields to include in the text search.
 * @param {Array<string>} [options.exactMatchFields=[]] - Fields where filters should use exact match (case-sensitive).
 * @param {number} [options.defaultLimit=10] - Default number of items per page.
 * @param {Array<string>} [options.excludedFilterKeys=['search', 'page', 'limit', 'sort', 'fields']] - Query keys to exclude from general filtering.
 * @returns {{items: Array<object>, paginationMeta: object}} - The processed items and pagination metadata.
 */
export function applyQueryFeatures(dataArray, queryParams, options = {}) {
  let processedData = [...dataArray]; // Start with a copy to avoid mutating the original

  const {
    searchableFields = [],
    exactMatchFields = [],
    defaultLimit = 10,
    excludedFilterKeys = ["search", "page", "limit", "sort", "fields"], // Common query params not for direct filtering
  } = options;

  // 1. Search
  const searchTerm = queryParams.search?.toLowerCase();
  if (searchTerm && searchableFields.length > 0) {
    processedData = processedData.filter((item) =>
      searchableFields.some((field) => {
        const fieldValue = item[field];
        return (
          fieldValue && String(fieldValue).toLowerCase().includes(searchTerm)
        );
      })
    );
  }

  // 2. Filtering (based on other query parameters)
  const filterKeys = Object.keys(queryParams).filter(
    (key) => !excludedFilterKeys.includes(key.toLowerCase())
  );

  if (filterKeys.length > 0) {
    processedData = processedData.filter((item) => {
      return filterKeys.every((key) => {
        if (!item.hasOwnProperty(key) && item[key] === undefined) {
          // If the item doesn't have the key, it doesn't match unless the query value is also "undefined" or empty
          // This behavior can be adjusted based on requirements.
          // For now, if item lacks the key, it's not a match unless query value is specifically falsy.
          return !queryParams[key];
        }

        const itemValue = item[key];
        const queryValue = queryParams[key];

        if (exactMatchFields.includes(key)) {
          return String(itemValue) === String(queryValue);
        } else {
          // Default to case-insensitive partial match for strings if not exact
          // For non-string types, it will try a direct comparison after converting queryValue to string
          if (typeof itemValue === "string") {
            return String(itemValue)
              .toLowerCase()
              .includes(String(queryValue).toLowerCase());
          }
          // For numbers or booleans, an exact match is usually desired
          // Convert query param to number if itemValue is a number
          if (typeof itemValue === "number" && !isNaN(Number(queryValue))) {
            return itemValue === Number(queryValue);
          }
          if (typeof itemValue === "boolean") {
            return itemValue === (queryValue === "true" || queryValue === "1");
          }
          // Fallback to loose equality (be careful with this) or string comparison
          return (
            String(itemValue).toLowerCase() === String(queryValue).toLowerCase()
          );
        }
      });
    });
  }

  // 3. Pagination
  const totalItems = processedData.length;
  const page = parseInt(queryParams.page) || 1;
  const limit = parseInt(queryParams.limit) || defaultLimit;
  const totalPages = Math.ceil(totalItems / limit) || 1; // Ensure totalPages is at least 1
  const currentPage = Math.min(page, totalPages); // Don't allow page > totalPages

  const startIndex = (currentPage - 1) * limit;
  const endIndex = currentPage * limit;
  const items = processedData.slice(startIndex, endIndex);

  const paginationMeta = {
    totalItems,
    totalPages,
    currentPage,
    pageSize: limit,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };

  return { items, paginationMeta };
}
