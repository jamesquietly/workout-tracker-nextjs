import { Plan } from "@/features/plan/interfaces/Plan";

export interface PlanActivity {
  id: number;
  assignedDate: Date;
  notes?: string;
  plan?: Plan;
}