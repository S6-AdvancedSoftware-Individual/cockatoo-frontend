import PostCard from "@/components/post-card";
import TrendingTags from "@/components/trending-tag";
import DefaultLayout from "@/layouts/default";
import UserPost from "@/models/post";
import { Input } from "@heroui/input";
import { Spacer } from "@heroui/spacer";
import { useEffect, useMemo } from "react";
import usePostsStore from "@/stores/posts-stores";
import postsService from "@/services/posts-service";

export default function IndexPage() {
  const { posts, searchTerm, selectedTag, setSearchTerm, setFeed } =
    usePostsStore();

  useEffect(() => {
    const fetchPosts = async () => {
      const latestPosts = await postsService.getAllPosts();
      console.log(latestPosts);
      setFeed(latestPosts);
    };
    fetchPosts();
  }, [setFeed]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post: UserPost) =>
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm, selectedTag]);

  const lastUpdateAt = new Date().getMinutes();

  return (
    <DefaultLayout>
      <div className="grid grid-cols-3 gap-4 items-start content-center justify-center">
        <div />
        <div>
          <div className="w-full max-w-[400px] mb-6">
            <Input
              isClearable
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onClear={() => setSearchTerm("")}
              onChange={(element) => setSearchTerm(element.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex flex-col gap-6">
            {filteredPosts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
            {filteredPosts.length <= 0 ? (
              <p className="self-center">No posts found :(</p>
            ) : (
              <Spacer x={0} />
            )}
          </div>
        </div>
        <TrendingTags lastUpdateAt={lastUpdateAt} />
      </div>
    </DefaultLayout>
  );
}
