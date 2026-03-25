---
layout: default
title: welcome banner vps (terminal linux)
date: 2026-03-25
emoji: 🖥️
---

## pasang welcome banner di vps linux

biar tiap login ssh gak terasa kosong dan ngebosenin, jadi bukan cuma layar hitam doang tapi langsung ada tampilan info server yang jelas dan enak dilihat, mulai dari hostname, uptime, ip, sampai cpu dan ram semuanya langsung muncul tanpa perlu ngetik perintah lagi, jadi lebih cepat, lebih praktis, dan tetap simple tapi keliatan rapi dan profesional tiap kali masuk server.

---

## hasil akhir

![preview](/assets/img/welcome.png)

tampilan akan muncul otomatis setiap kali kamu login via ssh.  
informasi yang ditampilkan:
- nama server dan user yang login
- waktu saat login
- lama server berjalan (uptime)
- alamat ip server
- spesifikasi cpu dan jumlah core
- penggunaan ram
- penggunaan disk

---

## lokasi script

```bash
/etc/profile.d/welcome.sh
```

kenapa di folder ini?
folder /etc/profile.d/ adalah tempat khusus di linux untuk menyimpan script yang akan dijalankan secara otomatis saat user login.
semua file dengan ekstensi .sh di folder ini akan dieksekusi oleh sistem ketika ada user yang login, baik via ssh maupun langsung di terminal.

---

## cara pasang

bisa langsung edit pakai nano:

```bash
nano /etc/profile.d/welcome.sh
```

paste script ini

```bash
#!/bin/bash

C1="\033[1;38;5;51m"
C2="\033[1;38;5;45m"
C3="\033[1;38;5;39m"
TXT="\033[1;37m"
DIM="\033[0;37m"
NC="\033[0m"

center() {
  printf "%*s\n" $(((${#1} + $(tput cols)) / 2)) "$1"
}

HOST=$(hostname)
USER=$(whoami)
IP=$(hostname -I | awk '{print $1}')
UP=$(uptime -p | sed 's/up //')
TIME=$(date '+%Y-%m-%d %H:%M:%S')

CPU=$(grep -m1 "model name" /proc/cpuinfo | cut -d: -f2 | xargs)
CORE=$(nproc)
RAM=$(free -m | awk '/Mem:/ {printf "%dMB / %dMB", $3, $2}')
DISK=$(df -h / | awk 'NR==2 {print $3 " / " $2}')

clear
echo ""
echo -e "${C1}$(center "AwanCore")${NC}"
echo ""

echo -e "${DIM}System  ${NC}: ${TXT}$HOST${NC} ${DIM}(${USER})${NC}"
echo -e "${DIM}Time    ${NC}: ${C2}$TIME${NC}"
echo -e "${DIM}Uptime  ${NC}: ${C3}$UP${NC}"
echo -e "${DIM}IP      ${NC}: ${TXT}$IP${NC}"

echo -e "${DIM}CPU     ${NC}: ${C2}$CPU${NC} ${DIM}(${CORE} core)${NC}"
echo -e "${DIM}RAM     ${NC}: ${C3}$RAM${NC}"
echo -e "${DIM}Disk    ${NC}: ${TXT}$DISK${NC}"
echo ""
```

simpan

tekan:
ctrl + x
lalu y
enter

kasih izin biar bisa jalan

```bash
chmod +x /etc/profile.d/welcome.sh
```

selesai
keluar dari ssh lalu login lagi
atau ketik:

```bash
source /etc/profile.d/welcome.sh
```

biar langsung muncul tanpa relogin
