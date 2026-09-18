window.CLI_COURSE = window.CLI_COURSE || { modules: [], exam: null, cheatsheet: null };
window.CLI_COURSE.modules.push({
  id: "m06", order: 6, title: "Git та GitHub", subtitle: "status → diff → add → commit → push", icon: "git",
  goal: "Після модуля ти ведеш щоденний цикл Git, працюєш у гілках, синхронізуєшся з GitHub і знаєш, які команди Git стирають зміни безповоротно.",
  lessons: [
    {
      id: "m06-l01", title: "Щоденний цикл: status, diff, add, commit", minutes: 11,
      steps: [
        { type: "concept", title: "Три місця для змін",
          body: "<p>Git розрізняє <strong>робочу папку</strong> (файли, як вони є зараз), <strong>staging</strong> (зміни, відібрані для наступного коміту) і <strong>історію комітів</strong>. <code>git add</code> переносить зміни в staging, <code>git commit</code> — фіксує знімок в історії.</p><p>GitHub — віддалена копія репозиторію; туди коміти потрапляють лише після <code>git push</code>.</p>",
          analogy: "Робоча папка — твій стіл із чернетками. `git add` — покласти вибрані аркуші в конверт. `git commit` — заклеїти конверт і підписати, що в ньому: тепер це незмінний знімок. `git push` — віднести конверт у спільний архів на GitHub." },
        { type: "cli", title: "Цикл однієї зміни",
          commands: [
            { cmd: "git status", explain: "Стан: гілка, змінені, підготовлені й нові файли. Починай з неї завжди.", risk: "low" },
            { cmd: "git diff", explain: "Що саме змінено в рядках і ще не підготовлено.", risk: "low" },
            { cmd: "git add .", explain: "Підготувати всі зміни в поточній папці. Можна по одному: <code>git add readme.md</code>.", risk: "medium" },
            { cmd: "git diff --staged", explain: "Що вже підготовлено — тобто що саме піде в коміт.", risk: "low" },
            { cmd: "git commit -m \"Update readme\"", explain: "Зафіксувати підготовлене з коротким описом.", output: "[main 7e41d2a] Update readme\n 2 files changed, 3 insertions(+), 1 deletion(-)", risk: "medium" },
            { cmd: "git log --oneline", explain: "Історія комітів, по одному рядку.", output: "7e41d2a Update readme\n3f9c2e1 Add readme\na1b2c3d Initial commit", risk: "low" }
          ] },
        { type: "terminal", title: "Спробуй: з чого почати",
          prompt: "Stas@MacBook-Pro demo %",
          task: "Ти відкрив проєкт `demo`. Подивись, у якому він стані.",
          expected: ["git status"],
          output: "On branch main\nChanges not staged for commit:\n  (use \"git add <file>...\" to update what will be committed)\n  (use \"git restore <file>...\" to discard changes in working directory)\n\tmodified:   file.txt\n\tmodified:   readme.md\n\nno changes added to commit (use \"git add\" and/or \"git commit -a\")",
          hint: "Команда, яку в Git виконують першою і найчастіше: «стан» англійською.",
          explain: "Два файли змінено, але ще не підготовлено. Git навіть підказує наступні кроки: `git add` або `git restore`." },
        { type: "check", title: "Прочитай status",
          question: "`git status` показує `Changes not staged for commit: modified: readme.md`. Що це означає?",
          options: ["Файл змінено, але ці зміни ще не додано до наступного коміту", "Файл уже на GitHub", "Файл видалено"],
          correct: 0, feedback: "«not staged» — зміни є лише в робочій папці. Щоб вони потрапили в коміт, потрібен `git add`." },
        { type: "terminal", title: "Спробуй: підготуй усе",
          prompt: "Stas@MacBook-Pro demo %",
          task: "Підготуй усі зміни в поточній папці до коміту.",
          expected: ["git add .", "git add -A", "git add --all"], output: "",
          hint: "`git add` і символ «поточна папка».",
          explain: "`git add` мовчить. Перевір результат `git status` або `git diff --staged`." },
        { type: "terminal", title: "Спробуй: коміт",
          prompt: "Stas@MacBook-Pro demo %",
          task: "Зафіксуй підготовлені зміни з повідомленням `Update readme`.",
          expected: ["git commit -m \"Update readme\"", "git commit -m 'Update readme'"],
          output: "[main 7e41d2a] Update readme\n 2 files changed, 3 insertions(+), 1 deletion(-)",
          hint: "`git commit`, прапорець повідомлення і текст у лапках.",
          explain: "Коміт створено локально: `7e41d2a` — його короткий хеш. На GitHub він з'явиться після `git push`." },
        { type: "check", title: "Що потрапить у коміт",
          question: "Ти зробив `git add .`, а потім ще раз змінив `readme.md`. Що піде в коміт?",
          options: ["Усі зміни, включно з останньою", "Лише те, що було підготовлено на момент `git add`; нову зміну треба додати ще раз", "Нічого"],
          correct: 1, feedback: "Staging — знімок на момент `git add`. `git status` покаже `readme.md` одночасно і в staged, і в not staged." },
        { type: "summary", title: "Підсумок",
          points: ["Цикл: `git status` → `git diff` → `git add` → `git diff --staged` → `git commit -m \"…\"`.", "`git add` кладе зміни в staging; коміт фіксує лише підготовлене.", "Коміт локальний, доки не зроблено `git push`.", "`git log --oneline` — коротка історія комітів."] }
      ],
      glossary: [
        { term: "Репозиторій", def: "Папка проєкту з історією змін Git (службова папка `.git`)." },
        { term: "Staging", def: "Проміжна зона: зміни, відібрані `git add` для наступного коміту." },
        { term: "Коміт", def: "Зафіксований знімок змін з автором, датою й повідомленням." },
        { term: "Хеш коміту", def: "Унікальний ідентифікатор коміту, напр. `7e41d2a`." }
      ],
      quiz: [
        { question: "Яку команду виконувати першою перед будь-якою дією з Git?", options: ["`git push`", "`git commit`", "`git status`"], correct: 2, feedback: "`git status` показує, на якій ти гілці і що змінено. Вона нічого не змінює." },
        { question: "Як подивитися, що саме піде в коміт?", options: ["`git diff --staged`", "`git diff`", "`git log`"], correct: 0, feedback: "`git diff` без прапорців показує ще не підготовлені зміни, а `--staged` — підготовлені." },
        { question: "Яке повідомлення коміту найкорисніше?", options: ["`fix`", "`Fix login button alignment on mobile`", "`asdf`"], correct: 1, feedback: "Через місяць з повідомлення має бути зрозуміло, що і навіщо змінено." },
        { question: "Що робить `git log --oneline`?", options: ["Показує коротку історію комітів", "Видаляє старі коміти", "Відправляє коміти на GitHub"], correct: 0, feedback: "Лише читає історію — по рядку на коміт." },
        { question: "`git commit -m \"…\"` відповідає `no changes added to commit`. Чому?", options: ["Немає інтернету", "GitHub недоступний", "Ти не виконав `git add` — підготовлених змін немає"], correct: 2, feedback: "Коміт бере лише staging. Для коміту інтернет не потрібен." },
        { question: "Чи змінює `git commit` щось на GitHub?", options: ["Так, одразу публікує", "Ні, коміт локальний, доки не зробиш `git push`", "Лише якщо файл великий"], correct: 1, feedback: "Git працює локально. Синхронізація з GitHub — окремі команди `push` і `pull`." }
      ]
    },
    {
      id: "m06-l02", title: "Гілки, push/pull, restore і gh", minutes: 12,
      steps: [
        { type: "concept", title: "Гілки",
          body: "<p>Гілка — окрема лінія комітів. На <code>main</code> лежить робоча версія, а нову функцію чи експеримент роблять в окремій гілці. Сучасна команда для гілок — <code>git switch</code>; старіша <code>git checkout</code> уміє те саме, але ще й перезаписувати файли, тому її легше вжити не так.</p>",
          analogy: "Гілка — окремий чорновик копії документа: пишеш сміливо, а чистовик (`main`) лишається недоторканим. Вийшло — переносиш зміни в чистовик, ні — просто викидаєш чорновик." },
        { type: "cli", title: "Робота з гілками",
          commands: [
            { cmd: "git branch", explain: "Список локальних гілок; <code>*</code> — поточна.", output: "  feature\n* main", risk: "low" },
            { cmd: "git switch feature", explain: "Перейти на наявну гілку.", risk: "medium" },
            { cmd: "git switch -c fix-header", explain: "Створити нову гілку і одразу перейти на неї.", risk: "medium" }
          ] },
        { type: "terminal", title: "Спробуй: нова гілка",
          prompt: "Stas@MacBook-Pro demo %",
          task: "Створи нову гілку `fix-header` і перейди на неї однією командою.",
          expected: ["git switch -c fix-header", "git checkout -b fix-header"],
          output: "Switched to a new branch 'fix-header'",
          hint: "`git switch` з прапорцем «create» і назвою гілки.",
          explain: "Тепер усі коміти підуть у `fix-header`, а `main` лишиться як був." },
        { type: "check", title: "Немає такої гілки",
          question: "`git switch feature` відповідає `fatal: invalid reference: feature`. Що це означає?",
          options: ["Гілки `feature` немає; створити і перейти — `git switch -c feature`", "Репозиторій зламано", "Треба `sudo`"],
          correct: 0, feedback: "`switch` без `-c` лише перемикає на наявну гілку. Для нової потрібен `-c`." },
        { type: "cli", title: "Синхронізація з GitHub",
          commands: [
            { cmd: "git pull", explain: "Завантажити нові коміти з GitHub і злити з твоєю гілкою.", output: "Already up to date.", risk: "medium" },
            { cmd: "git push", explain: "Відправити твої коміти на GitHub — їх побачать інші.", risk: "medium" },
            { cmd: "gh auth status", explain: "Чи залогінений GitHub CLI і яким акаунтом.", output: "github.com\n  ✓ Logged in to github.com account StsZu (keyring)", risk: "low" },
            { cmd: "gh repo view", explain: "Опис поточного репозиторію на GitHub; <code>--web</code> відкриє його в браузері.", risk: "low" }
          ] },
        { type: "check", title: "push відхилено",
          question: "`git push` повертає `! [rejected] main -> main (fetch first)`. Що робити?",
          options: ["`git push --force` — перезаписати GitHub", "Спершу `git pull`, розв'язати конфлікти, якщо будуть, потім знову `git push`", "Видалити репозиторій і склонувати заново"],
          correct: 1, feedback: "На GitHub з'явились коміти, яких у тебе немає. `pull` їх підтягне; `--force` стер би чужу роботу." },
        { type: "callout", variant: "danger", title: "Команди без Undo",
          body: "<p><code>git restore файл</code> стирає незакомічені зміни у файлі — вони ніде не збережені, повернути їх неможливо. <code>git push --force</code> переписує історію на GitHub і може знищити коміти колег.</p><p><strong>Безпечніше:</strong> спершу <code>git diff</code>; якщо сумніваєшся — <code>git stash</code> (зміни сховаються, а не зникнуть) або коміт у тимчасову гілку; замість <code>--force</code> — <code>git push --force-with-lease</code>.</p>" },
        { type: "cli", title: "Скасувати або відкласти зміни",
          commands: [
            { cmd: "git restore file.txt", explain: "Повернути файл до стану останнього коміту. Незакомічені зміни зникнуть назавжди.", risk: "high" },
            { cmd: "git restore --staged file.txt", explain: "Лише прибрати файл зі staging; зміни у файлі лишаються.", risk: "medium" },
            { cmd: "git stash", explain: "Сховати незакомічені зміни в «кишеню» — робоча папка стає чистою.", risk: "medium" },
            { cmd: "git stash pop", explain: "Повернути сховані зміни назад.", risk: "medium" }
          ] },
        { type: "terminal", title: "Спробуй: відкинь зміни у файлі",
          prompt: "Stas@MacBook-Pro demo %",
          task: "Ти переглянув `git diff` і впевнений: зміни у `file.txt` не потрібні. Скасуй їх.",
          expected: ["git restore file.txt", "git restore -- file.txt", "git checkout -- file.txt"],
          output: "",
          hint: "Сучасна команда Git «відновити» і ім'я файлу.",
          explain: "`file.txt` знову такий, як в останньому коміті. Саме тому спершу дивляться `git diff` — після `restore` зміни вже не повернути." },
        { type: "summary", title: "Підсумок",
          points: ["`git branch` — список гілок; `git switch гілка` — перейти; `git switch -c нова` — створити і перейти.", "`git pull` підтягує чужі коміти, `git push` відправляє твої; при `rejected` — спершу `pull`.", "`git restore файл` стирає незакомічені зміни без Undo — високий ризик; `git stash` лише ховає їх.", "`gh auth status` і `gh repo view` — перевірка GitHub CLI і репозиторію."] }
      ],
      glossary: [
        { term: "Гілка (branch)", def: "Окрема лінія комітів; дозволяє працювати, не чіпаючи `main`." },
        { term: "main", def: "Типова назва основної гілки репозиторію." },
        { term: "push / pull", def: "Відправити свої коміти на віддалений репозиторій / отримати й злити чужі." },
        { term: "stash", def: "Тимчасове сховище незакомічених змін." },
        { term: "gh", def: "Офіційний GitHub CLI для роботи з GitHub із терміналу." }
      ],
      quiz: [
        { question: "Чим `git restore --staged file.txt` відрізняється від `git restore file.txt`?", options: ["Нічим", "`--staged` лише знімає файл зі staging, зміни лишаються; без нього зміни у файлі стираються", "`--staged` видаляє файл"], correct: 1, feedback: "Перше — безпечне «передумав додавати», друге — незворотне «викинути зміни»." },
        { question: "Навіщо в Git з'явився `git switch` поруч із `git checkout`?", options: ["`checkout` робив забагато різного (гілки й файли); `switch` — лише для гілок, простіше і безпечніше", "`checkout` видалили з Git", "`switch` у 10 разів швидший"], correct: 0, feedback: "`checkout` досі працює, але `switch` (для гілок) і `restore` (для файлів) розділили його обов'язки." },
        { question: "`gh auth status` каже, що ти не залогінений. Що зробити?", options: ["`git push --force`", "Перевстановити Git", "`gh auth login`"], correct: 2, feedback: "`gh auth login` проведе через вхід у браузері. Сам Git при цьому не зачіпається." },
        { question: "Перед `git pull` у тебе незакомічені зміни в тих самих файлах. Безпечний крок:", options: ["Нічого, pull сам розбереться", "`git stash` або коміт — щоб pull не зіткнувся з твоїми змінами", "`git restore .`"], correct: 1, feedback: "`stash` чи коміт зберігають твою роботу. `git restore .` її знищив би." },
        { question: "Що означає зірочка у виводі `git branch`: `* main`?", options: ["Поточну гілку", "Гілку з помилками", "Віддалену гілку"], correct: 0, feedback: "Зірочка — гілка, на якій ти зараз." },
        { question: "Чому `git push --force` у спільну гілку небезпечний?", options: ["Він повільний", "Він видаляє локальні файли", "Він перезаписує історію на GitHub і може стерти коміти колег"], correct: 2, feedback: "Якщо примус справді потрібен — `--force-with-lease`: він відмовиться, якщо на GitHub є невідомі тобі коміти." }
      ]
    }
  ]
});
