import {CheerioNode, CourseSeason, EducationLevel, Year} from "../../common/types";
import {CheerioAPI} from "cheerio";
import {Retriever, Selected, selectedToString, StringConvertor} from "./cheerio_helpers";

const educationLevelTextRepresentation: Record<string, EducationLevel> = {
    'Бакалавр': EducationLevel.BACHELOR,
    'Магістр': EducationLevel.MASTER,
    'БП': EducationLevel.BACHELOR,
    'МП': EducationLevel.MASTER,
} as const;

const courseSeasonTextRepresentation: Record<string, CourseSeason> = {
    'Осінь': CourseSeason.AUTUMN,
    'Весна': CourseSeason.SPRING,
    'Літо': CourseSeason.SUMMER
} as const;

export const toNumber = (str: string) => +str;

export const trimmedText = (str: string) => str.trim();

export class CheerioNormalizers {
    public static toEducationLevel(selected: Selected): EducationLevel {
        return educationLevelTextRepresentation[CheerioNormalizers.trimmedText(selected)];
    }

    public static toSeason(selected: Selected): CourseSeason {
        return courseSeasonTextRepresentation[CheerioNormalizers.trimmedText(selected)];
    }

    public static toNumber(selected: Selected): number {
        return toNumber(selectedToString(selected));
    }

    public static trimmedText(selected: Selected): string {
        return trimmedText(selectedToString(selected));
    }

    public static toYear(selected: Selected): Year {
        return CheerioNormalizers.firstPartOf(toNumber, ' ')(selected) as Year;
    }

    public static toArray<T>(convertor: Retriever<T>, $: CheerioAPI) {
        return function (selected: CheerioNode): T[] {
            return selected.toArray().map(element => {
                return convertor($(element))
            });
        }
    }

    public static firstPartOf<T>(convertor: StringConvertor<T>, separator: string) {
        return function (selected: Selected): T {
            return convertor(CheerioNormalizers.trimmedText(selected).split(separator)[0]);
        }
    }
}
