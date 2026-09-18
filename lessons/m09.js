window.CLI_COURSE = window.CLI_COURSE || { modules: [], exam: null, cheatsheet: null };
window.CLI_COURSE.modules.push({
  id: "m09", order: 9, title: "Небезпечні команди", subtitle: "sudo, curl | bash, права, процеси, сервіси, диски", icon: "danger",
  goal: "Після модуля ти впізнаєш команди, що можуть зруйнувати дані чи систему, знаєш, що перевірити перед ними, і маєш безпечну альтернативу для кожної.",
  lessons: [
    {
      id: "m09-l01", title: "sudo, curl | bash і права доступу", minutes: 12,
      steps: [
        { type: "story", title: "Одна команда — уся система",
          body: "<p>Більшість команд курсу зачіпає лише твої файли. Але кілька команд діють на всю систему або виконують чужий код з твоїми правами.</p><p>Правило інженера: <strong>зрозуміти → перевірити шлях → зробити бекап → виконати</strong>. Цей урок — про те, що саме перевіряти.</p>" },
        { type: "concept", title: "root і sudo",
          body: "<p><strong>root</strong> — суперкористувач, якому дозволено все. <code>sudo команда</code> виконує одну команду від імені root після твого пароля; пароль при введенні не відображається, і macOS пам'ятає його кілька хвилин.</p><p>Для своїх файлів, Homebrew, Git і npm <code>sudo</code> не потрібен. Якщо «без sudo не працює» — спершу з'ясуй чому.</p>",
          analogy: "`sudo` — майстер-ключ від усього будинку: відчиняє будь-які двері, включно з електрощитовою. Власну шафу ним не відчиняють — для своїх речей вистачає звичайного ключа, а помилка майстер-ключем зачепить сусідів." },
        { type: "cli", title: "sudo",
          commands: [
            { cmd: "sudo команда", explain: "Виконати одну команду з правами root. Помилка в ній зачепить усю систему.", risk: "high" },
            { cmd: "sudo -k", explain: "Забути збережений пароль — наступний <code>sudo</code> знову спитає.", risk: "low" }
          ] },
        { type: "cli", title: "Скрипти з інтернету",
          commands: [
            { cmd: "curl -fsSL https://example.com/install.sh | bash", explain: "Завантажує скрипт і одразу виконує його з твоїми правами — ти не бачиш, що саме запускаєш.", risk: "high" },
            { cmd: "curl -fsSL https://example.com/install.sh -o install.sh", explain: "Лише зберігає скрипт у файл. <code>-o</code> — куди записати.", risk: "medium" },
            { cmd: "less install.sh", explain: "Прочитати скрипт: що завантажує, куди пише, чи є <code>sudo</code> і <code>rm</code>.", risk: "low" },
            { cmd: "bash install.sh", explain: "Запуск — лише після читання і звірки адреси з офіційною документацією.", risk: "high" }
          ] },
        { type: "callout", variant: "danger", title: "curl | bash і chmod -R 777",
          body: "<p><code>curl … | bash</code> виконує код, якого ти не бачив: підмінений URL чи зламаний сайт — і шкідливий скрипт отримає доступ до всіх твоїх файлів і ключів. <code>chmod -R 777</code> відкриває на запис усім тисячі файлів — точно повернути попередні права майже неможливо.</p><p><strong>Безпечно:</strong> завантаж скрипт у файл → прочитай <code>less</code> → запускай свідомо; де можна — <code>brew install</code>. Права змінюй лише конкретному файлу: <code>chmod +x script.sh</code>.</p>" },
        { type: "terminal", title: "Спробуй: завантаж, але не запускай",
          task: "Завантаж скрипт `https://example.com/install.sh` у файл `install.sh`, не виконуючи його.",
          expected: ["curl -fsSL https://example.com/install.sh -o install.sh", "curl -fsSL -o install.sh https://example.com/install.sh", "curl -o install.sh -fsSL https://example.com/install.sh", "curl -fsSLo install.sh https://example.com/install.sh"],
          output: "",
          hint: "Той самий `curl -fsSL` з адресою, але замість `| bash` — прапорець `-o` з назвою файлу.",
          explain: "Скрипт лежить у файлі й нічого не зробив. Наступний крок — `less install.sh`." },
        { type: "check", title: "Встановлення одним рядком",
          question: "Сайт пропонує встановлення одним рядком `curl -fsSL https://… | bash`. Найбезпечніший підхід?",
          options: ["Виконати відразу — сайт же офіційний", "Завантажити у файл, прочитати `less`, звірити URL з офіційною документацією і лише тоді `bash install.sh` (або встановити через `brew`)", "Виконати з `sudo`, щоб точно спрацювало"],
          correct: 1, feedback: "Навіть офіційні сайти зламують, а адреси підробляють. `sudo` лише збільшив би шкоду." },
        { type: "cli", title: "Права доступу",
          commands: [
            { cmd: "ls -l script.sh", explain: "Подивитися права: <code>-rw-r--r--</code> — читати й писати може власник, інші — лише читати.", output: "-rw-r--r--  1 Stas  staff  38 Sep 18 10:00 script.sh", risk: "low" },
            { cmd: "chmod +x script.sh", explain: "Дозволити запуск цього файлу.", risk: "medium" },
            { cmd: "chmod 644 notes.txt", explain: "Типові права для документа: власник пише, решта читає.", risk: "medium" },
            { cmd: "chmod -R 777 folder", explain: "Усім усе, рекурсивно. Майже ніколи не є правильним рішенням.", risk: "high" },
            { cmd: "sudo chown -R Stas folder", explain: "Змінити власника тисяч файлів разом. Помилка в шляху зачепить системні файли.", risk: "high" }
          ] },
        { type: "terminal", title: "Спробуй: дозволь запуск скрипта",
          prompt: "Stas@MacBook-Pro demo %",
          task: "`./script.sh` відповідає `permission denied`. Дозволь запуск лише цього файлу.",
          expected: ["chmod +x script.sh", "chmod u+x script.sh", "chmod 755 script.sh"],
          output: "",
          hint: "`chmod` і «додати право виконання» — плюс і літера x.",
          explain: "Тепер `ls -l script.sh` покаже `-rwxr-xr-x`. Змінено права одного файлу — нічого зайвого." },
        { type: "check", title: "Скрипт не запускається",
          question: "Скрипт не запускається: `permission denied: ./script.sh`. Що зробити?",
          options: ["`sudo chmod -R 777 ~`", "Перейменувати файл на `.app`", "`chmod +x script.sh` — дати право виконання лише цьому файлу"],
          correct: 2, feedback: "Мінімальна зміна для конкретної проблеми. `chmod -R 777 ~` зламав би права всієї домашньої папки." },
        { type: "summary", title: "Підсумок",
          points: ["`sudo` = права root на всю систему; для своїх файлів, brew, git, npm він не потрібен.", "`curl … | bash` — високий ризик; безпечно: `-o файл` → `less` → свідомий запуск або `brew install`.", "Права змінюй точково: `chmod +x файл`; `chmod -R 777` і `sudo chown -R` — високий ризик.", "Правило: зрозуміти → перевірити шлях → бекап → виконати."] }
      ],
      glossary: [
        { term: "root", def: "Суперкористувач Unix без обмежень доступу." },
        { term: "sudo", def: "Виконати одну команду від імені root після введення свого пароля." },
        { term: "Права (permissions)", def: "Хто може читати (r), писати (w) і запускати (x) файл: власник, група, решта." },
        { term: "chmod", def: "Змінити права доступу до файлу чи папки." },
        { term: "curl | bash", def: "Шаблон «завантажити скрипт і одразу виконати» без перегляду." }
      ],
      quiz: [
        { question: "Ти вводиш пароль після `sudo`, а на екрані нічого не з'являється. Це…", options: ["нормально: пароль не відображається — введи і натисни Enter", "зависання Terminal", "несправна клавіатура"], correct: 0, feedback: "Так задумано, щоб ніхто не побачив навіть довжину пароля." },
        { question: "Що означає `chmod 777 file`?", options: ["Лише власник може читати файл", "Усі користувачі можуть читати, змінювати й запускати файл", "Файл захищено паролем"], correct: 1, feedback: "7 = r+w+x для власника, групи і всіх інших. Це максимально відкриті права." },
        { question: "Коли `sudo` справді потрібен?", options: ["Для `ls` у своїй папці", "Для `git push`", "Для змін системних налаштувань чи файлів поза твоєю домашньою папкою — і лише коли розумієш команду"], correct: 2, feedback: "Твої файли і твої інструменти працюють без root." },
        { question: "Чим небезпечний `curl … | bash`?", options: ["Завантажений код одразу виконується з твоїми правами, а ти його не бачив", "Він повільний", "Він видаляє curl"], correct: 0, feedback: "`bash` отримує текст скрипта напряму з мережі — без паузи на перевірку." },
        { question: "`npm install -g` пише `EACCES: permission denied`. Правильна реакція?", options: ["`sudo npm install -g` для всього", "Розібратися з причиною: встановити Node через Homebrew (тоді глобальні пакети — у твоїй `/opt/homebrew`) або використати `npx`", "`chmod -R 777 /usr`"], correct: 1, feedback: "Помилка прав — сигнал, що Node стоїть у системній папці. `sudo` лише сховає проблему і дасть пакетам root." },
        { question: "Чому `sudo chown -R` на домашню чи системну папку — високий ризик?", options: ["Він видаляє файли", "Він вимикає Wi-Fi", "Масово змінює власника тисяч файлів; помилку важко відкотити, програми можуть перестати працювати"], correct: 2, feedback: "Якщо власника треба змінити — лише для конкретного файлу чи папки проєкту і з перевіреним шляхом." }
      ]
    },
    {
      id: "m09-l02", title: "Процеси, сервіси і диски", minutes: 13,
      steps: [
        { type: "concept", title: "Процеси і сигнали",
          body: "<p>Кожна запущена програма — <strong>процес</strong> з номером <strong>PID</strong>. <code>kill PID</code> надсилає сигнал SIGTERM — «будь ласка, заверши роботу», і програма встигає зберегтися. <code>kill -9</code> (SIGKILL) обриває процес миттєво.</p>",
          analogy: "Процес — працівник з номером бейджа (PID). `kill` — ввічливо попросити його закінчити і прибрати за собою. `kill -9` — вивести охороною посеред роботи: незбережене пропаде. `killall` — звільнити всіх з однаковим прізвищем разом." },
        { type: "cli", title: "Знайти і зупинити процес",
          commands: [
            { cmd: "ps aux | grep node", explain: "Повний список процесів, відфільтрований за словом.", risk: "low" },
            { cmd: "pgrep -l node", explain: "Коротко: PID і ім'я процесів <code>node</code>.", output: "4242 node", risk: "low" },
            { cmd: "kill 4242", explain: "SIGTERM — коректне завершення процесу 4242.", risk: "medium" },
            { cmd: "kill -9 4242", explain: "SIGKILL — миттєво, без збереження даних. Лише якщо звичайний <code>kill</code> не допоміг.", risk: "high" },
            { cmd: "killall node", explain: "Завершити всі процеси з іменем <code>node</code> — включно з тими, що в інших вікнах.", risk: "high" }
          ] },
        { type: "terminal", title: "Спробуй: знайди PID",
          prompt: "Stas@MacBook-Pro demo %",
          task: "Знайди PID процесів `node` найкоротшим способом.",
          expected: ["pgrep -l node", "pgrep -lf node"], output: "4242 node",
          hint: "Команда «process grep» з прапорцем, що додає ім'я процесу.",
          explain: "PID 4242 — тепер можна точково зупинити саме цей процес, а не всі `node` підряд." },
        { type: "check", title: "Завислий dev-сервер",
          question: "Dev-сервер на порту 3000 завис. Правильна послідовність?",
          options: ["Одразу `killall node`", "Перезавантажити Mac", "`lsof -i :3000` або `pgrep -l node` → `kill PID` → лише якщо не допомогло, `kill -9 PID`"],
          correct: 2, feedback: "Від точного і м'якого до грубого. `killall node` зупинив би й інші твої Node-процеси." },
        { type: "cli", title: "Фонові сервіси launchd",
          intro: "<p>Фонові задачі macOS керуються <code>launchd</code>. Сучасні підкоманди <code>launchctl</code> працюють з доменами: <code>gui/$(id -u)</code> — сервіси твого користувача. Старі підкоманди <code>load</code>/<code>unload</code> — застарілі.</p>",
          commands: [
            { cmd: "launchctl list | grep com.stas", explain: "Знайти свої агенти за міткою.", output: "-\t0\tcom.stas.backup", risk: "low" },
            { cmd: "launchctl print gui/$(id -u)/com.stas.backup", explain: "Детальний стан одного сервісу.", risk: "low" },
            { cmd: "launchctl bootout gui/$(id -u)/com.stas.backup", explain: "Вивантажити сервіс. Не чіпай <code>system/</code> і сервіси Apple — можна зламати систему.", risk: "high" },
            { cmd: "launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.stas.backup.plist", explain: "Завантажити сервіс знову з його plist-файлу.", risk: "medium" }
          ] },
        { type: "cli", title: "Диски і файрвол",
          commands: [
            { cmd: "diskutil list", explain: "Диски й розділи. Лише читання — завжди перший крок.", risk: "low" },
            { cmd: "diskutil eraseDisk APFS Backup disk4", explain: "Стерти диск disk4 повністю. Помилка в номері — втрата іншого диска.", risk: "high" },
            { cmd: "sudo dd if=image.img of=/dev/rdisk4 bs=4m", explain: "Побайтово записати образ на диск. Без підтверджень і без «скасувати».", risk: "high" },
            { cmd: "sudo pfctl -s info", explain: "Стан пакетного фільтра pf — лише читання.", risk: "low" },
            { cmd: "sudo pfctl -f /etc/pf.conf", explain: "Завантажити правила pf. Хибне правило відріже мережу.", risk: "high" }
          ] },
        { type: "callout", variant: "danger", title: "dd, eraseDisk і pfctl не прощають помилок",
          body: "<p><code>dd</code> і <code>diskutil eraseDisk</code> без жодного питання знищують вміст диска, вказаного номером. Одна цифра — і замість флешки стерто інший диск. <code>pfctl -f</code> з хибними правилами може відрізати Mac від мережі.</p><p><strong>Безпечно:</strong> <code>diskutil list</code> двічі, звір <code>external</code> і розмір, спершу бекап; для запису образів — Raspberry Pi Imager чи balenaEtcher, для дисків — Disk Utility, для файрвола — System Settings → Network → Firewall.</p>" },
        { type: "terminal", title: "Спробуй: список дисків",
          task: "Подивись список дисків і розділів — лише читання.",
          expected: ["diskutil list"],
          output: "/dev/disk0 (internal, physical):\n   #:                       TYPE NAME                    SIZE       IDENTIFIER\n   0:      GUID_partition_scheme                        *500.3 GB   disk0\n\n/dev/disk4 (external, physical):\n   #:                       TYPE NAME                    SIZE       IDENTIFIER\n   0:     FDisk_partition_scheme                        *32.0 GB    disk4",
          hint: "Утиліта дисків macOS і підкоманда «список».",
          explain: "`internal` — вбудований диск Mac, `external` 32 GB — флешка. Саме так її впізнають перед будь-яким записом." },
        { type: "check", title: "Куди писати образ",
          question: "Ти записуєш образ на флешку. `diskutil list` показує `/dev/disk0 (internal)` і `/dev/disk4 (external, physical)` на 32 GB. Куди цілити `of=`?",
          options: ["`/dev/disk4`, але спершу `diskutil unmountDisk /dev/disk4` і ще раз звірити розмір та `external`; а краще — Raspberry Pi Imager чи balenaEtcher", "`/dev/disk0` — він перший у списку", "На обидва диски про всяк випадок"],
          correct: 0, feedback: "disk0 — системний диск Mac. Запис туди знищить macOS і всі дані." },
        { type: "summary", title: "Підсумок",
          points: ["`pgrep -l` / `ps aux | grep` → `kill PID` → лише потім `kill -9`; `killall` зачіпає всі однойменні процеси.", "launchd: `launchctl list`, `print`, а замість застарілих підкоманд — `bootout` / `bootstrap` з доменом `gui/$(id -u)`.", "`diskutil list` і `pfctl -s info` — лише читають; `eraseDisk`, `dd`, `pfctl -f` — високий ризик.", "Для дисків і файрвола є безпечніші графічні інструменти: Disk Utility, Imager/Etcher, System Settings."] }
      ],
      glossary: [
        { term: "Процес і PID", def: "Запущена програма та її номер у системі." },
        { term: "SIGTERM / SIGKILL", def: "Прохання завершитися (`kill`) / примусове миттєве завершення (`kill -9`)." },
        { term: "launchd", def: "Системний менеджер служб macOS; керується через `launchctl`." },
        { term: "pf", def: "Пакетний фільтр (firewall) ядра macOS, керується `pfctl`; окремий від Application Firewall у System Settings." },
        { term: "dd", def: "Побайтове копіювання даних між файлами й дисками без жодних перевірок." }
      ],
      quiz: [
        { question: "Чим `kill PID` відрізняється від `kill -9 PID`?", options: ["`kill` надсилає SIGTERM — процес може коректно завершитись; `-9` (SIGKILL) обриває миттєво, без збереження", "Нічим", "`-9` завершує 9 процесів"], correct: 0, feedback: "Спершу ввічливо, і лише якщо процес не реагує — примусово." },
        { question: "Що станеться після `killall Finder`?", options: ["Finder видалиться з Mac", "Усі процеси з іменем Finder завершаться; Finder перезапуститься сам, відкриті вікна закриються", "Нічого"], correct: 1, feedback: "`killall` б'є за іменем, а не за PID. Finder macOS піднімає знову, але не всі програми так поводяться." },
        { question: "Сучасний спосіб вивантажити свій сервіс launchd — це…", options: ["`launchctl stop all`", "`launchctl kill`", "`launchctl bootout` з доменом, напр. `gui/$(id -u)/мітка`"], correct: 2, feedback: "Підкоманди `bootstrap`/`bootout` прийшли на зміну застарілим `load`/`unload`." },
        { question: "`sudo pfctl -s info` — яка це дія?", options: ["Лише показує стан пакетного фільтра pf", "Вмикає файрвол", "Скидає мережеві налаштування"], correct: 0, feedback: "`-s` (show) лише показує. Змінюють правила `-f`, вимикають — `-d`." },
        { question: "Де звичайному користувачу безпечніше ввімкнути файрвол macOS?", options: ["`sudo pfctl -f` з правилами з інтернету", "System Settings → Network → Firewall", "`dd`"], correct: 1, feedback: "Вбудований Application Firewall налаштовується в System Settings без ризику відрізати собі мережу." },
        { question: "Чому `dd` жартома називають «disk destroyer»?", options: ["Він повільний", "Він працює лише з флешками", "Він без питань перезаписує те, що вказано в `of=`; помилка в одній цифрі знищує не той диск"], correct: 2, feedback: "`dd` не перевіряє, чи ти мав на увазі саме цей диск. Перевіряти — твоя робота." }
      ]
    }
  ]
});
