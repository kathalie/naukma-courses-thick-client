import * as cheerio from "cheerio";

export enum EducationLevel {
  BACHELOR = 'Bachelor',
  MASTER = 'Master',
}

export enum CourseSeason {
  AUTUMN = 'Autumn',
  SPRING = 'Spring',
  SUMMER = 'Summer',
}

export type Year = 1 | 2 | 3 | 4;

export type CheerioNode = cheerio.Cheerio<cheerio.AnyNode>;

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}