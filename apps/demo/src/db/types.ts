export interface User {
  name: string;
  age: number;
  email: string;
}

export interface Post {
  title: string;
  createdAt?: Date;
  content?: string;
  published: boolean;
  publishedAt?: Date;
  metaDescription?: string;
  userId: number;
}
