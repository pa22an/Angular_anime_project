export interface Anime {
    mal_id: number;
    title: string;
    url: string;
    rank: string;
    image_url: string;
    episodes: number;
    score: number;
    type: string;
    end_date: string;
    start_date: string;
    rated: string;
    members: string;
  }

  export interface APIResponse<T> {
    results: Array<T>;
}