// export const TOKEN_KEY = "token";

// export const setToken = (token: string) => {
//   if (typeof window !== "undefined") {
//     localStorage.setItem(TOKEN_KEY, token);
//   }
// };

// export const getToken = (): string | null => {
//   if (typeof window !== "undefined") {
//     return localStorage.getItem(TOKEN_KEY);
//   }
//   return null;
// };

// export const removeToken = () => {
//   if (typeof window !== "undefined") {
//     localStorage.removeItem(TOKEN_KEY);
//   }
// };

const TOKEN_KEY = "token";

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};