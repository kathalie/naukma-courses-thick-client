import * as cheerio from "cheerio";
import {CheerioAPI} from "cheerio";

export function toInt(line: any) {
    return parseInt(line);
}

export function firstPartOf(line: string) {
    return line.split(' ')[0];
}

// export function toEnum<E>(representation: Record<string, E>, key: string): E {
//     return representation[key];
// }

// const templates = {
//     selector: (selector: string) => {
//         (),
//
//     },
// }

export function selector(selector: string) {
    return new CssSelectorBuilder(selector);
}

export class CssSelectorBuilder {
    private builtSelector: string;

    constructor(selector: string) {
        this.builtSelector = selector;
    }

    private apply(selector: string): CssSelectorBuilder {
        this.builtSelector = selector;

        return this;
    }

    public whereAttr(attr: string) {
        type Prefix = '*' | '^' | '$' | '';

        const attrSelectorBuilder = (val: string, prefix?: Prefix): CssSelectorBuilder => {
            return this.apply(`${this.builtSelector}[${attr}${prefix ?? ''}=${val}]`);
        }

        return {
            is: (val: string) => attrSelectorBuilder(val),
            contains: (val: string) => attrSelectorBuilder(val, '*'),
            startsWith: (val: string) => attrSelectorBuilder(val, '^'),
            endsWith: (val: string) => attrSelectorBuilder(val, '$'),
        }
    }

    public comingAfter(selector: CssSelectorBuilder) {
        return this.apply(`${selector.select()}+${this.builtSelector}`);
    }

    public havingElement(selector: CssSelectorBuilder) {
        return this.apply(`${this.builtSelector}:has(${selector.select()})`);
    }

    public containingText(text: string) {
        return this.apply(`${this.builtSelector}:contains(${text})`);
    }

    public whichIsNth(n: string) {
        return this.apply(`${this.builtSelector}:nth-child(${n})`);
    }

    public select(): string {
        return this.builtSelector;
    }
}

export type Convertor<T> = (str: string) => T;

export type Schema<I> = Record<keyof I, [CssSelectorBuilder, Convertor<I[keyof I]>]>;

export class HtmlParser {
    public readonly $: CheerioAPI;

    constructor(html: any) {
        this.$ = cheerio.load(html);
    }

    public parse<I>(schema: Schema<I>): I {
        const res = {} as I;

        for (const field  in schema) {
            const selector: CssSelectorBuilder = schema[field as keyof I][0];
            const convertor = schema[field as keyof I][1];

            res[field as keyof I] = convertor(selector.select());
        }

        return res;
    }

    // textFrom(selector: cheerio.BasicAcceptedElems<cheerio.AnyNode>): string {
    //     return this.$(selector).text().trim();
    // }
    //
    // arrayFrom(selector: string, findClause?: string): string[] {
    //     const res = this.$(selector);
    //
    //     if (findClause) res.find(findClause);
    //
    //     return res.toArray();
    // }

//     return {
//     code: parseInt($('th[title="Код курсу"]+td').text()),
//     name: $('title').text(),
//     description: $(`#course-card--${code}--info`).text().trim(),
// facultyName: $('th:has(abbr[title^="Факультет"])+td').text(),
// departmentName: $('th:has(abbr[title^="Кафедра"])+td').text(),
// level: educationLevelTextRepresentation[$('th:contains("Освітній рівень")+td').text().trim()],
// year: parseInt($('tbody span[title*="рік"]').text().split(" ")[0]) as Year,
// seasons: $('tbody:has(th:contains("Семестри"))')
// .find('tr:nth-child(n + 3) th').toArray()
// .map(th => courseSeasonTextRepresentation[$(th).text().trim()]),
// creditsAmount: parseInt($('tbody span[title*="кредитів"]').text().split(' ')[0]),
// hoursAmount: parseInt($('tbody span[title*="годин"]').text().split(' ')[0]),
// teacherName: $('tr:has(th:contains("Викладач")) > td').text(),
// };
}
