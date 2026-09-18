window.CLI_COURSE = window.CLI_COURSE || { modules: [], exam: null, cheatsheet: null };
window.CLI_COURSE.modules.push({
  id: "m05", order: 5, title: "SSH та MikroTik", subtitle: "Підключення до роутера, бекап, SSH-ключі", icon: "router",
  goal: "Після модуля ти підключаєшся по SSH до MikroTik, забираєш бекап конфігурації через scp і налаштовуєш вхід за ключем ed25519 правильним для RouterOS способом.",
  lessons: [
    {
      id: "m05-l01", title: "SSH до роутера і бекап через scp", minutes: 12,
      steps: [
        { type: "story", title: "Бекап перед змінами",
          body: "<p>Ти збираєшся змінити налаштування домашнього MikroTik <code>10.0.0.254</code>. Правило інженера: спершу копія конфігурації — і не на самому роутері, а в тебе на Mac.</p><p>Для цього треба зайти на роутер по SSH, зберегти експорт у файл і забрати його командою <code>scp</code>.</p>" },
        { type: "concept", title: "SSH і scp",
          body: "<p><strong>SSH</strong> — зашифроване підключення до віддаленої машини: ти вводиш команди на Mac, а виконуються вони на роутері. <strong>scp</strong> копіює файли тим самим захищеним каналом.</p><p>Під час першого підключення SSH показує відбиток ключа роутера і запам'ятовує його в <code>~/.ssh/known_hosts</code>.</p>",
          analogy: "SSH — як захищена телефонна лінія до роутера: усе, що ти кажеш, шифрується. `scp` — кур'єр тією самою лінією: возить файли туди й назад. Відбиток ключа — голос знайомого: вперше ти його запам'ятовуєш, а якщо колись він зміниться — варто насторожитися." },
        { type: "cli", title: "Pre-check перед SSH",
          intro: "<p>Три швидкі перевірки, щоб не гадати, чому SSH не підключається.</p>",
          commands: [
            { cmd: "ipconfig getifaddr en0", explain: "1. Чи має Mac IP у мережі <code>10.0.0.x</code>.", output: "10.0.0.42", risk: "low" },
            { cmd: "route get default", explain: "2. Чи шлюз — саме твій роутер.", output: "    gateway: 10.0.0.254", risk: "low" },
            { cmd: "ping -c 3 10.0.0.254", explain: "3. Чи роутер відповідає.", risk: "low" }
          ] },
        { type: "cli", title: "Підключитися і зробити експорт",
          commands: [
            { cmd: "ssh Stas@10.0.0.254", explain: "Вхід як користувач <code>Stas</code> роутера (це облікові дані RouterOS, не Mac). Далі команди виконуються на роутері.", output: "Stas@10.0.0.254's password:\n\n  MikroTik RouterOS 7.x\n\n[Stas@MikroTik] >", risk: "medium" },
            { cmd: "/export file=backup", explain: "На роутері: зберігає конфігурацію у файл <code>backup.rsc</code>. Нічого не змінює в налаштуваннях.", risk: "medium" },
            { cmd: "/quit", explain: "На роутері: завершити сесію й повернутися в zsh на Mac.", risk: "low" }
          ] },
        { type: "terminal", title: "Спробуй: підключись до роутера",
          task: "Підключись по SSH до роутера `10.0.0.254` як користувач `Stas`.",
          expected: ["ssh Stas@10.0.0.254"],
          output: "The authenticity of host '10.0.0.254 (10.0.0.254)' can't be established.\nED25519 key fingerprint is SHA256:q3Vb…\nAre you sure you want to continue connecting (yes/no/[fingerprint])? yes\nWarning: Permanently added '10.0.0.254' (ED25519) to the list of known hosts.\nStas@10.0.0.254's password:\n\n[Stas@MikroTik] >",
          hint: "`ssh`, потім `користувач@адреса` без пробілів.",
          explain: "Запрошення змінилося на `[Stas@MikroTik] >` — тепер ти в RouterOS, а не на Mac." },
        { type: "check", title: "Незнайомий хост",
          question: "Під час першого підключення SSH питає `Are you sure you want to continue connecting (yes/no/[fingerprint])?`. Що це?",
          options: ["Mac ще не знає ключа цього хоста; для свого роутера в домашній мережі відповідаєш `yes`, і ключ запам'ятовується", "Роутер зламано", "Неправильний пароль"],
          correct: 0, feedback: "Це захист від підміни. Якщо колись для того самого роутера з'явиться попередження, що ключ змінився, — спершу з'ясуй чому (наприклад, роутер скинули)." },
        { type: "cli", title: "Забрати файл на Mac",
          commands: [
            { cmd: "scp Stas@10.0.0.254:backup.rsc .", explain: "Звідки: <code>користувач@роутер:файл</code>. Куди: <code>.</code> — поточна папка Mac.", output: "backup.rsc                     100% 4213     1.1MB/s   00:00", risk: "medium" },
            { cmd: "scp notes.txt Stas@10.0.0.254:", explain: "Навпаки — з Mac на роутер. Двокрапка в кінці обов'язкова: без неї <code>scp</code> створить локальний файл з іменем <code>Stas@10.0.0.254</code>.", risk: "medium" }
          ] },
        { type: "terminal", title: "Спробуй: забери бекап",
          task: "Ти вже вийшов з роутера. Завантаж файл `backup.rsc` з роутера `10.0.0.254` (користувач `Stas`) у поточну папку Mac.",
          expected: ["scp Stas@10.0.0.254:backup.rsc .", "scp Stas@10.0.0.254:backup.rsc ./", "scp Stas@10.0.0.254:backup.rsc ./backup.rsc"],
          output: "backup.rsc                     100% 4213     1.1MB/s   00:00",
          hint: "Спершу джерело `користувач@адреса:файл`, потім призначення — крапка.",
          explain: "Бекап лежить у тебе на Mac. Тепер зміни на роутері вже не страшні: конфігурацію можна відновити." },
        { type: "check", title: "Відмова в з'єднанні",
          question: "`ssh Stas@10.0.0.254` відповідає `Connection refused`, хоча `ping` роутера працює. Що перевірити?",
          options: ["Кабель і Wi-Fi", "Чи ввімкнено сервіс SSH на роутері (IP → Services) і чи правильний порт", "Пароль від Wi-Fi"],
          correct: 1, feedback: "Роутер відповідає на ping, тож мережа є. `Connection refused` — на порту ніхто не слухає: сервіс SSH вимкнено або він на іншому порту." },
        { type: "callout", variant: "warning", title: "Після ssh ти вже не на Mac",
          body: "<p>Коли запрошення стало <code>[Stas@MikroTik] ></code>, кожна команда змінює роутер — і зміни діють одразу. Помилка в правилах firewall може відрізати тебе від роутера.</p><p>Перед ризиковими змінами вмикай Safe Mode (<span class=\"kbd\">Ctrl</span> + <span class=\"kbd\">X</span> у терміналі RouterOS): якщо зв'язок обірветься, роутер відкотить зміни.</p>" },
        { type: "summary", title: "Підсумок",
          points: ["Pre-check: `ipconfig getifaddr en0` → `route get default` → `ping -c 3 10.0.0.254`.", "`ssh Stas@10.0.0.254` — вхід у RouterOS; `/quit` — назад у zsh.", "На роутері `/export file=backup` зберігає конфігурацію у `backup.rsc`.", "`scp Stas@10.0.0.254:backup.rsc .` — забрати на Mac; двокрапка відділяє хост від шляху.", "`Connection refused` — сервіс SSH не слухає; `Permission denied` — невірний логін, пароль чи ключ."] }
      ],
      glossary: [
        { term: "SSH", def: "Протокол зашифрованого віддаленого доступу до командного рядка, порт 22." },
        { term: "scp", def: "Копіювання файлів через SSH: `scp звідки куди`." },
        { term: "known_hosts", def: "Файл `~/.ssh/known_hosts` з ключами хостів, до яких ти вже підключався." },
        { term: "RouterOS", def: "Операційна система роутерів MikroTik; команди починаються з `/`." },
        { term: "Safe Mode", def: "Режим RouterOS (Ctrl+X), у якому зміни відкочуються, якщо сесія обірвалась." }
      ],
      quiz: [
        { question: "У якому порядку робити pre-check перед SSH до роутера?", options: ["IP Mac → шлюз → `ping` роутера → `ssh`", "`ssh` → `ping` → IP", "`scp` → `ssh` → `ping`"], correct: 0, feedback: "Від себе назовні: спершу переконайся, що мережа до роутера є, і лише потім підключайся." },
        { question: "`ssh` відповідає `Permission denied (publickey,password)`. Найімовірніше:", options: ["Роутер вимкнено", "Неправильне ім'я користувача, пароль або ключ", "Немає інтернету"], correct: 1, feedback: "З'єднання встановлено, але автентифікацію не пройдено. Перевір ім'я (`Stas`, а не `admin`?) і пароль." },
        { question: "Що означає `scp backup.rsc Stas@10.0.0.254:`?", options: ["Завантажити файл з роутера на Mac", "Видалити `backup.rsc` на роутері", "Скопіювати `backup.rsc` з Mac на роутер"], correct: 2, feedback: "Спершу джерело (локальний файл), потім призначення (роутер). Двокрапка в кінці — «у папку за замовчуванням на роутері»." },
        { question: "Ти бачиш запрошення `[Stas@MikroTik] >`. Де зараз виконуються команди?", options: ["На роутері, у RouterOS", "На Mac у zsh", "Ніде"], correct: 0, feedback: "Після `ssh` усе, що ти вводиш, іде на роутер. Команди Mac тут не працюють." },
        { question: "Як завершити SSH-сесію на RouterOS?", options: ["`logout now`", "`/quit` (або Ctrl+D)", "Закрити кришку ноутбука"], correct: 1, feedback: "`/quit` коректно закриває сесію. Закрите вікно теж обірве її, але грубо." },
        { question: "Навіщо бекап `/export file=backup` забирати на Mac?", options: ["Щоб звільнити пам'ять Mac", "Так вимагає SSH", "Якщо роутер зламається чи скинеться, копія конфігурації лишиться в тебе"], correct: 2, feedback: "Копія на самому роутері зникне разом з ним при скиданні. Бекап має жити окремо." }
      ]
    },
    {
      id: "m05-l02", title: "SSH-ключі для MikroTik", minutes: 12,
      steps: [
        { type: "concept", title: "Пара ключів",
          body: "<p><code>ssh-keygen</code> створює два файли: приватний <code>~/.ssh/id_ed25519</code> і публічний <code>~/.ssh/id_ed25519.pub</code>. Публічний кладуть на сервер чи роутер, приватний не залишає твій Mac.</p><p>При вході SSH доводить, що приватний ключ у тебе, не пересилаючи його мережею.</p>",
          analogy: "Публічний ключ — замок, який можна роздати і повісити на будь-які двері: роутер, сервер, GitHub. Приватний — єдиний ключ від усіх цих замків: лежить лише в тебе і нікому не передається, навіть «на хвилинку»." },
        { type: "cli", title: "Створити і подивитися ключ",
          commands: [
            { cmd: "ssh-keygen -t ed25519", explain: "Нова пара ключів ed25519. Enter — шлях за замовчуванням; далі можна задати passphrase (пароль до ключа).", output: "Generating public/private ed25519 key pair.\nYour identification has been saved in /Users/Stas/.ssh/id_ed25519\nYour public key has been saved in /Users/Stas/.ssh/id_ed25519.pub", risk: "medium" },
            { cmd: "cat ~/.ssh/id_ed25519.pub", explain: "Показати публічний ключ — один рядок, що починається з <code>ssh-ed25519</code>.", output: "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI… Stas@MacBook-Pro", risk: "low" }
          ] },
        { type: "terminal", title: "Спробуй: згенеруй ключ",
          task: "Згенеруй пару SSH-ключів типу `ed25519`.",
          expected: ["ssh-keygen -t ed25519", "ssh-keygen -t ed25519 -C \"Stas@MacBook-Pro\"", "ssh-keygen -t ed25519 -C Stas@MacBook-Pro"],
          output: "Generating public/private ed25519 key pair.\nEnter file in which to save the key (/Users/Stas/.ssh/id_ed25519):\nEnter passphrase (empty for no passphrase):\nYour identification has been saved in /Users/Stas/.ssh/id_ed25519\nYour public key has been saved in /Users/Stas/.ssh/id_ed25519.pub",
          hint: "`ssh-keygen` і прапорець типу ключа `-t` з назвою алгоритму.",
          explain: "Якщо ключ уже існує, `ssh-keygen` спитає про перезапис — відповідай `n`, інакше втратиш доступ туди, де старий ключ уже доданий." },
        { type: "check", title: "Що можна віддати",
          question: "Який файл можна спокійно копіювати на роутер чи надсилати адміністратору?",
          options: ["`~/.ssh/id_ed25519`", "`~/.ssh/id_ed25519.pub`", "Обидва"],
          correct: 1, feedback: "Лише `.pub` — публічний. Приватний `id_ed25519` дає вхід усюди, де стоїть твій публічний ключ." },
        { type: "story", title: "Чому не ssh-copy-id",
          body: "<p>Для Linux-серверів ключ зазвичай додають командою <code>ssh-copy-id</code>: вона дописує його у файл <code>~/.ssh/authorized_keys</code> на сервері. RouterOS так не працює — такого файлу там немає.</p><p>На MikroTik ключ <strong>завантажують файлом</strong> (через <code>scp</code>) і <strong>імпортують командою</strong> <code>/user ssh-keys import</code> для конкретного користувача.</p>" },
        { type: "cli", title: "Ключ на MikroTik: scp + import",
          commands: [
            { cmd: "scp ~/.ssh/id_ed25519.pub Stas@10.0.0.254:", explain: "1. На Mac: завантажити публічний ключ на роутер.", risk: "medium" },
            { cmd: "ssh Stas@10.0.0.254", explain: "2. Зайти на роутер (поки що з паролем).", risk: "medium" },
            { cmd: "/user ssh-keys import public-key-file=id_ed25519.pub user=Stas", explain: "3. На роутері: прив'язати ключ до користувача <code>Stas</code>. Після імпорту файл <code>.pub</code> на роутері більше не потрібен.", risk: "medium" },
            { cmd: "/user ssh-keys print", explain: "4. На роутері: перевірити, що ключ з'явився.", output: " # USER  KEY-TYPE  INFO\n 0 Stas  ed25519   Stas@MacBook-Pro", risk: "low" }
          ] },
        { type: "terminal", title: "Спробуй: імпортуй ключ у RouterOS",
          prompt: "[Stas@MikroTik] >",
          task: "Ти на роутері, файл `id_ed25519.pub` уже завантажено. Імпортуй його для користувача `Stas`.",
          expected: ["/user ssh-keys import public-key-file=id_ed25519.pub user=Stas", "/user ssh-keys import user=Stas public-key-file=id_ed25519.pub"],
          output: "",
          hint: "Шлях у меню RouterOS — `/user ssh-keys`, дія — `import`, параметри — файл ключа і користувач.",
          explain: "RouterOS мовчить при успіху. Перевір `/user ssh-keys print`, вийди `/quit` і зайди знову — пароль уже не спитають." },
        { type: "check", title: "Linux проти RouterOS",
          question: "Для Linux-сервера ти б використав `ssh-copy-id`. Чому для MikroTik — інакше?",
          options: ["MikroTik не підтримує SSH-ключі", "`ssh-copy-id` немає на Mac", "У RouterOS немає `authorized_keys`, куди пише `ssh-copy-id`; ключ імпортують командою `/user ssh-keys import`"],
          correct: 2, feedback: "RouterOS підтримує ключі (RSA і ed25519), але зберігає їх у власній базі користувачів — звідси окрема команда імпорту." },
        { type: "callout", variant: "warning", title: "Бережи приватний ключ",
          body: "<p>Не надсилай <code>id_ed25519</code> у чатах, не клади в Git і хмару. Задай passphrase — тоді вкрадений файл сам по собі нічого не відчинить.</p><p>Якщо ключ міг витекти: створи новий і видали старий на роутері (<code>/user ssh-keys print</code> → <code>/user ssh-keys remove 0</code>, де 0 — номер з <code>print</code>).</p>" },
        { type: "summary", title: "Підсумок",
          points: ["`ssh-keygen -t ed25519` створює приватний `id_ed25519` і публічний `id_ed25519.pub`.", "Віддавати можна лише `.pub`; приватний ключ не залишає Mac.", "MikroTik: `scp ~/.ssh/id_ed25519.pub Stas@10.0.0.254:` → `ssh` → `/user ssh-keys import public-key-file=id_ed25519.pub user=Stas`.", "`ssh-copy-id` — для Linux/macOS-серверів з `authorized_keys`, не для RouterOS.", "`/user ssh-keys print` — перевірка; витік ключа → новий ключ і `remove` старого."] }
      ],
      glossary: [
        { term: "Публічний ключ", def: "Файл `.pub`, який кладуть на сервер чи роутер; його не шкода показати." },
        { term: "Приватний ключ", def: "Секретна половина пари (`id_ed25519`); не передається нікому." },
        { term: "ed25519", def: "Сучасний алгоритм підпису для SSH-ключів: короткий ключ, висока стійкість." },
        { term: "Passphrase", def: "Пароль, яким зашифровано приватний ключ на диску." },
        { term: "authorized_keys", def: "Файл на Linux/macOS-сервері зі списком дозволених публічних ключів." }
      ],
      quiz: [
        { question: "Що з'явиться після `ssh-keygen -t ed25519` з відповідями за замовчуванням?", options: ["Один файл на роутері", "Два файли в `~/.ssh`: приватний `id_ed25519` і публічний `id_ed25519.pub`", "Новий пароль до Mac"], correct: 1, feedback: "`ssh-keygen` працює лише локально: створює пару файлів у `~/.ssh`." },
        { question: "Навіщо passphrase до ключа?", options: ["Щоб вкрадений файл ключа сам по собі не давав доступу", "Щоб прискорити вхід", "Так вимагає MikroTik"], correct: 0, feedback: "Passphrase шифрує приватний ключ на диску. macOS може зберегти її в Keychain, щоб не вводити щоразу." },
        { question: "Після імпорту ключа `ssh Stas@10.0.0.254` досі просить пароль. Що перевірити?", options: ["Перевстановити macOS", "Вимкнути Wi-Fi", "`/user ssh-keys print` — чи ключ імпортовано саме для користувача `Stas`"], correct: 2, feedback: "Найчастіше ключ імпортували для іншого користувача або імпортували не той файл." },
        { question: "Колега пише: «скинь свій SSH-ключ, я додам тебе на сервер». Що надсилаєш?", options: ["Вміст `id_ed25519.pub`", "Файл `id_ed25519`", "Обидва файли архівом"], correct: 0, feedback: "Серверу потрібен лише публічний ключ. Приватний не надсилають нікому." },
        { question: "Як правильно додати публічний ключ на MikroTik?", options: ["`ssh-copy-id` на роутер", "`scp` файлу `.pub` на роутер, потім `/user ssh-keys import public-key-file=… user=…`", "Вставити ключ у поле пароля"], correct: 1, feedback: "RouterOS імпортує ключ з файлу у свою базу користувачів." },
        { question: "Чому ed25519, а не старий RSA 1024?", options: ["ed25519 має довший пароль", "RSA заборонений законом", "ed25519 — сучасний алгоритм з короткими ключами і високою стійкістю; RSA 1024 вважається слабким"], correct: 2, feedback: "RSA теж працює, але лише з достатньою довжиною ключа (3072+). ed25519 — простий надійний вибір за замовчуванням." }
      ]
    }
  ]
});
