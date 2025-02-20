import PostCard from "@/components/post-card";
import TrendingTags from "@/components/trending-tag";
import DefaultLayout from "@/layouts/default";
import UserPost from "@/models/post";
import { Input } from "@heroui/input";
import { Spacer } from "@heroui/spacer";
import { useMemo } from "react";
import usePostsStore from "@/stores/posts-stores";

export default function IndexPage() {
  const { posts, searchTerm, selectedTag, setSearchTerm, setSelectedTag } = usePostsStore();

  const filteredPosts = useMemo(() => {
    return posts.filter((post: UserPost) =>
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTag === "" || post.tags.some(tag => tag.source === selectedTag))
    )
  }, [posts, searchTerm, selectedTag])

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

          {selectedTag && (
            <div className="flex justify-between mb-4">
              <p>Filtered by tag: #{selectedTag}</p>
              <button
                onClick={() => setSelectedTag("")}
                className="text-sm text-red-500 hover:underline"
              >
                Clear filter
              </button>
            </div>
          )}

          <div className="flex flex-col gap-6">
            {filteredPosts.map((post, index) => (
              <PostCard
                key={index}
                post={post}
              />
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
