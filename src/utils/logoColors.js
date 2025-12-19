// Logo Color Extraction Utility
// This helps extract and use colors from your logo

export const extractLogoColors = async (imagePath) => {
  // This function can be used to extract dominant colors from the logo
  // For now, we'll use default colors that you can update
  return {
    primary: '#1a73e8',    // Main color - update based on your logo
    secondary: '#34a853',  // Secondary color - update based on your logo
    accent: '#ea4335',      // Accent color - update based on your logo
    dark: '#0d47a1',        // Dark variant
    light: '#4285f4',       // Light variant
  };
};

// Update these colors to match your logo
export const logoColors = {
  primary: '#1a73e8',      // Main logo color
  secondary: '#34a853',    // Secondary logo color  
  accent: '#ea4335',        // Accent logo color
  dark: '#0d47a1',          // Dark variant
  light: '#4285f4',         // Light variant
};

// Helper to get Tailwind color classes
export const getLogoColorClasses = () => ({
  primary: 'logo-primary',
  secondary: 'logo-secondary',
  accent: 'logo-accent',
  dark: 'logo-dark',
  light: 'logo-light',
});




