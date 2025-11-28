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

export async function getProfile(accessToken) {
  const res = await fetch(`${API_BASE_URL}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
  });
  return handleJson(res); // user
}

export async function updateProfile(accessToken, payload) {
  const res = await fetch(`${API_BASE_URL}/api/users/me`, {
    method: "PUT",
    headers: {
      ...jsonHeaders,
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(payload),
  });
  return handleJson(res);
}

export async function updatePreferences(accessToken, payload) {
  const res = await fetch(`${API_BASE_URL}/api/users/me/preferences`, {
    method: "PUT",
    headers: {
      ...jsonHeaders,
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(payload),
  });
  return handleJson(res);
}
