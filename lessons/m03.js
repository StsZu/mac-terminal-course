window.CLI_COURSE = window.CLI_COURSE || { modules: [], exam: null, cheatsheet: null };
window.CLI_COURSE.modules.push({
  id: "m03", order: 3, title: "Пошук і текст", subtitle: "Читати файли, шукати, з'єднувати команди", icon: "search",
  goal: "Після модуля ти читаєш файли будь-якого розміру, знаходиш файли й рядки в проєкті та з'єднуєш команди конвеєром.",
  lessons: [
    {
      id: "m03-l01", title: "Читати файли: cat, less, head, tail", minutes: 9,
      steps: [
        { type: "concept", title: "Інструмент під розмір файлу",
          body: "<p>Короткий конфіг зручно вивести повністю. Лог на тисячі рядків — гортати сторінками або дивитися лише кінець. А за логом, що росте просто зараз, — стежити наживо.</p>",
          analogy: "`cat` — висипати весь лист на стіл. `less` — гортати книжку сторінками. `head` — прочитати перший абзац, `tail` — останній. `tail -f` — сидіти біля принтера і читати кожен новий аркуш, щойно він виходить." },
        { type: "cli", title: "Вивести або погортати",
          commands: [
            { cmd: "cat readme.md", explain: "Виводить увесь файл одразу. Добре для коротких файлів.", output: "# Demo\nНавчальний проєкт для тренажера.\nTODO: вивчити Terminal", risk: "low" },
            { cmd: "less readme.md", explain: "Перегляд сторінками: <span class=\"kbd\">Space</span> — далі, <code>b</code> — назад, <code>/слово</code> — пошук, <code>q</code> — вихід.", risk: "low" }
          ] },
        { type: "terminal", title: "Спробуй: прочитай readme",
          prompt: "Stas@MacBook-Pro demo %",
          task: "Виведи весь вміст `readme.md` на екран.",
          expected: ["cat readme.md", "cat ./readme.md"],
          output: "# Demo\nНавчальний проєкт для тренажера.\nTODO: вивчити Terminal\nЗапуск: npm run dev\nАвтор: Stas\nTODO: додати тести",
          hint: "Найкоротша команда для виводу файлу — три літери.",
          explain: "`cat` лише читає файл — нічого в ньому не змінює." },
        { type: "check", title: "Величезний лог",
          question: "Лог має 50 000 рядків. Як його переглянути, щоб не завалити екран і мати пошук?",
          options: ["`cat app.log`", "`rm app.log` і почати спочатку", "`less app.log` — гортати й шукати через `/`"],
          correct: 2, feedback: "`less` показує файл сторінками і має пошук. `cat` виллє всі 50 000 рядків на екран." },
        { type: "cli", title: "Початок, кінець і стеження",
          commands: [
            { cmd: "head -5 readme.md", explain: "Перші 5 рядків. Без числа — 10.", risk: "low" },
            { cmd: "tail -5 log.txt", explain: "Останні 5 рядків — там зазвичай найсвіжіші помилки.", risk: "low" },
            { cmd: "tail -f log.txt", explain: "Показує кінець і чекає нових рядків (follow). Зупинити — <span class=\"kbd\">Ctrl</span> + <span class=\"kbd\">C</span>.", risk: "low" }
          ] },
        { type: "terminal", title: "Спробуй: кінець логу",
          prompt: "Stas@MacBook-Pro demo %",
          task: "Подивись останні 5 рядків файлу `log.txt`.",
          expected: ["tail -5 log.txt", "tail -n 5 log.txt", "tail -n5 log.txt"],
          output: "[WARN] slow response 1200ms\n[INFO] GET /api 200\n[ERROR] db timeout\n[INFO] retry ok\n[INFO] GET / 200",
          hint: "«Хвіст» файлу англійською — tail; кількість рядків — прапорцем з числом.",
          explain: "`tail` читає з кінця. Помилка `db timeout` одразу на виду — не треба гортати весь лог." },
        { type: "check", title: "Помилки наживо",
          question: "Сервер пише лог у `server.log`. Ти хочеш бачити нові помилки одразу, як вони з'являються. Що запустити?",
          options: ["`tail -f server.log`", "`head server.log`", "`cat server.log` щохвилини"],
          correct: 0, feedback: "`-f` (follow) тримає файл відкритим і показує кожен новий рядок. Зупинка — Ctrl+C." },
        { type: "callout", variant: "tip", title: "q чи Ctrl+C?",
          body: "<p>Із переглядачів (<code>less</code>, <code>man</code>) виходять клавішею <code>q</code>. Команду, що працює безперервно (<code>tail -f</code>, <code>ping</code> без <code>-c</code>, dev-сервер), зупиняють <span class=\"kbd\">Ctrl</span> + <span class=\"kbd\">C</span>.</p>" },
        { type: "summary", title: "Підсумок",
          points: ["`cat` — весь файл одразу, лише для коротких файлів.", "`less` — перегляд сторінками з пошуком `/`, вихід — `q`.", "`head -N` і `tail -N` — початок і кінець файлу (без числа — 10 рядків).", "`tail -f` стежить за логом наживо; зупинка — Ctrl+C.", "Усі ці команди лише читають — ризик низький."] }
      ],
      glossary: [
        { term: "Лог", def: "Файл, куди програма послідовно пише події та помилки." },
        { term: "Пейджер (less)", def: "Програма для перегляду тексту сторінками з пошуком." },
        { term: "Ctrl+C", def: "Перервати команду, що виконується в Terminal." },
        { term: "follow (-f)", def: "Режим `tail`, у якому він чекає і показує нові рядки файлу." }
      ],
      quiz: [
        { question: "Як вийти з `less`?", options: ["Ctrl+D", "`q`", "Esc"], correct: 1, feedback: "`q` (quit) закриває `less` і `man` і повертає запрошення." },
        { question: "Скільки рядків покаже `head readme.md` без числа?", options: ["5", "Увесь файл", "10"], correct: 2, feedback: "За замовчуванням `head` і `tail` показують по 10 рядків." },
        { question: "`tail -f log.txt` ніби «завис» і не повертає запрошення. Що відбувається?", options: ["Він чекає нових рядків у файлі; зупинити — Ctrl+C", "Файл пошкоджено", "Mac перевантажений"], correct: 0, feedback: "Так і задумано: `-f` стежить за файлом, доки ти його не зупиниш." },
        { question: "Який ризик у команд `cat`, `less`, `head`, `tail`?", options: ["Середній — можуть змінити файл", "Низький — лише читають", "Високий — блокують файл"], correct: 1, feedback: "Усі чотири тільки читають вміст і нічого не записують." },
        { question: "Треба знайти в довгому README слово install. Найзручніше:", options: ["`head -100 README.md` і шукати очима", "`cat README.md` і гортати трекпадом", "`less README.md`, потім `/install` і Enter"], correct: 2, feedback: "Пошук `/` у `less` підсвітить збіги; `n` — до наступного." },
        { question: "`cat photo.jpg` вивів на екран «кракозябри». Чому?", options: ["Це двійковий файл, і `cat` показує його байти як текст", "Фото пошкоджене", "Бракує прав"], correct: 0, feedback: "`cat` призначений для тексту. Картинку відкривай `open photo.jpg`." }
      ]
    },
    {
      id: "m03-l02", title: "Пошук і конвеєри: find, grep, |", minutes: 12,
      steps: [
        { type: "concept", title: "Шукати ім'я чи вміст",
          body: "<p><code>find</code> шукає <strong>файли за іменем</strong> (і типом, датою). <code>grep</code> шукає <strong>рядки з текстом</strong> усередині файлів. Знак <code>|</code> (конвеєр) передає вивід однієї команди на вхід іншої.</p>",
          analogy: "`find` шукає коробки за написом на етикетці, а `grep` відкриває коробки й шукає всередині потрібне слово. Конвеєр `|` — стрічка на заводі: що вийшло з одного верстата, одразу йде в наступний." },
        { type: "cli", title: "Знайти файли",
          commands: [
            { cmd: "find . -name \"*.md\"", explain: "Усі файли <code>.md</code> від поточної папки вглиб. Лапки не дають zsh розгорнути <code>*</code> завчасно.", output: "./readme.md\n./docs/guide.md", risk: "low" },
            { cmd: "find ~/Downloads -mtime -7", explain: "Файли в Завантаженнях, змінені за останні 7 днів.", risk: "low" },
            { cmd: "mdfind -name readme", explain: "Пошук через індекс Spotlight — миттєво по всьому Mac.", risk: "low" }
          ] },
        { type: "terminal", title: "Спробуй: усі .md",
          prompt: "Stas@MacBook-Pro demo %",
          task: "Знайди всі файли з розширенням `.md` у поточній папці та підпапках.",
          expected: ["find . -name \"*.md\"", "find . -name '*.md'"],
          output: "./readme.md\n./docs/guide.md",
          hint: "`find`, звідки шукати (крапка — тут), `-name` і шаблон у лапках із зірочкою.",
          explain: "Зірочка `*` — «будь-які символи». Без лапок zsh спробує сам підставити файли і може видати помилку `no matches found`." },
        { type: "cli", title: "Знайти текст",
          commands: [
            { cmd: "grep TODO readme.md", explain: "Рядки зі словом TODO в одному файлі.", output: "TODO: вивчити Terminal\nTODO: додати тести", risk: "low" },
            { cmd: "grep -R \"TODO\" .", explain: "Рекурсивно в усіх файлах поточної папки. Корисні прапорці: <code>-i</code> — без регістру, <code>-n</code> — номери рядків.", risk: "low" },
            { cmd: "grep -Rn \"TODO\" . --exclude-dir=node_modules", explain: "Те саме з номерами рядків, але без величезної папки залежностей.", risk: "low" }
          ] },
        { type: "terminal", title: "Спробуй: TODO в усьому проєкті",
          prompt: "Stas@MacBook-Pro demo %",
          task: "Знайди слово `TODO` в усіх файлах поточної папки і підпапок.",
          expected: ["grep -R \"TODO\" .", "grep -R TODO .", "grep -r \"TODO\" .", "grep -r TODO .", "grep -R 'TODO' ."],
          output: "./readme.md:TODO: вивчити Terminal\n./readme.md:TODO: додати тести\n./src/app.js:// TODO: обробити помилки",
          hint: "`grep` з прапорцем рекурсії (велика R), слово і крапка — «шукати тут».",
          explain: "Кожен рядок — `файл:знайдений рядок`. Так ти за секунду бачиш усі незавершені місця проєкту." },
        { type: "check", title: "Обери інструмент",
          question: "Треба дізнатися, в якому файлі проєкту згадується `API_URL`. Яка команда?",
          options: ["`find . -name API_URL`", "`grep -R \"API_URL\" .`", "`mdfind -name API_URL`"],
          correct: 1, feedback: "`API_URL` — текст усередині файлу, тож потрібен `grep`. `find -name` і `mdfind -name` шукають за іменем файлу." },
        { type: "cli", title: "Конвеєри й буфер обміну",
          commands: [
            { cmd: "wc -l log.txt", explain: "Скільки рядків у файлі.", output: "       7 log.txt", risk: "low" },
            { cmd: "sort names.txt | uniq -c", explain: "Відсортувати і порахувати однакові рядки.", output: "   2 Andrii\n   1 Iryna\n   1 Olena\n   2 Stas", risk: "low" },
            { cmd: "cut -d',' -f1 data.csv", explain: "Перша колонка CSV (роздільник — кома).", risk: "low" },
            { cmd: "cat readme.md | pbcopy", explain: "Скопіювати вміст файлу в буфер обміну macOS — без виділення мишею.", risk: "low" },
            { cmd: "pbpaste > notes.txt", explain: "Вставити буфер у файл. <code>></code> перезаписує файл без попередження.", risk: "medium" },
            { cmd: "find . -name \"*.tmp\" | xargs rm", explain: "<code>xargs</code> перетворює список файлів на аргументи для <code>rm</code> — масове видалення одним рядком.", risk: "high" }
          ] },
        { type: "callout", variant: "danger", title: "xargs rm видаляє все, що знайшов find",
          body: "<p>Якщо шаблон у <code>find</code> ширший, ніж ти думаєш, <code>| xargs rm</code> безповоротно видалить зайве — без Кошика і без питань.</p><p><strong>Безпечно:</strong> спершу запусти лише <code>find . -name \"*.tmp\"</code> і прочитай список. Видаляй тільки після перевірки, а для імен з пробілами — <code>find … -print0 | xargs -0 rm</code>.</p>" },
        { type: "check", title: "Навіщо sort перед uniq",
          question: "Чому в `sort names.txt | uniq` потрібен `sort`?",
          options: ["Без `sort` команда `uniq` не запуститься", "`sort` видаляє порожні рядки", "`uniq` прибирає лише повтори, що стоять поруч, а сортування ставить однакові рядки разом"],
          correct: 2, feedback: "`uniq` порівнює кожен рядок лише з попереднім. Після `sort` усі однакові рядки опиняються поруч." },
        { type: "summary", title: "Підсумок",
          points: ["`find` шукає файли за іменем, `mdfind` — через Spotlight, `grep` — текст усередині файлів.", "`grep -R \"слово\" .` — пошук по всьому проєкту; порожній результат — це «збігів немає», не помилка.", "`|` передає вивід однієї команди на вхід іншої: `sort | uniq`, `cat файл | pbcopy`.", "`>` перезаписує файл; `| xargs rm` — високий ризик: спершу подивись список."] }
      ],
      glossary: [
        { term: "Конвеєр (pipe, |)", def: "Передає вивід лівої команди на вхід правої." },
        { term: "grep", def: "Шукає рядки, що містять текст або шаблон." },
        { term: "find", def: "Шукає файли й папки за іменем, типом, датою." },
        { term: "stdin / stdout", def: "Стандартний вхід і вихід команди — те, що з'єднує конвеєр." },
        { term: "Spotlight (mdfind)", def: "Індекс пошуку macOS; з терміналу доступний через `mdfind`." }
      ],
      quiz: [
        { question: "Результат `grep -R TODO .` порожній. Що це означає?", options: ["Команда зламалась", "Збігів немає — для `grep` це звичайний результат (код виходу 1)", "Потрібен `sudo`"], correct: 1, feedback: "`grep` мовчить, коли нічого не знайшов. Це не помилка, а відповідь «немає»." },
        { question: "Що робить `|` між командами?", options: ["Передає вивід лівої команди на вхід правої", "Запускає обидві команди паралельно без зв'язку", "Зберігає результат у файл"], correct: 0, feedback: "Конвеєр з'єднує команди. У файл зберігає `>`." },
        { question: "Як скопіювати вміст `config.txt` у буфер обміну без миші?", options: ["`pbpaste config.txt`", "`cp config.txt clipboard`", "`cat config.txt | pbcopy`"], correct: 2, feedback: "`pbcopy` читає вхід і кладе його в буфер. `pbpaste` робить навпаки." },
        { question: "Чим `mdfind` відрізняється від `find`?", options: ["`mdfind` шукає в індексі Spotlight — швидко по всьому Mac; `find` обходить папки прямо зараз", "Нічим", "`mdfind` шукає лише в інтернеті"], correct: 0, feedback: "Spotlight уже проіндексував диск, тому `mdfind` відповідає миттєво. `find` точніший у межах папки." },
        { question: "Що небезпечного в `pbpaste > notes.txt`?", options: ["Нічого", "`>` перезапише `notes.txt` без попередження", "Очиститься буфер обміну"], correct: 1, feedback: "`>` створює файл заново. Щоб дописати в кінець, використовують `>>`." },
        { question: "Як порахувати, скільки рядків в `access.log`?", options: ["`count access.log`", "`grep -c access.log`", "`wc -l access.log`"], correct: 2, feedback: "`wc` (word count) з `-l` рахує рядки." }
      ]
    }
  ]
});
