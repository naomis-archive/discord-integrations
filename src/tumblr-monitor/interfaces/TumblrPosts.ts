import { BlogData } from "./BlogData";
import { PostData } from "./PostData";

export interface TumblrPosts {
  meta: {
    status: number;
    msg: string;
  };
  response: {
    blog: BlogData;
    posts: PostData[];
  };
}
