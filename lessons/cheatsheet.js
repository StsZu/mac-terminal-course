window.CLI_COURSE = window.CLI_COURSE || { modules: [], exam: null, cheatsheet: null };
window.CLI_COURSE.cheatsheet = {
  sections: [
    { title: "Основи й довідка", rows: [
      { cmd: "echo $SHELL", desc: "Яка оболонка (на Mac — `/bin/zsh`)", risk: "low" },
      { cmd: "whoami", desc: "Поточний користувач", risk: "low" },
      { cmd: "hostname", desc: "Мережеве ім'я Mac", risk: "low" },
      { cmd: "pwd", desc: "Де я зараз", risk: "low" },
      { cmd: "clear", desc: "Очистити екран (історія лишається)", risk: "low" },
      { cmd: "history | tail -20", desc: "Останні команди; Ctrl+R — пошук в історії", risk: "low" },
      { cmd: "which git", desc: "Який файл запуститься за командою", risk: "low" },
      { cmd: "command -v python3", desc: "Перевірка наявності команди (POSIX)", risk: "low" },
      { cmd: "echo $PATH | tr ':' '\\n'", desc: "PATH по одній папці на рядок", risk: "low" },
      { cmd: "man ls", desc: "Довідка до команди (`q` — вихід)", risk: "low" },
      { cmd: "apropos network", desc: "Знайти команду за словом в описі", risk: "low" }
    ] },
    { title: "Навігація і файли", rows: [
      { cmd: "ls -la", desc: "Детальний список з прихованими файлами", risk: "low" },
      { cmd: "cd папка / cd .. / cd ~ / cd -", desc: "Увійти / вище / додому / у попередню", risk: "low" },
      { cmd: "open .", desc: "Відкрити поточну папку у Finder", risk: "low" },
      { cmd: "mkdir -p a/b/c", desc: "Створити папки разом із проміжними", risk: "medium" },
      { cmd: "touch notes.txt", desc: "Створити порожній файл", risk: "medium" },
      { cmd: "cp file.txt backup.txt", desc: "Копія файлу (перезаписує без питань)", risk: "medium" },
      { cmd: "cp -R src src-copy", desc: "Копія папки", risk: "medium" },
      { cmd: "mv -i old.txt new.txt", desc: "Перейменувати / перенести; `-i` питає перед перезаписом", risk: "medium" },
      { cmd: "trash folder", desc: "У Кошик, можна відновити (macOS 15+)", risk: "medium" },
      { cmd: "rmdir empty", desc: "Видалити лише порожню папку", risk: "medium" },
      { cmd: "rm file.txt", desc: "Видалити файл назавжди, без Кошика", risk: "high" },
      { cmd: "rm -r folder", desc: "Видалити папку з усім вмістом", risk: "high" },
      { cmd: "rm -rf folder", desc: "Те саме без жодних питань — лише після `pwd` і `ls`", risk: "high" }
    ] },
    { title: "Читання і пошук", rows: [
      { cmd: "cat readme.md", desc: "Вивести короткий файл", risk: "low" },
      { cmd: "less app.log", desc: "Гортати файл, `/слово` — пошук, `q` — вихід", risk: "low" },
      { cmd: "head -20 app.log / tail -20 app.log", desc: "Початок / кінець файлу", risk: "low" },
      { cmd: "tail -f app.log", desc: "Стежити за логом наживо (Ctrl+C — стоп)", risk: "low" },
      { cmd: "find . -name \"*.md\"", desc: "Файли за іменем", risk: "low" },
      { cmd: "mdfind -name readme", desc: "Пошук через Spotlight", risk: "low" },
      { cmd: "grep -Rn \"TODO\" . --exclude-dir=node_modules", desc: "Текст у всіх файлах проєкту з номерами рядків", risk: "low" },
      { cmd: "wc -l file.txt", desc: "Скільки рядків", risk: "low" },
      { cmd: "sort names.txt | uniq -c", desc: "Унікальні рядки з кількістю повторів", risk: "low" },
      { cmd: "cut -d',' -f1 data.csv", desc: "Перша колонка CSV", risk: "low" },
      { cmd: "cat file.txt | pbcopy", desc: "Скопіювати в буфер обміну", risk: "low" },
      { cmd: "pbpaste > file.txt", desc: "Вставити буфер у файл (перезапис!)", risk: "medium" },
      { cmd: "find . -name \"*.tmp\" | xargs rm", desc: "Масове видалення знайденого — спершу перевір список", risk: "high" }
    ] },
    { title: "Мережа", rows: [
      { cmd: "ipconfig getifaddr en0", desc: "IP-адреса Wi-Fi", risk: "low" },
      { cmd: "ifconfig en0", desc: "Деталі інтерфейсу", risk: "low" },
      { cmd: "route get default", desc: "Шлюз за замовчуванням", risk: "low" },
      { cmd: "networksetup -getinfo Wi-Fi", desc: "IP, маска, роутер Wi-Fi", risk: "low" },
      { cmd: "networksetup -getdnsservers Wi-Fi", desc: "DNS, задані вручну", risk: "low" },
      { cmd: "ping -c 3 10.0.0.254", desc: "Чи відповідає роутер (без `-c` — безкінечно)", risk: "low" },
      { cmd: "traceroute google.com", desc: "Вузли на шляху до хоста", risk: "low" },
      { cmd: "dig google.com +short", desc: "DNS: лише IP", risk: "low" },
      { cmd: "nslookup google.com", desc: "Простий DNS-запит", risk: "low" },
      { cmd: "curl -I https://github.com", desc: "HTTP-код і заголовки", risk: "low" },
      { cmd: "netstat -an | grep LISTEN", desc: "Порти, що слухають", risk: "low" },
      { cmd: "lsof -i :3000", desc: "Хто зайняв порт", risk: "low" }
    ] },
    { title: "SSH і MikroTik", rows: [
      { cmd: "ssh Stas@10.0.0.254", desc: "Підключитися до роутера", risk: "medium" },
      { cmd: "/export file=backup", desc: "На роутері: конфігурація у `backup.rsc`", risk: "medium" },
      { cmd: "/quit", desc: "На роутері: завершити сесію", risk: "low" },
      { cmd: "scp Stas@10.0.0.254:backup.rsc .", desc: "Забрати файл з роутера на Mac", risk: "medium" },
      { cmd: "ssh-keygen -t ed25519", desc: "Створити пару SSH-ключів", risk: "medium" },
      { cmd: "cat ~/.ssh/id_ed25519.pub", desc: "Показати публічний ключ (його можна віддавати)", risk: "low" },
      { cmd: "scp ~/.ssh/id_ed25519.pub Stas@10.0.0.254:", desc: "Завантажити публічний ключ на роутер", risk: "medium" },
      { cmd: "/user ssh-keys import public-key-file=id_ed25519.pub user=Stas", desc: "На роутері: імпортувати ключ для користувача (замість `ssh-copy-id`)", risk: "medium" },
      { cmd: "/user ssh-keys print", desc: "На роутері: список ключів", risk: "low" }
    ] },
    { title: "Git і GitHub", rows: [
      { cmd: "git status", desc: "Стан репозиторію — завжди першою", risk: "low" },
      { cmd: "git diff / git diff --staged", desc: "Непідготовлені / підготовлені зміни", risk: "low" },
      { cmd: "git add .", desc: "Підготувати всі зміни", risk: "medium" },
      { cmd: "git commit -m \"опис\"", desc: "Зафіксувати підготовлене", risk: "medium" },
      { cmd: "git log --oneline", desc: "Коротка історія", risk: "low" },
      { cmd: "git switch -c нова-гілка", desc: "Створити гілку і перейти", risk: "medium" },
      { cmd: "git pull / git push", desc: "Отримати / відправити коміти", risk: "medium" },
      { cmd: "git stash / git stash pop", desc: "Сховати / повернути незакомічені зміни", risk: "medium" },
      { cmd: "git restore --staged file.txt", desc: "Прибрати зі staging, зміни лишаються", risk: "medium" },
      { cmd: "git restore file.txt", desc: "Стерти незакомічені зміни у файлі — без Undo", risk: "high" },
      { cmd: "git push --force", desc: "Переписати історію на GitHub; краще `--force-with-lease`", risk: "high" },
      { cmd: "gh auth status / gh repo view", desc: "Вхід у GitHub CLI / інформація про репозиторій", risk: "low" }
    ] },
    { title: "Homebrew, Python, Node", rows: [
      { cmd: "brew search jq / brew install jq", desc: "Знайти / встановити пакет", risk: "medium" },
      { cmd: "brew list", desc: "Що встановлено", risk: "low" },
      { cmd: "brew update", desc: "Оновити каталог Homebrew", risk: "medium" },
      { cmd: "brew outdated", desc: "Що можна оновити", risk: "low" },
      { cmd: "brew upgrade", desc: "Оновити всі пакети (може зламати проєкти)", risk: "medium" },
      { cmd: "which python3 / python3 --version", desc: "Який Python і яка версія", risk: "low" },
      { cmd: "python3 -m venv .venv", desc: "Створити віртуальне середовище", risk: "medium" },
      { cmd: "source .venv/bin/activate", desc: "Активувати venv (`deactivate` — вийти)", risk: "medium" },
      { cmd: "uv add requests / uv run main.py", desc: "Залежність і запуск через uv", risk: "medium" },
      { cmd: "npm install / npm run dev", desc: "Залежності / dev-сервер Node-проєкту", risk: "medium" },
      { cmd: "npx create-next-app@latest my-app", desc: "Разовий запуск пакета", risk: "medium" }
    ] },
    { title: "AI CLI агенти", rows: [
      { cmd: "which claude / command -v codex", desc: "Чи встановлено агента", risk: "low" },
      { cmd: "git switch -c ai-experiment", desc: "Окрема гілка перед сесією", risk: "medium" },
      { cmd: "claude / codex / gemini / grok", desc: "Запуск агента в папці проєкту", risk: "high" },
      { cmd: "git diff --stat", desc: "Огляд змін агента після сесії", risk: "low" },
      { cmd: "claude --dangerously-skip-permissions", desc: "Без підтверджень — лише в ізоляції (назви залежать від версії)", risk: "high" },
      { cmd: "gemini --yolo", desc: "Автосхвалення всіх дій — лише в ізоляції", risk: "high" }
    ] },
    { title: "Небезпечні команди", rows: [
      { cmd: "sudo команда", desc: "Права root на всю систему", risk: "high" },
      { cmd: "curl -fsSL URL -o install.sh", desc: "Завантажити скрипт без запуску", risk: "medium" },
      { cmd: "curl -fsSL URL | bash", desc: "Виконати неперевірений код — уникати", risk: "high" },
      { cmd: "chmod +x script.sh", desc: "Дозволити запуск одного файлу", risk: "medium" },
      { cmd: "chmod -R 777 folder", desc: "Відкрити все всім — майже ніколи", risk: "high" },
      { cmd: "sudo chown -R user folder", desc: "Масова зміна власника", risk: "high" },
      { cmd: "pgrep -l node", desc: "PID процесів за іменем", risk: "low" },
      { cmd: "kill PID", desc: "Коректно завершити процес", risk: "medium" },
      { cmd: "kill -9 PID", desc: "Обірвати миттєво, без збереження", risk: "high" },
      { cmd: "killall node", desc: "Завершити всі процеси з іменем", risk: "high" },
      { cmd: "launchctl list | grep мітка", desc: "Знайти свій сервіс launchd", risk: "low" },
      { cmd: "launchctl bootout gui/$(id -u)/мітка", desc: "Вивантажити сервіс (сучасна заміна застарілих підкоманд)", risk: "high" },
      { cmd: "diskutil list", desc: "Диски і розділи (лише читання)", risk: "low" },
      { cmd: "diskutil eraseDisk …", desc: "Стерти диск повністю", risk: "high" },
      { cmd: "sudo dd if=… of=/dev/rdiskN", desc: "Побайтовий запис — краще Imager / Etcher", risk: "high" },
      { cmd: "sudo pfctl -s info", desc: "Стан пакетного фільтра pf", risk: "low" },
      { cmd: "sudo pfctl -f / -d", desc: "Завантажити правила / вимкнути pf", risk: "high" }
    ] },
    { title: "Перенаправлення", rows: [
      { cmd: "команда > file.txt", desc: "Записати вивід у файл (перезапис)", risk: "medium" },
      { cmd: "команда >> file.txt", desc: "Дописати вивід у кінець файлу", risk: "medium" },
      { cmd: "команда1 | команда2", desc: "Передати вивід наступній команді", risk: "low" },
      { cmd: "команда1 && команда2", desc: "Друга — лише якщо перша успішна", risk: "low" }
    ] }
  ]
};
