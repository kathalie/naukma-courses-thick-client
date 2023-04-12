import {Injectable} from '@nestjs/common';
import axios from "axios";
import {IScheduleItem} from "./types";
import {HtmlParser, Normalization} from "../../common/htmlParser/html_parser";
import {CheerioRetrievers} from "../../common/htmlParser/cheerio_retrievers";
import {ScheduleSelectors} from "./schedule.selectors";
import {CssSelectorBuilder} from "../../common/htmlParser/css_selector_builder";
import {AnyNode} from "cheerio";

@Injectable()
export class ScheduleService {
    private readonly link = 'https://my.ukma.edu.ua/schedule/';

    async parsedTimetable(year: number, season: number): Promise<IScheduleItem[]> {
        const response = await axios(this.link, {
            params: {
                year: year,
                season: season
            }
        }).catch(err => {throw err;});

        const htmlParser = new HtmlParser(response.data);
        const schedule = [] as IScheduleItem[];

        const facultyBlocks = htmlParser.findElements(ScheduleSelectors.facultyBlocksSelector);

        for(const facultyBlock of facultyBlocks) {
            const scheduleItems = htmlParser.$(ScheduleSelectors.scheduleItemsSelector.select(), facultyBlock).toArray();

            for(const scheduleItem of scheduleItems) {
                const getText = (elementSelector: CssSelectorBuilder, parent: AnyNode) => {
                    return htmlParser.$(elementSelector.select(), parent).text();
                }

                const getHref = (elementSelector: CssSelectorBuilder, parent: AnyNode) => {
                    return htmlParser.$(elementSelector.select(), parent).attr('href') ?? '';
                }

                const normalization: Normalization<IScheduleItem> = {
                    facultyName: [getText(ScheduleSelectors.facultyNameSelector, facultyBlock), CheerioRetrievers.trimmedText],
                    level: [getText(ScheduleSelectors.levelSelector, scheduleItem), CheerioRetrievers.retrieveLevel],
                    season: [getText(ScheduleSelectors.seasonSelector, scheduleItem), CheerioRetrievers.retrieveSeason],
                    specialityName: [getText(ScheduleSelectors.specialityNameSelector, scheduleItem), CheerioRetrievers.retrieveSpecialityName],
                    updatedAt: [getText(ScheduleSelectors.updatedAtSelector, scheduleItem), CheerioRetrievers.retrieveDate],
                    url: [getHref(ScheduleSelectors.urlSelector, scheduleItem), CheerioRetrievers.trimmedText],
                    year: [getText(ScheduleSelectors.yearSelector, scheduleItem), CheerioRetrievers.retrieveYear]
                };


                schedule.push(htmlParser.normalize(normalization));
            }
        }

        return schedule;
    }
}
