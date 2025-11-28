import { API_BASE_URL } from "@/lib/constants";

const jsonHeaders = { "Content-Type": "application/json" };

async function handleJson(res) {
  if (!res.ok) {
    let message = "Có lỗi xảy ra";
    try {
      const data = await res.json();
      message = data.message || message;
    } catch (e) {}
    throw new Error(message);
  }
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export async function authSignup(payload) {
  // payload: { email, password, name, ... }
  const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(payload),
  });
  return handleJson(res); // { accessToken, user } (giả định)
}

export async function authLogin({ email, password }) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ email, password }),
  });
  return handleJson(res); // { accessToken, user }
}

export async function authRefreshToken() {
  const res = await fetch(`${API_BASE_URL}/api/auth/refresh-token`, {
    method: "POST",
  });
  return handleJson(res); // { accessToken }
}

export async function authGetMe(accessToken) {
  const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
    method: "GET",
    headers: accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : undefined,
  });
  return handleJson(res); // user
}

export async function authChangePassword(accessToken, payload) {
  // payload: { oldPassword, newPassword }
  const res = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
    method: "PUT",
    headers: {
      ...jsonHeaders,
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(payload),
  });
  return handleJson(res);
}

export async function authForgotPassword(payload) {
  // payload: { email }
  const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(payload),
  });
  return handleJson(res);
}

export async function authResetPassword(payload) {
  // payload: { token, newPassword }
  const res = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(payload),
  });
  return handleJson(res);
}
