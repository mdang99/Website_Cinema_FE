"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  authGetMe,
  authLogin,
  authRefreshToken,
  authSignup,
  authChangePassword,
} from "@/services/authApi";

const AuthContext = createContext(undefined);

const ACCESS_TOKEN_KEY = "access_token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // init từ localStorage
  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem(ACCESS_TOKEN_KEY)
        : null;

    if (!token) {
      setLoading(false);
      return;
    }

    setAccessToken(token);
    loadCurrentUser(token);
  }, []);

  async function loadCurrentUser(token) {
    try {
      const me = await authGetMe(token);
      setUser(me);
    } catch (e) {
      if (e.status === 401) {
        logout(); // xóa token + user
      }
      // thử refresh token một lần
      try {
        const data = await authRefreshToken();
        if (data?.accessToken) {
          setAccessToken(data.accessToken);
          if (typeof window !== "undefined") {
            window.localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
          }
          const me = await authGetMe(data.accessToken);
          setUser(me);
        } else {
          logout();
        }
      } catch {
        logout();
      }
    } finally {
      setLoading(false);
    }
  }

  async function login(email, password) {
    setLoading(true);
    try {
      const data = await authLogin({ email, password });
      const token = data.accessToken;
      setAccessToken(token);
      setUser(data.user);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
      }
    } finally {
      setLoading(false);
    }
  }

  async function signup(payload) {
    setLoading(true);
    try {
      const data = await authSignup(payload);
      const token = data.accessToken;
      setAccessToken(token);
      setUser(data.user);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
      }
    } finally {
      setLoading(false);
    }
  }
  async function changePassword(payload) {
    if (!accessToken) throw new Error("Bạn chưa đăng nhập");
    setLoading(true);
    try {
      const data = await authChangePassword(accessToken, payload);
      // Nếu API trả về token mới
      if (data?.accessToken) {
        setAccessToken(data.accessToken);
        setUser(data.user);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
        }
      }

      return data;
    } finally {
      setLoading(false);
    }
  }
  function logout() {
    setUser(null);
    setAccessToken(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  }

  const value = {
    user,
    accessToken,
    loading,
    login,
    signup,
    logout,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
