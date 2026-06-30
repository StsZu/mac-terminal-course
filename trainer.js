const UK_HINTS = {
  "echo $SHELL": "Показує шлях до поточної оболонки — у вас /bin/zsh.",
  "whoami": "Виводить ім'я поточного користувача macOS.",
  "hostname": "Ім'я комп'ютера в мережі (напр. MacBook-Pro).",
  "pwd": "Де ви зараз у файловій системі (print working directory).",
  "clear": "Очищує екран терміналу.",
  "history": "Список останніх команд цієї сесії.",
  "which git": "Показує повний шлях до виконуваного файлу команди.",
  "command -v python3": "Альтернатива which — перевіряє наявність команди в $PATH.",
  "echo $PATH": "Список папок, де shell шукає програми.",
  "echo $PATH | tr ':' '\\n'": "PATH по одному шляху на рядок — зручно читати.",
  "man ls": "Відкриває довідку (manual) для команди ls.",
  "apropos network": "Шукає команди за ключовим словом у описах.",
  "ls": "Список файлів і папок у поточній директорії.",
  "ls -la": "Детальний список: права, розмір, дата, приховані файли.",
  "cd": "Перехід у папку. cd ~ — додому, cd .. — на рівень вище.",
  "cd ..": "На одну папку вище в дереві каталогів.",
  "cd ~": "Перехід у домашню папку (/Users/username).",
  "open .": "Відкриває поточну папку у Finder (тільки macOS).",
  "mkdir projects": "Створює нову папку projects.",
  "touch readme.md": "Створює порожній файл або оновлює час модифікації.",
  "cp file.txt backup.txt": "Копіює файл.",
  "mv old.txt new.txt": "Перейменовує або переміщує файл/папку.",
  "rm file.txt": "Видаляє файл. Без кошика — незворотно!",
  "rm -r folder": "Рекурсивно видаляє папку з вмістом.",
  "rm -rf folder": "⚠ ВИСОКИЙ РИЗИК: примусове видалення без підтвердження.",
  "rmdir empty": "Видаляє лише порожню папку.",
  "cat readme.md": "Виводить вміст файлу на екран.",
  "less readme.md": "Перегляд файлу з прокруткою (q — вихід).",
  "head -5 readme.md": "Перші 5 рядків файлу.",
  "tail -5 readme.md": "Останні 5 рядків файлу.",
  "tail -f log.txt": "Стежить за новими рядками логу в реальному часі.",
  "find . -name \"*.md\"": "Шукає файли за іменем від поточної папки.",
  "grep TODO readme.md": "Шукає текст у файлі.",
  "grep -R \"TODO\" .": "Рекурсивний пошук тексту в усіх файлах.",
  "wc -l file.txt": "Підраховує рядки, слова, байти.",
  "sort file.txt": "Сортує рядки файлу.",
  "uniq file.txt": "Прибирає сусідні дублікати рядків.",
  "cut -d: -f1 /etc/passwd": "Вирізає поля з рядків за роздільником.",
  "tr 'a-z' 'A-Z'": "Замінює символи (тут — у верхній регістр).",
  "xargs": "Будує команди зі stdin — часто з find або grep.",
  "mdfind \"readme\"": "Spotlight-пошук файлів за іменем/вмістом.",
  "pbcopy": "Копіює stdin у буфер обміну macOS.",
  "pbpaste": "Вставляє вміст буфера обміну в термінал/файл.",
  "ping -c 3 8.8.8.8": "Перевіряє доступність хоста (3 пакети).",
  "traceroute google.com": "Маршрут пакетів до хоста.",
  "route get default": "Default gateway (маршрутизатор) на Mac.",
  "ifconfig en0": "Мережеві інтерфейси та IP-адреси.",
  "ipconfig getifaddr en0": "Лише IP Wi-Fi (en0) — швидко.",
  "networksetup -listallhardwareports": "Список мережевих портів Mac.",
  "networksetup -getinfo Wi-Fi": "Налаштування Wi-Fi: IP, router, DNS.",
  "dig google.com": "DNS-запит через dig.",
  "nslookup google.com": "DNS-запит (альтернатива dig).",
  "curl -I https://google.com": "HTTP-заголовки відповіді (перевірка сайту).",
  "netstat -an | grep LISTEN": "Відкриті порти, що слухають з'єднання.",
  "lsof -i :22": "Хто використовує порт 22 (SSH).",
  "ssh Stas@10.0.0.254": "SSH до MikroTik роутера за IP.",
  "scp backup.rsc Stas@10.0.0.254:": "Копіює файл на віддалений сервер через SSH.",
  "ssh-keygen -t ed25519": "Генерує SSH-ключ для безпарольного входу.",
  "ssh-copy-id Stas@10.0.0.254": "Копіює публічний ключ на сервер.",
  "git status": "Стан репозиторію: змінені, staged файли.",
  "git add .": "Додає всі зміни в staging area.",
  "git commit -m \"message\"": "Фіксує staged-зміни в коміт.",
  "git push": "Відправляє коміти на GitHub.",
  "git pull": "Завантажує зміни з віддаленого репозиторію.",
  "git log --oneline": "Компактна історія комітів.",
  "git branch": "Список локальних гілок.",
  "git switch feature": "Перемикається на гілку (сучасна альтернатива checkout).",
  "git diff": "Незакомічені зміни у файлах.",
  "git restore file.txt": "Скасовує незакомічені зміни у файлі.",
  "gh auth status": "Статус авторизації GitHub CLI.",
  "gh repo view": "Інформація про поточний GitHub-репозиторій.",
  "python3 --version": "Версія Python 3.",
  "pip3 list": "Встановлені Python-пакети.",
  "node --version": "Версія Node.js.",
  "npm run dev": "Запуск dev-скрипту з package.json.",
  "npx create-next-app": "Запуск пакету без глобальної установки.",
  "brew --version": "Версія Homebrew.",
  "brew list": "Встановлені пакети Homebrew.",
  "brew search wget": "Пошук пакету в Homebrew.",
  "brew install wget": "Встановлює утиліту через Homebrew.",
  "which claude": "Шлях до Claude CLI (чи встановлено).",
  "which codex": "Шлях до Codex CLI.",
  "which gemini": "Шлях до Gemini CLI.",
  "which grok": "Шлях до Grok CLI.",
  "claude": "Запуск Claude Code CLI в папці проєкту.",
  "codex": "Запуск OpenAI Codex CLI.",
  "gemini": "Запуск Google Gemini CLI.",
  "grok": "Запуск xAI Grok CLI.",
  "sudo": "⚠ Виконує команду з правами root — обережно!",
  "diskutil list": "Список дисків і розділів macOS.",
  "kill 1234": "Завершує процес за PID.",
  "curl -fsSL URL | bash": "⚠ Завантажує і одразу виконує скрипт з інтернету!"
};

const MODULES = {
  basics: {
    id: "basics", title: "1. Terminal basics",
    intro: "Де я, хто я, shell, PATH, довідка — фундамент перед усім іншим.",
    commands: [
      "echo $SHELL", "whoami", "hostname", "pwd", "clear", "history",
      "which git", "command -v python3", "echo $PATH",
      "echo $PATH | tr ':' '\\n'", "man ls", "apropos network"
    ]
  },
  files: {
    id: "files", title: "2. Файли та папки",
    intro: "Навігація, створення, копіювання, видалення — щоденна робота в Terminal.",
    commands: [
      "pwd", "ls", "ls -la", "cd", "cd ..", "cd ~", "open .",
      "mkdir projects", "touch readme.md", "cp file.txt backup.txt",
      "mv old.txt new.txt", "rm file.txt", "rm -r folder", "rm -rf folder",
      "rmdir empty", "cat readme.md", "less readme.md",
      "head -5 readme.md", "tail -5 readme.md", "tail -f log.txt"
    ]
  },
  search: {
    id: "search", title: "3. Пошук і текст",
    intro: "find, grep, Spotlight, буфер обміну — знаходимо потрібне швидко.",
    commands: [
      "find . -name \"*.md\"", "grep TODO readme.md", "grep -R \"TODO\" .",
      "wc -l file.txt", "sort file.txt", "uniq file.txt",
      "cut -d: -f1 /etc/passwd", "tr 'a-z' 'A-Z'", "xargs",
      "mdfind \"readme\"", "pbcopy", "pbpaste"
    ]
  },
  network: {
    id: "network", title: "4. Мережева діагностика",
    intro: "IP, gateway, DNS, ping — перевірка мережі перед SSH до MikroTik.",
    commands: [
      "ping -c 3 8.8.8.8", "traceroute google.com", "route get default",
      "ifconfig en0", "ipconfig getifaddr en0",
      "networksetup -listallhardwareports", "networksetup -getinfo Wi-Fi",
      "dig google.com", "nslookup google.com", "curl -I https://google.com",
      "netstat -an | grep LISTEN", "lsof -i :22"
    ]
  },
  ssh: {
    id: "ssh", title: "5. SSH та MikroTik",
    intro: "Підключення до роутера, копіювання backup, SSH-ключі.",
    commands: [
      "ping -c 3 10.0.0.254", "route get default", "networksetup -getinfo Wi-Fi",
      "ssh Stas@10.0.0.254", "scp backup.rsc Stas@10.0.0.254:",
      "ssh-keygen -t ed25519", "ssh-copy-id Stas@10.0.0.254"
    ]
  },
  git: {
    id: "git", title: "6. Git та GitHub",
    intro: "Статус, commit, push, pull, diff — робочий цикл з GitHub.",
    commands: [
      "git status", "git add .", "git commit -m \"message\"", "git push",
      "git pull", "git log --oneline", "git branch", "git switch feature",
      "git diff", "git restore file.txt", "gh auth status", "gh repo view"
    ]
  },
  dev: {
    id: "dev", title: "7. Python, Node, Homebrew",
    intro: "Версії, пакети, запуск проєктів, установка утиліт через brew.",
    commands: [
      "python3 --version", "pip3 list", "node --version", "npm run dev",
      "npx create-next-app", "brew --version", "brew list",
      "brew search wget", "brew install wget"
    ]
  },
  ai: {
    id: "ai", title: "8. AI CLI агенти",
    intro: "claude, codex, gemini, grok — спочатку git status, потім агент!",
    commands: [
      "which claude", "which codex", "which gemini", "which grok",
      "claude", "codex", "gemini", "grok"
    ]
  },
  danger: {
    id: "danger", title: "9. Небезпечні команди",
    intro: "Розуміння ризику: sudo, rm -rf, curl|bash, diskutil.",
    commands: [
      "sudo", "rm -rf folder", "diskutil list", "kill 1234",
      "curl -fsSL URL | bash"
    ]
  },
  practice: {
    id: "practice", title: "10. Щоденна практика",
    intro: "Команди з 14-денного плану — закріплення навичок.",
    commands: [
      "pwd", "ls -la", "cd ~/Projects", "mkdir practice-day1",
      "git status", "ping -c 3 8.8.8.8", "which brew", "man ls"
    ]
  }
};

const SIM = {
  user: "Stas",
  host: "MacBook-Pro",
  shell: "/bin/zsh",
  cwd: "~/Projects/demo",
  ip: "192.168.1.42",
  gateway: "192.168.1.1",
  mikrotik: "10.0.0.254",
  files: { "readme.md": "# Demo\nTODO: learn Terminal\n", "file.txt": "hello\n", "log.txt": "[INFO] started\n" },
  dirs: ["src", "docs"],
  git: { init: true, branch: "main", branches: ["main", "feature"], staged: [], commits: [
    { hash: "a1b2c3d", msg: "Initial commit" }
  ], dirty: ["readme.md"] },
  clipboard: "copied text",
  sshConnected: false
};

const state = {
  currentModule: "basics",
  history: [], histIdx: -1,
  triedByModule: Object.fromEntries(Object.keys(MODULES).map(k => [k, new Set()])),
  selectedScenario: null,
  testMode: { active: false, queue: [], index: 0, correct: 0, wrong: 0 }
};

const SCENARIOS = Object.values(MODULES).map((m, i) => ({
  id: i + 1, moduleId: m.id, title: m.title, desc: m.intro, commands: m.commands.length
}));
state.selectedScenario = SCENARIOS[0];

const livePanel = document.getElementById("livePanel");
const outputStatus = document.getElementById("outputStatus");
const cmdInput = document.getElementById("cmdInput");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const cmdChecklist = document.getElementById("cmdChecklist");
const moduleBadge = document.getElementById("moduleBadge");
const moduleNav = document.getElementById("moduleNav");
const termTitle = document.getElementById("termTitle");
const promptLabel = document.getElementById("promptLabel");
let viewChunks = [];

function esc(s) { return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
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
  const cls = type === "warn" ? "result-box warn" : type === "purple" ? "result-box purple" : type === "danger" ? "result-box danger" : "result-box";
  viewChunks.push(`<div class="${cls}"><div class="result-title">${esc(title)}</div>${body}${hint ? ukHint(hint) : ""}</div>`);
}
function flushView(status) {
  livePanel.innerHTML = viewChunks.join("");
  livePanel.scrollTop = livePanel.scrollHeight;
  if (status) outputStatus.textContent = status;
}

function updatePrompt() {
  const short = SIM.cwd.replace(/^~/, "").split("/").pop() || "~";
  const label = `${SIM.user}@${SIM.host} ${short} %`;
  promptLabel.textContent = label;
  termTitle.textContent = `${SIM.user}@${SIM.host} — zsh — ${SIM.cwd}`;
}

function normalizeCmd(raw) {
  const c = raw.trim();
  for (const mod of Object.values(MODULES)) {
    const ex = mod.commands.find(x => x === c || c.startsWith(x.split(" ")[0]));
    if (mod.commands.includes(c)) return c;
  }
  for (const mod of Object.values(MODULES)) {
    const hit = mod.commands.find(x => {
      if (x === c) return true;
      const base = x.split(" ")[0];
      return c.startsWith(base + " ") || c === base;
    });
    if (hit && mod.commands.includes(hit)) return hit;
  }
  return c;
}

function findListedCommand(cmd, commands) {
  if (commands.includes(cmd)) return cmd;
  return commands.find(x => {
    const b = x.split(" ")[0];
    return cmd === b || cmd.startsWith(b + " ");
  }) || null;
}

function isInCurrentModule(cmd) { return !!findListedCommand(cmd, getCurrentCommands()); }
function findModuleForCommand(cmd) {
  for (const mod of Object.values(MODULES)) {
    if (findListedCommand(cmd, mod.commands)) return mod.id;
  }
  return null;
}

function markTried(cmd) {
  const norm = findListedCommand(cmd, getCurrentCommands());
  if (norm) { getTried().add(norm); updateProgress(); updateModuleNav(); }
}

function updateProgress() {
  const cmds = getCurrentCommands();
  const n = getTried().size;
  moduleBadge.textContent = getModule().title;
  progressBar.style.width = cmds.length ? `${(n / cmds.length) * 100}%` : "0%";
  progressText.textContent = `${n} / ${cmds.length} команд`;
  cmdChecklist.querySelectorAll("li").forEach(li => {
    li.classList.toggle("done", getTried().has(li.dataset.cmd));
  });
  updatePrompt();
}

function updateModuleNav() {
  moduleNav.innerHTML = Object.values(MODULES).map(mod => {
    const t = state.triedByModule[mod.id];
    const pct = mod.commands.length ? Math.round((t.size / mod.commands.length) * 100) : 0;
    const act = mod.id === state.currentModule ? " active" : "";
    return `<button type="button" class="btn${act}" data-module="${mod.id}">${esc(mod.title)} · ${t.size}/${mod.commands.length} (${pct}%)</button>`;
  }).join("");
  moduleNav.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => switchModule(btn.dataset.module));
  });
}

function buildChecklist() {
  cmdChecklist.innerHTML = getCurrentCommands().map(c =>
    `<li data-cmd="${esc(c)}" title="Клік — виконати"><code>${esc(c)}</code></li>`
  ).join("");
  cmdChecklist.querySelectorAll("li").forEach(li => {
    li.addEventListener("click", () => { execute(li.dataset.cmd); cmdInput.value = ""; cmdInput.focus(); });
  });
  updateProgress();
  updateModuleNav();
}

function switchModule(id, showWelcome = true) {
  if (!MODULES[id]) return;
  state.currentModule = id;
  buildChecklist();
  if (!showWelcome) return;
  beginView(null);
  const m = getModule();
  printResult(`Розділ: ${m.title}`, `
    <span class="line-muted">${esc(m.intro)}</span><br>
    <span class="line-hl">Команд:</span> ${m.commands.length}
  `, "purple", "Список команд зліва оновився. Клікни або введи вручну.");
  flushView(`% · ${m.title}`);
}

function resetState() {
  SIM.files = { "readme.md": "# Demo\nTODO: learn Terminal\n", "file.txt": "hello\n", "log.txt": "[INFO] started\n" };
  SIM.dirs = ["src", "docs"];
  SIM.cwd = "~/Projects/demo";
  SIM.sshConnected = false;
  SIM.git.dirty = ["readme.md"];
  SIM.git.staged = [];
  updatePrompt();
}

function welcome() {
  beginView(null);
  print(`<span class="line-muted">Mac Terminal Trainer — емуляція zsh (без реального виконання)</span>`);
  printResult("Почни з розділу Terminal basics", `
    <span class="line-cmd">echo $SHELL</span> · <span class="line-cmd">pwd</span> · <span class="line-cmd">ls</span><br>
    <span class="line-muted">10 сценаріїв · GitHub · MikroTik · AI CLI</span>
  `, "ok", "Головна мета — не вивчити всі команди, а швидко знаходити потрібну, розуміти ризик і застосовувати в реальному сценарії.");
  flushView("% · Mac Terminal емулятор (zsh)");
}

function getHint(cmd, listed) {
  return UK_HINTS[listed] || UK_HINTS[cmd] || UK_HINTS[cmd.split(" ")[0]] || null;
}

function handleCommand(cmd) {
  const lower = cmd.toLowerCase().trim();
  const listed = findListedCommand(cmd, getCurrentCommands()) || cmd;
  const hint = getHint(cmd, listed);

  const owner = findModuleForCommand(cmd);
  if (!isInCurrentModule(cmd) && owner && owner !== state.currentModule) {
    print(`<span class="line-warn">⚠ «${esc(cmd)}» — зазвичай у «${esc(MODULES[owner].title)}»</span>`);
  }

  // Basics
  if (lower === "echo $shell") {
    printResult("echo $SHELL", `<span class="line-ok">${esc(SIM.shell)}</span>`, "ok", hint);
    return true;
  }
  if (lower === "whoami") {
    printResult("whoami", `<span class="line-ok">${esc(SIM.user)}</span>`, "ok", hint);
    return true;
  }
  if (lower === "hostname") {
    printResult("hostname", `<span class="line-ok">${esc(SIM.host)}</span>`, "ok", hint);
    return true;
  }
  if (lower === "pwd") {
    printResult("pwd", `<span class="line-ok">${esc(SIM.cwd)}</span>`, "ok", hint);
    return true;
  }
  if (lower === "clear") { welcome(); return true; }
  if (lower === "history") {
    const lines = state.history.length
      ? state.history.map((h, i) => `${i + 1}  ${esc(h)}`).join("<br>")
      : `<span class="line-muted">(порожньо)</span>`;
    printResult("history", lines, "ok", hint);
    return true;
  }
  if (lower.startsWith("which ")) {
    const tool = cmd.slice(6).trim();
    const paths = { git: "/usr/bin/git", python3: "/usr/bin/python3", claude: "/opt/homebrew/bin/claude",
      codex: "/opt/homebrew/bin/codex", gemini: "/opt/homebrew/bin/gemini", grok: "/opt/homebrew/bin/grok", brew: "/opt/homebrew/bin/brew" };
    printResult(cmd, paths[tool]
      ? `<span class="line-ok">${esc(paths[tool])}</span>`
      : `<span class="line-err">${esc(tool)} not found</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("command -v ")) {
    const tool = cmd.slice(11).trim();
    printResult(cmd, `<span class="line-ok">/usr/bin/${esc(tool)}</span>`, "ok", hint);
    return true;
  }
  if (lower === "echo $path") {
    printResult("echo $PATH", `<span class="line-ok">/usr/bin:/bin:/usr/sbin:/sbin:/opt/homebrew/bin</span>`, "ok", hint);
    return true;
  }
  if (lower.includes("echo $path") && lower.includes("tr")) {
    printResult(cmd, `<span class="line-ok">/usr/bin<br>/bin<br>/usr/sbin<br>/sbin<br>/opt/homebrew/bin</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("man ")) {
    printResult(cmd, `<span class="line-muted">MAN(1) ${esc(cmd.slice(4))} — manual page (emulated). Натисни q для виходу.</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("apropos ")) {
    printResult(cmd, `<span class="line-ok">networksetup (8) - configure network<br>ifconfig (8) - configure network interface</span>`, "ok", hint);
    return true;
  }

  // Files
  if (lower === "ls" || lower === "ls -la") {
    const detailed = lower.includes("-la");
    const names = [...SIM.dirs, ...Object.keys(SIM.files)];
    const out = detailed
      ? names.map(n => `drwxr-xr-x  1 ${SIM.user}  staff  64 Jun 30 12:00 ${esc(n)}`).join("<br>")
      : names.join("  ");
    printResult(lower, `<span class="line-ok">${out}</span>`, "ok", hint);
    return true;
  }
  if (lower === "cd" || lower.startsWith("cd ")) {
    const t = lower === "cd" ? "~" : cmd.slice(3).trim();
    if (t === "~" || t === "") SIM.cwd = `~/${SIM.user}`;
    else if (t === "..") SIM.cwd = "~/Projects";
    else if (t.startsWith("~/")) SIM.cwd = t;
    else SIM.cwd = `~/Projects/demo/${t}`;
    updatePrompt();
    printResult("cd", `<span class="line-ok">→ ${esc(SIM.cwd)}</span>`, "ok", hint || UK_HINTS.cd);
    return true;
  }
  if (lower === "open .") {
    printResult("open .", `<span class="line-ok">✓ Відкрито у Finder: ${esc(SIM.cwd)}</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("mkdir ")) {
    const d = cmd.slice(6).trim();
    if (d && !SIM.dirs.includes(d)) SIM.dirs.push(d);
    printResult(cmd, `<span class="line-ok">✓ Створено ${esc(d)}</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("touch ")) {
    const f = cmd.slice(6).trim();
    if (f) SIM.files[f] = SIM.files[f] || "";
    printResult(cmd, `<span class="line-ok">✓ ${esc(f)}</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("cp ")) {
    printResult(cmd, `<span class="line-ok">✓ Скопійовано</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("mv ")) {
    printResult(cmd, `<span class="line-ok">✓ Переміщено/перейменовано</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("rm -rf ")) {
    printResult(cmd, `<span class="line-warn">⚠ ЕМУЛЯЦІЯ: папку видалено БЕЗ підтвердження</span><br><span class="line-err">У реальному Mac це незворотно!</span>`, "danger", hint);
    return true;
  }
  if (lower.startsWith("rm -r ") || lower.startsWith("rm ")) {
    const f = cmd.split(" ").pop();
    delete SIM.files[f];
    printResult(cmd, `<span class="line-ok">✓ Видалено ${esc(f)}</span>`, lower.includes("-r") ? "warn" : "ok", hint);
    return true;
  }
  if (lower.startsWith("rmdir ")) {
    printResult(cmd, `<span class="line-ok">✓ Порожню папку видалено</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("cat ")) {
    const f = cmd.slice(4).trim();
    printResult(cmd, `<span class="line-ok">${esc(SIM.files[f] || "(empty)")}</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("less ") || lower.startsWith("head ") || lower.startsWith("tail ")) {
    const f = cmd.split(" ").pop();
    const content = SIM.files[f] || "[INFO] log line\n";
    printResult(cmd, `<span class="line-ok">${esc(content)}</span>`, "ok", hint);
    return true;
  }

  // Search
  if (lower.startsWith("find ")) {
    printResult(cmd, `<span class="line-ok">./readme.md<br>./docs/guide.md</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("grep ")) {
    printResult(cmd, `<span class="line-ok">readme.md:TODO: learn Terminal</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("wc ") || lower.startsWith("sort ") || lower.startsWith("uniq ") ||
      lower.startsWith("cut ") || lower.startsWith("tr ") || lower === "xargs" || lower.startsWith("mdfind ")) {
    printResult(cmd, `<span class="line-ok">✓ (emulated output)</span>`, "ok", hint);
    return true;
  }
  if (lower === "pbcopy") {
    SIM.clipboard = "hello from file";
    printResult("pbcopy", `<span class="line-ok">✓ Скопійовано в буфер обміну</span>`, "ok", hint);
    return true;
  }
  if (lower === "pbpaste") {
    printResult("pbpaste", `<span class="line-ok">${esc(SIM.clipboard)}</span>`, "ok", hint);
    return true;
  }

  // Network
  if (lower.startsWith("ping ")) {
    const host = lower.includes("10.0.0.254") ? SIM.mikrotik : "8.8.8.8";
    printResult(cmd, `
      <span class="line-ok">PING ${esc(host)}: 3 packets transmitted, 3 received, 0% packet loss</span><br>
      <span class="line-muted">round-trip min/avg/max = 2.1/3.4/5.2 ms</span>
    `, "ok", hint);
    return true;
  }
  if (lower.startsWith("traceroute ")) {
    printResult(cmd, `<span class="line-ok">1  ${esc(SIM.gateway)}  2.1 ms<br>2  10.0.0.1  5.3 ms<br>3  google.com  12.1 ms</span>`, "ok", hint);
    return true;
  }
  if (lower === "route get default") {
    printResult(cmd, `<span class="line-ok">gateway: ${esc(SIM.gateway)}<br>interface: en0</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("ifconfig")) {
    printResult(cmd, `<span class="line-ok">en0: inet ${esc(SIM.ip)} netmask 0xffffff00</span>`, "ok", hint);
    return true;
  }
  if (lower === "ipconfig getifaddr en0") {
    printResult(cmd, `<span class="line-ok">${esc(SIM.ip)}</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("networksetup ")) {
    const info = lower.includes("getinfo")
      ? `IP address: ${SIM.ip}<br>Router: ${SIM.gateway}<br>DNS: 8.8.8.8`
      : `Hardware Port: Wi-Fi<br>Device: en0<br>Hardware Port: Ethernet`;
    printResult(cmd, `<span class="line-ok">${info}</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("dig ") || lower.startsWith("nslookup ")) {
    printResult(cmd, `<span class="line-ok">google.com → 142.250.185.78</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("curl ")) {
    if (lower.includes("| bash")) {
      printResult(cmd, `<span class="line-err">⚠ НЕБЕЗПЕЧНО: скрипт з інтернету виконано без перегляду!</span>`, "danger", hint);
      return true;
    }
    printResult(cmd, `<span class="line-ok">HTTP/2 200<br>content-type: text/html</span>`, "ok", hint);
    return true;
  }
  if (lower.includes("netstat") || lower.startsWith("lsof ")) {
    printResult(cmd, `<span class="line-ok">tcp4  0  0  *.22  *.*  LISTEN</span>`, "ok", hint);
    return true;
  }

  // SSH
  if (lower.startsWith("ssh-keygen")) {
    printResult(cmd, `<span class="line-ok">✓ Generated ED25519 key ~/.ssh/id_ed25519</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("ssh-copy-id")) {
    printResult(cmd, `<span class="line-ok">✓ Key copied to ${esc(SIM.mikrotik)}</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("ssh ")) {
    SIM.sshConnected = true;
    printResult(cmd, `
      <span class="line-ok">Connecting to ${esc(SIM.mikrotik)}…</span><br>
      <span class="line-hl">Stas@MikroTik&gt;</span> <span class="line-muted">RouterOS 7.x (emulated)</span>
    `, "ok", hint);
    return true;
  }
  if (lower.startsWith("scp ")) {
    printResult(cmd, `<span class="line-ok">backup.rsc  100%  12KB  1.2MB/s</span>`, "ok", hint);
    return true;
  }

  // Git
  if (lower === "git status") {
    printResult(cmd, `
      <span class="line-hl">On branch ${esc(SIM.git.branch)}</span><br>
      ${SIM.git.dirty.length ? `<span class="line-warn">Modified: ${SIM.git.dirty.join(", ")}</span>` : `<span class="line-muted">nothing to commit</span>`}
    `, "ok", hint);
    return true;
  }
  if (lower === "git add .") {
    SIM.git.staged = [...SIM.git.dirty];
    printResult(cmd, `<span class="line-ok">✓ Staged all changes</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("git commit")) {
    SIM.git.commits.push({ hash: Math.random().toString(16).slice(2,9), msg: "message" });
    SIM.git.dirty = []; SIM.git.staged = [];
    printResult(cmd, `<span class="line-ok">[${esc(SIM.git.branch)}] commit created</span>`, "ok", hint);
    return true;
  }
  if (lower === "git push") {
    printResult(cmd, `<span class="line-ok">To github.com:StsZu/demo.git<br>   main -> main</span>`, "ok", hint);
    return true;
  }
  if (lower === "git pull") {
    printResult(cmd, `<span class="line-ok">Already up to date.</span>`, "ok", hint);
    return true;
  }
  if (lower === "git log --oneline") {
    const lines = SIM.git.commits.map(c => `<span class="line-ok">${esc(c.hash.slice(0,7))}</span> ${esc(c.msg)}`).join("<br>");
    printResult(cmd, lines, "ok", hint);
    return true;
  }
  if (lower === "git branch") {
    printResult(cmd, SIM.git.branches.map(b => b === SIM.git.branch ? `<span class="line-ok">* ${b}</span>` : `  ${b}`).join("<br>"), "ok", hint);
    return true;
  }
  if (lower.startsWith("git switch") || lower.startsWith("git checkout")) {
    SIM.git.branch = "feature";
    printResult(cmd, `<span class="line-ok">Switched to branch 'feature'</span>`, "ok", hint);
    return true;
  }
  if (lower === "git diff" || lower.startsWith("git restore")) {
    printResult(cmd, `<span class="line-ok">diff --git a/readme.md (emulated)</span>`, "ok", hint);
    return true;
  }
  if (lower === "gh auth status") {
    printResult(cmd, `<span class="line-ok">✓ Logged in to github.com as StsZu</span>`, "ok", hint);
    return true;
  }
  if (lower === "gh repo view") {
    printResult(cmd, `<span class="line-ok">StsZu/mac-terminal-course<br>description: Mac Terminal CLI tutorial</span>`, "ok", hint);
    return true;
  }

  // Dev
  if (lower === "python3 --version") {
    printResult(cmd, `<span class="line-ok">Python 3.12.4</span>`, "ok", hint);
    return true;
  }
  if (lower === "pip3 list") {
    printResult(cmd, `<span class="line-ok">requests  2.31.0<br>uv  0.4.0</span>`, "ok", hint);
    return true;
  }
  if (lower === "node --version") {
    printResult(cmd, `<span class="line-ok">v22.3.0</span>`, "ok", hint);
    return true;
  }
  if (lower === "npm run dev") {
    printResult(cmd, `<span class="line-ok">▶ dev server http://localhost:3000</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("npx ")) {
    printResult(cmd, `<span class="line-ok">✓ npx package executed (emulated)</span>`, "ok", hint);
    return true;
  }
  if (lower.startsWith("brew ")) {
    const sub = lower.split(" ")[1];
    const out = sub === "--version" ? "Homebrew 4.3.0"
      : sub === "list" ? "git\nnode\npython@3.12\nwget"
      : sub === "search" ? "wget (wget)"
      : sub === "install" ? "✓ wget installed"
      : "✓ (emulated)";
    printResult(cmd, `<span class="line-ok">${out}</span>`, "ok", hint);
    return true;
  }

  // AI CLI
  if (["claude","codex","gemini","grok"].includes(lower)) {
    printResult(cmd, `
      <span class="line-hl">${esc(cmd)} CLI</span> <span class="line-muted">— interactive agent (emulated)</span><br>
      <span class="line-warn">Перед запуском: git status + commit або backup!</span>
    `, "purple", hint);
    return true;
  }

  // Danger
  if (lower === "sudo" || lower.startsWith("sudo ")) {
    printResult(cmd, `<span class="line-err">⚠ Потрібен пароль root. Переконайся, що знаєш що робиш!</span>`, "danger", hint);
    return true;
  }
  if (lower.startsWith("diskutil ")) {
    printResult(cmd, `<span class="line-warn">/dev/disk0 (internal)<br>/dev/disk3 (synthesized) — НЕ форматуй без backup!</span>`, "danger", hint);
    return true;
  }
  if (lower.startsWith("kill ")) {
    printResult(cmd, `<span class="line-warn">⚠ Процес 1234 завершено (emulated)</span>`, "warn", hint);
    return true;
  }

  if (owner) {
    printResult("Команда з іншого розділу", `
      <span class="line-muted">«${esc(cmd)}» — у «${esc(MODULES[owner].title)}»</span>
    `, "warn");
  } else {
    printResult("Невідома команда", `
      <span class="line-muted">«${esc(cmd)}» — не в емуляторі. Спробуй команду зліва або man/apropos.</span>
    `, "warn");
  }
  return false;
}

function execute(raw) {
  const cmd = raw.trim();
  if (!cmd) return;
  if (state.testMode.active) { handleTestAnswer(cmd); return; }
  state.history.push(cmd);
  state.histIdx = state.history.length;
  beginView(cmd);
  const ok = handleCommand(cmd);
  flushView(`% · ${getModule().title} · ${cmd}`);
  if (ok !== false) markTried(cmd);
}

// Test mode
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildTestQueue() {
  const seen = new Set(), items = [];
  for (const mod of Object.values(MODULES)) {
    for (const c of mod.commands) {
      if (!seen.has(c) && UK_HINTS[c]) { seen.add(c); items.push({ cmd: c, hint: UK_HINTS[c] }); }
    }
  }
  return shuffleArray(items);
}

function updateTestButton() {
  const btn = document.getElementById("btnTest");
  btn.textContent = state.testMode.active ? "Зупинити тест" : "Режим тестування";
  btn.classList.toggle("active", state.testMode.active);
}

function showTestQuestion() {
  const tm = state.testMode;
  const q = tm.queue[tm.index];
  if (!q) { finishTestMode(); return; }
  beginView(null);
  printResult(`Тест ${tm.index + 1}/${tm.queue.length}`, `
    <div class="test-question">Яка команда: <em>${esc(q.hint)}</em>?</div>
    <span class="line-muted">Введи команду і Enter. Правильно: ${tm.correct}, помилок: ${tm.wrong}</span>
  `, "purple");
  flushView(`Тест · ${tm.index + 1}/${tm.queue.length}`);
}

function startTestMode() {
  state.testMode = { active: true, queue: buildTestQueue(), index: 0, correct: 0, wrong: 0 };
  updateTestButton();
  showTestQuestion();
}

function stopTestMode() {
  state.testMode.active = false;
  updateTestButton();
  welcome();
}

function finishTestMode() {
  const tm = state.testMode;
  beginView(null);
  printResult("Тест завершено", `
    <span class="line-ok">Правильно: ${tm.correct}</span><br>
    <span class="line-warn">Помилок: ${tm.wrong}</span>
  `, "ok");
  flushView("Тест завершено");
  state.testMode.active = false;
  updateTestButton();
}

function handleTestAnswer(cmd) {
  const tm = state.testMode;
  const q = tm.queue[tm.index];
  const norm = findListedCommand(cmd, [q.cmd]) || cmd;
  beginView(cmd);
  if (norm === q.cmd || cmd.trim() === q.cmd) {
    tm.correct++;
    printResult("✓ Правильно!", `<span class="line-ok">${esc(q.cmd)}</span>`, "ok", q.hint);
  } else {
    tm.wrong++;
    printResult("✗ Ні", `<span class="line-err">Очікувалось: ${esc(q.cmd)}</span>`, "warn", q.hint);
  }
  flushView(`Тест · ${tm.correct}✓ ${tm.wrong}✗`);
  tm.index++;
  setTimeout(() => { if (state.testMode.active) showTestQuestion(); }, 1200);
}

// Scenario modal
function openScenarioModal() {
  const list = document.getElementById("scenarioList");
  list.innerHTML = SCENARIOS.map(s => `
    <div class="scenario-item${s.moduleId === state.selectedScenario.moduleId ? " selected" : ""}" data-id="${s.id}">
      <strong>${esc(s.title)}</strong>
      <small>${esc(s.desc)} · ${s.commands} команд</small>
    </div>
  `).join("");
  list.querySelectorAll(".scenario-item").forEach(el => {
    el.addEventListener("click", () => {
      list.querySelectorAll(".scenario-item").forEach(x => x.classList.remove("selected"));
      el.classList.add("selected");
      state.selectedScenario = SCENARIOS.find(s => s.id === +el.dataset.id);
    });
  });
  document.getElementById("scenarioModal").classList.add("open");
}

function closeScenarioModal() {
  document.getElementById("scenarioModal").classList.remove("open");
}

// Init
document.getElementById("cmdForm").addEventListener("submit", e => {
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
  } else if (e.key === "Tab") {
    e.preventDefault();
    const cmds = getCurrentCommands();
    const val = cmdInput.value.trim();
    const match = cmds.find(c => c.startsWith(val) && c !== val);
    if (match) cmdInput.value = match;
  }
});

document.getElementById("btnTest").addEventListener("click", () => {
  state.testMode.active ? stopTestMode() : startTestMode();
});
document.getElementById("btnScenario").addEventListener("click", openScenarioModal);
document.getElementById("btnReset").addEventListener("click", () => { resetState(); welcome(); });
document.getElementById("scenarioConfirm").addEventListener("click", () => {
  if (state.selectedScenario) switchModule(state.selectedScenario.moduleId);
  closeScenarioModal();
});
document.getElementById("scenarioCancel").addEventListener("click", closeScenarioModal);
document.getElementById("scenarioModal").addEventListener("click", e => {
  if (e.target.id === "scenarioModal") closeScenarioModal();
});
document.addEventListener("keydown", e => {
  const modal = document.getElementById("scenarioModal");
  if (!modal.classList.contains("open")) return;
  if (e.key === "Escape") closeScenarioModal();
  if (e.key === "Enter") { switchModule(state.selectedScenario.moduleId); closeScenarioModal(); }
});

buildChecklist();
updatePrompt();
welcome();