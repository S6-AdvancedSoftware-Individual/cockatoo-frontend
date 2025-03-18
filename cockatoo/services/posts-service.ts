import UserPost from "@/models/post";
import axios from "axios";

const API_URL = "http://localhost:8080/api/posts";

class PostsService {
  async getAllPosts(): Promise<UserPost[]> {
    const response = await axios.get<UserPost[]>(API_URL);
    return response.data;
  }

  async getPostById(id: number): Promise<UserPost> {
    const response = await axios.get<UserPost>(`${API_URL}/${id}`);
    return response.data;
  }

  async createPost(post: UserPost): Promise<UserPost> {
    const response = await axios.post<UserPost>(API_URL, post);
    return response.data;
  }

  async updatePost(id: number, post: UserPost): Promise<UserPost> {
    const response = await axios.put<UserPost>(`${API_URL}/${id}`, post);
    return response.data;
  }

  async deletePost(id: number): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  }
}

export default new PostsService();
