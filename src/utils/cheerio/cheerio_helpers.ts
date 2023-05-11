import {CheerioNode} from "../../common/types";

function isNode(selected: Selected): selected is CheerioNode {
    return (selected as CheerioNode).text !== undefined;
}

export function selectedToString (selected: Selected): string {
    return isNode(selected) ? selected.text() : selected;
}

export type Selected = CheerioNode | string;

export type Normalizer<T> = (selected: Selected) => T;
export type Retriever<T> = (selected: CheerioNode) => T;

export type StringConvertor<T> = (str: string) => T;



