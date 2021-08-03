export interface TweetListInt {
  data: TweetInt[];
  includes: TweetIncludesInt;
}

export interface TweetIncludesInt {
  users: TweetUserInt[];
  tweets: TweetInt[];
}

export interface TweetInt {
  id: string;
  referenced_tweets?: {
    type: string;
    id: string;
  }[];
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
