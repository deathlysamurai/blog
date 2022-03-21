import { User } from '../../user.model';

export interface UsersResponse {
    count: number;
    users: User[];
}