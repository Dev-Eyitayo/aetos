// Add/merge these into your existing types.ts

export interface TeamMember {
  name: string;
}

export interface TeamGroup {
  role: string;
  members: TeamMember[];
}

export interface ProjectDetails {
  category: string;
  timeTaken: string;
  startDate: string;
  completedDate: string;
  technologies: string[];
  teamGroups: TeamGroup[];
  methodsUsed: string[];
  features?: string[]; // ← new: optional feature highlights
}

export interface Project {
  id: string;
  title: string;
  tags: string[];
  description: string;
  heroGradient: string;
  image?: string; // ← new: public folder path e.g. '/images/projects/bords.jpg'
  logoText: string;
  accentColor: string;
  link?: string;
  details?: ProjectDetails;
}
