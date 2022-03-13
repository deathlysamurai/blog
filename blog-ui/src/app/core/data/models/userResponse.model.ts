import { User } from './user.model';

export interface UserResponse {
    count: number;
    users: User[];
}