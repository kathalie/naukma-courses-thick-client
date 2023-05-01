import {BadCodeException} from "../common/exceptions";

export function validateCode(code: string | number) {
    if(!/\d+/.test(code.toString())) throw new BadCodeException();
}