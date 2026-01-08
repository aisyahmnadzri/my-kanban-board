export type TaskCategory =
  | "Pending"
  | "In Progress"
  | "On Hold"
  | "Review"
  | "Completed";

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  deadline: string; // ISO date string
  note?: string;    // optional comment
  url?: string;
}

export interface Project { 
  id: string; 
  name: string; 
  startDate: string; 
  endDate: string; 
  tasks: Task[]; }

