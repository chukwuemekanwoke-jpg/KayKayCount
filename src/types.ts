/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DailyMessage {
  dayNumber: number; // Countdown index (e.g., June 4 is Day 1, July 1 is Day 28)
  dateString: string; // e.g. "June 4, 2026"
  headline: string;
  body: string;
  category: 'motivation' | 'love' | 'career-tip' | 'celebration';
  tip?: string; // Supportive public relations/corporate communication tip for her UBA role
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  status: 'completed' | 'current' | 'upcoming';
  description: string;
}
