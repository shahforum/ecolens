export interface UserSession {
  id: string;
  email: string;
  name: string;
  token: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<UserSession> => {
    // Mock login logic
    console.log("Authenticating:", email);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: "user_123",
          email,
          name: "LA Hacks User",
          token: "mock_jwt_token_8a7d2",
        });
      }, 1000);
    });
  },

  logout: () => {
    localStorage.removeItem("eco_session");
    window.location.reload();
  },

  getSession: (): UserSession | null => {
    const session = localStorage.getItem("eco_session");
    return session ? JSON.parse(session) : null;
  },

  saveSession: (session: UserSession) => {
    localStorage.setItem("eco_session", JSON.stringify(session));
  },
};
