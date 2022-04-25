export interface BlogData {
  ask: boolean;
  ask_anon: boolean;
  ask_page_title: string;
  asks_allow_media: boolean;
  avatar: {
    width: number;
    height: number;
    url: string;
  }[];
  can_chat: boolean;
  can_subscribe: boolean;
  description: string;
  is_nsfw: boolean;
  likes: number;
  name: string;
  posts: number;
  share_likes: boolean;
  subscribed: boolean;
  title: string;
  total_posts: number;
  updated: number;
  url: string;
  uuid: string;
  is_optout_ads: boolean;
}
