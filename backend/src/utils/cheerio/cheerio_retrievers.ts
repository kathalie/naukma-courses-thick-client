import {CourseSeason, EducationLevel, Year} from "../../common/types";
import {Selected, selectedToString} from "./cheerio_helpers";
import {CheerioNormalizers} from "./cheerio_normalizers";
import * as moment from "moment";

export class CheerioRetrievers {
    private static retrieveByRegex(selected: Selected, regex: RegExp) {
        return selectedToString(selected).match(regex);
    }

    private static retrieveStringLevel(selected: Selected): string {
        return CheerioRetrievers.retrieveByRegex(selected, /(БП)|(МП)/)?.at(0) ?? '';
    }

    /**
     * Retrieves an education level (either БП or МП) from `Selected`.
     *
     * Example of `Selected` content: "Політологія МП-1 Осінь 2019–2020.doc".
     *
     * @param selected
     * @return 'БП' or 'МП' if present. Otherwise, an empty string.
     */
    public static retrieveLevel(selected: Selected): EducationLevel {
        return CheerioNormalizers.toEducationLevel(CheerioRetrievers.retrieveStringLevel(selected));
    }

    public static retrieveSeason(selected: Selected): CourseSeason {
        const matched = CheerioRetrievers.retrieveByRegex(selected, /(Літо)|(Осінь)|(Весна)/)
            ?.at(0) ?? '';

        return CheerioNormalizers.toSeason(matched);
    }

    public static retrieveYear(selected: Selected): Year {
        const matched = CheerioRetrievers.retrieveByRegex(selected, /((БП)|(МП))-\d/)
            ?.at(0)?.split('-')[1] ?? '';

        return CheerioNormalizers.toYear(matched);
    }

    /**
     * Retrieves a speciality from `Selected`.
     *
     * Example of `Selected` content: "Зв`язки з громадськістю МП-1 Осінь 2019–2020.doc".
     *
     * @param selected
     * @return the text before education level considered to be a speciality.
     */
    public static retrieveSpecialityName(selected: Selected): string {
        const text = selectedToString(selected);
        const level = CheerioRetrievers.retrieveStringLevel(selected);

        return CheerioNormalizers.trimmedText(text.split(level)[0] ?? '');
    }

    public static retrieveDate(selected: Selected): string {
        return moment(selectedToString(selected), 'DD.MM.YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss');
    }
}
