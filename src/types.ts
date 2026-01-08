export interface Task {
  id: string;
  title: string;
  category: "Pending" | "In Progress" | "On Hold" | "Review" | "Completed";
  deadline: string; // ISO date string
  note?: string;    // optional comment
  url?: string;     // optional link
}

export interface Project {
  id: string;
  name: string;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  tasks: Task[];
}


