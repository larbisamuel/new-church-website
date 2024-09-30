
export const isAuthenticated = () => {
    const authToken = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    return authToken !== null; // Return true if a token exists, indicating the user is authenticated
  };
  