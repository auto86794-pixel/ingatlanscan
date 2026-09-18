import type {
  AssistantHeroModel,
} from "@/assistant/presenters/assistant-hero-presenter";

import type {
  AssistantItem,
} from "@/types/assistant";

import type {
  CalendarEvent,
} from "@/types/calendar";

import type {
  Task,
} from "@/types/task";

/**
 * Dashboard statisztikák.
 */
export type DashboardStats = {
  /**
   * Aktív ügyek száma.
   */
  activeCases: number;

  /**
   * Mai találkozók száma.
   */
  meetingsToday: number;

  /**
   * Közelgő találkozók száma.
   */
  upcomingMeetings: number;

  /**
   * Lezárt találkozók száma.
   */
  completedMeetings: number;

  /**
   * Nyitott follow-upok száma.
   */
  openFollowUps: number;

  /**
   * Ajánlatra váró ügyek száma.
   */
  pendingOffers: number;
};

/**
 * Dashboard aktivitás.
 */
export type DashboardActivity = {
  /**
   * Egyedi azonosító.
   */
  id: string;

  /**
   * Típus.
   */
  type:
    | "case"
    | "task"
    | "offer";

  /**
   * Ikon.
   */
  icon: string;

  /**
   * Cím.
   */
  title: string;

  /**
   * Alcím.
   */
  subtitle: string;

  /**
   * Dátum.
   */
  createdAt: string | null;

  /**
   * Hivatkozás.
   */
  href: string;
};

/**
 * Dashboard adatai.
 */
export type DashboardData = {
  /**
   * Mai naptári események.
   */
  todayEvents: CalendarEvent[];

  /**
   * Mai feladatok.
   */
  todayTasks: Task[];

  /**
   * Legutóbbi aktivitások.
   */
  recentActivities: DashboardActivity[];

  /**
   * Következő találkozó.
   */
  nextMeeting: CalendarEvent | null;

  /**
   * Assistant elemek.
   */
  assistantItems: AssistantItem[];

  /**
   * Kompakt Assistant Hero modell.
   *
   * Átmenetileg opcionális, amíg a
   * DashboardService bekötése elkészül.
   */
  hero?: AssistantHeroModel;

  /**
   * Dashboard statisztikák.
   */
  stats: DashboardStats;
};