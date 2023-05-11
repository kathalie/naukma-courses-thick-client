import {Injectable} from '@nestjs/common';
import axios from "axios";
import {IScheduleItem} from "./types";
import {HtmlParser, Normalization} from "../../utils/html_parser";
import {CheerioRetrievers} from "../../utils/cheerio/cheerio_retrievers";
import {ScheduleSelectors} from "./schedule.selectors";
import {CssSelectorBuilder} from "../../utils/css_selector_builder";
import {AnyNode} from "cheerio";
import {CheerioNormalizers} from "../../utils/cheerio/cheerio_normalizers";

@Injectable()
export class ScheduleService {
    private readonly scheduleApiUrl = 'https://my.ukma.edu.ua/schedule/';

    public async getParsedTimetable(year: number, season: number): Promise<IScheduleItem[]> {
        const response = await axios({
            baseURL: this.scheduleApiUrl,
            params: {
                year: year,
                season: season
            }
        });

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
                    facultyName: [getText(ScheduleSelectors.facultyNameSelector, facultyBlock), CheerioNormalizers.trimmedText],
                    level: [getText(ScheduleSelectors.levelSelector, scheduleItem), CheerioRetrievers.retrieveLevel],
                    season: [getText(ScheduleSelectors.seasonSelector, scheduleItem), CheerioRetrievers.retrieveSeason],
                    specialityName: [getText(ScheduleSelectors.specialityNameSelector, scheduleItem), CheerioRetrievers.retrieveSpecialityName],
                    updatedAt: [getText(ScheduleSelectors.updatedAtSelector, scheduleItem), CheerioRetrievers.retrieveDate],
                    url: [getHref(ScheduleSelectors.urlSelector, scheduleItem), CheerioNormalizers.trimmedText],
                    year: [getText(ScheduleSelectors.yearSelector, scheduleItem), CheerioRetrievers.retrieveYear]
                };


                schedule.push(htmlParser.normalize(normalization));
            }
        }

        return schedule;
    }
}
