window.CLI_COURSE = window.CLI_COURSE || { modules: [], exam: null, cheatsheet: null };
window.CLI_COURSE.modules.push({
  id: "m10", order: 10, title: "Щоденна практика", subtitle: "Перенаправлення, конвеєри і план на 14 днів", icon: "flag",
  goal: "Після модуля ти поєднуєш команди перенаправленням і конвеєрами та маєш план щоденної практики на 14 днів, щоб навички закріпилися.",
  lessons: [
    {
      id: "m10-l01", title: "Перенаправлення, конвеєри і план на 14 днів", minutes: 12,
      steps: [
        { type: "story", title: "Курс без практики не працює",
          body: "<p>Команди запам'ятовуються руками, а не очима. Тому фінал курсу — план на 14 днів: <strong>20–30 хвилин на день</strong>, максимум <strong>5–7 команд</strong>, <strong>3 вправи</strong> і <strong>1 контрольне питання</strong>.</p><p>Спершу — останній шматок синтаксису, без якого вправи не обійдуться: запис у файл через <code>></code> і <code>>></code>.</p>" },
        { type: "concept", title: "Знаки >, >> і |",
          body: "<p><code>></code> записує вивід команди у файл, <strong>стираючи</strong> старий вміст. <code>>></code> <strong>дописує</strong> в кінець. <code>|</code> передає вивід не у файл, а наступній команді.</p>",
          analogy: "`>` — написати на чистому аркуші, спершу викинувши старий. `>>` — дописати рядок унизу вже списаного аркуша. `|` — передати аркуш сусідові по конвеєру, щоб він продовжив роботу." },
        { type: "cli", title: "Записати, дописати, прочитати",
          commands: [
            { cmd: "echo \"Line 1\" > test.txt", explain: "Створити або перезаписати файл одним рядком.", risk: "medium" },
            { cmd: "echo \"Line 2\" >> test.txt", explain: "Дописати рядок у кінець.", risk: "medium" },
            { cmd: "cat test.txt", explain: "Перевірити результат.", output: "Line 1\nLine 2", risk: "low" },
            { cmd: "history | tail -5", explain: "П'ять останніх команд з історії.", risk: "low" },
            { cmd: "history | grep ssh", explain: "Знайти в історії всі команди зі словом ssh.", risk: "low" }
          ] },
        { type: "terminal", title: "Спробуй: допиши, не стираючи",
          prompt: "Stas@MacBook-Pro practice-day1 %",
          task: "У `test.txt` уже є рядок `Line 1`. Допиши в кінець рядок `Line 2`, не стираючи вміст.",
          expected: ["echo \"Line 2\" >> test.txt", "echo 'Line 2' >> test.txt"],
          output: "",
          hint: "`echo` з текстом у лапках і подвійна стрілка перед назвою файлу.",
          explain: "Тепер у файлі два рядки. Одинарна `>` залишила б лише `Line 2`." },
        { type: "check", title: "Одна стрілка",
          question: "У `notes.txt` важливі записи. Ти вводиш `echo \"todo\" > notes.txt`. Що станеться?",
          options: ["Рядок `todo` додасться в кінець", "Файл міститиме лише `todo` — старий вміст стерто", "Помилка: файл уже існує"],
          correct: 1, feedback: "`>` створює файл заново без питань. Для дописування — `>>`." },
        { type: "story", title: "План на 14 днів",
          body: "<table><thead><tr><th>Дні</th><th>Тема</th><th>Команди</th></tr></thead><tbody><tr><td>1–3</td><td>Навігація і файли</td><td><code>pwd</code>, <code>ls -la</code>, <code>cd</code>, <code>mkdir</code>, <code>cp</code>, <code>mv</code>, <code>cat</code>, <code>less</code></td></tr><tr><td>4–5</td><td>Shell і PATH</td><td><code>echo $SHELL</code>, <code>which</code>, <code>man</code>, <code>history</code></td></tr><tr><td>6–7</td><td>Пошук і конвеєри</td><td><code>find</code>, <code>grep -R</code>, <code>sort | uniq</code>, <code>pbcopy</code></td></tr><tr><td>8–10</td><td>Мережа і SSH</td><td><code>ping -c</code>, <code>route get default</code>, <code>dig</code>, <code>ssh</code>, <code>scp</code></td></tr><tr><td>11–12</td><td>Git</td><td><code>status</code>, <code>diff</code>, <code>add</code>, <code>commit</code>, <code>switch</code></td></tr><tr><td>13–14</td><td>Інструменти, агенти, ризики</td><td><code>brew</code>, <code>python3 -m venv</code>, AI CLI, небезпечні команди</td></tr></tbody></table>" },
        { type: "terminal", title: "Спробуй: конвеєр з двох команд",
          prompt: "Stas@MacBook-Pro demo %",
          task: "Одним конвеєром порахуй, скільки файлів `.md` є в поточній папці та підпапках.",
          expected: ["find . -name \"*.md\" | wc -l", "find . -name '*.md' | wc -l"],
          output: "       2",
          hint: "`find` зі списком `.md`-файлів, а його вивід — у `wc` з прапорцем рядків.",
          explain: "`find` друкує по файлу на рядок, `wc -l` рахує рядки. Так з двох простих команд виходить нова." },
        { type: "check", title: "Забута команда",
          question: "Ти не пам'ятаєш, як точно вводив учора команду з `scp`. Що допоможе найшвидше?",
          options: ["`man yesterday`", "`clear`", "`history | grep scp`"],
          correct: 2, feedback: "Історія пам'ятає введені команди; `grep` відфільтрує потрібні. Ще швидше — Ctrl+R і почати вводити `scp`." },
        { type: "callout", variant: "tip", title: "Ритуал на кожен день",
          body: "<p>Почни з <code>pwd</code> і <code>git status</code> — де я і в якому стані проєкт. Нову чи ризикову команду спершу прожени в пісочниці курсу. Шпаргалку тримай відкритою, а нотатки веди у файлі через <code>>></code>.</p>" },
        { type: "summary", title: "Підсумок",
          points: ["`>` перезаписує файл, `>>` дописує в кінець, `|` передає вивід наступній команді.", "`history | tail -5` і `history | grep слово` — швидкий доступ до минулих команд.", "План: 14 днів по 20–30 хвилин, 5–7 команд, 3 вправи, 1 контрольне питання.", "Щодня: `pwd` + `git status`; нове — через пісочницю і шпаргалку."] }
      ],
      glossary: [
        { term: "Перенаправлення (>)", def: "Запис виводу команди у файл із заміною вмісту." },
        { term: "Дописування (>>)", def: "Додавання виводу команди в кінець файлу." },
        { term: "Ctrl+R", def: "Інтерактивний пошук в історії команд zsh." },
        { term: "Інтервальне повторення", def: "Повернення до матеріалу через дні, щоб він закріпився в пам'яті." }
      ],
      quiz: [
        { question: "Чим відрізняються `>` і `>>`?", options: ["`>` перезаписує файл, `>>` дописує в кінець", "Нічим", "`>>` видаляє файл"], correct: 0, feedback: "Одна стрілка — з чистого аркуша, дві — продовження." },
        { question: "Які дві команди варто виконати на початку роботи з проєктом?", options: ["`sudo` і `rm -rf`", "`pwd` і `git status` — де я і в якому стані проєкт", "`clear` і `exit`"], correct: 1, feedback: "Дві безпечні команди, що рятують від роботи «не в тій папці» і «не на тій гілці»." },
        { question: "Що показує `history | tail -5`?", options: ["5 найстаріших команд", "5 файлів папки", "5 останніх команд"], correct: 2, feedback: "`tail` бере кінець списку, а в кінці історії — найсвіжіші команди." },
        { question: "Навіщо в плані обмеження «5–7 команд на день»?", options: ["Щоб кожну команду виконати руками і зрозуміти, а не пробігти список", "Бо Terminal більше не приймає", "Щоб економити батарею"], correct: 0, feedback: "Мета курсу — розуміти й застосовувати, а не зазубрити якомога більше." },
        { question: "Як безпечно потренувати `rm -r`?", options: ["На папці `~/Documents`", "На тестовій папці, створеній для вправи, після `pwd` і `ls`", "На `/`"], correct: 1, feedback: "Тренуйся на тому, що створив сам хвилину тому, і перевір, що ти в правильній папці." },
        { question: "Що робити з командою, в якій не впевнений?", options: ["Запустити й подивитися", "Додати `sudo`", "Перевірити в `man` чи шпаргалці, оцінити ризик і спробувати в пісочниці"], correct: 2, feedback: "Спершу розуміння — потім команда. Це головне правило курсу." }
      ]
    }
  ]
});
