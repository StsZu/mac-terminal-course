# Урок 10 — 14-денний план практики

## Про тему

Курс без практики не працює. Цей план — **20–30 хвилин на день**, максимум **5–7 команд**, **3 вправи**, **1 контрольне питання**.

Повторюйте вправи у своєму Terminal. Ведіть нотатки: що вийшло, що ні.

**Головна мета — не вивчити всі команди, а навчитися швидко знаходити потрібну команду, розуміти її ризик і застосовувати її в реальному сценарії.**

---

## День 1: `pwd`, `ls`, `cd`, `open .`

**Час:** 20–30 хв | **Команди:** `pwd`, `ls`, `ls -la`, `cd`, `open .`

**Вправи:**
1. Відкрийте Terminal. `pwd` → `ls` → `ls -la`. Порівняйте вивід.
2. `cd ~/Documents` (або `~/Projects`). `pwd`. `cd ~`. `pwd` знову.
3. `cd` у будь-яку папку. `open .` — перевірте Finder.

**Контрольне питання:** Чим `ls` відрізняється від `ls -la`?

---

## День 2: `mkdir`, `touch`, `cp`, `mv`

**Час:** 20–30 хв | **Команди:** `mkdir`, `touch`, `cp`, `mv`, `ls`

**Вправи:**
1. `mkdir ~/terminal-day2` → `cd ~/terminal-day2`
2. `touch file1.txt file2.txt`. `touch notes.md`
3. `cp file1.txt backup.txt`. `mv notes.md journal.md`. `ls -la`

**Контрольне питання:** Чим `cp` відрізняється від `mv`?

---

## День 3: `rm`, `cat`, `less`, `head`, `tail`

**Час:** 20–30 хв | **Команди:** `rm`, `cat`, `less`, `head`, `tail`, `echo`

**Вправи:**
1. `echo "Line 1" > test.txt` → `echo "Line 2" >> test.txt` (5 рядків)
2. `cat test.txt`, `head -3 test.txt`, `tail -2 test.txt`
3. `less test.txt` (вийти `q`). `rm backup.txt`

**Контрольне питання:** Коли краще `less`, а не `cat`?

---

## День 4: `echo $SHELL`, `whoami`, `which`, `man`, `history`

**Час:** 20–30 хв | **Команди:** `echo $SHELL`, `whoami`, `hostname`, `which`, `command -v`, `man`, `history`

**Вправи:**
1. `echo $SHELL`, `whoami`, `hostname`
2. `which git python3 brew node`
3. `man ls` (прочитайте 2 хв, вийдіть `q`). `history | tail -10`

**Контрольне питання:** Що показує `which git`, якщо git не встановлено?

---

## День 5: `echo $PATH`, `apropos`, `clear`

**Час:** 20–30 хв | **Команди:** `echo $PATH`, `tr`, `apropos`, `clear`, `pwd`

**Вправи:**
1. `echo $PATH | tr ':' '\n'` — скільки папок у PATH?
2. `apropos "copy"` — знайдіть 3 команди
3. `clear`. `pwd` — історія збереглась? (`history`)

**Контрольне питання:** Навіщо потрібна змінна `$PATH`?

---

## День 6: `find`, `grep`, `grep -R`

**Час:** 25–30 хв | **Команди:** `find`, `grep`, `grep -R`, `wc`

**Вправи:**
1. У папці проєкту: `find . -name "*.md" | wc -l`
2. `grep -R "TODO" . --exclude-dir=node_modules` (або в `~/terminal-day2`)
3. Створіть файл з словом `PRACTICE`. Знайдіть його через `grep`

**Контрольне питання:** Коли `find`, а коли `grep -R`?

---

## День 7: `sort`, `uniq`, `cut`, `pbcopy`, `pbpaste`

**Час:** 25–30 хв | **Команди:** `sort`, `uniq`, `cut`, `tr`, `pbcopy`, `pbpaste`

**Вправи:**
1. `echo -e "b\na\na\nc" > letters.txt`. `sort letters.txt | uniq`
2. `echo "name,age,city" > data.csv`. `cut -d',' -f1 data.csv`
3. `cat letters.txt | pbcopy`. `pbpaste > pasted.txt`. `cat pasted.txt`

**Контрольне питання:** Чому `uniq` потребує `sort` перед собою?

---

## День 8: `ping`, `route get default`, `ipconfig`, `curl`

**Час:** 25–30 хв | **Команди:** `ping`, `route get default`, `ipconfig getifaddr en0`, `curl`, `dig`

**Вправи:**
1. `ipconfig getifaddr en0` — ваш IP
2. `route get default` — gateway. `ping -c 4` до gateway
3. `curl -I https://github.com`. `dig github.com +short`

**Контрольне питання:** Як перевірити, чи сайт відповідає, без браузера?

---

## День 9: `ifconfig`, `networksetup`, `lsof`, `netstat`

**Час:** 25–30 хв | **Команди:** `ifconfig`, `networksetup`, `lsof -i`, `netstat`, `traceroute`

**Вправи:**
1. `networksetup -listallhardwareports`
2. `networksetup -getinfo Wi-Fi`
3. `lsof -i :22` або `netstat -an | grep LISTEN | head -10`

**Контрольне питання:** Як дізнатись, який процес зайняв порт?

---

## День 10: `ssh`, `scp`, pre-check MikroTik

**Час:** 25–30 хв | **Команди:** `ssh`, `scp`, `ping`, `route get default`, `ssh-keygen`

**Вправи:**
1. Pre-check: IP → gateway → ping роутера (або gateway)
2. `ssh-keygen -t ed25519 -f ~/.ssh/test_key -N ""` (тестовий ключ)
3. `cat ~/.ssh/test_key.pub` — подивіться формат ключа

**Контрольне питання:** Назвіть 5 пунктів перевірки перед SSH до MikroTik.

---

## День 11: `git status`, `add`, `commit`, `diff`

**Час:** 25–30 хв | **Команди:** `git status`, `git diff`, `git add`, `git commit`, `git log --oneline`

**Вправи:**
1. `cd` у git-проєкт. `git status`, `git log --oneline -5`
2. Змініть файл. `git diff`. `git add .`. `git diff --staged`
3. `git commit -m "Day 11 practice"` (локально)

**Контрольне питання:** Яку команду виконати першою перед будь-якою git-операцією?

---

## День 12: `git push`, `pull`, `branch`, `gh`

**Час:** 25–30 хв | **Команди:** `git push`, `git pull`, `git branch`, `git switch`, `gh auth status`

**Вправи:**
1. `git branch`. `git switch -c practice-day12` (у тестовому репо)
2. `gh auth status` (якщо є gh)
3. `git pull` у робочому проєкті

**Контрольне питання:** Що робити, якщо `git push` повертає `rejected`?

---

## День 13: `python3`, `node`, `npm`, `brew`

**Час:** 25–30 хв | **Команди:** `python3`, `pip3`, `node`, `npm`, `brew`, `brew list`

**Вправи:**
1. `python3 --version`, `node --version`, `brew --version`
2. `python3 -c "print('Hello Day 13')"`
3. `brew list | head -15`. `brew search jq`

**Контрольне питання:** Чим `brew update` відрізняється від `brew upgrade`?

---

## День 14: AI CLI + небезпечні команди + підсумок

**Час:** 30 хв | **Команди:** `which`, `command -v`, `git status`, `claude`/`codex`/`gemini`/`grok`, `rm -rf` (теорія)

**Вправи:**
1. `for c in claude codex gemini grok; do command -v $c; done`
2. Повний workflow: `cd project` → `git status` → (описати, що зробите перед агентом)
3. Напишіть **свій** чекліст з 5 небезпечних команд і як їх уникати

**Контрольне питання:** Чому не можна запускати AI CLI без `git status`?

---

## Після 14 днів

- Тримайте [cheatsheet.md](cheatsheet.md) відкритим
- Практикуйте в [тренажері](../terminal-trainer/)
- Повторюйте слабкі теми (мережа, git, SSH)
- Кожен новий проєкт починайте з `pwd` + `git status`

---

## Міні-чекліст курсу

- [ ] Пройшов усі 14 днів
- [ ] Можу без підказки: навігація, файли, пошук
- [ ] Можу діагностувати мережу перед SSH
- [ ] Можу базовий git-workflow
- [ ] Знаю ризики `rm -rf` і `curl | bash`
- [ ] Знаю workflow для AI CLI з git