type Level = "Bachelor" | "Master";
type Season = "Autumn" | "Spring" | "Summer";

export type Course = {
    "code": number,
    "name": string,
    "description": string,
    "facultyName": string,
    "departmentName": string,
    "level": Level,
    "year": 1 | 2 | 3 | 4,
    "seasons": Season[],
    "creditsAmount": number,
    "hoursAmount": number,
    "teacherName": string,
}