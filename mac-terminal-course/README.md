> **Архів (до 2026-09).** Цей Markdown — стара версія уроків і може містити застарілі або хибні твердження. Актуальний курс — `index.html` (уроки, quiz, шпаргалка).

# Mac Terminal — практичний курс

Курс для роботи в macOS Terminal (`zsh`): файли, мережа, SSH/MikroTik, Git/GitHub, Python/Node/Homebrew, AI CLI та безпечна діагностика.

**Головна мета — не вивчити всі команди, а навчитися швидко знаходити потрібну команду, розуміти її ризик і застосовувати її в реальному сценарії.**

## Для кого

- Працюєте на Mac з `zsh`
- Використовуєте Git, GitHub, Python, Node.js, Homebrew
- Підключаєтесь до MikroTik через SSH
- Запускаєте AI CLI: `claude`, `codex`, `gemini`, `grok`

## Як проходити курс

1. Відкрийте Terminal (`Cmd + Space` → «Terminal»).
2. Читайте уроки по порядку.
3. Виконуйте кожну команду вручну — не копіюйте сліпо.
4. Закінчіть [14-денним планом](10-daily-practice-plan.md).
5. Практикуйте в [інтерактивному тренажері](../index.html).
6. Тримайте [шпаргалку](cheatsheet.md) під рукою.

```bash
cd mac-terminal-course
open README.md
```

## Уроки

| # | Файл | Тема |
|---|------|------|
| 1 | [01-terminal-basics.md](01-terminal-basics.md) | Terminal, shell, zsh, PATH, довідка |
| 2 | [02-files-and-folders.md](02-files-and-folders.md) | Файли та папки |
| 3 | [03-search-and-text.md](03-search-and-text.md) | Пошук і робота з текстом |
| 4 | [04-network-diagnostics.md](04-network-diagnostics.md) | Мережева діагностика |
| 5 | [05-ssh-and-mikrotik.md](05-ssh-and-mikrotik.md) | SSH та MikroTik |
| 6 | [06-git-and-github.md](06-git-and-github.md) | Git та GitHub |
| 7 | [07-python-node-homebrew.md](07-python-node-homebrew.md) | Python, Node, Homebrew |
| 8 | [08-ai-cli-agents.md](08-ai-cli-agents.md) | AI CLI агенти |
| 9 | [09-dangerous-commands.md](09-dangerous-commands.md) | Небезпечні команди |
| 10 | [10-daily-practice-plan.md](10-daily-practice-plan.md) | 14-денний план практики |

## Тренажер

Інтерактивна практика команд: **[Mac Terminal Trainer](../index.html)**

Тренажер доповнює уроки: ви вводите команди, отримуєте зворотний зв'язок і закріплюєте сценарії з реального робочого процесу.

## Шпаргалка

[cheatsheet.md](cheatsheet.md) — короткий список команд без пояснень.

## Принцип курсу

Не вивчаємо сотні системних команд macOS. Фокус на **30–50 ключових команд** для реальних задач:

1. Зрозуміти, де ви в системі
2. Переміщуватись між папками
3. Створювати, копіювати, видаляти файли
4. Шукати файли і текст
5. Перевіряти мережу
6. Підключатись до MikroTik
7. Працювати з GitHub-проєктом
8. Запускати Python/Node
9. Використовувати AI CLI
10. Діагностувати помилки
11. Розуміти небезпечні команди