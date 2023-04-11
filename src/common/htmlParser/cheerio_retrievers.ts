import {CheerioNode, CourseSeason, EducationLevel, Year} from "../types";
import {CheerioAPI} from "cheerio";

export type Convertor<T> = (selected: CheerioNode) => T;

export type StringConvertor<T> = (str: string) => T;

export const toNumber = (str: string) => +str;
export const trimmedText = (str: string) => str.trim();

export class CheerioConvertors {
    static toEducationLevel(selected: CheerioNode): EducationLevel {
        const educationLevelTextRepresentation: Record<string, EducationLevel> = {
            'Бакалавр': EducationLevel.BACHELOR,
            'Магістр': EducationLevel.MASTER
        } as const;

        return educationLevelTextRepresentation[CheerioConvertors.trimmedText(selected)];
    }

    static toSeason(selected: CheerioNode): CourseSeason {
        const courseSeasonTextRepresentation: Record<string, CourseSeason> = {
            'Осінь': CourseSeason.AUTUMN,
            'Весна': CourseSeason.SPRING,
            'Літо': CourseSeason.SUMMER
        } as const;

        return courseSeasonTextRepresentation[CheerioConvertors.trimmedText(selected)];
    }

    static toNumber(selected: CheerioNode): number {
        return toNumber(selected.text());
    }

    static trimmedText(selected: CheerioNode): string {
        return trimmedText(selected.text());
    }

    static toYear(selected: CheerioNode): Year {
        return CheerioConvertors.firstPartOf(toNumber)(selected) as Year;
    }

    static toArray<T>(convertor: Convertor<T>, $: CheerioAPI) {
        return function (selected: CheerioNode): T[] {
            return selected.toArray().map(element => {
                return convertor($(element))
            });
        }
    }

    static firstPartOf<T>(convertor: StringConvertor<T>) {
        return function(selected: CheerioNode): T {
            return convertor(CheerioConvertors.trimmedText(selected).split(' ')[0]);
        }
    }
}
