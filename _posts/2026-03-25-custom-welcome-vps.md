---
layout: post
title: "Bikin Tampilan SSH VPS Jadi Keren Pake Custom Welcome Banner (MOTD)"
date: 2026-03-25
emoji: 🖥️
keywords: [vps, linux, banner, terminal, tutorial, server, bash script, motd, custom welcome ssh, tampilan vps keren, sysadmin tips]
image: /assets/img/welcome.png
---

Tiap kali login SSH ke VPS, bosen nggak sih liat tampilannya gitu-gitu aja? Isinya cuma info login terakhir yang ngebosenin. Nah, biar VPS kamu kerasa lebih "pro" dan nggak ngebosenin, kita bisa pasang custom welcome banner atau yang sering disebut **MOTD (Message of the Day)**.

Gak cuma buat gaya-gayaan, banner ini sebenernya fungsional banget. Begitu masuk, kamu langsung disuguhi status server kyk penggunaan RAM, CPU, sampe Uptime. Jadi kamu nggak perlu ngetik perintah manual lagi cuma buat cek spek.

![preview](/assets/img/welcome.png)

---

## Jadi, MOTD Itu Apa Sih?

Singkatnya, MOTD itu pesan yang bakal nongol otomatis tepat setelah kamu masukin password SSH. Di Linux, kita bisa naruh script di folder khusus biar tiap kali login, sistem bakal otomatis ngitung resource server dan nampilin hasilnya dengan warna-warni yang enak di mata.

Kenapa wajib pasang? Ya biar kamu nggak ketuker server pas lagi pegang banyak VPS, dan biar makin semangat pas ngulik-ngulik kodenya.

---

## Cara Pasang Script "AwanCore"

Saya udah buatin script simpel yang tampilannya rapi dan nggak bikin berat server. Kita bakal taruh script ini di folder `/etc/profile.d/`.

### 1. Buat File Script-nya
Jalanin perintah ini di vps kamu buat bikin file baru:
```bash
sudo nano /etc/profile.d/welcome.sh
```

### 2. Copy Paste Script Sakti Ini
Silakan salin kode di bawah ini. Script ini udah saya setting biar tampilannya pas di tengah (center-aligned) dan warnanya enak dilihat:

```bash
#!/bin/bash

# warna
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

### 3. Kasih Izin Eksekusi
Biar sistem boleh nge-jalanin script-nya, kita kasih izin dulu:
```bash
sudo chmod +x /etc/profile.d/welcome.sh
```

### 4. Bersihin Pesan Bawaan Ubuntu
Biasanya Ubuntu punya banner bawaan yang panjang dan ganggu. Biat banner baru kamu ini yang paling cakep di atas, kita bisukan dulu banner aslinya:
```bash
sudo chmod -x /etc/update-motd.d/*
```
*Gak usah khawatir, kalo mau balikin tinggal ganti -x jadi +x lagi.*

---

## Gimana Kalo Mau Modifikasi?
Gampang! Kamu bisa ganti kata "AwanCore" di script tadi jadi nama kamu atau nama server kamu. Kalo mau nambahin tulisan yang gede-gede (ASCII Art), kamu bisa cari "ASCII Art Generator" di Google terus paste hasilnya ke dalem perintah `echo`. Beres dehh!

Sekarang coba logout SSH terus login lagi. Gimana? VPS kamu jadi kerasa lebih mahal kan sekarang?

---

*P.S. VPS kenceng mulai 15rb-an? Cek aja di [awancore.biz.id](https://awancore.biz.id/) - tempatnya para sysadmin ngumpul!*
