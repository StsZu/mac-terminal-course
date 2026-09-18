window.CLI_COURSE = window.CLI_COURSE || { modules: [], exam: null, cheatsheet: null };
window.CLI_COURSE.modules.push({
  id: "m01", order: 1, title: "Основи терміналу", subtitle: "Shell, запрошення, PATH і довідка", icon: "terminal",
  goal: "Після модуля ти розумієш, що таке Terminal і zsh, читаєш запрошення, знаєш, звідки береться команда, і вмієш знайти довідку.",
  lessons: [
    {
      id: "m01-l01", title: "Термінал, shell і запрошення", minutes: 10,
      steps: [
        { type: "story", title: "Навіщо Terminal, якщо є Finder",
          body: "<p>Finder зручний, коли треба відкрити пару файлів. Але перевірити мережу, підключитися до роутера, запустити Git чи AI-агента — це справи для Terminal.</p><p>Тут ти пишеш команду словами, а Mac відповідає текстом. Почнемо з того, щоб зрозуміти, хто саме тобі відповідає і що означає рядок перед курсором.</p>" },
        { type: "concept", title: "Terminal і shell — не одне й те саме",
          body: "<p><strong>Terminal</strong> — програма-вікно (знайди її через Spotlight: <span class=\"kbd\">⌘</span> + <span class=\"kbd\">Space</span> → «Terminal»). <strong>Shell</strong> — інтерпретатор усередині вікна, який читає твою команду і виконує її.</p><p>На сучасному macOS shell за замовчуванням — <code>zsh</code>. Перевірити можна командою <code>echo $SHELL</code>.</p>",
          analogy: "Terminal — як віконце видачі в кав'ярні, а zsh — бариста за ним. Ти кажеш замовлення точними словами (команду), бариста виконує й віддає результат у те саме віконце. Неточне замовлення — і він перепитає: `command not found`." },
        { type: "concept", title: "Як читати запрошення і команду",
          body: "<p>Запрошення (prompt) <code>Stas@MacBook-Pro ~ %</code> — це: користувач <code>Stas</code>, комп'ютер <code>MacBook-Pro</code>, поточна папка <code>~</code> (домашня), символ <code>%</code> — shell чекає команду звичайного користувача. У root замість <code>%</code> стоїть <code>#</code>.</p><table><thead><tr><th>Частина</th><th>Приклад</th><th>Що це</th></tr></thead><tbody><tr><td>команда</td><td><code>ls</code></td><td>яку програму запустити</td></tr><tr><td>прапорець</td><td><code>-la</code></td><td>як саме її запустити</td></tr><tr><td>аргумент</td><td><code>Documents</code></td><td>з чим працювати</td></tr></tbody></table>" },
        { type: "cli", title: "Хто я, де я і яка в мене оболонка",
          intro: "<p>Ці команди лише показують інформацію — їх можна вводити скільки завгодно.</p>",
          commands: [
            { cmd: "echo $SHELL", explain: "Виводить значення змінної <code>SHELL</code> — шлях до твоєї оболонки входу (тієї, що стартує в новому вікні). Яка оболонка працює саме зараз, покаже <code>echo $0</code>.", output: "/bin/zsh", risk: "low" },
            { cmd: "whoami", explain: "Ім'я користувача, від якого виконуються команди. Важливо перед роботою з правами чи SSH.", output: "Stas", risk: "low" },
            { cmd: "hostname", explain: "Мережеве ім'я цього Mac. У запрошенні видно лише частину до першої крапки.", output: "MacBook-Pro.local", risk: "low" },
            { cmd: "pwd", explain: "Print working directory — повний шлях до папки, в якій ти зараз.", output: "/Users/Stas", risk: "low" }
          ] },
        { type: "terminal", title: "Спробуй: хто я?",
          task: "Дізнайся, від імені якого користувача виконуються команди в цьому терміналі.",
          expected: ["whoami"], output: "Stas",
          hint: "Англійською це питання звучить як «who am I» — склей слова.",
          explain: "`whoami` нічого не змінює — лише називає користувача. Саме від його імені працюватимуть усі наступні команди." },
        { type: "check", title: "Прочитай запрошення",
          question: "Ти бачиш запрошення `Stas@MacBook-Pro Projects %`. Що можна сказати напевно?",
          options: ["Ти в папці `Projects` і працюєш як звичайний користувач", "Ти працюєш з правами root", "Команда `Projects` щойно завершилась помилкою"],
          correct: 0, feedback: "Остання частина перед `%` — назва поточної папки, а `%` означає звичайного користувача. Для root було б `#`." },
        { type: "terminal", title: "Спробуй: де я?",
          task: "Виведи повний шлях до папки, в якій ти зараз.",
          expected: ["pwd"], output: "/Users/Stas",
          hint: "Три літери — перші літери слів print working directory.",
          explain: "Нове вікно Terminal відкривається в домашній папці `/Users/Stas`. У запрошенні вона скорочена до `~`." },
        { type: "cli", title: "Чистий екран і пам'ять команд",
          commands: [
            { cmd: "clear", explain: "Очищає екран. Історія команд при цьому лишається. Те саме робить <span class=\"kbd\">⌘</span> + <span class=\"kbd\">K</span> у Terminal.", risk: "low" },
            { cmd: "history", explain: "Нумерований список попередніх команд. Стрілки <span class=\"kbd\">↑</span> / <span class=\"kbd\">↓</span> гортають їх прямо в рядку вводу.", output: "  41  pwd\n  42  whoami\n  43  echo $SHELL", risk: "low" }
          ] },
        { type: "check", title: "Що робить clear",
          question: "Ти ввів `clear`. Що сталося з історією команд?",
          options: ["Історію стерто назавжди", "Екран очищено, а `history` і стрілка ↑ досі пам'ятають команди", "Terminal перезапустився з нуля"],
          correct: 1, feedback: "`clear` лише прибирає текст з екрана. Історія зберігається окремо — її видно через `history` і стрілку ↑." },
        { type: "summary", title: "Підсумок",
          points: ["Terminal — вікно, zsh — shell, що виконує команди.", "Запрошення показує користувача, комп'ютер і поточну папку; `%` — звичайний користувач, `#` — root.", "Команда = програма + прапорці + аргументи: `ls -la Documents`.", "`whoami`, `hostname`, `pwd`, `echo $SHELL` лише показують інформацію — ризик низький.", "`clear` чистить екран, `history` і ↑ повертають попередні команди."] }
      ],
      glossary: [
        { term: "Terminal", def: "Програма macOS, у вікні якої працює shell." },
        { term: "Shell (zsh)", def: "Інтерпретатор команд; на сучасному macOS за замовчуванням — `zsh`." },
        { term: "Запрошення (prompt)", def: "Рядок перед курсором: користувач, комп'ютер, поточна папка і `%` або `#`." },
        { term: "Прапорець (flag)", def: "Модифікатор команди, зазвичай з дефісом: `-l`, `-a`, `--version`." },
        { term: "Аргумент", def: "Те, з чим працює команда: файл, папка, адреса." }
      ],
      quiz: [
        { question: "У команді `ls -la Documents` що є прапорцем?", options: ["`ls`", "`-la`", "`Documents`"], correct: 1, feedback: "`ls` — команда, `-la` — прапорці (детально + приховані), `Documents` — аргумент." },
        { question: "Колега бачить у Terminal запрошення `bash-3.2$`. Яка команда покаже, яку оболонку він використовує?", options: ["`ps -p $$`", "`whoami`", "`hostname`"], correct: 0, feedback: "`$$` — номер процесу поточної оболонки, `ps -p $$` покаже її ім'я (тут `bash`); коротший варіант — `echo $0`. А `echo $SHELL` показує оболонку входу з налаштувань користувача — вона може бути `/bin/zsh`, навіть коли зараз запущено `bash`. `whoami` і `hostname` — про користувача і комп'ютер." },
        { question: "Що означає `%` в кінці запрошення zsh?", options: ["Команда виконується у фоні", "Попередня команда завершилась помилкою", "Shell чекає команду від звичайного користувача"], correct: 2, feedback: "`%` — звичайний користувач; `#` — root. Помилки й фонові задачі позначаються інакше." },
        { question: "Ти відкрив нове вікно Terminal і ввів `pwd`. Найімовірніший результат?", options: ["`/`", "`/Users/Stas`", "`/System`"], correct: 1, feedback: "Нова сесія стартує в домашній папці користувача — `/Users/Stas`." },
        { question: "Навіщо перевіряти `whoami` перед роботою з правами чи SSH?", options: ["Щоб знати, від імені якого користувача виконуватимуться команди", "Щоб прискорити Terminal", "Щоб змінити пароль"], correct: 0, feedback: "Права на файли й доступи залежать від користувача. `whoami` нічого не змінює." },
        { question: "Як найшвидше повторити команду, яку ти ввів хвилину тому?", options: ["Набрати `repeat`", "Перезапустити Terminal", "Натиснути стрілку ↑ і Enter"], correct: 2, feedback: "Стрілка ↑ гортає історію команд. Команди `repeat` для цього немає, а перезапуск нічого не повторює." }
      ]
    },
    {
      id: "m01-l02", title: "PATH, which і довідка", minutes: 11,
      steps: [
        { type: "story", title: "«command not found»",
          body: "<p>Ти встановив утиліту, вводиш її назву — а zsh відповідає <code>zsh: command not found</code>. Або навпаки: запускається не та версія Python, яку ти ставив.</p><p>Обидві загадки розв'язує одна змінна — <code>PATH</code>. А коли забув прапорець, допоможуть <code>man</code> і <code>apropos</code>.</p>" },
        { type: "concept", title: "PATH — де shell шукає програми",
          body: "<p><code>PATH</code> — список папок, розділених двокрапкою. Коли ти вводиш <code>git</code>, zsh перебирає ці папки зліва направо і запускає перший знайдений файл з таким іменем.</p><p>Немає в жодній папці — <code>command not found</code>. Є у двох — перемагає та, що стоїть раніше.</p>",
          analogy: "`PATH` — як список полиць, які бібліотекар перевіряє по черзі. Ти просиш книжку `git` — він іде полицями зліва направо й віддає першу знайдену. Немає на жодній полиці — «такої книжки немає» (`command not found`)." },
        { type: "cli", title: "Подивитися PATH",
          commands: [
            { cmd: "echo $PATH", explain: "Увесь PATH одним рядком. Знак <code>$</code> означає «значення змінної».", output: "/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin", risk: "low" },
            { cmd: "echo $PATH | tr ':' '\\n'", explain: "Той самий PATH, але <code>tr</code> замінює кожну двокрапку на перенос рядка — читати набагато легше.", risk: "low" }
          ] },
        { type: "terminal", title: "Спробуй: PATH стовпчиком",
          task: "Виведи папки з `PATH` по одній на рядок.",
          expected: ["echo $PATH | tr ':' '\\n'", "echo $PATH | tr \":\" \"\\n\""],
          output: "/opt/homebrew/bin\n/opt/homebrew/sbin\n/usr/local/bin\n/usr/bin\n/bin\n/usr/sbin\n/sbin",
          hint: "Виведи `$PATH` через `echo`, а потім через `|` передай у `tr`, який замінить `:` на `\\n`.",
          explain: "Папки Homebrew стоять першими — тому програми, встановлені через `brew`, перемагають системні з `/usr/bin`." },
        { type: "cli", title: "Звідки запускається команда",
          commands: [
            { cmd: "which git", explain: "Повний шлях до файлу, який запуститься. Якщо команди немає — <code>git not found</code>.", output: "/usr/bin/git", risk: "low" },
            { cmd: "command -v python3", explain: "Те саме за стандартом POSIX — зручно в скриптах: команди немає → порожній вивід і код помилки.", output: "/opt/homebrew/bin/python3", risk: "low" }
          ] },
        { type: "check", title: "Хто переможе в PATH",
          question: "`PATH` починається з `/opt/homebrew/bin:…:/usr/bin`. `python3` є в обох папках. Який запуститься за командою `python3`?",
          options: ["Той, що в `/usr/bin`, — системні завжди головніші", "Той, що в `/opt/homebrew/bin`, бо ця папка раніше в PATH", "zsh спитає, який обрати"],
          correct: 1, feedback: "zsh бере перший збіг зліва. Саме тому `which python3` показує `/opt/homebrew/bin/python3`." },
        { type: "terminal", title: "Спробуй: де git?",
          task: "Дізнайся, який саме файл запуститься за командою `git`.",
          expected: ["which git", "command -v git"], output: "/usr/bin/git",
          hint: "Англійське «which» — «який саме».",
          explain: "`/usr/bin/git` — системний Git від Apple (Command Line Tools). Якби ти встановив Git через Homebrew, тут був би `/opt/homebrew/bin/git`." },
        { type: "cli", title: "Довідка і пошук команд",
          commands: [
            { cmd: "man ls", explain: "Повна довідка (manual). <span class=\"kbd\">Space</span> — далі, <code>/слово</code> — пошук, <code>q</code> — вихід.", risk: "low" },
            { cmd: "apropos network", explain: "Шукає команди, в описі яких є слово. Допомагає, коли знаєш задачу, але не назву команди.", output: "ifconfig(8)      - configure network interface parameters\nnetstat(1)       - show network status\nnetworksetup(8)  - configuration tool for network settings", risk: "low" }
          ] },
        { type: "check", title: "Забув назву команди",
          question: "Ти не пам'ятаєш, яка команда показує мережеві налаштування, але знаєш слово network. Що допоможе?",
          options: ["`man network`", "`which network`", "`apropos network`"],
          correct: 2, feedback: "`apropos` шукає за словом в описах усіх команд. `man` і `which` потребують точної назви команди." },
        { type: "summary", title: "Підсумок",
          points: ["`PATH` — список папок, де zsh шукає програми; перемагає перший збіг зліва.", "`echo $PATH | tr ':' '\\n'` показує PATH стовпчиком.", "`which` і `command -v` кажуть, який файл запуститься; «not found» — команди немає в PATH.", "`man команда` — довідка (`q` — вихід), `apropos слово` — пошук команди за задачею."] }
      ],
      glossary: [
        { term: "PATH", def: "Змінна зі списком папок, де shell шукає виконувані файли." },
        { term: "Змінна середовища", def: "Іменоване значення, доступне програмам: `$PATH`, `$SHELL`, `$HOME`." },
        { term: "which", def: "Показує повний шлях до команди, яка запуститься." },
        { term: "man-сторінка", def: "Вбудована довідка до команди; відкривається `man <команда>`." },
        { term: "apropos", def: "Пошук команд за ключовим словом в описах man-сторінок." }
      ],
      quiz: [
        { question: "`which brew` відповідає `brew not found`, хоча Homebrew встановлено. Найімовірніша причина?", options: ["Папки `/opt/homebrew/bin` немає в `PATH`", "Homebrew видалився сам", "`which` не працює на Mac"], correct: 0, feedback: "Після встановлення Homebrew просить додати `/opt/homebrew/bin` у PATH (через `~/.zprofile`). Без цього zsh його не бачить." },
        { question: "Як вийти з довідки `man ls`?", options: ["Ctrl+Z", "Натиснути `q`", "Закрити вікно Terminal"], correct: 1, feedback: "`man` відкриває довідку в переглядачі `less`, з якого виходять клавішею `q`." },
        { question: "Чим `command -v` зручніший за `which` у скриптах?", options: ["Він швидше завантажує програму", "Він встановлює відсутню команду", "Це стандарт POSIX: однаково працює в різних shell і повертає код помилки, якщо команди немає"], correct: 2, feedback: "`command -v` вбудований у shell і стандартизований — надійний для перевірок у скриптах." },
        { question: "Навіщо в `echo $PATH | tr ':' '\\n'` потрібен `tr`?", options: ["Замінює двокрапки на переноси рядка, щоб кожна папка була окремим рядком", "Видаляє зайві папки з PATH", "Зберігає PATH у файл"], correct: 0, feedback: "`tr` (translate) міняє символи. PATH при цьому не змінюється — змінюється лише вигляд виводу." },
        { question: "Що виведе `echo PATH` (без `$`)?", options: ["Вміст змінної PATH", "Просто слово `PATH`", "Помилку command not found"], correct: 1, feedback: "Без `$` це звичайний текст. Значення змінної підставляється лише з `$`." },
        { question: "Який ризик у команд `which`, `man`, `echo $PATH`?", options: ["Високий — змінюють систему", "Середній — змінюють налаштування", "Низький — лише показують інформацію"], correct: 2, feedback: "Усі три тільки читають і показують. Їх можна запускати без жодних побоювань." }
      ]
    }
  ]
});
