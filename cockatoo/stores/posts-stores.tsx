import UserPost from "@/models/post";
import PostTag from "@/models/post-tag";
import { create } from "zustand";

interface PostsStore {
  posts: UserPost[];
  searchTerm: string;
  selectedTag: string;
  setSearchTerm: (term: string) => void;
  setSelectedTag: (tag: string) => void;
  setFeed: (posts: UserPost[]) => void;
}

const usePostsStore = create<PostsStore>((set) => ({
  posts: [],
  searchTerm: "",
  selectedTag: "",
  setSearchTerm: (term: string) => set({ searchTerm: term }),
  setSelectedTag: (tag: string) => set({ selectedTag: tag }),
  setFeed: (posts: UserPost[]) => set({ posts }),
}));

export default usePostsStore;
