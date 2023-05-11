import * as cheerio from "cheerio";
import {CheerioAPI} from "cheerio";
import {CssSelectorBuilder} from "./css_selector_builder";
import {Normalizer, Retriever} from "./cheerio/cheerio_helpers";

export type Schema<I> = Record<keyof I, [CssSelectorBuilder, Retriever<I[keyof I]>]>;
export type Normalization<I> = Record<keyof I, [string, Normalizer<I[keyof I]>]>;

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

            const selected = this.$(selector.select());

            res[field as keyof I] = convertor(selected);
        }

        return res;
    }

    public normalize<I>(normalization: Normalization<I>): I {
        const res = {} as I;

        for (const field  in normalization) {
            const value: string = normalization[field as keyof I][0];
            const convertor = normalization[field as keyof I][1];

            res[field as keyof I] = convertor(value);
        }

        return res;
    }

    public findElements(selector: CssSelectorBuilder) {
        return this.$(selector.select()).toArray();
    }
}
