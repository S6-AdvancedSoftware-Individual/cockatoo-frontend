import PostTag from "./post-tag";

export default class UserPost {
  author: string;
  content: string;
  date: Date;
  likes: number;
  tags: PostTag[];

  constructor(
    author: string,
    content: string,
    date: Date,
    likes: number,
    tags: PostTag[]
  ) {
    this.author = author;
    this.content = content;
    this.date = date;
    this.likes = likes;
    this.tags = tags;
  }
}
