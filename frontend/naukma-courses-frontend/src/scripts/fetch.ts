import type {PaginationOptions} from "@/models/pagination-options";
import type {PaginatedCourses} from "@/models/paginated-courses";
import axios from "axios";
import type {Course} from "@/models/course";

const baseUrl = "http://localhost:56202/"
const instance = axios.create({
    baseURL: baseUrl,
});
export async function getCourses(paginationOptions: PaginationOptions): Promise<PaginatedCourses> {
    const response = await instance.get("/courses", {
        params: paginationOptions
    });

    return response.data;
}

export async function getCourse(code: string): Promise<Course> {
    const response = await instance.get(`courses/${code}`);

    return response.data;
}