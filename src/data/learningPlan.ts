import { dailyLessons } from "./lessons";
import type { DailyLesson } from "./lessons";

/** Fixed day modules; learners can open any day without completing earlier days. */
export type PlanDay = DailyLesson;
export const monthlyLearningPlan: PlanDay[] = dailyLessons;
