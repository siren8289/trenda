export interface ErrorResponse {
  message: string;
  status: number;
  timestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: ErrorResponse | null;
  timestamp: string;
}

export interface User {
  id: number;
  email: string;
  displayName: string;
  createdAt: string;
}

/** API 응답에서 User 객체를 안전하게 추출 (래퍼/직렬화 형태 모두 처리) */
export function normalizeUser(raw: unknown): User | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  // ApiResponse 래퍼: { data: User } 또는 { result: User }
  const wrapped = (o.data ?? o.result) as Record<string, unknown> | undefined;
  const candidate = wrapped ?? o;
  if (!candidate || typeof candidate !== "object") return null;
  const c = candidate as Record<string, unknown>;
  const id = c.id ?? c.userId;
  const email = c.email;
  const displayName =
    c.displayName ?? c.display_name ?? c.name ?? "";
  const createdAt = c.createdAt ?? c.created_at ?? new Date().toISOString();
  if (email == null || String(email).trim() === "") return null;
  const numId = typeof id === "number" ? id : Number(id);
  if (Number.isNaN(numId) || numId < 0) return null;
  return {
    id: numId,
    email: String(email).trim(),
    displayName: String(displayName).trim() || String(email).trim(),
    createdAt: typeof createdAt === "string" ? createdAt : new Date().toISOString(),
  };
}

export interface Roadmap {
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: string;
}

export interface Portfolio {
  id: number;
  userId: number;
  title: string;
  summary: string;
  createdAt: string;
}

export interface PlayRecord {
  id: number;
  userId: number;
  gameId: number;
  score: number;
  playedAt: string;
}


