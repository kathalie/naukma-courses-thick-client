type SortOrder = "ASC" | "DESC";

export type PaginationOptions = {
    page?: number,
    take?: number,
    order?: SortOrder,
}