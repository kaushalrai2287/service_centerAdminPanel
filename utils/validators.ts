// Check if an email is valid
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Check if a password is strong
  export const isStrongPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
  // Check if a string is empty
  export const isNotEmpty = (value: string): boolean => {
    return value.trim().length > 0;
  };
  
  // Check if a number is within a range
  export const isNumberInRange = (value: number, min: number, max: number): boolean => {
    return value >= min && value <= max;
  };
  


  // Sanitize input to prevent XSS attacks
export const sanitizeInput = (input: string): string => {
    return input.replace(/[<>]/g, '');
  };
  
  // Remove extra spaces from a string
  export const trimSpaces = (input: string): string => {
    return input.trim();
  };
  




// Validate user registration data
interface UserRegistration {
    email: string;
    password: string;
    name: string;
  }
  
  export const validateUserRegistration = (data: UserRegistration): string | null => {
    if (!isNotEmpty(data.name)) {
      return 'Name cannot be empty';
    }
    if (!isValidEmail(data.email)) {
      return 'Invalid email address';
    }
    if (!isStrongPassword(data.password)) {
      return 'Password must be at least 8 characters long and contain letters and numbers';
    }
    return null; // Validation passed
  };
  