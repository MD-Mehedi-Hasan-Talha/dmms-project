export const missingFieldError = (fieldNames) => {
  const message = Array.isArray(fieldNames)
    ? `Missing required fields: ${fieldNames.join(", ")}`
    : `Missing required field: ${fieldNames}`;

  return {
    error: message,
    statusCode: 400,
  };
};

export const checkRequiredFields = (body, requiredFields) => {
  const missingFields = requiredFields.filter((field) => !body[field]);

  if (missingFields.length > 0) {
    return missingFieldError(missingFields);
  }
  return null;
};
