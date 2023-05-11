import {
    HttpStatus,
    InternalServerErrorException,
    NotFoundException
} from "@nestjs/common";

//Курс відсутній на САЗ
export class CourseNotFoundException extends NotFoundException {
    constructor() {
        super('Course was not found.');
    }
}

//Проблеми зі зв'язком із САЗ
export class DisconnectedException extends InternalServerErrorException {
    constructor() {
        super('The site is currently unavailable.');
    }
}

export const badCodeOptions = {
    errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    exceptionFactory: (_: string) => 'Code should be a number!'
} as const;