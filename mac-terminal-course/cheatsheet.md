# Шпаргалка — Mac Terminal

## Navigation

```bash
pwd
cd
cd ..
cd ~
cd /шлях/до/папки
ls
ls -la
open .
```

## Files

```bash
mkdir папка
touch файл.txt
cp source dest
mv old new
rm файл.txt
rm -r папка
rmdir порожня_папка
cat файл.txt
less файл.txt
head файл.txt
tail файл.txt
tail -f лог.log
```

## Search

```bash
find . -name "*.md"
grep "текст" файл.txt
grep -R "TODO" .
wc -l файл.txt
sort файл.txt
uniq файл.txt
cut -d',' -f1 файл.csv
tr ':' '\n'
xargs
mdfind "ім'я_файлу"
cat файл.txt | pbcopy
pbpaste > файл.txt
```

## Network

```bash
ping -c 4 8.8.8.8
traceroute google.com
route get default
ifconfig
ipconfig getifaddr en0
networksetup -listallhardwareports
networksetup -getinfo Wi-Fi
dig google.com
nslookup google.com
curl -I https://google.com
netstat -an | grep LISTEN
lsof -i :22
```

## SSH

```bash
ssh user@10.0.0.254
scp файл user@10.0.0.254:
scp user@10.0.0.254:backup.rsc .
ssh-keygen -t ed25519
ssh-copy-id user@10.0.0.254
```

## Git

```bash
git status
git add .
git commit -m "message"
git push
git pull
git log --oneline
git branch
git checkout гілка
git switch гілка
git diff
git restore файл.txt
gh auth status
gh repo view
```

## Python/Node

```bash
python3 --version
python3 script.py
pip3 install пакет
uv --version
node --version
npm install
npx create-next-app
```

## Homebrew

```bash
brew --version
brew list
brew search назва
brew install пакет
brew update
brew upgrade
```

## AI CLI

```bash
which claude
command -v codex
claude
codex
gemini
grok
cd ~/Projects/project && git status && claude
```

## Danger Zone

```bash
sudo команда
rm -rf папка
diskutil list
chmod -R 755 папка
chown -R user:group папка
kill PID
killall процес
launchctl list
pfctl -s info
dd if= of=
curl -fsSL URL | bash
```

## Help

```bash
man команда
apropos ключове_слово
command -v команда
which команда
history
clear
```