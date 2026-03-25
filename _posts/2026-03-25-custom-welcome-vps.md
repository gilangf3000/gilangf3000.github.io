---
layout: post
title: welcome banner vps (terminal linux)
date: 2026-03-25
emoji: 🖥️
---

bikin tampilan terminal vps jadi lebih rapi dan informatif pas login ssh.

---

## hasil akhir

![preview](/assets/img/welcome.png)

---

## cara pasang

### 1. buat file script
```bash
sudo nano /etc/profile.d/welcome.sh
```

### 2. isi dengan script ini

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

### 3. simpan & beri izin
```bash
chmod +x /etc/profile.d/welcome.sh
```

### 4. tes
```bash
source /etc/profile.d/welcome.sh
```

---

*butuh vps murah? cek di [awancore.biz.id](https://awancore.biz.id/)*
