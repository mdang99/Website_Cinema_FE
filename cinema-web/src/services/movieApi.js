import { API_BASE_URL } from "@/lib/constants";

async function handleJson(res) {
  if (res.status === 401) {
    // lưu lỗi để context biết mà logout
    const err = new Error("UNAUTHORIZED");
    err.status = 401;
    throw err;
  }

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


export async function getVipMovies(accessToken) {
  const res = await fetch(`${API_BASE_URL}/api/movies/protected`, {
    headers: accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : undefined,
  });
  
  if (res.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
    return []; // trả về mảng rỗng để UI khỏi crash
  }
  return handleJson(res); // Movie[]
}

export async function getAdminMovies(accessToken) {
  const res = await fetch(`${API_BASE_URL}/api/admin/movies`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
  });
  return handleJson(res); // Movie[]
}
