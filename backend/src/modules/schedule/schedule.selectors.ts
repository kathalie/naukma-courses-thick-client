import {selector} from "../../utils/css_selector_builder";

export class ScheduleSelectors {
    static readonly facultyBlocksSelector =
        selector('.panel').nestedDirectlyIn(selector('#schedule-accordion'));

    static readonly scheduleItemsSelector =
        selector('div').nestedDirectlyIn(selector('li'));


    static readonly facultyNameSelector =
        selector('.panel-heading').whereAttr('id').startsWith('schedule-faculty');

    static readonly specialityNameSelector = selector('a:last-child');

    static readonly levelSelector = ScheduleSelectors.specialityNameSelector;

    static readonly yearSelector = ScheduleSelectors.specialityNameSelector;

    static readonly seasonSelector = ScheduleSelectors.specialityNameSelector;

    static readonly urlSelector = ScheduleSelectors.specialityNameSelector;

    static readonly updatedAtSelector = selector('span');
}
