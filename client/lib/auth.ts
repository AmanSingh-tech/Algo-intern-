// In client/lib/auth.ts
export const saveToken = (token: string): void => {
  // You will call this function in your login page's logic
  localStorage.setItem('user_token', token);
};

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('user_token');
  }
  return null;
};

export const removeToken = (): void => {
  localStorage.removeItem('user_token');
};