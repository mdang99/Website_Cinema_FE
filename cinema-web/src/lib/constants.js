// Nếu FE và BE cùng domain (Next API routes hoặc reverse proxy) thì để chuỗi rỗng
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
