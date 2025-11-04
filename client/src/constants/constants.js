const BASE_URL =
  process.env.NODE_ENV === "production" ? `` : "http://localhost:5000";

export const CHAT_API = `${BASE_URL}/api/v1/chat`;
export const AUTH_API = `${BASE_URL}/api/v1/auth`;
export const USER_API = `${BASE_URL}/api/v1/user`;

export default BASE_URL;
