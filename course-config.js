window.CLI_COURSE_CONFIG = {
  id: "mac-terminal",
  title: "macOS Terminal (zsh)",
  subtitle: "Термінал Mac без страху: файли, пошук, мережа, SSH до MikroTik, Git, Homebrew, AI-агенти й небезпечні команди.",
  overline: "Курс для новачків · zsh · macOS",
  brandSub: "курс терміналу Mac",
  storageKey: "cli-mac-terminal-v1",
  caseInsensitive: false,
  prompt: "Stas@MacBook-Pro ~ %",
  termTitle: "zsh — навчальний термінал",
  sandbox: "trainer.html",
  quizBank: null,
  skills: [
    ["terminal", "Орієнтуватися в zsh: де я, хто я, звідки береться команда (`PATH`, `which`, `man`)."],
    ["folder", "Ходити папками, створювати, копіювати й видаляти файли — і розуміти, що `rm` не має кошика."],
    ["search", "Знаходити файли й текст: `find`, `grep`, конвеєри `|`, Spotlight і буфер обміну."],
    ["network", "Перевіряти мережу перед SSH: IP, шлюз, DNS, `ping`, `curl -I`, зайняті порти."],
    ["git", "Вести щоденний цикл Git і безпечно працювати з AI-агентами на окремій гілці."],
    ["shield", "Розпізнавати небезпечні команди (`sudo`, `rm -rf`, `curl | bash`, `dd`) і знати безпечні альтернативи."]
  ],
  audience: "<p>Для тих, хто працює на Mac і хоче впевнено користуватися Terminal: керувати файлами, діагностувати мережу, підключатися по SSH до роутера MikroTik, працювати з Git/GitHub, Python, Node, Homebrew та AI CLI-агентами (<code>claude</code>, <code>codex</code>, <code>gemini</code>, <code>grok</code>).</p><p>Досвід не потрібен. Головна мета — не вивчити всі команди напам'ять, а швидко знаходити потрібну, розуміти її ризик і застосовувати в реальному сценарії.</p>",
  safety: "<p>Кроки «Спробуй сам» і пісочниця — імітація: вони нічого не змінюють на твоєму Mac. Коли повторюєш команди у справжньому Terminal, починай з тих, що лише читають (ризик «низький»), і перед будь-яким видаленням перевір <code>pwd</code> та <code>ls</code>.</p>",
  sources: [
    { href: "https://support.apple.com/guide/terminal/welcome/mac", label: "Apple — Terminal User Guide" },
    { href: "https://zsh.sourceforge.io/Doc/", label: "Zsh Documentation" },
    { href: "https://docs.brew.sh/", label: "Homebrew Documentation" },
    { href: "https://git-scm.com/docs", label: "Git Reference" },
    { href: "https://help.mikrotik.com/docs/spaces/ROS/pages/132350014/SSH", label: "MikroTik RouterOS — SSH (імпорт ключів)" },
    { href: "https://docs.astral.sh/uv/", label: "uv — документація" }
  ]
};
