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
            return this.apply(`${this.builtSelector}[${attr}${prefix ?? ''}="${val}"]`);
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

    public nestedIn(parentSelector: CssSelectorBuilder) {
        return this.apply(`${parentSelector.select()} ${this.builtSelector}`);
    }

    public nestedDirectlyIn(parentSelector: CssSelectorBuilder) {
        return this.apply(`${parentSelector.select()} > ${this.builtSelector}`);
    }

    public havingElement(selector: CssSelectorBuilder) {
        return this.apply(`${this.builtSelector}:has(${selector.select()})`);
    }

    public withText(text: string) {
        return this.apply(`${this.builtSelector}:contains("${text}")`);
    }

    public whichIsNth(n: string) {
        return this.apply(`${this.builtSelector}:nth-child(${n})`);
    }

    public select(): string {
        return this.builtSelector;
    }
}
