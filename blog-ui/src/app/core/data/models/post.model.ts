import { Tag } from "./tag.model";

export interface Post {
    _id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    tags?: Tag[];
    imagePath?: string;
}
