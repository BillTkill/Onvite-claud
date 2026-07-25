"use client";

/**
 * Mock authentication — DEMO ONLY.
 * There is no backend: users live in localStorage and "passwords" are compared
 * in plain text purely so the login/register/panel flows are navigable.
 * Do NOT reuse this for anything real.
 */
import { createContext, useContext, useEffect, useState, useCallback } from "react";

const STORAGE_USER = "onvite.user";
const STORAGE_ACCOUNTS = "onvite.accounts";

/** Seed accounts advertised on the login screen. */
const DEMO_ACCOUNTS = [
  {
    email: "admin@onvite.com",
    password: "Admin123!",
    name: "Admin Onvite",
    username: "admin",
    role: "admin",
    plan: "vip",
  },
  {
    email: "maria@mail.com",
    password: "Cliente123!",
    name: "María Fernández",
    username: "maria",
    role: "client",
    plan: "pro",
  },
];

function initials(name = "") {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "·";
}

function readAccounts() {
  try {
    const raw = localStorage.getItem(STORAGE_ACCOUNTS);
    const extra = raw ? JSON.parse(raw) : [];
    return [...DEMO_ACCOUNTS, ...extra];
  } catch {
    return [...DEMO_ACCOUNTS];
  }
}

function persistUser(user) {
  if (user) localStorage.setItem(STORAGE_USER, JSON.stringify(user));
  else localStorage.removeItem(STORAGE_USER);
}

function publicUser(account) {
  const { password, ...rest } = account;
  return { ...rest, initials: initials(account.name) };
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_USER);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const login = useCallback((email, password) => {
    const account = readAccounts().find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (!account || account.password !== password) {
      return { ok: false, error: "Correo o contraseña incorrectos." };
    }
    const u = publicUser(account);
    setUser(u);
    persistUser(u);
    return { ok: true, user: u };
  }, []);

  const register = useCallback(({ name, username, email, password }) => {
    const accounts = readAccounts();
    if (accounts.some((a) => a.email.toLowerCase() === email.trim().toLowerCase())) {
      return { ok: false, error: "Ya existe una cuenta con ese correo." };
    }
    const account = { name, username, email: email.trim(), password, role: "client", plan: null };
    try {
      const raw = localStorage.getItem(STORAGE_ACCOUNTS);
      const extra = raw ? JSON.parse(raw) : [];
      extra.push(account);
      localStorage.setItem(STORAGE_ACCOUNTS, JSON.stringify(extra));
    } catch {
      /* ignore */
    }
    const u = publicUser(account); // new users have no plan → locked panel
    setUser(u);
    persistUser(u);
    return { ok: true, user: u };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    persistUser(null);
  }, []);

  /** Demo helper: preview a different plan's panel without changing accounts. */
  const setPlan = useCallback((plan) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, plan };
      persistUser(next);
      return next;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, ready, login, register, logout, setPlan }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
