import { Tag } from '../tag.model';

export interface TagResponse {
    count: number;
    tags: Tag[];
}