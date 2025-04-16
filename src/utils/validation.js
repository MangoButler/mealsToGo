export const validateFormTextInput = (fieldName, value) => {
  if (!value || value.trim() === "") {
    return `${fieldName} is required`;
  }

  if (fieldName === "Title" && value.length < 3) {
    return "Title must be at least 3 characters long";
  }

  if (fieldName === "Description" && value.length < 10) {
    return "Description must be at least 10 characters long (or empty)";
  }

  return null;
};

export const renderError = (error) => {
  return error instanceof Error ? error.message : "Something went wrong";
};
