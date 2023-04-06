export interface TootListInt {
  id: string;
  createdAt: string;
  in_reply_to_id: string | null;
  in_reply_to_account_id: string | null;
  sensitive: boolean;
  spoiler_text: string;
  visibility: string;
  language: string;
  uri: string;
  url: string;
  replies_count: number;
  reblogs_count: number;
  favourites_count: number;
  edited_at: string | null;
  content: string;
  reblog: TootListInt | null;
  account: {
    display_name: string;
    avatar: string;
    url: string;
  };
  media_attachments: {
    id: string;
    type: string;
    url: string;
  }[];
}
