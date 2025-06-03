// utils/apiResponse.js

const DEFAULT_SUCCESS_MESSAGE = "Operation completed successfully.";
const DEFAULT_ERROR_MESSAGE = "An error occurred.";

/**
 * Sends a successful JSON response.
 * @param {import('next').NextApiResponse} res - NextApiResponse object.
 * @param {any} data - The payload to send.
 * @param {string} [message=DEFAULT_SUCCESS_MESSAGE] - Optional custom success message.
 * @param {number} [statusCode=200] - HTTP status code.
 */
export function sendSuccess(
  res,
  data,
  message = DEFAULT_SUCCESS_MESSAGE,
  statusCode = 200
) {
  const response = {
    success: true,
    message,
    data,
  };
  res.status(statusCode).json(response);
}

/**
 * Sends a successful paginated JSON response.
 * @param {import('next').NextApiResponse} res - NextApiResponse object.
 * @param {Array<any>} items - Array of items for the current page.
 * @param {object} paginationMeta - Metadata for pagination.
 * @param {number} paginationMeta.totalItems
 * @param {number} paginationMeta.totalPages
 * @param {number} paginationMeta.currentPage
 * @param {number} paginationMeta.pageSize
 * @param {boolean} paginationMeta.hasNextPage
 * @param {boolean} paginationMeta.hasPreviousPage
 * @param {string} [message="Data retrieved successfully."] - Optional custom success message.
 * @param {number} [statusCode=200] - HTTP status code.
 */
export function sendPaginatedSuccess(
  res,
  items,
  paginationMeta,
  message = "Data retrieved successfully.",
  statusCode = 200
) {
  const paginatedData = {
    items,
    pagination: paginationMeta,
  };
  const response = {
    success: true,
    message,
    data: paginatedData,
  };
  res.status(statusCode).json(response);
}

/**
 * Sends an error JSON response.
 * @param {import('next').NextApiResponse} res - NextApiResponse object.
 * @param {string} [message=DEFAULT_ERROR_MESSAGE] - Error message.
 * @param {number} [statusCode=500] - HTTP status code.
 * @param {object} [errorDetails] - Optional object containing error code and further details.
 * @param {string} [errorDetails.code] - Error code.
 * @param {string|object} [errorDetails.details] - Specific error details.
 * @param {null|object} [data=null] - Optional data to send with the error, defaults to null. Can be {} for consistency.
 */
export function sendError(
  res,
  message = DEFAULT_ERROR_MESSAGE,
  statusCode = 500,
  errorDetails,
  data = null // Can be {}
) {
  const response = {
    success: false,
    message,
    error: errorDetails || { details: message }, // Ensure error object exists
    data: data === undefined ? null : data, // Handle if data is explicitly passed as undefined vs not passed
  };
  res.status(statusCode).json(response);
}

// --- Alternative: Functions that RETURN the response object ---

/**
 * Creates a success response object.
 * @param {any} data - The payload.
 * @param {string} [message=DEFAULT_SUCCESS_MESSAGE] - Optional custom success message.
 * @returns {object} The success response object.
 */
export function createSuccessResponse(data, message = DEFAULT_SUCCESS_MESSAGE) {
  return {
    success: true,
    message,
    data,
  };
}

/**
 * Creates a paginated success response object.
 * @param {Array<any>} items - Array of items for the current page.
 * @param {object} paginationMeta - Metadata for pagination.
 * @param {string} [message="Data retrieved successfully."] - Optional custom success message.
 * @returns {object} The paginated success response object.
 */
export function createPaginatedResponse(
  items,
  paginationMeta,
  message = "Data retrieved successfully."
) {
  return {
    success: true,
    message,
    data: {
      items,
      pagination: paginationMeta,
    },
  };
}

/**
 * Creates an error response object.
 * @param {string} [message=DEFAULT_ERROR_MESSAGE] - Error message.
 * @param {object} [errorDetails] - Optional object containing error code and further details.
 * @param {null|object} [data=null] - Optional data to send with the error.
 * @returns {object} The error response object.
 */
export function createErrorResponse(
  message = DEFAULT_ERROR_MESSAGE,
  errorDetails,
  data = null
) {
  return {
    success: false,
    message,
    error: errorDetails || { details: message },
    data: data === undefined ? null : data,
  };
}
