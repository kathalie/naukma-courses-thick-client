import type {Course} from "@/models/course";
import type {PaginationMetadata} from "@/models/pagination-metadata";

export type PaginatedCourses = {
    data: Course[],
    meta: PaginationMetadata
}