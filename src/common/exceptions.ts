import {HttpException, HttpStatus} from "@nestjs/common";

//Курс відсутній на САЗ
export class CourseNotFoundException extends HttpException {
    constructor() {
        super('Course was not found.', HttpStatus.NOT_FOUND);
    }
}

//Некоректний (нечисловий) код
export class BadCodeException extends HttpException {
    constructor() {
        super('Code should be a number!', HttpStatus.BAD_REQUEST);
    }
}

//Проблеми зі зв'язком із САЗ
export class DisconnectedException extends HttpException {
    constructor() {
        super('The site is currently unavailable.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}


//На сторінці семестру відсутні розклади
export class SchedulesNotFoundException extends HttpException {
    constructor() {
        super('Schedules were not found.', HttpStatus.NOT_FOUND);
    }
}

export class BadYearException extends HttpException {
    constructor() {
        super('Year should be a number!', HttpStatus.BAD_REQUEST);
    }
}

export class BadSeasonException extends HttpException {
    constructor() {
        super('Season should be "spring", "summer" or "autumn"!', HttpStatus.BAD_REQUEST);
    }
}
