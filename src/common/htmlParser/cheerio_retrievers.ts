import {CheerioNode, CourseSeason, EducationLevel, Year} from "../types";
import {CheerioAPI} from "cheerio";

function isNode(selected: Selected): selected is CheerioNode {
    return (selected as CheerioNode).text !== undefined;
}

type Selected = CheerioNode | string;
export type Normalizer<T> = (selected: Selected) => T;
export type Retriever<T> = (selected: CheerioNode) => T;

export type StringConvertor<T> = (str: string) => T;

export const toNumber = (str: string) => +str;
export const trimmedText = (str: string) => str.trim();

export class CheerioRetrievers {
    static toEducationLevel(selected: Selected): EducationLevel {
        const educationLevelTextRepresentation: Record<string, EducationLevel> = {
            'Бакалавр': EducationLevel.BACHELOR,
            'Магістр': EducationLevel.MASTER,
            'БП': EducationLevel.BACHELOR,
            'МП': EducationLevel.MASTER,
        } as const;

        return educationLevelTextRepresentation[CheerioRetrievers.trimmedText(selected)];
    }

    static toSeason(selected: Selected): CourseSeason {
        const courseSeasonTextRepresentation: Record<string, CourseSeason> = {
            'Осінь': CourseSeason.AUTUMN,
            'Весна': CourseSeason.SPRING,
            'Літо': CourseSeason.SUMMER
        } as const;

        return courseSeasonTextRepresentation[CheerioRetrievers.trimmedText(selected)];
    }

    static toNumber(selected: Selected): number {
        return toNumber(isNode(selected) ? selected.text() : selected);
    }

    static trimmedText(selected: Selected): string {
        return trimmedText(isNode(selected) ? selected.text() : selected);
    }

    static toYear(selected: Selected): Year {
        return CheerioRetrievers.firstPartOf(toNumber, ' ')(selected) as Year;
    }

    static toArray<T>(convertor: Retriever<T>, $: CheerioAPI) {
        return function (selected: CheerioNode): T[] {
            return selected.toArray().map(element => {
                return convertor($(element))
            });
        }
    }

    static firstPartOf<T>(convertor: StringConvertor<T>, separator: string) {
        return function (selected: Selected): T {
            return convertor(CheerioRetrievers.trimmedText(selected).split(separator)[0]);
        }
    }

    static retrieveLevel(selected: Selected): EducationLevel {
        const regex = /(БП)|(МП)/;
        const text = CheerioRetrievers.trimmedText(selected);
        const matched = text.match(regex)?.at(0) ?? '';

        return CheerioRetrievers.toEducationLevel(matched);
    }

    static retrieveSeason(selected: Selected): CourseSeason {
        const regex = /(Літо)|(Осінь)|(Весна)/;
        const text = CheerioRetrievers.trimmedText(selected);
        const matched = text.match(regex)?.at(0) ?? '';

        return CheerioRetrievers.toSeason(matched);
    }

    static retrieveYear(selected: Selected): Year {
        const regex = /((БП)|(МП))-\d/;
        const text = CheerioRetrievers.trimmedText(selected);
        const matched: string = text.match(regex)?.at(0)?.split('-')[1] ?? '';

        return CheerioRetrievers.toYear(matched);
    }

    static retrieveSpecialityName(selected: Selected): string {
        const text = CheerioRetrievers.trimmedText(selected);
        const level = text.match(/(БП)|(МП)/)?.at(0) ?? '';

        return CheerioRetrievers.trimmedText(text.split(level)[0] ?? '');
    }

    static retrieveDate(selected: Selected): string {
        const regex = /\d\d.\d\d.\d\d\d\d \d\d:\d\d:\d\d/;
        const text = CheerioRetrievers.trimmedText(selected);
        const matched = text.match(regex)?.at(0) ?? '';

        const [day, month, year, hours, minutes, seconds] = matched.split(/\.|:|\s/);

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
}
