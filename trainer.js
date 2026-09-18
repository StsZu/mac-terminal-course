"use strict";
/* Mac Terminal Trainer — емуляція zsh без реального виконання.
   Зарахування команд — лише повний збіг після нормалізації (див. matches). */

const STORAGE_KEY = "cli-mac-terminal-v1-trainer";
const HOME = "/Users/Stas";
const DEMO = HOME + "/Projects/demo";
const ROUTER = "10.0.0.254";

// Пункти чекліста: [команда, підказка українською]. Підказка — також питання тест-режиму, тому вона однозначна.
const MODULE_LIST = [
  { id: "basics", title: "1. Основи терміналу", intro: "Де я, хто я, shell, PATH і довідка — фундамент перед усім іншим.", commands: [
    ["echo $SHELL", "Показати шлях до поточної оболонки (на Mac — /bin/zsh)."],
    ["whoami", "Показати ім'я поточного користувача macOS."],
    ["hostname", "Показати мережеве ім'я цього Mac."],
    ["pwd", "Показати повний шлях до папки, в якій ти зараз (print working directory)."],
    ["clear", "Очистити екран терміналу (історія команд лишається)."],
    ["history", "Показати список раніше введених команд."],
    ["which git", "Дізнатися, який саме файл запуститься за командою git."],
    ["command -v python3", "Перевірити наявність python3 у PATH способом, який працює і в скриптах (POSIX)."],
    ["echo $PATH", "Показати змінну PATH одним рядком."],
    ["echo $PATH | tr ':' '\\n'", "Показати папки з PATH по одній на рядок."],
    ["man ls", "Відкрити довідку (manual) до команди ls."],
    ["apropos network", "Знайти команди, в описі яких є слово network."]
  ] },
  { id: "files", title: "2. Файли та папки", intro: "Навігація, створення, копіювання, видалення і читання файлів.", commands: [
    ["ls", "Короткий список файлів і папок у поточній папці."],
    ["ls -la", "Детальний список з правами, розміром, датою і прихованими файлами."],
    ["cd src", "Перейти в підпапку src."],
    ["cd ..", "Піднятися на одну папку вище."],
    ["cd ~", "Повернутися в домашню папку."],
    ["cd ~/Projects/demo", "Перейти в папку проєкту demo за шляхом від домашньої папки."],
    ["open .", "Відкрити поточну папку у Finder."],
    ["mkdir projects", "Створити нову папку projects."],
    ["touch notes.txt", "Створити порожній файл notes.txt."],
    ["cp file.txt backup.txt", "Зробити копію file.txt з іменем backup.txt."],
    ["mv old.txt new.txt", "Перейменувати old.txt на new.txt."],
    ["rm backup.txt", "Видалити файл backup.txt (без кошика)."],
    ["rm -r folder", "Видалити папку folder разом з усім вмістом."],
    ["rmdir empty", "Видалити порожню папку empty (з непорожньою не спрацює)."],
    ["cat readme.md", "Вивести весь вміст readme.md на екран."],
    ["less readme.md", "Переглянути readme.md з прокруткою (q — вихід)."],
    ["head -5 readme.md", "Показати перші 5 рядків readme.md."],
    ["tail -5 log.txt", "Показати останні 5 рядків log.txt."],
    ["tail -f log.txt", "Стежити за новими рядками log.txt у реальному часі."]
  ] },
  { id: "search", title: "3. Пошук і текст", intro: "find, grep, конвеєри, Spotlight і буфер обміну.", commands: [
    ["find . -name \"*.md\"", "Знайти всі файли .md від поточної папки вглиб."],
    ["grep TODO readme.md", "Знайти рядки зі словом TODO у файлі readme.md."],
    ["grep -R \"TODO\" .", "Знайти слово TODO в усіх файлах поточної папки і підпапок."],
    ["wc -l log.txt", "Порахувати рядки у log.txt."],
    ["sort names.txt", "Вивести рядки names.txt за абеткою."],
    ["sort names.txt | uniq", "Відсортувати names.txt і прибрати повтори."],
    ["cut -d',' -f1 data.csv", "Вивести лише першу колонку з data.csv (роздільник — кома)."],
    ["echo hello | tr 'a-z' 'A-Z'", "Перетворити слово hello на великі літери через tr."],
    ["find . -name \"*.md\" | xargs wc -l", "Передати знайдені .md-файли в wc -l через xargs."],
    ["mdfind -name readme", "Знайти файли з readme в імені через Spotlight."],
    ["cat readme.md | pbcopy", "Скопіювати вміст readme.md у буфер обміну macOS."],
    ["pbpaste", "Вивести вміст буфера обміну macOS."]
  ] },
  { id: "network", title: "4. Мережева діагностика", intro: "IP, шлюз, DNS, ping, HTTP і порти — чекліст «чи працює мережа».", commands: [
    ["ipconfig getifaddr en0", "Швидко показати лише IP-адресу інтерфейсу en0."],
    ["ifconfig en0", "Показати детальну інформацію про інтерфейс en0."],
    ["route get default", "Показати шлюз за замовчуванням (роутер)."],
    ["networksetup -listallhardwareports", "Показати всі мережеві порти Mac і їхні пристрої (en0, en1…)."],
    ["networksetup -getinfo Wi-Fi", "Показати IP, маску і роутер для служби Wi-Fi."],
    ["networksetup -getdnsservers Wi-Fi", "Показати DNS-сервери, вручну задані для Wi-Fi."],
    ["ping -c 3 8.8.8.8", "Надіслати рівно 3 ping-пакети на 8.8.8.8."],
    ["traceroute google.com", "Показати маршрут пакетів до google.com."],
    ["dig google.com", "Зробити детальний DNS-запит для google.com."],
    ["nslookup google.com", "Зробити простий DNS-запит для google.com (альтернатива dig)."],
    ["curl -I https://github.com", "Отримати лише HTTP-заголовки відповіді github.com."],
    ["netstat -an | grep LISTEN", "Показати порти, що чекають на вхідні з'єднання."],
    ["lsof -i :3000", "Дізнатися, який процес зайняв порт 3000."]
  ] },
  { id: "ssh", title: "5. SSH та MikroTik", intro: "Pre-check, SSH до роутера, бекап через scp, ключ ed25519 і його імпорт у RouterOS.", commands: [
    ["ping -c 3 10.0.0.254", "Перевірити, чи відповідає роутер 10.0.0.254 (3 пакети)."],
    ["ssh Stas@10.0.0.254", "Підключитися по SSH до роутера 10.0.0.254 як Stas."],
    ["/export file=backup", "На роутері: зберегти конфігурацію у файл backup.rsc."],
    ["/quit", "На роутері: завершити SSH-сесію RouterOS."],
    ["scp Stas@10.0.0.254:backup.rsc .", "Завантажити backup.rsc з роутера в поточну папку Mac."],
    ["ssh-keygen -t ed25519", "Згенерувати пару SSH-ключів типу ed25519."],
    ["cat ~/.ssh/id_ed25519.pub", "Показати свій публічний SSH-ключ."],
    ["scp ~/.ssh/id_ed25519.pub Stas@10.0.0.254:", "Завантажити публічний ключ на роутер 10.0.0.254."],
    ["/user ssh-keys import public-key-file=id_ed25519.pub user=Stas", "На роутері: імпортувати завантажений публічний ключ для користувача Stas."],
    ["/user ssh-keys print", "На роутері: показати імпортовані SSH-ключі."]
  ] },
  { id: "git", title: "6. Git та GitHub", intro: "status → diff → add → commit → push, гілки, скасування змін і gh.", commands: [
    ["git status", "Показати стан репозиторію: змінені, підготовлені й нові файли."],
    ["git diff", "Показати ще не підготовлені (unstaged) зміни у файлах."],
    ["git restore file.txt", "Скасувати незакомічені зміни у file.txt."],
    ["git add .", "Підготувати (stage) усі зміни в поточній папці до коміту."],
    ["git diff --staged", "Показати зміни, що вже підготовлені до коміту."],
    ["git commit -m \"message\"", "Зафіксувати підготовлені зміни з повідомленням message."],
    ["git log --oneline", "Показати коротку історію комітів, по одному на рядок."],
    ["git branch", "Показати список локальних гілок."],
    ["git switch feature", "Перейти на наявну гілку feature."],
    ["git switch main", "Повернутися на гілку main."],
    ["git pull", "Завантажити і злити нові коміти з GitHub."],
    ["git push", "Відправити свої коміти на GitHub."],
    ["gh auth status", "Перевірити, чи залогінений GitHub CLI."],
    ["gh repo view", "Показати інформацію про поточний репозиторій на GitHub."]
  ] },
  { id: "dev", title: "7. Python, Node, Homebrew", intro: "Версії, venv і uv, npm, встановлення й оновлення утиліт через brew.", commands: [
    ["brew --version", "Показати версію Homebrew."],
    ["brew update", "Оновити каталог формул Homebrew (самі програми не змінюються)."],
    ["brew upgrade", "Оновити всі встановлені через Homebrew програми."],
    ["brew list", "Показати, що встановлено через Homebrew."],
    ["brew search wget", "Знайти пакет wget у Homebrew."],
    ["brew install wget", "Встановити wget через Homebrew."],
    ["which python3", "Показати, який саме python3 запуститься."],
    ["python3 --version", "Показати версію Python 3."],
    ["python3 -m venv .venv", "Створити віртуальне середовище Python у папці .venv."],
    ["source .venv/bin/activate", "Активувати віртуальне середовище .venv."],
    ["pip install requests", "Встановити пакет requests (краще — в активному venv)."],
    ["uv --version", "Показати версію менеджера Python-проєктів uv."],
    ["node --version", "Показати версію Node.js."],
    ["npm install", "Встановити залежності Node-проєкту з package.json."],
    ["npm run dev", "Запустити скрипт dev з package.json."]
  ] },
  { id: "ai", title: "8. AI CLI агенти", intro: "Спершу git status і окрема гілка, потім агент, після — git diff.", commands: [
    ["which claude", "Перевірити, чи встановлено Claude Code CLI."],
    ["which codex", "Перевірити, чи встановлено OpenAI Codex CLI."],
    ["which gemini", "Перевірити, чи встановлено Google Gemini CLI."],
    ["which grok", "Перевірити, чи встановлено Grok CLI."],
    ["git switch -c ai-experiment", "Створити гілку ai-experiment і перейти на неї перед сесією агента."],
    ["claude", "Запустити Claude Code у поточній папці."],
    ["codex", "Запустити OpenAI Codex CLI у поточній папці."],
    ["gemini", "Запустити Google Gemini CLI у поточній папці."],
    ["grok", "Запустити Grok CLI у поточній папці."],
    ["git diff --stat", "Після сесії агента: коротко побачити, які файли й скільки рядків змінено."]
  ] },
  { id: "danger", title: "9. Небезпечні команди", intro: "Перевір, перш ніж руйнувати: процеси, права, диски, сервіси, скрипти з інтернету.", commands: [
    ["ps aux | grep node", "Знайти процеси node у повному списку процесів."],
    ["pgrep -l node", "Коротко показати PID та імена процесів node."],
    ["kill 4242", "Чемно попросити процес 4242 завершитися (SIGTERM)."],
    ["ls -l script.sh", "Подивитися права файлу script.sh перед їхньою зміною."],
    ["chmod +x script.sh", "Дозволити запуск script.sh (лише цей файл)."],
    ["diskutil list", "Показати диски й розділи (лише читання)."],
    ["launchctl list | grep com.stas", "Знайти свої фонові сервіси launchd з міткою com.stas."],
    ["sudo pfctl -s info", "Подивитися стан пакетного фільтра pf (лише читання, з sudo)."],
    ["curl -fsSL https://example.com/install.sh -o install.sh", "Завантажити скрипт установки у файл, не виконуючи його."],
    ["less install.sh", "Прочитати завантажений install.sh перед запуском."],
    ["rm -rf build", "Незворотно видалити папку збірки build без питань."]
  ] },
  { id: "practice", title: "10. Щоденна практика", intro: "Перенаправлення > і >>, конвеєри, історія — вправи з 14-денного плану.", commands: [
    ["cd ~/Projects", "Перейти в папку Projects у домашній папці."],
    ["mkdir practice-day1", "Створити папку practice-day1."],
    ["cd practice-day1", "Увійти в папку practice-day1."],
    ["echo \"Line 1\" > test.txt", "Записати рядок Line 1 у test.txt, перезаписавши файл."],
    ["echo \"Line 2\" >> test.txt", "Дописати рядок Line 2 у кінець test.txt."],
    ["cat test.txt", "Вивести вміст test.txt."],
    ["history | tail -5", "Показати лише 5 останніх команд з історії."],
    ["which brew", "Перевірити, де встановлено Homebrew."]
  ] }
];

// Явні еквіваленти: повні рядки, що дають той самий результат. Жодних префіксів.
const ALIASES = {
  "ls -la": ["ls -al", "ls -l -a", "ls -a -l"],
  "cd ~": ["cd"],
  "cd ~/Projects/demo": ["cd ~/Projects/demo/", "cd /Users/Stas/Projects/demo", "cd /Users/Stas/Projects/demo/"],
  "cd ~/Projects": ["cd ~/Projects/", "cd /Users/Stas/Projects"],
  "cd src": ["cd src/", "cd ./src"],
  "cd practice-day1": ["cd practice-day1/"],
  "rm -r folder": ["rm -r folder/", "rm -R folder", "rm -R folder/"],
  "rm -rf build": ["rm -rf build/", "rm -fr build", "rm -fr build/"],
  "head -5 readme.md": ["head -n 5 readme.md"],
  "tail -5 log.txt": ["tail -n 5 log.txt"],
  "echo $PATH | tr ':' '\\n'": ["echo $PATH | tr \":\" \"\\n\""],
  "find . -name \"*.md\"": ["find . -name '*.md'"],
  "find . -name \"*.md\" | xargs wc -l": ["find . -name '*.md' | xargs wc -l"],
  "grep -R \"TODO\" .": ["grep -R TODO .", "grep -r \"TODO\" .", "grep -r TODO .", "grep -R 'TODO' ."],
  "grep TODO readme.md": ["grep \"TODO\" readme.md", "grep 'TODO' readme.md"],
  "cut -d',' -f1 data.csv": ["cut -d, -f1 data.csv", "cut -d ',' -f1 data.csv", "cut -d\",\" -f1 data.csv", "cut -d , -f1 data.csv", "cut -d',' -f 1 data.csv"],
  "echo hello | tr 'a-z' 'A-Z'": ["echo hello | tr a-z A-Z", "echo hello | tr \"a-z\" \"A-Z\""],
  "mdfind -name readme": ["mdfind -name \"readme\"", "mdfind -name 'readme'"],
  "cat readme.md | pbcopy": ["pbcopy < readme.md"],
  "ping -c 3 8.8.8.8": ["ping 8.8.8.8 -c 3"],
  "ping -c 3 10.0.0.254": ["ping 10.0.0.254 -c 3"],
  "git commit -m \"message\"": ["git commit -m 'message'", "git commit -m message"],
  "git add .": ["git add -A", "git add --all"],
  "git diff --staged": ["git diff --cached"],
  "ssh-keygen -t ed25519": ["ssh-keygen -t ed25519 -C \"Stas@MacBook-Pro\""],
  "cat ~/.ssh/id_ed25519.pub": ["cat /Users/Stas/.ssh/id_ed25519.pub"],
  "/quit": ["quit"],
  "/user ssh-keys print": ["user ssh-keys print"],
  "/export file=backup": ["export file=backup"],
  "/user ssh-keys import public-key-file=id_ed25519.pub user=Stas": ["user ssh-keys import public-key-file=id_ed25519.pub user=Stas", "/user ssh-keys import user=Stas public-key-file=id_ed25519.pub"],
  "pip install requests": ["pip3 install requests", "python3 -m pip install requests"],
  "python3 --version": ["python3 -V"],
  "node --version": ["node -v"],
  "npm install": ["npm i"],
  "kill 4242": ["kill -15 4242", "kill -TERM 4242"],
  "history | tail -5": ["history | tail -n 5"],
  "echo \"Line 1\" > test.txt": ["echo 'Line 1' > test.txt"],
  "echo \"Line 2\" >> test.txt": ["echo 'Line 2' >> test.txt"]
};

const UK_HINTS = {};
const MODULES = {};
MODULE_LIST.forEach(m => {
  MODULES[m.id] = { id: m.id, title: m.title, intro: m.intro, commands: m.commands.map(c => c[0]) };
  m.commands.forEach(c => { if (!UK_HINTS[c[0]]) UK_HINTS[c[0]] = c[1]; });
});

/* ---------- строгий матчинг ---------- */
function normalizeCommand(s, caseInsensitive) {
  s = String(s || "").replace(/[“”„«»]/g, "\"").replace(/[‘’ʼ]/g, "'").replace(/\s+/g, " ").trim();
  return caseInsensitive ? s.toLowerCase() : s;
}
// RouterOS (команди на роутері починаються з /) — регістронезалежний.
function isRouterOS(listed) { return /^\/|^(quit|user |export )/.test(String(listed).trim()); }
function matches(input, listed) {
  const ci = isRouterOS(listed);
  const a = normalizeCommand(input, ci);
  if (!a) return false;
  if (a === normalizeCommand(listed, ci)) return true;
  return (ALIASES[listed] || []).some(x => normalizeCommand(x, ci) === a);
}
function allCommands() {
  const seen = new Set(), out = [];
  MODULE_LIST.forEach(m => m.commands.forEach(c => { if (!seen.has(c[0])) { seen.add(c[0]); out.push(c[0]); } }));
  return out;
}
window.TRAINER = { commands: allCommands, matches: matches };

/* ---------- стан емулятора ---------- */
const SIM = {
  user: "Stas", host: "MacBook-Pro", shell: "/bin/zsh",
  ip: "10.0.0.42", gateway: ROUTER,
  cwd: DEMO, dirs: new Set(), files: new Map(),
  ssh: false, knownHost: false, venv: false,
  router: new Set(), routerKeys: [],
  git: null, clipboard: "", brewInstalled: ["gh", "node", "python@3.13", "uv"], nodeRunning: true
};
const PATHS = {
  git: "/usr/bin/git", python3: "/opt/homebrew/bin/python3", brew: "/opt/homebrew/bin/brew", node: "/opt/homebrew/bin/node",
  npm: "/opt/homebrew/bin/npm", uv: "/opt/homebrew/bin/uv", gh: "/opt/homebrew/bin/gh", ssh: "/usr/bin/ssh", curl: "/usr/bin/curl",
  zsh: "/bin/zsh", ls: "/bin/ls", claude: "/opt/homebrew/bin/claude", codex: "/opt/homebrew/bin/codex",
  gemini: "/opt/homebrew/bin/gemini", grok: "/opt/homebrew/bin/grok"
};
const PATH_VALUE = "/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin";

function initFS() {
  SIM.dirs = new Set(["/", "/Users", HOME, HOME + "/.ssh", HOME + "/Desktop", HOME + "/Documents", HOME + "/Downloads",
    HOME + "/Projects", DEMO, DEMO + "/.git", DEMO + "/src", DEMO + "/docs", DEMO + "/folder", DEMO + "/empty", DEMO + "/build"]);
  SIM.files = new Map([
    [HOME + "/.zshrc", "export PATH=\"/opt/homebrew/bin:$PATH\"\n"],
    [DEMO + "/readme.md", "# Demo\nНавчальний проєкт для тренажера.\nTODO: вивчити Terminal\nЗапуск: npm run dev\nАвтор: Stas\nTODO: додати тести\n"],
    [DEMO + "/file.txt", "hello\nзмінений рядок\n"],
    [DEMO + "/old.txt", "старий файл\n"],
    [DEMO + "/log.txt", "[INFO] server started\n[INFO] GET / 200\n[WARN] slow response 1200ms\n[INFO] GET /api 200\n[ERROR] db timeout\n[INFO] retry ok\n[INFO] GET / 200\n"],
    [DEMO + "/names.txt", "Olena\nAndrii\nStas\nAndrii\nIryna\nStas\n"],
    [DEMO + "/data.csv", "name,city,age\nStas,Kyiv,30\nOlena,Lviv,28\n"],
    [DEMO + "/script.sh", "#!/bin/zsh\necho \"backup done\"\n"],
    [DEMO + "/package.json", "{ \"scripts\": { \"dev\": \"vite\" } }\n"],
    [DEMO + "/.gitignore", "node_modules/\nbuild/\n.venv/\n"],
    [DEMO + "/src/app.js", "// TODO: обробити помилки\nconsole.log('hi');\n"],
    [DEMO + "/docs/guide.md", "# Guide\n"],
    [DEMO + "/folder/a.txt", "a\n"],
    [DEMO + "/folder/b.txt", "b\n"],
    [DEMO + "/build/index.html", "<html></html>\n"]
  ]);
  SIM.cwd = DEMO; SIM.ssh = false; SIM.venv = false;
  SIM.router = new Set(); SIM.routerKeys = [];
  SIM.git = { branch: "main", branches: ["main", "feature"], modified: new Set(["readme.md", "file.txt"]), staged: new Set(),
    commits: [{ hash: "3f9c2e1", msg: "Add readme" }, { hash: "a1b2c3d", msg: "Initial commit" }] };
  SIM.clipboard = "текст з буфера";
  SIM.nodeRunning = true;
  SIM.exec = false;
}

function resolvePath(p) {
  p = String(p || "").replace(/^["']|["']$/g, "");
  let abs;
  if (!p || p === "~") abs = HOME;
  else if (p.startsWith("~/")) abs = HOME + p.slice(1);
  else if (p.startsWith("/")) abs = p;
  else abs = SIM.cwd + "/" + p;
  const out = [];
  abs.split("/").forEach(seg => {
    if (!seg || seg === ".") return;
    if (seg === "..") out.pop(); else out.push(seg);
  });
  return "/" + out.join("/");
}
function parentOf(abs) { const i = abs.lastIndexOf("/"); return i <= 0 ? "/" : abs.slice(0, i); }
function baseOf(abs) { return abs === "/" ? "/" : abs.slice(abs.lastIndexOf("/") + 1); }
function tilde(abs) { return abs === HOME ? "~" : abs.startsWith(HOME + "/") ? "~" + abs.slice(HOME.length) : abs; }
function isDir(abs) { return SIM.dirs.has(abs); }
function isFile(abs) { return SIM.files.has(abs); }
function exists(abs) { return isDir(abs) || isFile(abs); }
function children(dir) {
  const pre = dir === "/" ? "/" : dir + "/";
  const names = new Set();
  [...SIM.dirs, ...SIM.files.keys()].forEach(p => {
    if (p !== dir && p.startsWith(pre)) { const rest = p.slice(pre.length); if (rest && !rest.includes("/")) names.add(rest); }
  });
  return [...names].sort((a, b) => a.localeCompare(b));
}
function subtree(dir) {
  const pre = dir === "/" ? "/" : dir + "/";
  return [...SIM.dirs, ...SIM.files.keys()].filter(p => p.startsWith(pre)).sort();
}
function removeTree(abs) {
  subtree(abs).forEach(p => { SIM.dirs.delete(p); SIM.files.delete(p); });
  SIM.dirs.delete(abs); SIM.files.delete(abs);
}
function inRepo() { return SIM.cwd === DEMO || SIM.cwd.startsWith(DEMO + "/"); }
function repoRel(abs) { return abs.startsWith(DEMO + "/") ? abs.slice(DEMO.length + 1) : null; }
function touchRepo(abs) { const r = repoRel(abs); if (r && !r.startsWith(".git") && !r.startsWith("build/") && !r.startsWith(".venv")) SIM.git.modified.add(r); }

/* ---------- стан інтерфейсу ---------- */
const state = {
  currentModule: "basics",
  history: [], histIdx: -1,
  triedByModule: Object.fromEntries(Object.keys(MODULES).map(k => [k, new Set()])),
  selectedScenario: null,
  testMode: { active: false, queue: [], index: 0, correct: 0, wrong: 0, answered: false }
};
const SCENARIOS = MODULE_LIST.map((m, i) => ({ id: i + 1, moduleId: m.id, title: m.title, desc: m.intro, commands: m.commands.length }));
state.selectedScenario = SCENARIOS[0];

function saveProgress() {
  try {
    const tried = {};
    Object.keys(state.triedByModule).forEach(k => { tried[k] = [...state.triedByModule[k]]; });
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: 1, module: state.currentModule, tried }));
  } catch (e) { /* сховище недоступне — прогрес лише в цій сесії */ }
}
function loadProgress() {
  let data = null;
  try { data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch (e) { data = null; }
  if (!data || typeof data !== "object") return;
  if (data.tried && typeof data.tried === "object") {
    Object.keys(MODULES).forEach(k => {
      const list = Array.isArray(data.tried[k]) ? data.tried[k] : [];
      list.forEach(c => { if (MODULES[k].commands.includes(c)) state.triedByModule[k].add(c); });
    });
  }
  if (data.module && MODULES[data.module]) state.currentModule = data.module;
}

const $ = id => document.getElementById(id);
const livePanel = $("livePanel"), outputEl = $("output"), outputStatus = $("outputStatus"), cmdInput = $("cmdInput");
const progressBar = $("progressBar"), progressText = $("progressText"), cmdChecklist = $("cmdChecklist");
const moduleBadge = $("moduleBadge"), moduleNav = $("moduleNav"), termTitle = $("termTitle"), promptLabel = $("promptLabel");
const MAX_ENTRIES = 40;
let viewChunks = [];

function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function getModule() { return MODULES[state.currentModule]; }
function getCurrentCommands() { return getModule().commands; }
function getTried() { return state.triedByModule[state.currentModule]; }

function beginView(cmd) {
  viewChunks = [];
  if (cmd != null) viewChunks.push(`<div class="line-user">${esc(promptLabel.textContent)} ${esc(cmd)}</div>`);
}
function print(html, cls = "line-sys") { viewChunks.push(`<div class="${cls}">${html}</div>`); }
function ukHint(text) { return `<div class="line-uk-hint">${esc(text)}</div>`; }
function printResult(title, body, type = "ok", hint = null) {
  const cls = { warn: "result-box warn", purple: "result-box purple", danger: "result-box danger" }[type] || "result-box";
  viewChunks.push(`<div class="${cls}"><div class="result-title">${esc(title)}</div>${body}${hint ? ukHint(hint) : ""}</div>`);
}
function out(lines, cls = "line-ok") { return `<pre class="${cls}">${esc(Array.isArray(lines) ? lines.join("\n") : lines)}</pre>`; }
// Scrollback: кожна команда — окремий запис; тримаємо останні MAX_ENTRIES.
function flushView(status, replace) {
  const entry = document.createElement("div");
  entry.className = "entry";
  entry.innerHTML = viewChunks.join("");
  if (replace) livePanel.innerHTML = "";
  livePanel.appendChild(entry);
  while (livePanel.children.length > MAX_ENTRIES) livePanel.removeChild(livePanel.firstChild);
  outputEl.scrollTop = outputEl.scrollHeight;
  if (status) outputStatus.textContent = status;
}

function updatePrompt() {
  let label;
  if (SIM.ssh) label = `[${SIM.user}@MikroTik] >`;
  else {
    const short = SIM.cwd === HOME ? "~" : baseOf(SIM.cwd);
    label = `${SIM.venv ? "(.venv) " : ""}${SIM.user}@${SIM.host} ${short} %`;
  }
  promptLabel.textContent = label;
  termTitle.textContent = SIM.ssh ? `ssh ${SIM.user}@${ROUTER} — RouterOS` : `${SIM.user}@${SIM.host} — zsh — ${tilde(SIM.cwd)}`;
}

function updateProgress() {
  const cmds = getCurrentCommands();
  const n = cmds.filter(c => getTried().has(c)).length;
  moduleBadge.textContent = getModule().title;
  progressBar.style.width = cmds.length ? `${(n / cmds.length) * 100}%` : "0%";
  progressText.textContent = `${n} / ${cmds.length} команд` + (n === cmds.length ? " — розділ пройдено!" : "");
  cmdChecklist.querySelectorAll("button[data-cmd]").forEach(b => {
    const done = getTried().has(b.dataset.cmd);
    b.parentElement.classList.toggle("done", done);
    b.setAttribute("aria-label", b.dataset.cmd + (done ? " — виконано" : " — ще не виконано") + ". Вставити в поле вводу");
  });
  updatePrompt();
}

function updateModuleNav() {
  moduleNav.innerHTML = Object.values(MODULES).map(mod => {
    const t = mod.commands.filter(c => state.triedByModule[mod.id].has(c)).length;
    const pct = mod.commands.length ? Math.round((t / mod.commands.length) * 100) : 0;
    const act = mod.id === state.currentModule;
    return `<button type="button" class="btn${act ? " active" : ""}" data-module="${mod.id}"${act ? " aria-current=\"true\"" : ""}>${esc(mod.title)} · ${t}/${mod.commands.length} (${pct}%)</button>`;
  }).join("");
  moduleNav.querySelectorAll("button").forEach(btn => btn.addEventListener("click", () => switchModule(btn.dataset.module)));
}

function buildChecklist() {
  cmdChecklist.innerHTML = getCurrentCommands().map(c =>
    `<li><button type="button" class="cmd-btn" data-cmd="${esc(c)}" title="${esc(UK_HINTS[c] || "")}"><code>${esc(c)}</code></button></li>`
  ).join("");
  cmdChecklist.querySelectorAll("button[data-cmd]").forEach(b => {
    b.addEventListener("click", () => { cmdInput.value = b.dataset.cmd; cmdInput.focus(); });
  });
  updateProgress();
  updateModuleNav();
}

function switchModule(id, showWelcome = true) {
  if (!MODULES[id]) return;
  state.currentModule = id;
  saveProgress();
  buildChecklist();
  if (!showWelcome) return;
  beginView(null);
  const m = getModule();
  printResult(`Розділ: ${m.title}`, `<span class="line-muted">${esc(m.intro)}</span><br><span class="line-hl">Команд:</span> ${m.commands.length}`,
    "purple", "Клік по команді зліва вставляє її в поле — натисни Enter. Зараховується лише точна команда (або її явний еквівалент).");
  flushView(`% · ${m.title}`);
}

function welcome() {
  beginView(null);
  print(`<span class="line-muted">Mac Terminal Trainer — емуляція zsh (без реального виконання)</span>`);
  printResult("Почни з розділу «Основи терміналу»", `
    <span class="line-cmd">echo $SHELL</span> · <span class="line-cmd">pwd</span> · <span class="line-cmd">ls</span><br>
    <span class="line-muted">10 розділів · файли · мережа · MikroTik · Git · Homebrew · AI CLI</span>`,
    "ok", "Головна мета — не вивчити всі команди, а швидко знаходити потрібну, розуміти ризик і застосовувати в реальному сценарії.");
  flushView("% · Mac Terminal емулятор (zsh)", true);
}

/* ---------- розбір рядка ---------- */
function tokenize(s) {
  const re = /"([^"]*)"|'([^']*)'|(\S+)/g, t = []; let m;
  while ((m = re.exec(s))) t.push(m[1] != null ? m[1] : m[2] != null ? m[2] : m[3]);
  return t;
}
function splitFlags(args) {
  const flags = new Set(), rest = [];
  args.forEach(a => { if (/^-[A-Za-z]+$/.test(a)) a.slice(1).split("").forEach(f => flags.add(f)); else rest.push(a); });
  return { flags, rest };
}
function fileLines(abs) { return (SIM.files.get(abs) || "").replace(/\n$/, "").split("\n"); }
function notFound(cmd, name) { return out(`${cmd}: ${name}: No such file or directory`, "line-err"); }

/* ---------- RouterOS (після ssh) ---------- */
function handleRouter(cmd) {
  const c = normalizeCommand(cmd, true).replace(/^\/+/, "/");
  const k = c.startsWith("/") ? c : "/" + c;
  if (k === "/quit" || k === "/exit") {
    SIM.ssh = false; updatePrompt();
    printResult(cmd, out(["interrupted", `Connection to ${ROUTER} closed.`]), "ok", "Ти знову в zsh на своєму Mac.");
    return true;
  }
  if (k === "/export file=backup") {
    SIM.router.add("backup.rsc");
    printResult(cmd, out("(конфігурацію збережено у файл backup.rsc на роутері)", "line-muted"), "ok", "Тепер вийди (/quit) і забери файл з Mac: scp Stas@10.0.0.254:backup.rsc .");
    return true;
  }
  if (k === "/export") {
    printResult(cmd, out(["# 2026-09-18 10:12:03 by RouterOS 7.x", "/interface bridge", "add name=bridge", "/ip address", `add address=${ROUTER}/24 interface=bridge`]), "ok", "Експорт на екран. Щоб зберегти у файл: /export file=backup");
    return true;
  }
  if (k === "/file print") {
    const rows = [...SIM.router].map((f, i) => ` ${i} ${f}`);
    printResult(cmd, out([" # NAME"].concat(rows.length ? rows : [" (порожньо)"])), "ok");
    return true;
  }
  if (/^\/user ssh-keys import /.test(k)) {
    const file = (k.match(/public-key-file=(\S+)/) || [])[1];
    const user = (k.match(/user=(\S+)/) || [])[1];
    if (!file || !user) { printResult(cmd, out("expected public-key-file=… user=…", "line-err"), "warn"); return true; }
    if (!SIM.router.has(file)) {
      printResult(cmd, out(`failure: file ${file} not found`, "line-err"), "warn", "Спершу вийди (/quit) і завантаж ключ з Mac: scp ~/.ssh/id_ed25519.pub Stas@10.0.0.254:");
      return true;
    }
    SIM.router.delete(file);
    SIM.routerKeys = [{ user: "Stas", type: "ed25519", info: "Stas@MacBook-Pro" }];
    printResult(cmd, out("(ключ імпортовано; файл .pub з роутера прибрано)", "line-muted"), "ok", "Перевір: /user ssh-keys print. Наступний вхід по SSH — за ключем, без пароля.");
    return true;
  }
  if (k === "/user ssh-keys print") {
    const rows = SIM.routerKeys.map((r, i) => ` ${i} ${r.user}  ${r.type}  ${r.info}`);
    printResult(cmd, out([" # USER  KEY-TYPE  INFO"].concat(rows.length ? rows : [" (ключів немає)"])), "ok");
    return true;
  }
  if (k === "/system resource print") {
    printResult(cmd, out(["      uptime: 12d3h41m", "     version: 7.x (stable)", "    cpu-load: 3%", " free-memory: 412.5MiB"]), "ok");
    return true;
  }
  const word = k.slice(1).split(/[ /]/)[0] || cmd;
  printResult("RouterOS", out(`bad command name ${word} (line 1 column 2)`, "line-err"), "warn",
    "Ти зараз на роутері (RouterOS), а не в zsh. Команди Mac тут не працюють. Вихід: /quit");
  return false;
}

/* ---------- zsh ---------- */
const CANNED = {
  "echo $PATH | tr ':' '\\n'": () => out(PATH_VALUE.split(":")),
  "sort names.txt | uniq": () => inDemo() ? out(sortedLines(DEMO + "/names.txt").filter((l, i, a) => l !== a[i - 1])) : notFound("sort", "names.txt"),
  "cut -d',' -f1 data.csv": () => inDemo() ? out(fileLines(DEMO + "/data.csv").map(l => l.split(",")[0])) : notFound("cut", "data.csv"),
  "echo hello | tr 'a-z' 'A-Z'": () => out("HELLO"),
  "find . -name \"*.md\" | xargs wc -l": () => {
    const f = findByName(SIM.cwd, "*.md");
    if (!f.length) return out("       0", "line-ok");
    let total = 0;
    const rows = f.map(p => { const n = fileLines(p).length; total += n; return `${String(n).padStart(8)} ${p === SIM.cwd ? "." : "." + p.slice(SIM.cwd.length)}`; });
    if (f.length > 1) rows.push(`${String(total).padStart(8)} total`);
    return out(rows);
  },
  "cat readme.md | pbcopy": () => {
    const abs = resolvePath("readme.md");
    if (!isFile(abs)) return notFound("cat", "readme.md");
    SIM.clipboard = SIM.files.get(abs);
    return out("(нічого не виведено — текст уже в буфері обміну; перевір: pbpaste)", "line-muted");
  },
  "netstat -an | grep LISTEN": () => out(["tcp4       0      0  *.3000                 *.*                    LISTEN", "tcp6       0      0  *.3000                 *.*                    LISTEN", "tcp4       0      0  127.0.0.1.631          *.*                    LISTEN"]),
  "ps aux | grep node": () => out(SIM.nodeRunning
    ? ["Stas   4242   0.3  0.9 412345  75120 s001  S+   10:02AM   0:03.21 node /Users/Stas/Projects/demo/node_modules/.bin/vite", "Stas   5120   0.0  0.0 408627   1632 s002  S+   10:15AM   0:00.00 grep node"]
    : ["Stas   5120   0.0  0.0 408627   1632 s002  S+   10:15AM   0:00.00 grep node"]),
  "launchctl list | grep com.stas": () => out(["-\t0\tcom.stas.backup"]),
  "history | tail -5": () => out(state.history.slice(-5).map((h, i, a) => `${String(state.history.length - a.length + i + 1).padStart(5)}  ${h}`)),
  "git diff --stat": () => requireRepo(() => SIM.git.modified.size
    ? out([...SIM.git.modified].map(f => ` ${f.padEnd(12)} | 2 +-`).concat(` ${SIM.git.modified.size} file(s) changed`))
    : out("(змін немає)", "line-muted"))
};
function inDemo() { return SIM.cwd === DEMO; }
function sortedLines(abs) { return fileLines(abs).slice().sort((a, b) => a.localeCompare(b)); }
function globRe(g) { return new RegExp("^" + g.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".") + "$"); }
function findByName(dir, pattern) { const re = globRe(pattern); return subtree(dir).filter(p => isFile(p) && re.test(baseOf(p)) && !p.includes("/.git/")); }
function requireRepo(fn) { return inRepo() ? fn() : out("fatal: not a git repository (or any of the parent directories): .git", "line-err"); }

function lsLong(dir, all) {
  const names = children(dir).filter(n => all || !n.startsWith("."));
  const rows = (all ? [".", ".."] : []).concat(names).map(n => {
    const abs = n === "." ? dir : n === ".." ? parentOf(dir) : dir + "/" + n;
    const d = isDir(abs);
    const size = d ? 64 + 32 * children(abs).length : (SIM.files.get(abs) || "").length;
    const mode = d ? "drwxr-xr-x" : (abs.endsWith(".sh") && SIM.exec ? "-rwxr-xr-x" : "-rw-r--r--");
    return `${mode}  ${d ? String(2 + children(abs).filter(c => isDir(abs + "/" + c)).length).padStart(2) : " 1"} ${SIM.user}  staff  ${String(size).padStart(5)} Sep 18 10:00 ${n}`;
  });
  return [`total ${Math.max(8, rows.length * 8)}`].concat(rows);
}

function runZsh(cmd) {
  const raw = cmd.trim();
  const canon = allCommands().find(c => matches(raw, c)) || raw;
  const hint = UK_HINTS[canon] || null;
  if (CANNED[canon]) { printResult(raw, CANNED[canon](), "ok", hint); return true; }

  // перенаправлення echo > / >>
  const redir = raw.match(/^echo\s+(.+?)\s*(>>|>)\s*(\S+)$/);
  if (redir) {
    const text = tokenize(redir[1]).join(" ");
    const abs = resolvePath(redir[3]);
    if (!isDir(parentOf(abs))) { printResult(raw, out(`zsh: no such file or directory: ${redir[3]}`, "line-err"), "warn"); return true; }
    const prev = redir[2] === ">>" ? (SIM.files.get(abs) || "") : "";
    SIM.files.set(abs, prev + text + "\n"); touchRepo(abs);
    printResult(raw, out(redir[2] === ">" ? `(у ${redir[3]} записано «${text}»; старий вміст, якщо був, стерто)` : `(до ${redir[3]} дописано «${text}»)`, "line-muted"), "ok",
      hint || (redir[2] === ">" ? "> перезаписує файл повністю." : ">> дописує в кінець файлу."));
    return true;
  }
  if (/\|\s*(ba|z)?sh\b/.test(raw)) {
    printResult(raw, `<span class="line-err">⚠ Тренажер не виконує «завантажити й одразу запустити».</span><br><span class="line-muted">Скрипт з інтернету отримав би всі твої права без перевірки. Безпечно: curl -fsSL URL -o install.sh → less install.sh → лише потім bash install.sh.</span>`, "danger");
    return true;
  }
  if (raw.includes("|")) {
    printResult("Конвеєр не емулюється", `<span class="line-muted">Тренажер знає лише конвеєри з розділів. Спробуй команду зі списку зліва.</span>`, "warn");
    return false;
  }

  if (/^\//.test(raw) || MODULES.ssh.commands.some(c => c.startsWith("/") && matches(raw, c))) {
    printResult(raw, out(`zsh: no such file or directory: ${raw.split(" ")[0]}`, "line-err"), "warn", "Це команда RouterOS — вона працює лише на роутері. Спершу: ssh Stas@10.0.0.254");
    return false;
  }
  const t = tokenize(raw), name = t[0], args = t.slice(1);
  const { flags, rest } = splitFlags(args);
  const H = (title, body, type = "ok", h = hint) => { printResult(title, body, type, h); return true; };

  switch (name) {
    case "echo": {
      const v = args.join(" ");
      const map = { "$SHELL": SIM.shell, "$HOME": HOME, "$PATH": PATH_VALUE, "$USER": SIM.user };
      return H(raw, out(v.replace(/\$[A-Z]+/g, m => map[m] != null ? map[m] : "")));
    }
    case "whoami": return H(raw, out(SIM.user));
    case "hostname": return H(raw, out(SIM.host + ".local"));
    case "pwd": return H(raw, out(SIM.cwd));
    case "clear": welcome(); return "clear";
    case "history": return H(raw, state.history.length ? out(state.history.map((h, i) => `${String(i + 1).padStart(5)}  ${h}`)) : out("(порожньо)", "line-muted"));
    case "which": {
      const tool = args[0] || "";
      return H(raw, PATHS[tool] ? out(PATHS[tool]) : out(`${tool} not found`, "line-err"), "ok", hint || "Команди немає в жодній папці з PATH — не встановлена або PATH не містить її папку.");
    }
    case "command": {
      if (args[0] !== "-v" || !args[1]) break;
      return H(raw, PATHS[args[1]] ? out(PATHS[args[1]]) : out("(порожньо — команду не знайдено, код виходу 1)", "line-muted"));
    }
    case "man": return H(raw, out(`${(args[0] || "").toUpperCase()}(1)   General Commands Manual\n\nNAME\n     ${args[0]} – … (емуляція довідки)\n\nПробіл — далі, /слово — пошук, q — вихід.`, "line-muted"));
    case "apropos": return H(raw, out(["ifconfig(8)      - configure network interface parameters", "netstat(1)       - show network status", "networksetup(8)  - configuration tool for network settings in System Preferences", "ping(8)          - send ICMP ECHO_REQUEST packets to network hosts"]));
    case "ls": {
      const target = rest[0] ? resolvePath(rest[0]) : SIM.cwd;
      if (!exists(target)) return H(raw, notFound("ls", rest[0]), "warn");
      if (isFile(target)) {
        if (flags.has("l")) return H(raw, out(`${target.endsWith(".sh") && SIM.exec ? "-rwxr-xr-x" : "-rw-r--r--"}  1 ${SIM.user}  staff  ${String((SIM.files.get(target) || "").length).padStart(5)} Sep 18 10:00 ${rest[0]}`));
        return H(raw, out(rest[0]));
      }
      if (flags.has("l")) return H(raw, out(lsLong(target, flags.has("a"))));
      const names = children(target).filter(n => flags.has("a") || !n.startsWith("."));
      return H(raw, names.length ? out(names.join("   ")) : out("(папка порожня)", "line-muted"));
    }
    case "cd": {
      const tgt = args[0] == null ? "~" : args[0];
      const abs = resolvePath(tgt);
      if (!isDir(abs)) return H(raw, out(isFile(abs) ? `cd: not a directory: ${tgt}` : `cd: no such file or directory: ${tgt}`, "line-err"), "warn");
      SIM.cwd = abs; updatePrompt();
      return H(raw, out(`(тепер ти в ${tilde(abs)} — див. запрошення)`, "line-muted"), "ok", hint || "cd змінює поточну папку; нічого не виводить, якщо все добре.");
    }
    case "open": {
      const abs = resolvePath(rest[0] || ".");
      if (!exists(abs)) return H(raw, out(`The file ${abs} does not exist.`, "line-err"), "warn");
      return H(raw, out(`(Finder відкрив ${tilde(abs)})`, "line-muted"));
    }
    case "mkdir": {
      const outl = [];
      rest.forEach(n => {
        const abs = resolvePath(n);
        if (exists(abs)) { if (!flags.has("p")) outl.push(`mkdir: ${n}: File exists`); return; }
        if (!isDir(parentOf(abs)) && !flags.has("p")) { outl.push(`mkdir: ${n}: No such file or directory`); return; }
        let p = abs; const chain = [];
        while (!isDir(p)) { chain.push(p); p = parentOf(p); }
        chain.forEach(d => SIM.dirs.add(d));
      });
      return H(raw, outl.length ? out(outl, "line-err") : out("(папку створено)", "line-muted"));
    }
    case "touch": {
      rest.forEach(n => { const abs = resolvePath(n); if (!exists(abs) && isDir(parentOf(abs))) { SIM.files.set(abs, ""); touchRepo(abs); } });
      return H(raw, out("(файл створено або оновлено дату зміни)", "line-muted"));
    }
    case "cp": case "mv": {
      if (rest.length < 2) break;
      const src = resolvePath(rest[0]); let dst = resolvePath(rest[1]);
      if (!exists(src)) return H(raw, notFound(name, rest[0]), "warn");
      if (isDir(dst)) dst = dst + "/" + baseOf(src);
      if (isDir(src)) {
        if (name === "cp" && !flags.has("r") && !flags.has("R")) return H(raw, out(`cp: ${rest[0]} is a directory (not copied).`, "line-err"), "warn", "Папку копіюють з -R (або -r): cp -R src src-copy");
        subtree(src).concat(src).forEach(p => {
          const np = dst + p.slice(src.length);
          if (isDir(p)) SIM.dirs.add(np); else SIM.files.set(np, SIM.files.get(p));
        });
        if (name === "mv") removeTree(src);
      } else {
        const overwrite = isFile(dst);
        SIM.files.set(dst, SIM.files.get(src)); touchRepo(dst);
        if (name === "mv") { SIM.files.delete(src); touchRepo(src); }
        if (overwrite) return H(raw, out(`(${rest[1]} перезаписано без питань!)`, "line-warn"), "warn", "cp і mv мовчки перезаписують наявний файл. Обережніше: прапорець -i питає дозволу.");
      }
      return H(raw, out(name === "cp" ? "(скопійовано)" : "(переміщено / перейменовано)", "line-muted"));
    }
    case "rm": {
      if (!rest.length) break;
      const recursive = flags.has("r") || flags.has("R"), force = flags.has("f");
      const outl = [];
      let removed = 0;
      for (const n of rest) {
        const abs = resolvePath(n);
        if (abs === "/" || abs === HOME || abs === "/Users" || n === "*" ) {
          return H(raw, `<span class="line-err">⛔ Тренажер відмовився: ${esc(n)} — це ${abs === HOME ? "вся домашня папка" : "системний корінь або все підряд"}.</span><br><span class="line-muted">На справжньому Mac це знищило б дані безповоротно.</span>`, "danger");
        }
        if (!exists(abs)) { if (!force) outl.push(`rm: ${n}: No such file or directory`); continue; }
        if (isDir(abs) && !recursive) { outl.push(`rm: ${n}: is a directory`); continue; }
        if (flags.has("i")) { outl.push(`remove ${n}? (у тренажері відповідь n — нічого не видалено)`); continue; }
        removeTree(abs); touchRepo(abs); removed++;
      }
      const type = recursive && force ? "danger" : recursive ? "warn" : "ok";
      const body = (removed ? out(recursive && force ? "(видалено без жодного питання — у кошик нічого не потрапило)" : "(видалено — не в кошик, а назавжди)", recursive && force ? "line-err" : "line-warn") : "") + (outl.length ? out(outl, "line-err") : "");
      return H(raw, body || out("(нічого не сталося: -f мовчить, навіть коли файлу немає)", "line-muted"), type,
        hint || (recursive ? "rm -r видаляє папку з усім вмістом. Перед цим: pwd і ls." : "rm видаляє файл без кошика."));
    }
    case "rmdir": {
      const abs = resolvePath(rest[0] || "");
      if (!isDir(abs)) return H(raw, notFound("rmdir", rest[0] || ""), "warn");
      if (children(abs).length) return H(raw, out(`rmdir: ${rest[0]}: Directory not empty`, "line-err"), "warn", "rmdir видаляє лише порожні папки — тому він безпечніший за rm -r.");
      SIM.dirs.delete(abs);
      return H(raw, out("(порожню папку видалено)", "line-muted"));
    }
    case "cat": case "less": case "head": case "tail": {
      const fileArg = rest[rest.length - 1];
      if (!fileArg) break;
      const abs = resolvePath(fileArg);
      if (isDir(abs)) return H(raw, out(`${name}: ${fileArg}: Is a directory`, "line-err"), "warn");
      if (!isFile(abs)) return H(raw, notFound(name, fileArg), "warn");
      let lines = fileLines(abs);
      const nFlag = args.find(a => /^-\d+$/.test(a));
      const nIdx = args.indexOf("-n");
      const n = nFlag ? +nFlag.slice(1) : nIdx >= 0 ? +args[nIdx + 1] : 10;
      if (name === "head") lines = lines.slice(0, n);
      if (name === "tail") lines = lines.slice(-n);
      let extra = "";
      if (name === "less") extra = out("(less: пробіл — наступна сторінка, q — вихід)", "line-muted");
      if (name === "tail" && flags.has("f")) extra = out("(tail -f чекає нових рядків… Ctrl+C — зупинити. У тренажері зупиняється одразу.)", "line-muted");
      return H(raw, out(lines) + extra);
    }
    case "find": {
      const start = args[0] && !args[0].startsWith("-") ? args[0] : ".";
      const i = args.indexOf("-name");
      const root = resolvePath(start);
      if (!isDir(root)) return H(raw, notFound("find", start), "warn");
      const res = i >= 0 && args[i + 1] ? findByName(root, args[i + 1]) : subtree(root);
      const pref = start.replace(/\/$/, "");
      return H(raw, res.length ? out(res.map(p => pref + p.slice(root.length))) : out("(нічого не знайдено)", "line-muted"));
    }
    case "grep": {
      if (!rest.length) break;
      const pat = rest[0], target = rest[1];
      const re = new RegExp(pat.replace(/[.+^${}()|[\]\\*?]/g, "\\$&"), flags.has("i") ? "i" : "");
      const recursive = flags.has("R") || flags.has("r");
      let filesTo = [];
      if (!target) break;
      const abs = resolvePath(target);
      if (recursive) { if (!isDir(abs) && !isFile(abs)) return H(raw, notFound("grep", target), "warn"); filesTo = isDir(abs) ? subtree(abs).filter(p => isFile(p) && !p.includes("/.git/")) : [abs]; }
      else { if (isDir(abs)) return H(raw, out(`grep: ${target}: Is a directory`, "line-err"), "warn"); if (!isFile(abs)) return H(raw, notFound("grep", target), "warn"); filesTo = [abs]; }
      const hits = [];
      filesTo.forEach(p => fileLines(p).forEach((l, k) => {
        if (re.test(l) !== flags.has("v")) {
          const label = recursive ? (target.replace(/\/$/, "") + p.slice(abs.length)) + ":" : "";
          hits.push(label + (flags.has("n") ? (k + 1) + ":" : "") + l);
        }
      }));
      return H(raw, hits.length ? out(hits) : out("(нічого не знайдено — код виходу 1, це не помилка)", "line-muted"));
    }
    case "wc": {
      const f = rest[0]; if (!f) break;
      const abs = resolvePath(f);
      if (!isFile(abs)) return H(raw, notFound("wc", f), "warn");
      return H(raw, out(`${String(fileLines(abs).length).padStart(8)} ${f}`));
    }
    case "sort": {
      const f = rest[0]; if (!f) break;
      const abs = resolvePath(f);
      if (!isFile(abs)) return H(raw, notFound("sort", f), "warn");
      return H(raw, out(sortedLines(abs)));
    }
    case "mdfind": return H(raw, out([HOME + "/Projects/demo/readme.md", HOME + "/Documents/readme-old.txt"]));
    case "pbpaste": return H(raw, out(SIM.clipboard || "(буфер порожній)"));
    case "pbcopy": return H(raw, out("(pbcopy чекає тексту на вході — використай конвеєр: cat readme.md | pbcopy)", "line-muted"), "warn");

    // мережа
    case "ping": {
      const host = rest[rest.length - 1];
      if (!host) break;
      const ip = host === "google.com" ? "142.250.186.78" : host;
      const c = args.indexOf("-c") >= 0 ? +args[args.indexOf("-c") + 1] || 3 : 4;
      const rows = [`PING ${host} (${ip}): 56 data bytes`];
      for (let k = 0; k < Math.min(c, 5); k++) rows.push(`64 bytes from ${ip}: icmp_seq=${k} ttl=${ip === ROUTER ? 64 : 117} time=${((ip === ROUTER ? 2.1 : 14.3) + k * 0.4).toFixed(3)} ms`);
      rows.push("", `--- ${host} ping statistics ---`, `${c} packets transmitted, ${c} packets received, 0.0% packet loss`);
      return H(raw, out(rows) + (args.indexOf("-c") < 0 ? out("(без -c ping на Mac працює безкінечно — зупиняють Ctrl+C)", "line-warn") : ""));
    }
    case "traceroute": return H(raw, out([`traceroute to ${args[0]} (142.250.186.78), 64 hops max, 40 byte packets`, ` 1  ${ROUTER} (${ROUTER})  2.104 ms  1.873 ms  1.902 ms`, " 2  100.64.0.1 (100.64.0.1)  6.311 ms  5.998 ms  6.120 ms", " 3  * * *", " 4  142.250.186.78 (142.250.186.78)  14.512 ms  14.301 ms  14.466 ms"]));
    case "route": {
      if (args.join(" ") !== "get default") break;
      return H(raw, out(["   route to: default", "destination: default", "       mask: default", `    gateway: ${ROUTER}`, "  interface: en0", "      flags: <UP,GATEWAY,DONE,STATIC,PRCLONING,GLOBAL>"]));
    }
    case "ifconfig": return H(raw, out(["en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500", "\tether a4:83:e7:12:34:56", `\tinet ${SIM.ip} netmask 0xffffff00 broadcast 10.0.0.255`, "\tmedia: autoselect", "\tstatus: active"]));
    case "ipconfig": {
      if (args.join(" ") !== "getifaddr en0") break;
      return H(raw, out(SIM.ip));
    }
    case "networksetup": {
      const a = args.join(" ");
      if (a === "-listallhardwareports") return H(raw, out(["Hardware Port: Wi-Fi", "Device: en0", "Ethernet Address: a4:83:e7:12:34:56", "", "Hardware Port: Thunderbolt Bridge", "Device: bridge0", "Ethernet Address: N/A"]));
      if (a === "-getinfo Wi-Fi") return H(raw, out(["DHCP Configuration", `IP address: ${SIM.ip}`, "Subnet mask: 255.255.255.0", `Router: ${ROUTER}`, "Client ID: ", "IPv6: Automatic", "Wi-Fi ID: a4:83:e7:12:34:56"]));
      if (a === "-getdnsservers Wi-Fi") return H(raw, out("There aren't any DNS Servers set on Wi-Fi."), "ok", (hint || "") + " Така відповідь означає: DNS видає роутер через DHCP. Поточні DNS видно в scutil --dns.");
      break;
    }
    case "dig": {
      if (!args[0]) break;
      if (args.includes("+short")) return H(raw, out("142.250.186.78"));
      return H(raw, out(["; <<>> DiG 9.10.6 <<>> " + args[0], ";; ANSWER SECTION:", `${args[0]}.\t\t183\tIN\tA\t142.250.186.78`, "", ";; Query time: 18 msec", `;; SERVER: ${ROUTER}#53(${ROUTER})`]));
    }
    case "nslookup": return H(raw, out([`Server:\t\t${ROUTER}`, `Address:\t${ROUTER}#53`, "", "Non-authoritative answer:", `Name:\t${args[0]}`, "Address: 142.250.186.78"]));
    case "curl": {
      const o = args.indexOf("-o");
      if (o >= 0 && args[o + 1]) {
        const abs = resolvePath(args[o + 1]);
        SIM.files.set(abs, "#!/bin/sh\n# install script (емуляція)\necho \"Installing…\"\nmkdir -p \"$HOME/.tool\"\ncurl -fsSL https://example.com/tool -o \"$HOME/.tool/tool\"\n");
        return H(raw, out(`(скрипт збережено в ${args[o + 1]} і НЕ виконано — прочитай його: less ${args[o + 1]})`, "line-muted"));
      }
      if (args.includes("-I")) return H(raw, out(["HTTP/2 200", "server: github.com", "content-type: text/html; charset=utf-8", "date: Fri, 18 Sep 2026 10:00:00 GMT"]));
      return H(raw, out("<!DOCTYPE html>… (тіло сторінки; для заголовків додай -I)", "line-muted"));
    }
    case "netstat": return H(raw, out("(дуже довгий список — відфільтруй: netstat -an | grep LISTEN)", "line-muted"));
    case "lsof": {
      if (args[0] === "-i" && args[1] === ":3000") {
        return H(raw, SIM.nodeRunning
          ? out(["COMMAND  PID USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME", "node    4242 Stas   23u  IPv6 0x3c1f2a9b7d6e5f41      0t0  TCP *:hbci (LISTEN)"])
          : out("(порожньо — порт 3000 вільний)", "line-muted"), "ok", (hint || "") + " hbci — «ім'я» порту 3000 з /etc/services; з прапорцем -P lsof показує число.");
      }
      break;
    }

    // SSH
    case "ssh": {
      const target = args[args.length - 1] || "";
      if (!target || target.startsWith("-")) break;
      if (target !== `${SIM.user}@${ROUTER}`) return H(raw, out(`ssh: connect to host ${target.split("@").pop()} port 22: Operation timed out`, "line-err"), "warn", "У тренажері є лише роутер Stas@10.0.0.254.");
      const lines = [];
      if (!SIM.knownHost) {
        lines.push(`The authenticity of host '${ROUTER} (${ROUTER})' can't be established.`, "ED25519 key fingerprint is SHA256:q3Vb…(скорочено).", "Are you sure you want to continue connecting (yes/no/[fingerprint])? yes", `Warning: Permanently added '${ROUTER}' (ED25519) to the list of known hosts.`);
        SIM.knownHost = true;
      }
      lines.push(SIM.routerKeys.length ? "(вхід за ключем — пароль не питали)" : `${SIM.user}@${ROUTER}'s password: ********`, "", "  MikroTik RouterOS 7.x (c) 1999-2026       https://www.mikrotik.com/");
      SIM.ssh = true; updatePrompt();
      return H(raw, out(lines), "ok", (hint ? (hint || "") + " " : "") + "Тепер ти на роутері: /export file=backup, /user ssh-keys print, /quit — вихід.");
    }
    case "ssh-keygen": {
      if (!args.includes("ed25519") && !args.includes("-R")) break;
      const priv = HOME + "/.ssh/id_ed25519";
      if (isFile(priv)) return H(raw, out([`${priv} already exists.`, "Overwrite (y/n)? n"], "line-warn"), "warn", "Не перезаписуй наявний ключ — інакше втратиш доступ туди, де він уже доданий.");
      SIM.files.set(priv, "-----BEGIN OPENSSH PRIVATE KEY-----\n(секрет — нікому не показувати)\n");
      SIM.files.set(priv + ".pub", "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI…(скорочено) Stas@MacBook-Pro\n");
      return H(raw, out(["Generating public/private ed25519 key pair.", `Enter file in which to save the key (${priv}): `, "Enter passphrase (empty for no passphrase): ****", `Your identification has been saved in ${priv}`, `Your public key has been saved in ${priv}.pub`]));
    }
    case "ssh-copy-id": return H(raw, out("MikroTik (RouterOS) не приймає ssh-copy-id: це скрипт для Linux/macOS-серверів.", "line-warn") + out("Для роутера: scp ~/.ssh/id_ed25519.pub Stas@10.0.0.254: → ssh → /user ssh-keys import public-key-file=id_ed25519.pub user=Stas", "line-muted"), "warn");
    case "scp": {
      if (rest.length < 2) break;
      const [src, dst] = rest;
      const remote = `${SIM.user}@${ROUTER}:`;
      if (dst.startsWith(remote)) {
        const abs = resolvePath(src);
        if (!isFile(abs)) return H(raw, notFound("scp", src), "warn");
        SIM.router.add(dst.slice(remote.length) || baseOf(abs));
        return H(raw, out(`${baseOf(abs)}                          100%  ${(SIM.files.get(abs) || "").length}     4.1KB/s   00:00`));
      }
      if (src.startsWith(remote)) {
        const f = src.slice(remote.length);
        if (!SIM.router.has(f)) return H(raw, out(`scp: ${f}: No such file or directory`, "line-err"), "warn", "Спершу створи файл на роутері: ssh Stas@10.0.0.254 → /export file=backup → /quit");
        let abs = resolvePath(dst); if (isDir(abs)) abs = abs + "/" + f;
        SIM.files.set(abs, "# RouterOS export (емуляція)\n/ip address\nadd address=10.0.0.254/24 interface=bridge\n");
        return H(raw, out(`${f}                                   100% 4213    1.1MB/s   00:00`));
      }
      break;
    }

    // Git
    case "git": {
      const sub = args[0], a = args.slice(1).join(" ");
      if (!sub) break;
      if (!inRepo()) return H(raw, out("fatal: not a git repository (or any of the parent directories): .git", "line-err"), "warn", "Git-команди працюють лише всередині репозиторію: cd ~/Projects/demo");
      const g = SIM.git;
      if (sub === "status") {
        const rows = [`On branch ${g.branch}`];
        if (g.staged.size) rows.push("Changes to be committed:", ...[...g.staged].map(f => `\tmodified:   ${f}`));
        if (g.modified.size) rows.push("Changes not staged for commit:", "  (use \"git add <file>...\" to update what will be committed)", "  (use \"git restore <file>...\" to discard changes in working directory)", ...[...g.modified].map(f => `\tmodified:   ${f}`));
        if (!g.staged.size && !g.modified.size) rows.push("nothing to commit, working tree clean");
        return H(raw, out(rows));
      }
      if (sub === "diff") {
        const set = (a === "--staged" || a === "--cached") ? g.staged : g.modified;
        if (!set.size) return H(raw, out("(порожньо — таких змін немає)", "line-muted"));
        return H(raw, out([...set].flatMap(f => [`diff --git a/${f} b/${f}`, `--- a/${f}`, `+++ b/${f}`, "@@ -1,2 +1,2 @@", "-старий рядок", "+змінений рядок"])));
      }
      if (sub === "add") {
        if (a === "." || a === "-A" || a === "--all") { g.modified.forEach(f => g.staged.add(f)); g.modified.clear(); }
        else if (g.modified.has(a)) { g.modified.delete(a); g.staged.add(a); }
        else return H(raw, out(`fatal: pathspec '${a}' did not match any files`, "line-err"), "warn");
        return H(raw, out("(зміни підготовлено — git status покаже їх як «to be committed»)", "line-muted"));
      }
      if (sub === "commit") {
        const m = raw.match(/-m\s+(?:"([^"]*)"|'([^']*)'|(\S+))/);
        if (!m) return H(raw, out("(без -m відкриється редактор — у тренажері додай -m \"повідомлення\")", "line-warn"), "warn");
        if (!g.staged.size) return H(raw, out(["On branch " + g.branch, "nothing added to commit but untracked files present (use \"git add\" to track)"].slice(0, g.modified.size ? 2 : 1).concat(g.modified.size ? [] : ["nothing to commit, working tree clean"]), "line-warn"), "warn", "Спершу git add — інакше комітити нічого.");
        const msg = m[1] || m[2] || m[3];
        const hash = Math.random().toString(16).slice(2, 9);
        g.commits.unshift({ hash, msg });
        const n = g.staged.size; g.staged.clear();
        return H(raw, out([`[${g.branch} ${hash}] ${msg}`, ` ${n} file${n > 1 ? "s" : ""} changed`]));
      }
      if (sub === "log") return H(raw, out(g.commits.map(c => `${c.hash} ${c.msg}`)));
      if (sub === "branch") return H(raw, out(g.branches.map(b => (b === g.branch ? "* " : "  ") + b)));
      if (sub === "switch" || sub === "checkout") {
        const create = args[1] === "-c" || args[1] === "-b";
        const br = create ? args[2] : args[1];
        if (!br) break;
        if (create) {
          if (g.branches.includes(br)) return H(raw, out(`fatal: a branch named '${br}' already exists`, "line-err"), "warn");
          g.branches.push(br); g.branch = br;
          return H(raw, out(`Switched to a new branch '${br}'`));
        }
        if (!g.branches.includes(br)) return H(raw, out(`fatal: invalid reference: ${br}`, "line-err"), "warn", "Такої гілки немає. Створити й перейти: git switch -c " + br);
        g.branch = br;
        return H(raw, out(`Switched to branch '${br}'`));
      }
      if (sub === "restore") {
        const staged = args[1] === "--staged";
        const f = staged ? args[2] : args[1];
        if (!f) break;
        if (staged) { if (g.staged.delete(f)) g.modified.add(f); return H(raw, out(`(${f} знято зі staging, зміни у файлі лишились)`, "line-muted")); }
        if (!g.modified.has(f)) return H(raw, out("(змін у цьому файлі немає — нічого не скасовано)", "line-muted"));
        g.modified.delete(f);
        return H(raw, out(`(незакомічені зміни у ${f} скасовано — їх не повернути)`, "line-warn"), "warn");
      }
      if (sub === "push") return H(raw, out(["To github.com:StsZu/demo.git", `   ${g.commits[1].hash}..${g.commits[0].hash}  ${g.branch} -> ${g.branch}`]));
      if (sub === "pull") return H(raw, out("Already up to date."));
      if (sub === "stash") {
        if (args[1] === "pop") return H(raw, out("(сховані зміни повернуто)", "line-muted"));
        return H(raw, out(`Saved working directory and index state WIP on ${g.branch}: ${g.commits[0].hash} ${g.commits[0].msg}`));
      }
      break;
    }
    case "gh": {
      const a = args.join(" ");
      if (a === "auth status") return H(raw, out(["github.com", "  ✓ Logged in to github.com account StsZu (keyring)", "  - Active account: true", "  - Git operations protocol: ssh"]));
      if (a === "repo view") return H(raw, out(["StsZu/demo", "Навчальний проєкт для тренажера", "", "View this repository on GitHub: https://github.com/StsZu/demo"]));
      break;
    }

    // Dev
    case "brew": {
      const a = args.join(" ");
      if (a === "--version") return H(raw, out("Homebrew 4.x.x (номер залежить від дати оновлення)"));
      if (a === "update") return H(raw, out(["==> Updating Homebrew...", "Updated 2 taps (homebrew/core and homebrew/cask).", "==> Outdated Formulae", "node   uv"]));
      if (a === "upgrade") return H(raw, out(["==> Upgrading 2 outdated packages:", "node 24.6.0 -> 24.8.0", "uv 0.8.13 -> 0.8.17", "==> Pouring node--24.8.0.arm64.bottle.tar.gz"]), "warn", (hint || "") + " Оновлення може зламати проєкт, що залежить від старої версії.");
      if (a === "list") return H(raw, out(SIM.brewInstalled.join("\n")));
      if (a === "outdated") return H(raw, out(["node (24.6.0) < 24.8.0", "uv (0.8.13) < 0.8.17"]));
      if (args[0] === "search" && args[1]) return H(raw, out(["==> Formulae", args[1], args[1] + "2"]));
      if (args[0] === "install" && args[1]) {
        if (!SIM.brewInstalled.includes(args[1])) SIM.brewInstalled.push(args[1]);
        PATHS[args[1]] = "/opt/homebrew/bin/" + args[1];
        return H(raw, out([`==> Fetching ${args[1]}`, `==> Pouring ${args[1]}--x.y.z.arm64.bottle.tar.gz`, `🍺  /opt/homebrew/Cellar/${args[1]}/x.y.z: 92 files, 4.3MB`]));
      }
      if (args[0] === "uninstall" && args[1]) { SIM.brewInstalled = SIM.brewInstalled.filter(x => x !== args[1]); return H(raw, out(`Uninstalling /opt/homebrew/Cellar/${args[1]}/x.y.z...`)); }
      break;
    }
    case "python3": case "python": {
      if (name === "python") return H(raw, out("zsh: command not found: python", "line-err"), "warn", "На сучасному macOS команди python немає — використовуй python3.");
      const a = args.join(" ");
      if (a === "--version" || a === "-V") return H(raw, out("Python 3.13.7"), "ok", (hint || "") + " Це Python з Homebrew (/opt/homebrew/bin/python3); системний /usr/bin/python3 від Apple — старіший.");
      if (a === "-m venv .venv") { SIM.dirs.add(resolvePath(".venv")); return H(raw, out("(створено папку .venv з окремим Python і pip)", "line-muted")); }
      if (a === "-m pip install requests") return runZsh("pip install requests") || true;
      break;
    }
    case "source": {
      if (args[0] !== ".venv/bin/activate") break;
      if (!isDir(resolvePath(".venv"))) return H(raw, out("source: no such file or directory: .venv/bin/activate", "line-err"), "warn", "Спершу створи середовище: python3 -m venv .venv");
      SIM.venv = true; updatePrompt();
      return H(raw, out("(venv активовано — бачиш (.venv) на початку запрошення)", "line-muted"));
    }
    case "deactivate": SIM.venv = false; updatePrompt(); return H(raw, out("(venv вимкнено)", "line-muted"));
    case "pip": case "pip3": {
      if (args[0] === "list") return H(raw, out(SIM.venv ? ["Package  Version", "-------- -------", "pip      25.x", "requests 2.32.x"] : ["Package Version", "------- -------", "pip     25.x"]));
      if (args[0] !== "install" || !args[1]) break;
      if (!SIM.venv) return H(raw, out(["error: externally-managed-environment", "", "× This environment is externally managed", "╰─> To install Python packages system-wide, try brew install", "    xyz, where xyz is the package you are trying to install.", "    …create a virtual environment with python3 -m venv path/to/venv."], "line-err"), "warn",
        "Python з Homebrew не дає ставити пакети глобально. Створи venv: python3 -m venv .venv → source .venv/bin/activate → pip install requests (або використай uv).");
      return H(raw, out([`Collecting ${args[1]}`, `Successfully installed certifi-2026.x charset-normalizer-3.x idna-3.x ${args[1]}-2.32.x urllib3-2.x`]));
    }
    case "uv": {
      const a = args.join(" ");
      if (a === "--version") return H(raw, out("uv 0.x.y (номер залежить від версії)"));
      if (a === "venv") { SIM.dirs.add(resolvePath(".venv")); return H(raw, out(["Using CPython 3.13.7 interpreter at: /opt/homebrew/bin/python3", "Creating virtual environment at: .venv", "Activate with: source .venv/bin/activate"])); }
      break;
    }
    case "node": if (args[0] === "--version" || args[0] === "-v") return H(raw, out("v24.x.y (залежить від встановленої версії)")); break;
    case "npm": {
      const a = args.join(" ");
      if (a === "install" || a === "i") { SIM.dirs.add(resolvePath("node_modules")); return H(raw, out(["added 187 packages, and audited 188 packages in 6s", "found 0 vulnerabilities"])); }
      if (a === "run dev") { SIM.nodeRunning = true; return H(raw, out(["> demo@1.0.0 dev", "> vite", "", "  VITE ready in 412 ms", "  ➜  Local:   http://localhost:3000/"])); }
      if (a === "--version") return H(raw, out("11.x.y"));
      break;
    }
    case "npx": return H(raw, out("Need to install the following packages: … Ok to proceed? (y) — npx завантажує і запускає пакет з npm (емуляція).", "line-muted"), "warn", "npx виконує код пакета з інтернету — перевір назву пакета.");

    // AI CLI
    case "claude": case "codex": case "gemini": case "grok": {
      if (args.some(x => /dangerously|yolo/.test(x))) {
        return H(raw, `<span class="line-err">⚠ Режим без підтверджень: агент виконуватиме команди й змінюватиме файли, нічого не питаючи.</span><br><span class="line-muted">Лише в ізольованому середовищі (контейнер/VM) і на окремій гілці.</span>`, "danger");
      }
      const warns = [];
      if (SIM.cwd === HOME || SIM.cwd === "/") warns.push("⚠ Ти в домашній папці / корені — агент бачитиме все. Перейди в папку проєкту.");
      else if (inRepo() && (SIM.git.modified.size || SIM.git.staged.size)) warns.push("⚠ Є незакомічені зміни — потім важко відрізнити свої від змін агента. Спершу commit або stash.");
      else if (!inRepo()) warns.push("⚠ Це не git-репозиторій — відкотити зміни агента буде нічим.");
      if (inRepo() && SIM.git.branch === "main") warns.push("Порада: окрема гілка — git switch -c ai-experiment.");
      return H(raw, `<span class="line-hl">${esc(name)}</span> <span class="line-muted">— інтерактивний агент у ${esc(tilde(SIM.cwd))} (емуляція; вихід — /exit або Ctrl+C)</span>` +
        (warns.length ? "<br>" + warns.map(w => `<span class="line-warn">${esc(w)}</span>`).join("<br>") : "<br><span class=\"line-ok\">✓ Чиста робоча копія — після сесії дивись git status і git diff.</span>"), "purple");
    }

    // Небезпечні / процеси
    case "pgrep": return H(raw, SIM.nodeRunning ? out("4242 node") : out("(порожньо — процесів node немає)", "line-muted"));
    case "kill": case "killall": {
      const target = rest[0]; if (!target) break;
      const nine = flags.has("9") || args.includes("-9");
      if (name === "killall") { SIM.nodeRunning = target === "node" ? false : SIM.nodeRunning; return H(raw, out(`(завершено ВСІ процеси з іменем ${target})`, "line-warn"), "danger", "killall зупиняє всі процеси з цим іменем. Точніше — kill конкретного PID."); }
      if (target !== "4242" || !SIM.nodeRunning) return H(raw, out(`kill: kill ${target} failed: no such process`, "line-err"), "warn");
      SIM.nodeRunning = false;
      return H(raw, out(nine ? "(процес 4242 вбито миттєво — незбережені дані втрачено)" : "(процесу 4242 надіслано SIGTERM — він коректно завершився)", nine ? "line-err" : "line-muted"), nine ? "danger" : "ok");
    }
    case "chmod": {
      if (flags.has("R") || args.includes("777")) return H(raw, `<span class="line-err">⚠ Тренажер не виконує рекурсивну зміну прав / 777.</span><br><span class="line-muted">chmod -R 777 відкриває файли на запис усім; відкотити точно майже неможливо. Змінюй права лише конкретного файлу: chmod +x script.sh</span>`, "danger");
      const f = rest[rest.length - 1] || args[args.length - 1];
      const abs = resolvePath(f);
      if (!isFile(abs)) return H(raw, notFound("chmod", f), "warn");
      if (args[0] === "+x" && f === "script.sh") SIM.exec = true;
      return H(raw, out("(права змінено — перевір: ls -l " + f + ")", "line-muted"));
    }
    case "chown": return H(raw, out("chown: Operation not permitted (у тренажері chown не виконується; зміна власника зазвичай потребує sudo і високий ризик)", "line-warn"), "danger");
    case "diskutil": {
      if (args[0] === "list") return H(raw, out(["/dev/disk0 (internal, physical):", "   #:                       TYPE NAME                    SIZE       IDENTIFIER", "   0:      GUID_partition_scheme                        *500.3 GB   disk0", "   1:             Apple_APFS_ISC Container disk1         524.3 MB   disk0s1", "   2:                 Apple_APFS Container disk3         494.4 GB   disk0s2", "", "/dev/disk4 (external, physical):", "   0:     FDisk_partition_scheme                        *32.0 GB    disk4"]));
      return H(raw, `<span class="line-err">⛔ Тренажер не виконує diskutil ${esc(args[0] || "")}.</span><br><span class="line-muted">erase/partition знищують дані на диску. Спершу diskutil list, двічі звір IDENTIFIER, зроби бекап; краще — Disk Utility.</span>`, "danger");
    }
    case "dd": return H(raw, `<span class="line-err">⛔ Тренажер не виконує dd.</span><br><span class="line-muted">Помилка в of=/dev/diskN перезапише не той диск без жодного питання. Для запису образів — Raspberry Pi Imager або balenaEtcher.</span>`, "danger");
    case "launchctl": {
      if (args[0] === "list") return H(raw, out("(довгий список — відфільтруй: launchctl list | grep com.stas)", "line-muted"));
      if (args[0] === "bootout" || args[0] === "bootstrap") return H(raw, out(`(${args[0]}: у тренажері не виконується. bootout вивантажує сервіс, bootstrap — завантажує; для своїх агентів домен gui/$(id -u))`, "line-warn"), "warn");
      break;
    }
    case "sudo": {
      const inner = args.join(" ");
      if (inner === "pfctl -s info") return H(raw, out(["Password: (у тренажері пароль не потрібен)", "Status: Disabled                              Debug: Urgent", "", "State Table                          Total             Rate", "  current entries                        0"]), "ok",
        (hint || "") + " Status: Disabled — пакетний фільтр pf вимкнено; вбудований файрвол з System Settings — це окремий Application Firewall.");
      if (!inner) return H(raw, out("usage: sudo -h | -K | -k | -V …", "line-muted"));
      return H(raw, `<span class="line-err">⚠ Тренажер не виконує sudo ${esc(inner)}.</span><br><span class="line-muted">sudo = права root: помилка зачепить усю систему. Спитай себе: чи справді потрібні root-права? Часто вистачає команди без sudo або brew.</span>`, "danger");
    }
    case "pfctl": return H(raw, out("pfctl: /dev/pf: Permission denied (потрібен sudo; змінювати правила -f / вимикати -d — високий ризик)", "line-err"), "warn");
    case "exit": return H(raw, out("(у справжньому Terminal exit закриває сесію; тут нічого не станеться)", "line-muted"));
  }

  const knownElsewhere = allCommands().find(c => c.split(" ")[0] === name);
  printResult("Невідома команда", `${out(`zsh: command not found: ${name}`, "line-err")}<span class="line-muted">Тренажер не знає «${esc(raw)}»${knownElsewhere ? ` у такому вигляді. Спробуй точну команду зі списку, напр. «${esc(knownElsewhere)}»` : ". Спробуй команду зі списку зліва або man/apropos"}.</span>`, "warn");
  return false;
}

function handleCommand(cmd) {
  return SIM.ssh ? handleRouter(cmd) : runZsh(cmd);
}

function execute(raw) {
  const cmd = raw.trim();
  if (!cmd) return;
  if (state.testMode.active) { handleTestAnswer(cmd); return; }
  state.history.push(cmd);
  state.histIdx = state.history.length;
  const wasRouter = SIM.ssh;
  beginView(cmd);
  const listed = getCurrentCommands().find(c => matches(cmd, c));
  if (!listed) {
    const owner = MODULE_LIST.find(m => m.commands.some(c => matches(cmd, c[0])));
    if (owner && owner.id !== state.currentModule) print(`<span class="line-warn">Ця команда — з розділу «${esc(owner.title)}». Тут вона не зараховується.</span>`);
  }
  const ok = handleCommand(cmd);
  if (ok === "clear") { if (listed) markTried(listed); return; }
  flushView(`${wasRouter ? "RouterOS" : "%"} · ${getModule().title} · ${cmd}`);
  if (ok !== false && listed) markTried(listed);
}

function markTried(listed) {
  getTried().add(listed);
  saveProgress();
  updateProgress();
  updateModuleNav();
}

/* ---------- тест-режим ---------- */
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function buildTestQueue() { return shuffleArray(allCommands().filter(c => UK_HINTS[c]).map(c => ({ cmd: c, hint: UK_HINTS[c] }))); }
function updateTestButton() {
  const btn = $("btnTest"), skip = $("btnSkip");
  btn.textContent = state.testMode.active ? "Зупинити тест" : "Режим тестування";
  btn.classList.toggle("active", state.testMode.active);
  btn.setAttribute("aria-pressed", state.testMode.active ? "true" : "false");
  skip.hidden = !state.testMode.active;
}
function showTestQuestion() {
  const tm = state.testMode;
  const q = tm.queue[tm.index];
  if (!q) { finishTestMode(); return; }
  tm.answered = false;
  beginView(null);
  printResult(`Тест ${tm.index + 1}/${tm.queue.length}`, `
    <div class="test-question">Яка команда: <em>${esc(q.hint)}</em></div>
    <span class="line-muted">Введи команду і Enter або натисни «Пропустити». Правильно: ${tm.correct}, помилок: ${tm.wrong}</span>`, "purple");
  flushView(`Тест · ${tm.index + 1}/${tm.queue.length}`);
}
function startTestMode() {
  state.testMode = { active: true, queue: buildTestQueue(), index: 0, correct: 0, wrong: 0, answered: false };
  updateTestButton();
  showTestQuestion();
  cmdInput.focus();
}
function stopTestMode() { state.testMode.active = false; updateTestButton(); welcome(); }
function finishTestMode() {
  const tm = state.testMode;
  beginView(null);
  printResult("Тест завершено", `<span class="line-ok">Правильно: ${tm.correct}</span><br><span class="line-warn">Помилок / пропущено: ${tm.wrong}</span>`, "ok");
  flushView("Тест завершено");
  state.testMode.active = false;
  updateTestButton();
}
function nextTestQuestion() { state.testMode.index++; showTestQuestion(); }
function handleTestAnswer(cmd) {
  const tm = state.testMode;
  const q = tm.queue[tm.index];
  if (!q || tm.answered) return;
  tm.answered = true;
  beginView(cmd);
  if (matches(cmd, q.cmd)) {
    tm.correct++;
    printResult("✓ Правильно!", `<span class="line-ok">${esc(q.cmd)}</span>`, "ok", q.hint);
  } else {
    tm.wrong++;
    printResult("✗ Ні", `<span class="line-err">Очікувалось: ${esc(q.cmd)}</span>`, "warn", q.hint);
  }
  flushView(`Тест · ${tm.correct}✓ ${tm.wrong}✗`);
  setTimeout(() => { if (state.testMode.active && state.testMode.queue[tm.index] === q) nextTestQuestion(); }, 1500);
}
function skipTestQuestion() {
  const tm = state.testMode;
  if (!tm.active) return;
  const q = tm.queue[tm.index];
  if (q && !tm.answered) {
    tm.wrong++;
    beginView(null);
    printResult("Пропущено", `<span class="line-muted">Відповідь: </span><span class="line-cmd">${esc(q.cmd)}</span>`, "warn", q.hint);
    flushView(`Тест · пропущено`);
  }
  nextTestQuestion();
  cmdInput.focus();
}

/* ---------- модалка сценаріїв ---------- */
const modal = $("scenarioModal");
let lastFocus = null;
function openScenarioModal() {
  const list = $("scenarioList");
  state.selectedScenario = SCENARIOS.find(s => s.moduleId === state.currentModule) || SCENARIOS[0];
  list.innerHTML = SCENARIOS.map(s => `
    <button type="button" class="scenario-item${s.moduleId === state.selectedScenario.moduleId ? " selected" : ""}" data-id="${s.id}" aria-pressed="${s.moduleId === state.selectedScenario.moduleId}">
      <strong>${esc(s.title)}</strong>
      <small>${esc(s.desc)} · ${s.commands} команд</small>
    </button>`).join("");
  list.querySelectorAll(".scenario-item").forEach(el => {
    el.addEventListener("click", () => {
      list.querySelectorAll(".scenario-item").forEach(x => { x.classList.remove("selected"); x.setAttribute("aria-pressed", "false"); });
      el.classList.add("selected"); el.setAttribute("aria-pressed", "true");
      state.selectedScenario = SCENARIOS.find(s => s.id === +el.dataset.id);
    });
  });
  lastFocus = document.activeElement;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  (list.querySelector(".selected") || list.querySelector("button")).focus();
}
function closeScenarioModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}
function confirmScenario() {
  if (state.selectedScenario) switchModule(state.selectedScenario.moduleId);
  closeScenarioModal();
}

/* ---------- init ---------- */
if (/[?&]embed=1/.test(location.search)) document.body.classList.add("embed");

$("cmdForm").addEventListener("submit", e => {
  e.preventDefault();
  execute(cmdInput.value);
  cmdInput.value = "";
});
cmdInput.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") {
    e.preventDefault();
    if (state.histIdx > 0) { state.histIdx--; cmdInput.value = state.history[state.histIdx] || ""; }
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (state.histIdx < state.history.length - 1) { state.histIdx++; cmdInput.value = state.history[state.histIdx] || ""; }
    else { state.histIdx = state.history.length; cmdInput.value = ""; }
  } else if (e.key === "Tab" && !e.shiftKey) {
    // Автодоповнення лише коли є що доповнити; інакше Tab переводить фокус далі (без пастки).
    const val = cmdInput.value;
    if (!val.trim()) return;
    const match = getCurrentCommands().find(c => c.startsWith(val) && c !== val);
    if (match) { e.preventDefault(); cmdInput.value = match; }
  }
});
$("btnTest").addEventListener("click", () => { state.testMode.active ? stopTestMode() : startTestMode(); });
$("btnSkip").addEventListener("click", skipTestQuestion);
$("btnScenario").addEventListener("click", openScenarioModal);
$("btnReset").addEventListener("click", () => { initFS(); updatePrompt(); welcome(); });
$("btnResetProgress").addEventListener("click", () => {
  if (!confirm("Скинути прогрес усіх розділів тренажера?")) return;
  Object.keys(state.triedByModule).forEach(k => state.triedByModule[k].clear());
  saveProgress(); buildChecklist();
});
$("scenarioConfirm").addEventListener("click", confirmScenario);
$("scenarioCancel").addEventListener("click", closeScenarioModal);
modal.addEventListener("click", e => { if (e.target === modal) closeScenarioModal(); });
modal.addEventListener("keydown", e => {
  if (e.key === "Escape") { e.preventDefault(); closeScenarioModal(); return; }
  if (e.key === "Enter" && e.target.id !== "scenarioCancel") {
    e.preventDefault();
    if (e.target.classList && e.target.classList.contains("scenario-item")) e.target.click();
    confirmScenario();
    return;
  }
  if (e.key === "Tab") {
    const f = [...modal.querySelectorAll("button")];
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

initFS();
loadProgress();
buildChecklist();
updatePrompt();
welcome();
