
export type SpotifyResponse = {
  episodes: SpotifyResponseObj;
}

  export  type SpotifyResponseObj = {
    href: string;
    items?: SpotifyEpisodeObj[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
  }
  
  export type SpotifyEpisodeObj = {
    episodeList?: any;
    audio_preview_url?: string;
    description: string;
    duration_ms?: number;
    explicit?: boolean;
    external_urls?: Url;
    href?: string;
    html_description?: string;
    id?: string;
    images?: Image[];
    is_externally_hosted?: boolean;
    is_playable?: boolean;
    language: string;
    languages?: string[];
    name: string;
    release_date?: string;
    release_date_precision?: string;
    type?: string;
    uri: string;
  }
  
  export type Url = {
    url: string;
  }
  
  export type Image = {
    height: number;
    url: string;
    width: number;
  }