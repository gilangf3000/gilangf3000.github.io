---
layout: post
title: "expert-guide: custom welcome banner ssh linux (motd) biar vps makin pro"
date: 2026-03-25
emoji: 🖥️
keywords: [vps, linux, banner, terminal, tutorial, server, bash script, motd, custom welcome ssh, tampilan vps keren, sysadmin tips]
image: /assets/img/welcome.png
---

*bosen liat terminal yang sepi pas login vps? atau pengen tau status ram, cpu, dan uptime tanpa perlu ngetik perintah manual tiap saat? di panduan 'expert-guide' ini, kita bakal bikin custom welcome banner (MOTD) yang nggak cuma keren secara visual dengan warna-warni ANSI, tapi juga fungsional nampilin data live dari jeroan server kamu.*

![preview](/assets/img/welcome.png)

### filosofi MOTD: lebih dari sekadar pajangan

di dunia sysadmin, welcome banner atau **MOTD (Message of the Day)** punya fungsi krusial. bayangkan kamu punya 10-20 server. dengan banner yang jelas, kamu nggak bakal salah ketik perintah `rm -rf` di server produksi karena nama hostname-nya terpampang gede di depan mata pas baru login. plus, info resource usage bantu kamu deteksi dini kalau ada server yang lagi "tertekan" bebannya.

---

## cara kerja banner di linux

linux biasanya menyimpan pesan statis di `/etc/motd`. tapi kalau kamu mau bannernya dinamis (update tiap detik/menit), kita harus pake script shell yang ditaruh di folder khusus:
- **Ubuntu/Debian**: Script ditaruh di `/etc/profile.d/` untuk dieksekusi setiap login.
- **CentOS/RHEL**: Mirip, tapi kadang perlu penyesuaian di `.bash_profile`.

di tutorial ini kita bakal pake trik `/etc/profile.d/` karena ini yang paling standar dan aman buat distro apapun yang berbasis Bash.

---

## step 1: persiapan script "awancore-v2"

kita bakal bikin script bash yang ngumpulin data sistem, ngitung penggunaan ram, dan nampilinnya dengan format yang rapi.

```bash
# buat file baru
sudo nano /etc/profile.d/welcome-pro.sh
```

copy script di bawah ini. saya sudah tambahkan kode warna ANSI yang "soft" di mata tapi tetep keliatan techy:

```bash
#!/bin/bash

# --- KONFIGURASI WARNA (ANSI) ---
BOLD="\033[1m"
BLUE="\033[1;34m"
CYAN="\033[1;36m"
GREEN="\033[1;32m"
WHITE="\033[1;37m"
GRAY="\033[0;37m"
RED="\033[1;31m"
NC="\033[0m"

# --- AMBIL DATA SISTEM ---
USER=$(whoami)
HOSTNAME=$(hostname)
IP=$(hostname -I | awk '{print $1}')
OS=$(grep -oP '(?<=^PRETTY_NAME=").*(?=")' /etc/os-release)
KERNEL=$(uname -r)
UPTIME=$(uptime -p | sed 's/up //')
DATE=$(date +"%A, %d %B %Y, %T")

# --- HITUNG RESOURCE ---
# RAM Usage
RAM_TOTAL=$(free -m | awk '/Mem:/ { print $2 }')
RAM_USED=$(free -m | awk '/Mem:/ { print $3 }')
RAM_PERC=$((RAM_USED * 100 / RAM_TOTAL))

# DISK Usage
DISK_PERC=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
CPU_LOAD=$(top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print 100 - $1}')

# --- TAMPILAN BANNER ---
clear
echo -e "${BLUE}================================================================${NC}"
echo -e "  ${BOLD}${WHITE}Gilang's SSH Console${NC} ${GRAY}- Authorized Access Only${NC}"
echo -e "${BLUE}================================================================${NC}"
echo -e "  ${CYAN}Sistem Info:${NC}"
echo -e "  ${GRAY}Distro :${NC} ${WHITE}$OS${NC}"
echo -e "  ${GRAY}Kernel :${NC} ${WHITE}$KERNEL${NC}"
echo -e "  ${GRAY}Uptime :${NC} ${GREEN}$UPTIME${NC}"
echo -e ""
echo -e "  ${CYAN}Resource Status:${NC}"
echo -e "  ${GRAY}CPU Load :${NC} ${WHITE}${CPU_LOAD}%${NC}"
echo -e "  ${GRAY}RAM Used :${NC} ${WHITE}${RAM_USED}MB / ${RAM_TOTAL}MB (${RAM_PERC}%)${NC}"
echo -e "  ${GRAY}Disk (/) :${NC} ${WHITE}${DISK_PERC}% Used${NC}"
echo ""
echo -e "  ${CYAN}Network Identity:${NC}"
echo -e "  ${GRAY}Logged as:${NC} ${GREEN}${USER}${NC}${GRAY} @ ${NC}${WHITE}${HOSTNAME}${NC}"
echo -e "  ${GRAY}Local IP :${NC} ${WHITE}${IP}${NC}"
echo -e "  ${GRAY}Date     :${NC} ${WHITE}${DATE}${NC}"
echo -e "${BLUE}================================================================${NC}"
echo -e "  ${GRAY}Pro-Tip: Gunakan 'sudo htop' untuk monitoring lebih detail.${NC}"
echo ""
```

---

## step 2: pemberian izin (the crucial point)

script ini nggak akan jalan kalau nggak dikasih izin "executable".
```bash
sudo chmod +x /etc/profile.d/welcome-pro.sh
```

---

## step 3: membersihkan banner bawaan (clean install)

ubuntu/debian sering nampilin banyak pesan sampah pas login (kyk info update, help link, dll). biar banner baru kamu keliatan bersih di atas, kita harus "mute" script motd bawaan.

```bash
# hapus permission executable di folder update-motd.d
sudo chmod -x /etc/update-motd.d/*
```

---

## tips expert: nambahin ASCII ART

pengen ada tulisan "GILANG" besar pake karakter unik? kamu bisa pake tool `figlet`:
1. install: `sudo apt install figlet -y`.
2. buat tulisan: `figlet "GILANG"`.
3. copy hasilnya dan paste di dalam perintah `echo` di script bash kamu di atas.

---

## FAQ (Kira-kira apa yang sering ditanya?)

**T: Scriptnya aman nggak gan buat performa?**
J: Aman banget. Script bash ringan cuma jalan sekali pas kamu login. Nggak bakal bikin server berat pas lagi kerja.

**T: Bisa jalan di OS Windows PowerShell?**
J: Nggak, ini khusus buat server Linux (Ubuntu/Debian/CentOS). Kalau vps kamu Windows, caranya beda lagi pake Registry.

---

![status banner ok](/assets/img/service-ok.png)

*p.s. vps kenceng mulai 20rb-an? cek aja di [awancore.biz.id](https://awancore.biz.id/) - tempatnya para sysadmin ngumpul!*
