import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import UserPost from "@/models/post";
import PostTag from "@/models/post-tag";
import usePostsStore from "@/stores/posts-stores";

interface PostCardProps {
  post: UserPost;
}

export default function PostCard(parameters: PostCardProps) {
  const { selectedTag, setSelectedTag } = usePostsStore();

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex flex-row justify-between">
        <p className="text-2xl ">{parameters.post.author}</p>
        {/* <p className="text-small text-default-200">{parameters.post.date.toDateString()}</p> */}
      </CardHeader>
      <CardBody>
        <p>{parameters.post.content}</p>
      </CardBody>
      <CardFooter className="flex gap-2 align-middle">
        <HandThumbUpIcon className="size-4" />
        <p className="text-small text-default-500"> {parameters.post.likes}</p>
      </CardFooter>
    </Card>
  );
}
