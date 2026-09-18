window.CLI_COURSE = window.CLI_COURSE || { modules: [], exam: null, cheatsheet: null };
window.CLI_COURSE.modules.push({
  id: "m04", order: 4, title: "Мережева діагностика", subtitle: "IP, шлюз, ping, DNS, HTTP і порти", icon: "network",
  goal: "Після модуля ти за хвилину з'ясовуєш, де зламалась мережа: у Mac, у роутері, в DNS чи на сервері — і який процес зайняв порт.",
  lessons: [
    {
      id: "m04-l01", title: "Мій IP, шлюз і ping", minutes: 11,
      steps: [
        { type: "story", title: "«Інтернет не працює»",
          body: "<p>Замість перезавантажувати все підряд, інженер іде по ланцюжку від себе назовні: чи має Mac IP-адресу → чи знає він роутер → чи відповідає роутер → чи є зв'язок з інтернетом → чи працює DNS.</p><p>Перша ланка, що не відповідає, і є місцем поломки.</p>" },
        { type: "concept", title: "IP, шлюз і DNS",
          body: "<p><strong>IP-адреса</strong> — адреса Mac у домашній мережі, наприклад <code>10.0.0.42</code>. <strong>Шлюз</strong> (gateway) — роутер <code>10.0.0.254</code>, через який іде весь трафік назовні. <strong>DNS</strong> перетворює імена на кшталт <code>github.com</code> на IP.</p><p>На MacBook Wi-Fi зазвичай має ім'я інтерфейсу <code>en0</code>.</p>",
          analogy: "IP — номер твоєї квартири в під'їзді. Шлюз — консьєрж, через якого йде вся пошта назовні. DNS — довідник, що за назвою фірми дає її адресу. Немає номера квартири — пошта не дійде; консьєрж спить — не вийде жоден лист." },
        { type: "cli", title: "Адреса, шлюз, інтерфейси",
          commands: [
            { cmd: "ipconfig getifaddr en0", explain: "Лише IP інтерфейсу <code>en0</code>. Порожньо — на ньому немає адреси.", output: "10.0.0.42", risk: "low" },
            { cmd: "ifconfig en0", explain: "Детально: MAC-адреса, IP, маска, статус.", output: "en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500\n\tinet 10.0.0.42 netmask 0xffffff00 broadcast 10.0.0.255\n\tstatus: active", risk: "low" },
            { cmd: "route get default", explain: "Шлюз за замовчуванням і через який інтерфейс до нього йти.", output: "    gateway: 10.0.0.254\n  interface: en0", risk: "low" },
            { cmd: "networksetup -listallhardwareports", explain: "Які порти є в Mac і як вони звуться в системі (Wi-Fi → en0).", risk: "low" },
            { cmd: "networksetup -getinfo Wi-Fi", explain: "IP, маска і роутер для служби Wi-Fi.", output: "DHCP Configuration\nIP address: 10.0.0.42\nSubnet mask: 255.255.255.0\nRouter: 10.0.0.254", risk: "low" }
          ] },
        { type: "terminal", title: "Спробуй: мій IP",
          task: "Дізнайся IP-адресу інтерфейсу Wi-Fi `en0` — лише саму адресу, без зайвого.",
          expected: ["ipconfig getifaddr en0"], output: "10.0.0.42",
          hint: "На Mac є команда `ipconfig` з підкомандою getifaddr (get interface address) та ім'ям інтерфейсу.",
          explain: "Адреса `10.0.0.42` з домашньої мережі `10.0.0.x` — отже, роутер видав Mac IP, перша ланка в порядку." },
        { type: "check", title: "Порожня відповідь",
          question: "`ipconfig getifaddr en0` нічого не вивів. Що найімовірніше?",
          options: ["На `en0` немає IP: Wi-Fi вимкнено або Mac підключено через інший інтерфейс", "DNS зламався", "Інтернет працює, просто IP приховано"],
          correct: 0, feedback: "Порожньо — адреси немає саме на `en0`. Перевір Wi-Fi і `networksetup -listallhardwareports`: можливо, ти на кабелі через інший інтерфейс." },
        { type: "cli", title: "Чи відповідає вузол",
          commands: [
            { cmd: "ping -c 3 10.0.0.254", explain: "Три запити до роутера. <code>-c</code> — кількість; без нього ping на Mac працює безкінечно.", output: "64 bytes from 10.0.0.254: icmp_seq=0 ttl=64 time=2.104 ms\n--- 10.0.0.254 ping statistics ---\n3 packets transmitted, 3 packets received, 0.0% packet loss", risk: "low" },
            { cmd: "ping -c 3 8.8.8.8", explain: "Те саме до публічного DNS Google — перевірка виходу в інтернет без участі DNS.", risk: "low" },
            { cmd: "traceroute google.com", explain: "Показує вузли на шляху. Рядок <code>* * *</code> — вузол не відповів.", risk: "low" }
          ] },
        { type: "terminal", title: "Спробуй: ping роутера",
          task: "Перевір, чи відповідає роутер `10.0.0.254`, рівно трьома пакетами.",
          expected: ["ping -c 3 10.0.0.254", "ping 10.0.0.254 -c 3", "ping -c3 10.0.0.254"],
          output: "PING 10.0.0.254 (10.0.0.254): 56 data bytes\n64 bytes from 10.0.0.254: icmp_seq=0 ttl=64 time=2.104 ms\n64 bytes from 10.0.0.254: icmp_seq=1 ttl=64 time=1.873 ms\n64 bytes from 10.0.0.254: icmp_seq=2 ttl=64 time=1.902 ms\n\n--- 10.0.0.254 ping statistics ---\n3 packets transmitted, 3 packets received, 0.0% packet loss",
          hint: "`ping`, прапорець кількості пакетів з числом, потім адреса.",
          explain: "`0.0% packet loss` — роутер живий і відповідає. Час близько 2 мс — нормально для домашньої мережі." },
        { type: "check", title: "Де обрив",
          question: "`ping -c 3 10.0.0.254` — 0% packet loss, а `ping -c 3 8.8.8.8` — 100% packet loss. Де проблема?",
          options: ["У Wi-Fi-адаптері Mac", "За роутером: немає зв'язку роутера з провайдером", "У DNS"],
          correct: 1, feedback: "До роутера все доходить, далі — ні. DNS тут ні до чого: `8.8.8.8` — це вже IP, ім'я не перекладалось." },
        { type: "callout", variant: "tip", title: "ping на Mac не зупиняється сам",
          body: "<p>На Windows <code>ping</code> робить 4 спроби, а на macOS — безкінечно. Або додавай <code>-c 3</code>, або зупиняй <span class=\"kbd\">Ctrl</span> + <span class=\"kbd\">C</span> — підсумок з packet loss з'явиться після зупинки.</p>" },
        { type: "summary", title: "Підсумок",
          points: ["Ланцюжок діагностики: IP → шлюз → ping роутера → ping інтернету → DNS.", "`ipconfig getifaddr en0` — IP, `route get default` — шлюз, `networksetup -getinfo Wi-Fi` — IP, маска, роутер.", "`ping -c 3 адреса` — чи відповідає вузол; `packet loss` показує втрати.", "`traceroute` показує, на якому вузлі губляться пакети.", "Усі ці команди лише читають — ризик низький."] }
      ],
      glossary: [
        { term: "IP-адреса", def: "Адреса пристрою в мережі, наприклад `10.0.0.42`." },
        { term: "Шлюз (gateway)", def: "Роутер, через який пристрій виходить за межі локальної мережі; тут — `10.0.0.254`." },
        { term: "en0", def: "Системне ім'я мережевого інтерфейсу; на MacBook зазвичай Wi-Fi." },
        { term: "Packet loss", def: "Частка ping-пакетів, на які не прийшла відповідь." },
        { term: "ICMP", def: "Службовий протокол, яким користується `ping`." }
      ],
      quiz: [
        { question: "Яка команда покаже шлюз за замовчуванням?", options: ["`route get default`", "`ipconfig getifaddr en0`", "`hostname`"], correct: 0, feedback: "`route get default` виводить `gateway:` — IP роутера." },
        { question: "Що станеться, якщо на Mac ввести `ping 8.8.8.8` без `-c`?", options: ["Надішле 4 пакети і зупиниться", "Пінгуватиме безкінечно, доки не натиснеш Ctrl+C", "Видасть помилку"], correct: 1, feedback: "Поведінка як у Windows (4 пакети) — не на Mac. Тут без `-c` ping не зупиняється сам." },
        { question: "Навіщо `traceroute`?", options: ["Змінює маршрут пакетів", "Вимірює швидкість завантаження", "Показує, через які вузли йдуть пакети і де вони губляться"], correct: 2, feedback: "`traceroute` лише спостерігає: кожен рядок — черговий вузол на шляху." },
        { question: "`ping github.com` пише `cannot resolve github.com: Unknown host`, а `ping 8.8.8.8` працює. Що зламано?", options: ["DNS — ім'я не перетворюється на IP", "Кабель", "Роутер вимкнено"], correct: 0, feedback: "Зв'язок за IP є, отже мережа працює. Не працює саме переклад імені в адресу." },
        { question: "`networksetup -getinfo Wi-Fi` показує `Router: 10.0.0.254`. Що це?", options: ["Твій IP", "IP шлюзу — роутера, через який Mac виходить в інтернет", "DNS-сервер провайдера"], correct: 1, feedback: "Router = шлюз. Твій IP — у рядку `IP address`." },
        { question: "Який ризик у `ping`, `ifconfig en0`, `route get default`?", options: ["Високий", "Середній", "Низький — лише показують стан мережі"], correct: 2, feedback: "Жодна з них не змінює налаштувань. Зміна мережі — це вже `networksetup -set…` і права адміністратора." }
      ]
    },
    {
      id: "m04-l02", title: "DNS, HTTP і порти", minutes: 11,
      steps: [
        { type: "concept", title: "Ім'я, сервер і двері",
          body: "<p>Коли мережа є, а сайт чи сервіс не відкривається, перевіряють три речі: чи DNS дає правильний IP (<code>dig</code>), чи відповідає вебсервер (<code>curl -I</code>), і чи слухає потрібний порт програма (<code>lsof</code>, <code>netstat</code>).</p>",
          analogy: "IP — адреса будинку, порт — номер дверей у ньому. За дверима 22 сидить SSH, за 443 — вебсервер, за 3000 — твій dev-сервер. `lsof -i :3000` відповідає на питання «хто зараз сидить за дверима 3000»." },
        { type: "cli", title: "DNS-запити",
          commands: [
            { cmd: "dig google.com", explain: "Детальна відповідь DNS: секція <code>ANSWER</code> і який сервер відповів.", risk: "low" },
            { cmd: "dig google.com +short", explain: "Лише IP-адреси — зручно для швидкої перевірки.", output: "142.250.186.78", risk: "low" },
            { cmd: "nslookup google.com", explain: "Простіший DNS-запит; показує сервер і адресу.", risk: "low" },
            { cmd: "networksetup -getdnsservers Wi-Fi", explain: "DNS, задані вручну для Wi-Fi. Відповідь <code>There aren't any DNS Servers set</code> означає, що DNS видає роутер.", risk: "low" }
          ] },
        { type: "terminal", title: "Спробуй: IP для github.com",
          task: "Дізнайся IP-адресу `github.com` через DNS так, щоб вивелась лише адреса.",
          expected: ["dig github.com +short", "dig +short github.com"],
          output: "140.82.121.4",
          hint: "`dig`, ім'я домену і опція, що скорочує вивід (починається з `+`).",
          explain: "DNS працює: ім'я перетворилось на IP. Далі можна перевіряти сам сервер." },
        { type: "check", title: "DNS є, сайту немає",
          question: "`dig` повертає IP сайту, а браузер сторінку не відкриває. Яка наступна перевірка?",
          options: ["`networksetup -listallhardwareports`", "`curl -I https://сайт` — чи відповідає вебсервер і з яким кодом", "`hostname`"],
          correct: 1, feedback: "DNS уже перевірено. Наступна ланка — сам сервер: `curl -I` покаже HTTP-код відповіді." },
        { type: "cli", title: "HTTP і порти",
          commands: [
            { cmd: "curl -I https://github.com", explain: "Лише заголовки відповіді (<code>-I</code>). Перший рядок — код: 200, 301, 404, 500…", output: "HTTP/2 200\nserver: github.com\ncontent-type: text/html; charset=utf-8", risk: "low" },
            { cmd: "netstat -an | grep LISTEN", explain: "Порти, на яких програми чекають вхідних з'єднань.", output: "tcp4       0      0  *.3000                 *.*                    LISTEN", risk: "low" },
            { cmd: "lsof -i :3000", explain: "Хто саме зайняв порт 3000: ім'я процесу і PID. Процеси інших користувачів видно лише з <code>sudo</code>.", risk: "low" }
          ] },
        { type: "terminal", title: "Спробуй: хто на порту 3000",
          prompt: "Stas@MacBook-Pro demo %",
          task: "Дізнайся, який процес зайняв порт `3000`.",
          expected: ["lsof -i :3000", "lsof -i:3000", "lsof -nP -i :3000", "lsof -iTCP:3000"],
          output: "COMMAND  PID USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME\nnode    4242 Stas   23u  IPv6 0x3c1f2a9b7d6e5f41      0t0  TCP *:hbci (LISTEN)",
          hint: "`lsof` (list open files) з прапорцем мережевих з'єднань і двокрапкою перед номером порту.",
          explain: "Порт тримає `node` з PID 4242 — твій dev-сервер. `hbci` — просто назва порту 3000 із `/etc/services`; з `-P` видно число." },
        { type: "check", title: "Порт зайнято",
          question: "`npm run dev` пише `Error: listen EADDRINUSE :::3000`. Що зробити першим?",
          options: ["Перевстановити Node", "Перезавантажити роутер", "`lsof -i :3000` — побачити, хто зайняв порт, і вирішити, чи його зупиняти"],
          correct: 2, feedback: "EADDRINUSE — порт уже зайнятий. Спершу з'ясуй ким: часто це твій же старий dev-сервер в іншому вікні." },
        { type: "callout", variant: "tip", title: "Коди HTTP одним рядком",
          body: "<p><code>2xx</code> — усе добре, <code>3xx</code> — переадресація (<code>301</code>, <code>302</code>), <code>4xx</code> — помилка запиту (<code>404</code> — немає сторінки, <code>403</code> — заборонено), <code>5xx</code> — збій на сервері. Сама відповідь з кодом означає: мережа і DNS працюють.</p>" },
        { type: "summary", title: "Підсумок",
          points: ["`dig ім'я +short` і `nslookup` перевіряють DNS.", "`curl -I https://…` показує HTTP-код: сервер живий, навіть якщо код 404.", "`netstat -an | grep LISTEN` — які порти слухають; `lsof -i :порт` — хто саме.", "Усі команди уроку лише читають — ризик низький."] }
      ],
      glossary: [
        { term: "DNS", def: "Служба, що перетворює доменні імена на IP-адреси." },
        { term: "HTTP-код", def: "Число в першому рядку відповіді сервера: 200, 301, 404, 500…" },
        { term: "Порт", def: "Номер «дверей» на пристрої, за якими працює конкретна служба (22 — SSH, 443 — HTTPS)." },
        { term: "DHCP", def: "Протокол, яким роутер автоматично видає IP, шлюз і DNS." },
        { term: "LISTEN", def: "Стан порту, на якому програма чекає вхідних з'єднань." }
      ],
      quiz: [
        { question: "`curl -I https://example.com` повернув `HTTP/2 404`. Що це означає?", options: ["Мережі немає", "Сервер відповів, але такої сторінки немає", "DNS не працює"], correct: 1, feedback: "Будь-який HTTP-код означає, що сервер досяжний. 404 — лише «такої сторінки немає»." },
        { question: "Чим `dig` відрізняється від `nslookup`?", options: ["Обидва роблять DNS-запит; `dig` детальніший, а з `+short` дає лише IP", "`nslookup` перевіряє порти", "`dig` працює лише з IPv6"], correct: 0, feedback: "Мета однакова — DNS. `dig` зручніший для діагностики, `nslookup` — простіший." },
        { question: "`networksetup -getdnsservers Wi-Fi` відповів `There aren't any DNS Servers set on Wi-Fi.` Це означає, що…", options: ["DNS не працює взагалі", "треба перевстановити macOS", "вручну DNS не задано — Mac бере DNS від роутера через DHCP"], correct: 2, feedback: "Це звичайний стан домашнього Mac. Поточні DNS видно в `scutil --dns`." },
        { question: "Що показує `netstat -an | grep LISTEN`?", options: ["Порти, на яких програми чекають вхідних з'єднань", "Швидкість інтернету", "Список Wi-Fi-мереж"], correct: 0, feedback: "`grep LISTEN` залишає лише рядки зі станом LISTEN." },
        { question: "У виводі `lsof -i :3000` замість 3000 написано `hbci`. Чому?", options: ["Порт зламано", "`lsof` підставляє назву порту з `/etc/services`; прапорець `-P` покаже число", "Це назва вірусу"], correct: 1, feedback: "`/etc/services` — старий довідник назв портів. Порт 3000 там історично зветься hbci." },
        { question: "Чому `curl -I` безпечний, а `curl … | bash` — ні?", options: ["`-I` швидший", "Різниці немає", "`-I` лише читає заголовки, а `| bash` одразу виконує завантажений код"], correct: 2, feedback: "Проблема не в `curl`, а в тому, що вивід передається інтерпретатору на виконання. Детально — у модулі про небезпечні команди." }
      ]
    }
  ]
});
