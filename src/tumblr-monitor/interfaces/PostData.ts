import { PostPhoto } from "./PostPhoto";

export interface PostData {
  type: string;
  blog_name: string;
  id: number;
  id_string: string;
  post_url: string;
  slug: string;
  date: string;
  timestamp: number;
  state: string;
  format: string;
  reblog_key: string;
  tags: string[];
  short_url: string;
  summary: string;
  should_open_in_legacy: false;
  recommended_source: null;
  recommended_color: null;
  note_count: number;
  title: string;
  body: string;
  reblog: {
    comment: string;
    tree_html: string;
  };
  image_permalink?: string;
  photos?: PostPhoto[];
}
