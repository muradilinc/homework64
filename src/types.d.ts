export interface Blog {
  id: number;
  title: string;
  description: string;
  date: string;
}

export interface BlogApi {
  [idBlog: string]: Blog;
}

export interface BlogState{
  idBlog: string;
  blog: Blog;
}