import PostTag from "./post-tag";

export default class UserPost {
  author: string;
  content: string;
  date: Date;
  likes: number;

  constructor(author: string, content: string, date: Date, likes: number) {
    this.author = author ?? "";
    this.content = content ?? "";
    this.date = date ?? Date.now();
    this.likes = likes ?? 0;
  }
}
