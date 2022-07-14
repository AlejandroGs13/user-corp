import { User } from "./user.model";

export interface PaginationUser {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    users: User[];
}