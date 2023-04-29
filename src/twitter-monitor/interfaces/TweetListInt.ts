export interface TweetListInt {
  data: TweetInt[];
  includes: TweetIncludesInt;
}

export interface TweetIncludesInt {
  users: TweetUserInt[];
  tweets: TweetInt[];
  media?: TweetMediaInt[];
}

export interface TweetInt {
  id: string;
  referenced_tweets?: {
    type: string;
    id: string;
  }[];
  attachments: {
    media_keys: string[];
  };
  created_at: string;
  text: string;
  author_id: string;
}

export interface TweetUserInt {
  id: string;
  username: string;
  profile_image_url: string;
  name: string;
}

export interface TweetMediaInt {
  media_key: string;
  preview_image_url?: string;
  type: string;
  url?: string;
}
