export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateSignup(data: any): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (!data.name || typeof data.name !== "string" || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long.";
  }
  
  if (!data.email || typeof data.email !== "string" || !validateEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  
  if (!data.password || typeof data.password !== "string" || data.password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateLogin(data: any): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (!data.email || typeof data.email !== "string" || !validateEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  
  if (!data.password || typeof data.password !== "string" || data.password.length === 0) {
    errors.password = "Password is required.";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
