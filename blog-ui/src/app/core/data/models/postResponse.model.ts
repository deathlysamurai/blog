import { Post } from './post.model';

export interface PostResponse {
    count: number;
    posts: Post[];
}