export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  thumbnail: string | null;
  date: string;
  readTime: number;
}