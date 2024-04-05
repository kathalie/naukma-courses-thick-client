import type {PaginationOptions} from "@/models/pagination-options";
import type {PaginatedCourses} from "@/models/paginated-courses";
import axios from "axios";

const baseUrl = "http://localhost:56202/courses"
export async function fetchCourses(paginationOptions: PaginationOptions): Promise<PaginatedCourses> {
    const response = await axios.get(baseUrl, {
        params: paginationOptions
    });

    return response.data;
}