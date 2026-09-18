window.CLI_COURSE = window.CLI_COURSE || { modules: [], exam: null, cheatsheet: null };
window.CLI_COURSE.modules.push({
  id: "m02", order: 2, title: "Файли та папки", subtitle: "Шляхи, навігація, створення і видалення", icon: "folder",
  goal: "Після модуля ти вільно ходиш папками, створюєш, копіюєш і перейменовуєш файли, а видаляєш — свідомо, знаючи, що в Terminal немає кошика.",
  lessons: [
    {
      id: "m02-l01", title: "Навігація: де я і що тут є", minutes: 10,
      steps: [
        { type: "concept", title: "Шляхи: абсолютні й відносні",
          body: "<p><strong>Абсолютний</strong> шлях починається з <code>/</code> — кореня диска: <code>/Users/Stas/Projects</code>. <strong>Відносний</strong> рахується від поточної папки: <code>Projects/demo</code>, <code>../docs</code>.</p><ul><li><code>~</code> — домашня папка (<code>/Users/Stas</code>)</li><li><code>.</code> — поточна папка</li><li><code>..</code> — батьківська (на рівень вище)</li></ul>",
          analogy: "Абсолютний шлях — повна поштова адреса («Київ, вул. Хрещатик, 1, кв. 5»): працює звідки завгодно. Відносний — «двері праворуч»: має сенс лише там, де ти стоїш. `..` — «вийти в коридор», `~` — «додому»." },
        { type: "cli", title: "Що лежить у папці",
          commands: [
            { cmd: "ls", explain: "Короткий список файлів і папок. Приховані (з крапкою на початку) не показує.", output: "build   data.csv   docs   file.txt   readme.md   src", risk: "low" },
            { cmd: "ls -la", explain: "<code>-l</code> — детально (права, власник, розмір, дата), <code>-a</code> — разом із прихованими: <code>.git</code>, <code>.gitignore</code>, <code>.zshrc</code>.", risk: "low" },
            { cmd: "open .", explain: "Відкриває поточну папку у Finder. Крапка — «ця папка». Працює лише на macOS.", risk: "low" }
          ] },
        { type: "terminal", title: "Спробуй: детальний список",
          prompt: "Stas@MacBook-Pro demo %",
          task: "Ти в папці проєкту `demo`. Покажи детальний список разом із прихованими файлами.",
          expected: ["ls -la", "ls -al", "ls -l -a", "ls -a -l"],
          output: "total 40\ndrwxr-xr-x   9 Stas  staff   288 Sep 18 10:00 .\ndrwxr-xr-x   4 Stas  staff   128 Sep 18 09:40 ..\ndrwxr-xr-x  12 Stas  staff   384 Sep 18 10:00 .git\n-rw-r--r--   1 Stas  staff    24 Sep 18 10:00 .gitignore\ndrwxr-xr-x   3 Stas  staff    96 Sep 18 10:00 docs\n-rw-r--r--   1 Stas  staff   139 Sep 18 10:00 readme.md\ndrwxr-xr-x   3 Stas  staff    96 Sep 18 10:00 src",
          hint: "Команда `ls` і два прапорці: один — «детально» (long), другий — «усе» (all).",
          explain: "Порядок прапорців не важливий: `-la` і `-al` — те саме. Перша літера рядка: `d` — папка, `-` — файл." },
        { type: "check", title: "Прочитай ls -la",
          question: "У виводі `ls -la` один рядок починається з `drwxr-xr-x`, інший — з `-rw-r--r--`. Що означає перша літера?",
          options: ["`d` — папка, `-` — звичайний файл", "`d` — видалений файл", "`d` — файл, який можна запускати"],
          correct: 0, feedback: "Перший символ — тип: `d` (directory) або `-` (файл). Далі йдуть права: читання `r`, запис `w`, виконання `x`." },
        { type: "cli", title: "Переходи між папками",
          commands: [
            { cmd: "cd src", explain: "Увійти в підпапку <code>src</code> поточної папки (відносний шлях).", risk: "low" },
            { cmd: "cd ..", explain: "Піднятися на рівень вище.", risk: "low" },
            { cmd: "cd ~", explain: "Додому, в <code>/Users/Stas</code>. Просто <code>cd</code> без аргументів робить те саме.", risk: "low" },
            { cmd: "cd ~/Projects/demo", explain: "Перейти за шляхом від домашньої папки — працює звідки завгодно.", risk: "low" },
            { cmd: "cd -", explain: "Повернутися в попередню папку, де ти був до останнього <code>cd</code>.", risk: "low" }
          ] },
        { type: "terminal", title: "Спробуй: на рівень вище",
          prompt: "Stas@MacBook-Pro src %",
          task: "Ти в `~/Projects/demo/src`. Піднімися в батьківську папку `demo`.",
          expected: ["cd ..", "cd ../"], output: "",
          hint: "Дві крапки означають батьківську папку.",
          explain: "`cd` нічого не виводить, коли все добре. Результат видно в запрошенні: `src` зміниться на `demo`." },
        { type: "check", title: "Куди приведе шлях",
          question: "Ти в `/Users/Stas/Projects/demo`. Де опинишся після `cd ../..`?",
          options: ["`/Users/Stas/Projects`", "`/`", "`/Users/Stas`"],
          correct: 2, feedback: "Кожне `..` піднімає на рівень: `demo` → `Projects` → `Stas`. Отже, `/Users/Stas`." },
        { type: "callout", variant: "tip", title: "Tab доповнює шляхи",
          body: "<p>У справжньому Terminal набери <code>cd Pro</code> і натисни <span class=\"kbd\">Tab</span> — zsh допише <code>Projects/</code>. Двічі <span class=\"kbd\">Tab</span> покаже варіанти. Це швидше і захищає від помилок у назвах.</p>" },
        { type: "summary", title: "Підсумок",
          points: ["Абсолютний шлях починається з `/`, відносний — від поточної папки; `~` — дім, `..` — рівень вище.", "`ls` — короткий список, `ls -la` — детальний з прихованими файлами.", "`cd папка`, `cd ..`, `cd ~`, `cd -` — основні переходи; успішний `cd` нічого не виводить.", "`open .` відкриває поточну папку у Finder."] }
      ],
      glossary: [
        { term: "Абсолютний шлях", def: "Шлях від кореня диска, починається з `/`: `/Users/Stas/Projects`." },
        { term: "Відносний шлях", def: "Шлях від поточної папки: `src`, `../docs`." },
        { term: "~ (тильда)", def: "Скорочення домашньої папки користувача, `/Users/Stas`." },
        { term: ".. (дві крапки)", def: "Батьківська папка — на рівень вище." },
        { term: "Прихований файл", def: "Файл, ім'я якого починається з крапки (`.zshrc`, `.git`); видно через `ls -a`." }
      ],
      quiz: [
        { question: "Яка команда з будь-якої папки гарантовано приведе тебе в `~/Projects/demo`?", options: ["`cd demo`", "`cd ~/Projects/demo`", "`cd ..`"], correct: 1, feedback: "Шлях від `~` не залежить від поточної папки. `cd demo` спрацює лише з `~/Projects`." },
        { question: "Чому `ls` не показує файл `.gitignore`, хоча він є?", options: ["Файли з крапкою на початку приховані; їх показує `ls -a`", "Файл пошкоджено", "`ls` показує лише папки"], correct: 0, feedback: "Крапка на початку імені робить файл прихованим. `-a` (all) показує все." },
        { question: "`cd Documents` відповідає `no such file or directory`. Що перевірити першим?", options: ["Перезавантажити Mac", "Встановити `cd` через Homebrew", "`pwd` і `ls` — можливо, ти не в тій папці, де лежить Documents"], correct: 2, feedback: "Відносний шлях рахується від поточної папки. `pwd` покаже, де ти, `ls` — що тут є." },
        { question: "Що робить `open .`?", options: ["Відкриває поточну папку у Finder", "Відкриває всі файли в папці", "Робить папку доступною всім"], correct: 0, feedback: "`open` відкриває файл чи папку так, ніби ти двічі клацнув у Finder; `.` — поточна папка." },
        { question: "Який із цих шляхів абсолютний?", options: ["`Projects/demo`", "`../docs`", "`/Users/Stas/Projects`"], correct: 2, feedback: "Абсолютний шлях починається з `/` — кореня диска." },
        { question: "Що означає `~` у шляху `~/Downloads`?", options: ["Корінь диска", "Домашню папку користувача (`/Users/Stas`)", "Поточну папку"], correct: 1, feedback: "`~` — скорочення домашньої папки. Корінь — `/`, поточна папка — `.`." }
      ]
    },
    {
      id: "m02-l02", title: "Створити, скопіювати, видалити", minutes: 13,
      steps: [
        { type: "story", title: "У Terminal немає кошика",
          body: "<p>У Finder видалений файл спершу потрапляє в Кошик. У Terminal команда <code>rm</code> видаляє одразу і назавжди — без «Скасувати».</p><p>Тому в цьому уроці два навички: швидко працювати з файлами і зупинятися на секунду перед кожним <code>rm</code>.</p>" },
        { type: "concept", title: "Чотири дії з файлами",
          body: "<p><code>mkdir</code> і <code>touch</code> створюють, <code>cp</code> копіює, <code>mv</code> переносить або перейменовує, <code>rm</code> видаляє. Усі вони мовчать, коли все вдалося.</p><p>Небезпечні моменти: <code>cp</code> і <code>mv</code> без попередження перезаписують файл з тим самим іменем, а <code>rm</code> не має кошика.</p>",
          analogy: "`cp` — ксерокс: оригінал лишається, з'являється копія. `mv` — переклеїти етикетку чи перенести коробку в іншу кімнату: річ та сама. `rm` — шредер, а не кошик: витягнути аркуш назад не вийде." },
        { type: "cli", title: "Створити папки й файли",
          commands: [
            { cmd: "mkdir projects", explain: "Створює папку. Якщо вона вже є — <code>File exists</code>.", risk: "medium" },
            { cmd: "mkdir -p app/src/utils", explain: "<code>-p</code> створює всі проміжні папки, яких ще немає.", risk: "medium" },
            { cmd: "touch notes.txt", explain: "Створює порожній файл (або оновлює дату зміни наявного, не чіпаючи вміст).", risk: "medium" }
          ] },
        { type: "cli", title: "Копіювати й переносити",
          commands: [
            { cmd: "cp file.txt backup.txt", explain: "Копія файлу. Якщо <code>backup.txt</code> існує — буде перезаписаний без питань.", risk: "medium" },
            { cmd: "cp -R src src-copy", explain: "Копія папки з усім вмістом (<code>-R</code> — рекурсивно).", risk: "medium" },
            { cmd: "mv old.txt new.txt", explain: "Перейменування. <code>mv file.txt docs/</code> — перенесення в папку.", risk: "medium" },
            { cmd: "mv -i old.txt new.txt", explain: "<code>-i</code> — спитає дозволу, якщо <code>new.txt</code> вже існує.", output: "overwrite new.txt? (y/n [n])", risk: "medium" }
          ] },
        { type: "terminal", title: "Спробуй: резервна копія",
          prompt: "Stas@MacBook-Pro demo %",
          task: "Перед змінами зроби копію `file.txt` з іменем `backup.txt`.",
          expected: ["cp file.txt backup.txt", "cp ./file.txt backup.txt", "cp file.txt ./backup.txt"], output: "",
          hint: "Команда копіювання, спершу що копіюєш, потім — як назвати копію.",
          explain: "`cp` мовчить, коли все вдалося. Тепер можна сміливо редагувати `file.txt` — оригінал збережено." },
        { type: "check", title: "Тихий перезапис",
          question: "У папці вже є `new.txt` з важливим текстом. Що зробить `mv old.txt new.txt`?",
          options: ["Спитає, чи перезаписати", "Мовчки замінить вміст `new.txt` вмістом `old.txt`", "Відмовиться з помилкою"],
          correct: 1, feedback: "Без `-i` команда `mv` перезаписує мовчки. Старий `new.txt` зникне так само безповоротно, як після `rm`." },
        { type: "callout", variant: "danger", title: "rm -r і rm -rf — незворотно",
          body: "<p><code>rm</code> видаляє повз Кошик. <code>rm -r</code> знищує папку з усім вмістом, а <code>-f</code> ще й прибирає будь-які питання. Помилка в одному символі (<code>rm -rf ~ /tmp</code> замість <code>~/tmp</code>) — і зникне вся домашня папка.</p><p><strong>Безпечніше:</strong> спершу <code>pwd</code> і <code>ls</code>; видаляй у Кошик командою <code>trash папка</code> (вбудована з macOS 15) або <code>mv папка ~/.Trash/</code>; <code>rm -ri</code> питає про кожен файл.</p>" },
        { type: "cli", title: "Видалити (обережно)",
          commands: [
            { cmd: "rm backup.txt", explain: "Видаляє файл назавжди. Папку <code>rm</code> без <code>-r</code> не видалить.", risk: "high" },
            { cmd: "rm -r folder", explain: "Видаляє папку з усім вмістом.", risk: "high" },
            { cmd: "rm -rf folder", explain: "Те саме без жодних питань і попереджень. Лише коли шлях перевірено.", risk: "high" },
            { cmd: "trash folder", explain: "Переносить у Кошик — можна відновити у Finder. Є в macOS 15 і новіших.", risk: "medium" },
            { cmd: "rmdir empty", explain: "Видаляє лише порожню папку. Непорожню — відмовиться: <code>Directory not empty</code>.", risk: "medium" }
          ] },
        { type: "terminal", title: "Спробуй: найбезпечніше видалення",
          prompt: "Stas@MacBook-Pro demo %",
          task: "Прибери порожню папку `empty` командою, яка відмовиться працювати, якщо папка раптом не порожня.",
          expected: ["rmdir empty", "rmdir empty/"], output: "",
          hint: "Команда — як `mkdir`, тільки навпаки.",
          explain: "`rmdir` — страховка: якщо в папці щось є, отримаєш `Directory not empty`, і нічого не зникне." },
        { type: "check", title: "Не впевнений у вмісті",
          question: "Треба прибрати папку `old-project`, але ти не на 100 % впевнений, що там нічого важливого. Що найрозумніше?",
          options: ["`rm -rf old-project` — швидко і без питань", "`sudo rm -r old-project`", "`trash old-project` або `mv old-project ~/.Trash/` — тоді можна відновити"],
          correct: 2, feedback: "Кошик дає шанс передумати. `rm -rf` і тим паче `sudo rm -r` такого шансу не дають." },
        { type: "summary", title: "Підсумок",
          points: ["`mkdir` (з `-p` — вкладені), `touch` — створити; `cp` (`-R` для папок) — копіювати; `mv` — перенести чи перейменувати.", "`cp` і `mv` мовчки перезаписують наявні файли; `-i` питає дозволу.", "`rm` видаляє без Кошика; `rm -r` і `rm -rf` — високий ризик.", "Перед видаленням — `pwd` і `ls`; безпечніше — `trash` або `mv … ~/.Trash/`, а для порожніх папок — `rmdir`."] }
      ],
      glossary: [
        { term: "Рекурсивно (-r, -R)", def: "Разом з усім вмістом папки, на всіх рівнях вкладеності." },
        { term: "Force (-f)", def: "Прапорець `rm`, що вимикає питання й попередження." },
        { term: "Кошик (~/.Trash)", def: "Папка, куди Finder і команда `trash` переносять видалене; звідти можна відновити." },
        { term: "Перезапис", def: "Заміна вмісту наявного файлу новим; старий вміст втрачається." }
      ],
      quiz: [
        { question: "Чим `cp` відрізняється від `mv`?", options: ["`cp` лишає оригінал і створює копію; `mv` переносить чи перейменовує без копії", "Нічим, це синоніми", "`mv` працює лише з папками"], correct: 0, feedback: "Після `cp` файлів два, після `mv` — той самий один, але з іншим іменем чи місцем." },
        { question: "`rmdir docs` відповідає `Directory not empty`. Що це означає?", options: ["Папку видалено частково", "У `docs` є файли, а `rmdir` видаляє лише порожні папки — це захист від помилки", "Потрібен `sudo`"], correct: 1, feedback: "`rmdir` навмисно відмовляється від непорожніх папок. Нічого не видалено." },
        { question: "Навіщо `-p` у `mkdir -p app/src/utils`?", options: ["Робить папку прихованою", "Захищає папку паролем", "Створює всі проміжні папки, яких ще немає"], correct: 2, feedback: "Без `-p` команда впаде, якщо `app` чи `app/src` ще не існують." },
        { question: "Ти видалив файл командою `rm report.txt`. Де його шукати?", options: ["У Кошику Finder", "Ніде: `rm` видаляє повз Кошик — допоможе лише бекап (наприклад, Time Machine)", "У папці `/tmp`"], correct: 1, feedback: "Саме тому перед `rm` варто зупинитися, а для сумнівних випадків — використовувати `trash`." },
        { question: "Яка команда копіює папку `src` з усім вмістом?", options: ["`cp src src-copy`", "`mv src src-copy`", "`cp -R src src-copy`"], correct: 2, feedback: "Для папок `cp` потрібен `-R`. `mv` не копіює, а перейменовує." },
        { question: "Що саме робить `-f` у `rm -rf`?", options: ["Вимикає питання і мовчить навіть про відсутні файли", "Видаляє швидше", "Переносить у Кошик"], correct: 0, feedback: "force = «не питай». Саме це робить команду такою небезпечною." }
      ]
    }
  ]
});
