---
layout: post
title: tutorial: cara ubah pesan welcome di terminal linux (vps ssh)
date: 2026-03-25
emoji: 🖥️
keywords: [vps, linux, banner, terminal, tutorial, server]
---

*biar tiap login ssh gak terasa kosong dan ngebosenin, kita bisa pasang welcome banner. jadi bukan cuma layar hitam doang, tapi langsung ada tampilan info server yang jelas: mulai dari hostname, uptime, ip, sampai cpu dan ram. semuanya muncul otomatis tanpa perlu ngetik perintah lagi. lebih praktis dan keliatan rapi tiap kali masuk server.*

![preview](/assets/img/welcome.png)

tampilan ini bakal muncul otomatis setiap kali kamu login via ssh. informasi yang ditampilin antara lain: identitas server, waktu login, uptime, ip address, hingga spesifikasi hardware seperti cpu, ram, dan penggunaan disk.

---

## cara pasang

kita bakal naruh scriptnya di `/etc/profile.d/welcome.sh`. folder ini khusus buat nyimpen script yang bakal jalan otomatis pas ada user login.

### 1. buat file script
buka terminal dan ketik perintah ini buat bikin filenya:
```bash
sudo nano /etc/profile.d/welcome.sh
```

### 2. isi dengan script ini
silakan copy dan paste script bash ini ke dalam editor:

```bash
#!/bin/bash

# AwanCore Banner Script
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

### 3. simpan dan beri izin
setelah disave (`ctrl+x`, `y`, `enter`), jalankan perintah ini:
```bash
sudo chmod +x /etc/profile.d/welcome.sh
```

### 4. tes tanpa relogin
```bash
source /etc/profile.d/welcome.sh
```

---

*p.s. butuh vps murah dan kenceng? cek di [awancore.biz.id](https://awancore.biz.id/) ya!*
