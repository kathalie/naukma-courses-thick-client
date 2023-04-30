# Завдання №03 з курсу "Backend на базі NodeJS"

## Опис завдання

Завдання полягає у додаванні до вже створеного API функціоналу для збереження оцінок та короткий фідбеків для курсів у відповідній реляційній базі даних.

**Важливо!** Додаток, який ви зробите у рамках поточного завдання, ляже у основу наступного завдання з курсу.

## Що потрібно перед початком виконання завдання

Основою для виконання завдання є гілка `tasks/03` поточного [репозиторію](https://gitlab.com/kma-nodejs-backend/course-task-courses-api). Ви маєте вмерджити її у свою гілку, в якій ви виконували попереднє завдання, для того, щоби зберегти свої правки та підтягти зміни з цієї гілки. Як і минулого разу, ви маєте створити Merge Request до гілки `student/<lastname>`, де <lastname> - ваше прізвище латиницею усіма малими літерами.

### Що треба встановити додатково

Додатково у вас на робочій машині має бути встановлено сервер MySQL або PostgreSQL (на вибір). БД буде використовуватись для збереження даних у результаті роботи додатку.

### Використання Swagger

Якщо ви забрали собі гілку `tasks/03`, то у вашій API має бути доступна адреса `/swagger`, за якою можна зручніше тестити ваше API.

### Використання TypeORM

Для роботи із БД необхідно використовувати пакет `typeorm`.

## Перелік ендпоінтів, що мають бути реалізовані

### Збереження коротких оцінок

За шляхом `/course/<code>/review` за методом `POST` мають надсилатись дані оцінки курсу. Дані мають надсилатись у форматі JSON з обов'язковим числовим полем `rating`, яке матиме оцінку від 1 до 10 та необов'язковим полем `text` з повнотекстовим типом. Цей ендпоінт має валідувати коректність вхідних даних та зберігати їх до БД.

### Виведення рейтингу та переліку оцінок

За шляхом `/course/<code>/reviews` за методом `GET` має виводитись об'єкт із полем `items`, який буде містити масив об'єктів із полями `rating` та `text` (відповідно до тої сутності, що було збережено у попередньому пункті).

#### Необов'язкове покращення ендпоінту

Якщо ви хочете мати покращену оцінку, то при реалізації цього ендпоінту виконайте дві додаткові умови:
1. Реалізуйте пагінацію для виведення переліку відгуків. Як варіант, ви можете спростити собі життя, використавши пакет `nestjs-typeorm-paginate`.
2. У ендпоінті поруч із масивом `items` має бути поле `rating`, яке буде містити середню оцінку за поточним курсом та поле `ratingCount`, де буде відображено загальну кількість відгуків.

### Зміни до існуючого ендпоінту даних про курс із САЗ

У існуючому ендпоінті з деталями про курс із САЗ має бути додане необов'язкове поле `rating`, яке буде містити середню оцінку за поточним курсом.

## Збереження даних в БД

### Сутність `CourseFeedback`

Клас `CourseFeedback` має відповідати таблиці `course_feedback`. Приблизний перелік полів має бути такий:

| Поле в TS | Тип TS  | Поле в БД | Тип SQL | Додатково   |
|-----------|---------|-----------|---------|-------------|
| courseId  | number  | course_id | INT     | Primary Key |
| rating    | number  | rating    | TINYINT |             |
| text      | string? | text      | TEXT    | Nullable    |

### Необов'язкова сутність `Course`

Якщо ви хочете підвищити свою оцінку, то в БД ви можете створити сутність `Course`, що відповідатиме таблиці `course`. В цій таблиці ви можете зберігати ті дані, що ви спарсили із САЗ та на початку зверенення до відповідного ендпоінту спочатку перевіряти, чи ці дані вже є у БД, та якщо так, то забирати їх з БД, інакше - парсити, зберігати у БД та віддавати те, що тільки що зберегли.

Додатковим плюсом буде реалізація зовнішнього ключа між цією та попередньою сутністю.

## Використання міграцій для створення БД

Для того, щоби ваша БД могла бути автоматично згенерована на будь-якій машині, на якій ви розгорнете ваш код, ви маєте використовувати міграції з TypeORM.

## Додаткові підказки щодо виконання завдання

- Для того, щоби коректно прописати міграції, ви можете створити відповідні класи моделей та після того забілдити проект та виконати команду з автоматичної генерації міграцій. Іноді в такі міграції потрапляють криві запити або сміттєвий код, тому обов'язково треба самостійно їх переглянути після створення.
- Для валідації вхідних даних у параметрах шляхів та GET-параметрах ви можете використовувати пайпи як от `ParseIntPipe`.
- Для опису вхідних даних з POST-запиту ви можете створити DTO-клас з відповідними полями та декораторами `ApiProperty`. Це допоможе зручніше заповнювати ці поля та надсилати дані у Swagger.
- Для валідації вхідних даних з POST-запиту ви можете використати декоратори з пакету `class-validator`. NestJS автоматично проганяє надіслані DTO через функцію валідації з цього пакету. Ця функція враховує вказані декоратори.
- У рамках TypeORM є два способи працювати із моделями - використовувати сервіс-подібні класи репозиторії або використовувати підхід ActiveRecord. Раджу розглянути саме другий підхід, на мою особисту думку він є простішим у використанні, адже не потребує додаткового інжектування сервісів у контролери. Для використання цього підходу ваші класи моделей мають наслідувати клас `BaseEntity`, імпортований із TypeORM. Більше деталей - в документації 😉
- Можливо, при злитті вашої гілки із гілкою, потрібною для початку виконання завдання, можуть бути конфлікти. Не переймайтесь, це не трагедія, а невеличка вправа для вас.
- Як завжди, у разі наявності додаткових запитань - ви знаєте, куди звертатись 😉
