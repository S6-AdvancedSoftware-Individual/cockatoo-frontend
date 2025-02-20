import UserPost from '@/models/post';
import PostTag from '@/models/post-tag';
import { create } from 'zustand'


interface PostsStore {
  posts: UserPost[];
  searchTerm: string;
  selectedTag: string;
  setSearchTerm: (term: string) => void;
  setSelectedTag: (tag: string) => void;
}

const usePostsStore = create<PostsStore>((set) => ({
  posts: [
    new UserPost(
      "John Doe",
      "I sure love the Cockatoo messaging platform!",
      new Date(),
      6,
      []
    ),
    new UserPost("Ema", "This platform is absolutely amazing!", new Date(), 4, [
      new PostTag({ displayName: "Cool", source: "cool" }),
      new PostTag({ displayName: "NewStuff", source: "newstuff" }),
    ]),
    new UserPost("Frank", "This is the new Twitter, uhh- I mean X.", new Date(), 200, [
      new PostTag({ source: "newtechnologies" }),
    ]),
    new UserPost("Also Frank", "Wowza this is sick!", new Date(), 28, [
      new PostTag({ source: "cool" }),
    ]),
    new UserPost("Morris Hannessen", "Grrr this platform sucks!", new Date(), -9, [])
  ],
  searchTerm: '',
  selectedTag: '',
  setSearchTerm: (term: string) => set({ searchTerm: term }),
  setSelectedTag: (tag: string) => set({ selectedTag: tag }),
}))

export default usePostsStore;
