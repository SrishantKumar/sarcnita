export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
}

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  content: string;
  author: string;
  tags: string[];
}

export interface Alumni {
  id: number;
  name: string;
  graduationYear: number;
  industry: string;
  achievements: string[];
  image: string;
  story: string;
}