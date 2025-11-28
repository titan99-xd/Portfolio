export interface Project {
  id: number;
  title: string;
  description: string;
  link?: string | null;
  thumbnail?: string | null;
  features: string[];
}
