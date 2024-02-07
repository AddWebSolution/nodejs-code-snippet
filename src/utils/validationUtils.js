// validationUtils.js

// Example utility functions for validation
exports.validateEmail = (email) => {
   // Regular expression for validating email addresses
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
   // Test the provided email against the regular expression
   return emailRegex.test(email);
};

// Other utility functions can be defined here
