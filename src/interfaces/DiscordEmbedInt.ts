/**
 * This is the structure that Discord expects for an embed.
 * Note that all properties are technically optional,
 * but cannot be empty strings.
 */
export interface DiscordEmbedInt {
  title?: string;
  type?: "rich";
  description?: string;
  url?: string;
  timestamp?: Date;
  color?: number;
  footer?: {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
  };
  image?: {
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
  };
  thumbnail?: {
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
  };
  video?: {
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
  };
  provider?: {
    name?: string;
    url?: string;
  };
  author?: {
    name?: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
  };
  fields?: {
    name: string;
    value: string;
    inline?: boolean;
  }[];
}
