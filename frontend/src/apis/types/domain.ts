/**
 * 도메인별 타입 정의 (Spring Boot Entity와 매칭)
 */

// User 도메인
export interface User {
  id: number;
  email: string;
  displayName: string;
  createdAt: string;
}

// Play 도메인
export interface Game {
  id: number;
  title: string;
  description: string | null;
}

export interface Question {
  id: number;
  gameId: number;
  content: string;
  answer: string | null;
  difficulty: string | null;
}

export interface PlayRecord {
  id: number;
  userId: number;
  gameId: number;
  score: number;
  playedAt: string;
}

// Build 도메인
export interface Roadmap {
  id: number;
  userId: number;
  title: string;
  content: string | null;
}

export interface Portfolio {
  id: number;
  userId: number;
  projectTitle: string;
  summary: string | null;
  link: string | null;
}

export interface SkillTag {
  id: number;
  name: string;
  description: string | null;
}

export interface UserScore {
  id: number;
  userId: number;
  skillTagId: number;
  score: number;
}

// Explore 도메인
export interface Resource {
  id: number;
  title: string;
  url: string;
  type: string | null;
}

export interface Scrap {
  id: number;
  userId: number;
  resourceId: number;
  note: string | null;
  createdAt: string;
}

// Profile 도메인
export interface ProfileView {
  user: User;
  playRecords: PlayRecord[];
  portfolios: Portfolio[];
  roadmaps: Roadmap[];
}

// Request DTOs
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  displayName: string;
  password: string;
}

export interface PlayRecordRequest {
  userId: number;
  gameId: number;
  score: number;
}

export interface ScrapCreateRequest {
  userId: number;
  resourceId: number;
  note?: string;
}

