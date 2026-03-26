---
layout: post
title: "bikin tampilan ssh vps jadi keren pake custom welcome banner (motd)"
date: 2026-03-25
emoji: 🖥️
keywords: [vps, linux, banner, terminal, tutorial, server, bash script, motd, custom welcome ssh, tampilan vps keren, sysadmin tips]
image: /assets/img/welcome.png
---

*bosen liat terminal yang sepi pas login vps? yuk, bikin custom welcome banner (MOTD) biar VPS kamu keliatan lebih keren dan informatif pas login. panduan ini bakal bantu kamu pasang script pemantau RAM, CPU, dan uptime yang simpel tapi fungsional.*

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

echo -e "${DIM}System  ${NC}: ${TXT}$HOST${NC} ${DIM}(${USER})${NC}"
echo -e "${DIM}Time    ${NC}: ${C2}$TIME${NC}"
echo -e "${DIM}Uptime  ${NC}: ${C3}$UP${NC}"
echo -e "${DIM}IP      ${NC}: ${TXT}$IP${NC}"

echo -e "${DIM}CPU     ${NC}: ${C2}$CPU${NC} ${DIM}(${CORE} core)${NC}"
echo -e "${DIM}RAM     ${NC}: ${C3}$RAM${NC}"
echo -e "${DIM}Disk    ${NC}: ${TXT}$DISK${NC}"
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

*p.s. vps kenceng mulai 15rb-an? cek aja di [awancore.biz.id](https://awancore.biz.id/) - tempatnya para sysadmin ngumpul!*
