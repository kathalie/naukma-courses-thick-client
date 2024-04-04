import {selector} from "../../utils/css_selector_builder";

export class CourseSelectors {
    //$('th[title="Код курсу"]+td').text().text()
    static readonly codeSelector =
        selector('td').comingAfter(
            selector('th').whereAttr('title').is('Код курсу')
        );
    //$('title').text()
    static readonly nameSelector = selector('title');
    //$(`#course-card--${code}--info`).text()
    static readonly descriptionSelector = (code: number) =>
        selector(`#course-card--${code}--info`);
    //$('th:has(abbr[title^="Факультет"])+td').text()
    static readonly facultyNameSelector =
        selector('td').comingAfter(
            selector('th').havingElement(
                selector('abbr').whereAttr('title').startsWith('Факультет')
            )
        );
    //$('th:has(abbr[title^="Кафедра"])+td').text()
    static readonly departmentNameSelector =
        selector('td').comingAfter(
            selector('th').havingElement(
                selector('abbr').whereAttr('title').startsWith('Кафедра')
            )
        );
    //$('th:contains("Освітній рівень")+td').text()
    static readonly levelSelector =
        selector('td').comingAfter(
            selector('th').withText('Освітній рівень')
        );
    //$('tbody span[title*="рік"]').text()
    static readonly yearSelector =
        selector('tbody span').whereAttr('title').contains('рік');
    //$('tbody:has(th:contains("Семестри"))').find('tr:nth-child(n + 3) th').toArray()
    static readonly seasonsSelector =
        selector('th').nestedIn(
            selector('tr').whichIsNth('n + 3').nestedIn(
                selector('tbody').havingElement(selector('th').withText('Семестри'))
            )
        );
    //$('tbody span[title*="кредитів"]')
    static readonly creditsAmountSelector =
        selector('tbody span').whereAttr('title').contains('кредитів');
    //$('tbody span[title*="годин"]'
    static readonly hoursAmountSelector =
        selector('tbody span').whereAttr('title').contains('годин');
    //$('tr:has(th:contains("Викладач")) > td')
    static readonly teacherNameSelector =
        selector('td').nestedIn(
            selector('tr').havingElement(selector('th').withText('Викладач'))
        );
}
