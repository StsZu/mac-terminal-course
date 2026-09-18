window.CLI_COURSE = window.CLI_COURSE || { modules: [], exam: null, cheatsheet: null };
window.CLI_COURSE.modules.push({
  id: "m07", order: 7, title: "Python, Node, Homebrew", subtitle: "Встановлення утиліт, версії, venv, uv, npm", icon: "code",
  goal: "Після модуля ти встановлюєш і оновлюєш утиліти через Homebrew, розумієш, який Python запускається, ізолюєш залежності у venv чи uv і запускаєш Node-проєкт.",
  lessons: [
    {
      id: "m07-l01", title: "Homebrew: встановлення й оновлення", minutes: 10,
      steps: [
        { type: "concept", title: "Менеджер пакетів для Mac",
          body: "<p><strong>Homebrew</strong> (<code>brew</code>) встановлює консольні утиліти — <code>wget</code>, <code>jq</code>, <code>gh</code>, <code>node</code>, <code>python</code> — однією командою і вміє їх оновлювати. На Mac з Apple Silicon усе лягає в <code>/opt/homebrew</code>, на Intel-Mac — у <code>/usr/local</code>.</p><p>Опис кожної програми називається <strong>формулою</strong>, а для графічних застосунків є <strong>cask</strong>.</p>",
          analogy: "Homebrew — як App Store для утиліт терміналу. `brew search` — пошук на полиці, `brew install` — поставити програму, `brew update` — отримати свіжий каталог, `brew upgrade` — оновити вже встановлене." },
        { type: "cli", title: "Знайти і встановити",
          commands: [
            { cmd: "brew --version", explain: "Чи встановлено Homebrew і яка версія.", risk: "low" },
            { cmd: "brew search jq", explain: "Пошук пакета за назвою.", output: "==> Formulae\njq\ngojq", risk: "low" },
            { cmd: "brew install jq", explain: "Встановити пакет разом із залежностями.", risk: "medium" },
            { cmd: "brew list", explain: "Що вже встановлено через Homebrew.", output: "gh\njq\nnode\npython@3.13\nuv", risk: "low" },
            { cmd: "brew uninstall jq", explain: "Видалити встановлений пакет.", risk: "medium" }
          ] },
        { type: "terminal", title: "Спробуй: пошук пакета",
          task: "Знайди в Homebrew пакет `jq` (утиліта для JSON), нічого не встановлюючи.",
          expected: ["brew search jq"], output: "==> Formulae\njq\ngojq",
          hint: "`brew` і підкоманда «шукати» англійською.",
          explain: "`search` лише шукає в каталозі — нічого не змінює. Встановлення — окрема команда `brew install jq`." },
        { type: "check", title: "Де живе Homebrew",
          question: "Куди Homebrew встановлює програми на Mac з Apple Silicon (M1–M4)?",
          options: ["`/usr/bin`", "`/System/Library`", "`/opt/homebrew` (на Intel-Mac — `/usr/local`)"],
          correct: 2, feedback: "Системні папки (`/usr/bin`, `/System`) захищені macOS і належать Apple. Homebrew тримає все окремо." },
        { type: "cli", title: "Оновлення",
          commands: [
            { cmd: "brew update", explain: "Оновлює сам Homebrew і каталог формул. Твої програми не змінюються.", risk: "medium" },
            { cmd: "brew outdated", explain: "Які встановлені пакети мають новіші версії. Лише показує.", output: "node (24.6.0) < 24.8.0\nuv (0.8.13) < 0.8.17", risk: "low" },
            { cmd: "brew upgrade", explain: "Оновлює всі застарілі пакети. Може зламати проєкт, що залежить від старої версії.", risk: "medium" },
            { cmd: "brew upgrade node", explain: "Оновлює лише один пакет — контрольованіше.", risk: "medium" }
          ] },
        { type: "terminal", title: "Спробуй: що застаріло",
          task: "Подивись, які пакети Homebrew застаріли, нічого не оновлюючи.",
          expected: ["brew outdated"], output: "node (24.6.0) < 24.8.0\nuv (0.8.13) < 0.8.17",
          hint: "Підкоманда `brew` означає «застарілий» англійською.",
          explain: "Тепер ти вирішуєш сам: оновити все (`brew upgrade`) чи лише потрібне (`brew upgrade uv`). Номери версій у тебе будуть інші." },
        { type: "check", title: "update чи upgrade",
          question: "Чим `brew update` відрізняється від `brew upgrade`?",
          options: ["`update` оновлює каталог Homebrew, `upgrade` — встановлені програми", "Це одне й те саме", "`upgrade` оновлює macOS"],
          correct: 0, feedback: "Спершу каталог дізнається про нові версії (`update`), потім `upgrade` їх ставить. Сучасний `brew upgrade` сам робить `update` перед роботою." },
        { type: "callout", variant: "warning", title: "Без sudo і не перед дедлайном",
          body: "<p>Homebrew розрахований на звичайного користувача: <code>sudo brew …</code> він відмовляється виконувати, а спроби обійти це псують права на файли.</p><p>Масовий <code>brew upgrade</code> може підняти мажорну версію Node чи Python. Перед важливою роботою оновлюй вибірково або закріпи версію: <code>brew pin node</code>.</p>" },
        { type: "summary", title: "Підсумок",
          points: ["`brew search` → `brew install` → `brew list` — знайти, встановити, перевірити.", "`brew update` оновлює каталог, `brew outdated` показує застаріле, `brew upgrade` оновлює програми.", "Програми Homebrew живуть у `/opt/homebrew` (Apple Silicon) або `/usr/local` (Intel).", "`brew` — без `sudo`; перед дедлайном не оновлюй усе підряд, `brew pin` фіксує версію."] }
      ],
      glossary: [
        { term: "Homebrew", def: "Менеджер пакетів для macOS; команда `brew`." },
        { term: "Формула (formula)", def: "Опис того, як завантажити й встановити консольну програму в Homebrew." },
        { term: "Cask", def: "Опис встановлення графічного застосунку через Homebrew: `brew install --cask …`." },
        { term: "brew pin", def: "Заборона оновлювати конкретний пакет під час `brew upgrade`." }
      ],
      quiz: [
        { question: "`brew install jq` пройшов, а `jq` пише `command not found`. Що перевірити?", options: ["Чи є `/opt/homebrew/bin` у `PATH` (`echo $PATH`)", "Чи ввімкнено Wi-Fi", "Чи використано `sudo`"], correct: 0, feedback: "Homebrew кладе програми в `/opt/homebrew/bin`. Якщо цієї папки немає в PATH, zsh їх не бачить." },
        { question: "Чому не варто запускати `sudo brew install …`?", options: ["`sudo` прискорює встановлення", "Homebrew розрахований на звичайного користувача; від root він відмовляється працювати, а обхід псує права на файли", "`sudo` вимикає Homebrew назавжди"], correct: 1, feedback: "Homebrew навмисно працює без root — так менше шансів зачепити систему." },
        { question: "Перед важливим дедлайном безпечніше…", options: ["`brew upgrade` усього", "`brew uninstall node`", "не запускати масовий `brew upgrade`, а оновлювати вибірково або `brew pin node`"], correct: 2, feedback: "Оновлення — зміни. Під дедлайн зміни в інструментах — зайвий ризик." },
        { question: "Яка команда нічого не змінює і лише показує, що встановлено?", options: ["`brew upgrade`", "`brew list`", "`brew update`"], correct: 1, feedback: "`list` лише читає. `update` і `upgrade` змінюють Homebrew чи програми." },
        { question: "Що таке формула (formula) в Homebrew?", options: ["Опис того, як завантажити й встановити конкретну програму", "Математичний вираз", "Скрипт видалення macOS"], correct: 0, feedback: "Кожен пакет має формулу: звідки брати, як зібрати, від чого залежить." },
        { question: "Шлях `/opt/homebrew/bin/wget` означає, що wget…", options: ["вбудований у macOS", "встановлено через Homebrew на Mac з Apple Silicon", "лежить у Кошику"], correct: 1, feedback: "`/opt/homebrew` — префікс Homebrew на Apple Silicon. Системні утиліти лежать у `/usr/bin` і `/bin`." }
      ]
    },
    {
      id: "m07-l02", title: "Python і Node: версії, venv, uv, npm", minutes: 13,
      steps: [
        { type: "story", title: "Два Python на одному Mac",
          body: "<p>На Mac часто є два <code>python3</code>: системний <code>/usr/bin/python3</code> від Apple (з Command Line Tools, зазвичай старіша версія) і свіжий з Homebrew — <code>/opt/homebrew/bin/python3</code>. Який запуститься, вирішує порядок у <code>PATH</code>.</p><p>Друга пастка — пакети. Python з Homebrew не дає ставити їх «глобально» через <code>pip</code>: потрібне віртуальне середовище.</p>" },
        { type: "concept", title: "Віртуальне середовище",
          body: "<p><strong>venv</strong> — папка (зазвичай <code>.venv</code>) усередині проєкту з власним Python і пакетами. Коли venv активовано, <code>python</code> і <code>pip</code> працюють лише з нею. <strong>uv</strong> — швидкий менеджер, що створює venv і ставить залежності сам.</p>",
          analogy: "Віртуальне середовище — окрема коробка з інструментами для одного проєкту. Що кладеш у цю коробку, не розсипається по всьому Mac і не заважає іншим проєктам з їхніми коробками." },
        { type: "cli", title: "Який Python і venv",
          commands: [
            { cmd: "which python3", explain: "Який саме Python запуститься.", output: "/opt/homebrew/bin/python3", risk: "low" },
            { cmd: "python3 --version", explain: "Його версія (у тебе може бути інша).", output: "Python 3.13.7", risk: "low" },
            { cmd: "python3 -m venv .venv", explain: "Створити віртуальне середовище в папці <code>.venv</code> проєкту.", risk: "medium" },
            { cmd: "source .venv/bin/activate", explain: "Активувати venv у цьому вікні: у запрошенні з'явиться <code>(.venv)</code>. Вийти — <code>deactivate</code>.", risk: "medium" },
            { cmd: "pip install requests", explain: "Встановити пакет — усередину активного venv.", risk: "medium" }
          ] },
        { type: "terminal", title: "Спробуй: створи venv",
          prompt: "Stas@MacBook-Pro demo %",
          task: "Створи віртуальне середовище Python у папці `.venv` поточного проєкту.",
          expected: ["python3 -m venv .venv"], output: "",
          hint: "Запусти модуль `venv` через `python3 -m` і вкажи назву папки.",
          explain: "Папка `.venv` створена. Далі — `source .venv/bin/activate`, і пакети ставитимуться лише сюди. Додай `.venv/` у `.gitignore`." },
        { type: "check", title: "externally-managed-environment",
          question: "Без venv `pip3 install requests` на Python з Homebrew відповідає `error: externally-managed-environment`. Що правильно зробити?",
          options: ["Повторити з `sudo`", "Створити й активувати venv (або використати `uv`) і встановити пакет туди", "Видалити Homebrew"],
          correct: 1, feedback: "Це захист (PEP 668): глобальне середовище належить Homebrew. `sudo` чи `--break-system-packages` лише зламають його." },
        { type: "cli", title: "uv — усе в одному",
          commands: [
            { cmd: "uv --version", explain: "Чи встановлено uv (<code>brew install uv</code>).", risk: "low" },
            { cmd: "uv init", explain: "Створити Python-проєкт з <code>pyproject.toml</code> у поточній папці.", risk: "medium" },
            { cmd: "uv add requests", explain: "Додати залежність: uv сам створить <code>.venv</code> і встановить пакет.", risk: "medium" },
            { cmd: "uv run main.py", explain: "Запустити скрипт у середовищі проєкту — без ручного <code>activate</code>.", risk: "medium" }
          ] },
        { type: "cli", title: "Node.js і npm",
          commands: [
            { cmd: "node --version", explain: "Версія Node.js.", risk: "low" },
            { cmd: "npm install", explain: "Встановити залежності з <code>package.json</code> у папку <code>node_modules</code>. Пакети можуть запускати свої скрипти під час встановлення.", risk: "medium" },
            { cmd: "npm run dev", explain: "Запустити скрипт <code>dev</code> з <code>package.json</code>. Зупинка — <span class=\"kbd\">Ctrl</span> + <span class=\"kbd\">C</span>.", risk: "medium" },
            { cmd: "npx create-next-app@latest my-app", explain: "Разово завантажити й запустити пакет, нічого не ставлячи глобально.", risk: "medium" }
          ] },
        { type: "terminal", title: "Спробуй: залежності Node",
          prompt: "Stas@MacBook-Pro demo %",
          task: "Встанови залежності Node-проєкту з `package.json`.",
          expected: ["npm install", "npm i"],
          output: "added 187 packages, and audited 188 packages in 6s\n\nfound 0 vulnerabilities",
          hint: "`npm` і підкоманда «встановити».",
          explain: "Залежності лягли в `node_modules`. Цю папку не комітять — вона відтворюється з `package.json` і lock-файлу." },
        { type: "check", title: "npx чи глобальне встановлення",
          question: "Чим `npx create-next-app@latest my-app` відрізняється від `npm install -g create-next-app`?",
          options: ["`npx` разово завантажує і запускає пакет, нічого не встановлюючи глобально", "Нічим", "`npx` працює без інтернету"],
          correct: 0, feedback: "Для генераторів проєктів `npx` зручніший: щоразу свіжа версія і жодного глобального сміття." },
        { type: "summary", title: "Підсумок",
          points: ["`which python3` і `python3 --version` кажуть, який Python працює; Homebrew — `/opt/homebrew/bin/python3`.", "Пакети — у venv: `python3 -m venv .venv` → `source .venv/bin/activate` → `pip install …`; або `uv add …`.", "`externally-managed-environment` — сигнал створити venv, а не додавати `sudo`.", "Node: `node --version`, `npm install`, `npm run dev`; `npx` запускає пакет разово."] }
      ],
      glossary: [
        { term: "venv", def: "Віртуальне середовище Python: ізольована папка з інтерпретатором і пакетами проєкту." },
        { term: "pip", def: "Встановлювач Python-пакетів." },
        { term: "uv", def: "Швидкий менеджер Python-проєктів: версії Python, venv і залежності." },
        { term: "package.json", def: "Файл Node-проєкту зі списком залежностей і скриптів." },
        { term: "npx", def: "Запуск npm-пакета без глобального встановлення." }
      ],
      quiz: [
        { question: "`which python3` → `/usr/bin/python3`, а `python3 --version` → `Python 3.9.6`. Що це за Python?", options: ["Системний Python від Apple (з Command Line Tools) — для своїх проєктів краще Homebrew або uv", "Найновіший Python", "Python 2"], correct: 0, feedback: "Системний Python існує для інструментів Apple і рідко оновлюється. Свій Python став через Homebrew або `uv python install`." },
        { question: "Як зрозуміти, що venv активовано?", options: ["Terminal змінив колір", "На початку запрошення з'явилося `(.venv)`", "`pwd` показує `.venv`"], correct: 1, feedback: "`activate` додає назву середовища в запрошення. `deactivate` прибирає її." },
        { question: "Що зберігає `package.json`?", options: ["Паролі до npm", "Скомпільований код", "Список залежностей і скриптів проєкту (`dev`, `build`…)"], correct: 2, feedback: "З нього `npm install` знає, що ставити, а `npm run` — що запускати." },
        { question: "Чому `npm install` має середній ризик?", options: ["Він видаляє Node", "Він змінює macOS", "Пакети можуть запускати свої скрипти під час встановлення"], correct: 2, feedback: "Встановлюй пакети з перевірених джерел і перевіряй назви — підроблені пакети з «майже правильними» іменами трапляються." },
        { question: "Навіщо `uv`?", options: ["Швидко керувати Python-проєктом: версіями Python, venv і залежностями однією утилітою", "Оновлювати macOS", "Замінити Git"], correct: 0, feedback: "`uv add`, `uv run` роблять роботу `venv` + `pip` автоматично." },
        { question: "Проєкт перестав працювати після `pip install` у глобальний Python. Як уникати цього надалі?", options: ["Встановлювати все з `sudo`", "Для кожного проєкту — свій venv (або `uv`)", "Не використовувати Python"], correct: 1, feedback: "Ізоляція залежностей — головна причина існування venv." }
      ]
    }
  ]
});
