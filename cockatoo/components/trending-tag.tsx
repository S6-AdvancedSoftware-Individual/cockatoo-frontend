import usePostsStore from "@/stores/posts-stores";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";

interface TrendingTagsProps {
  lastUpdateAt: number;
}

export default function TrendingTags(parameters: TrendingTagsProps) {
  const trendingTags: string[] = ["CockatooLaunch", "AwesomeSauce", "Wowza"];
  const { setSelectedTag } = usePostsStore();

  return (
    <Card>
      <CardHeader>
        <p>Trending Chirps!</p>
      </CardHeader>
      <CardBody className="gap-3">
        {trendingTags.map((tag: string) => (
          <p
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className="cursor-pointer text-blue-400 hover:text-blue-600"
          >
            #{tag}
          </p>
        ))}
      </CardBody>
      <CardFooter>
        <p className="text-small text-default-200"> Last update was {parameters.lastUpdateAt}m ago </p>
      </CardFooter>
    </Card>
  );
}
