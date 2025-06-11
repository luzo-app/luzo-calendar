type PaginatedResponse<T> = {
    data: T[];
    total: number;
    page: number;
    limit: number;
}

export type { PaginatedResponse };