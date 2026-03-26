---
layout: post
title: "tutorial: cara ubah pesan welcome di terminal linux (vps ssh)"
date: 2026-03-25
emoji: 🖥️
keywords: [vps, linux, banner, terminal, tutorial, server]
image: /assets/img/welcome.png
---

*tiap kali login ssh, biasanya kita cuma disambut layar hitam dan info login terakhir yang ngebosenin. biar vps kamu berasa lebih "personalized" dan profesional, kita bisa pasang custom welcome banner. selain bikin keren, banner ini juga fungsional karena langsung nampilin status mesin (cpu, ram, disk) secara real-time tepat saat kamu masuk. jadi gak perlu repot ngetik perintah cek spek lagi.*

![preview](/assets/img/welcome.png)

mengubah tampilan welcome atau yang biasa disebut MOTD (Message of the Day) di linux itu sebenarnya simpel tapi dampaknya besar buat workflow kamu sebagai sysadmin. kita bakal pake script bash yang jalan otomatis lewat folder `/etc/profile.d/`.

---

## persiapan & pengenalan motd

linux punya sistem untuk nampilin pesan setiap kali ada user yang login via ssh atau terminal fisik. biasanya pesan ini disimpen di `/etc/motd` atau dikelola lewat `landscape` (di ubuntu). tapi cara paling fleksibel buat bikin banner yang dinamis (isinya berubah-ubah sesuai status ram/cpu) adalah pake script shell.

**kenapa pasang banner?**
1. **identitas**: biar gak ketuker kalau kamu punya banyak vps.
2. **monitoring cepat**: langsung tau penggunaan disk dan ram pas baru login.
3. **estetika**: vps jadi keliatan lebih "terawat" dan gaul.

---

## cara pasang script welcome banner

kita bakal naruh scriptnya di `/etc/profile.d/welcome.sh`. script di folder ini bakal otomatis di-execute oleh shell (bash/zsh) setiap kali ada sesi login baru.

### 1. buat file script di vps
gunakan editor `nano` atau `vim` untuk membuat file baru. pastikan kamu punya akses root atau gunakan `sudo`.
```bash
sudo nano /etc/profile.d/welcome.sh
```

### 2. salin script "awancore master"
silakan copy dan paste script bash di bawah ini. script ini sudah saya optimasi biar tampilannya rapi, berwarna, dan dapet info spek yang akurat.

```bash
#!/bin/bash

# AwanCore Premium Banner Script
# Dibuat untuk monitoring cepat spesifikasi VPS

C1="\033[1;38;5;51m" # Light Blue
C2="\033[1;38;5;45m" # Medium Blue
C3="\033[1;38;5;39m" # Darker Blue
TXT="\033[1;37m"     # Pure White
DIM="\033[0;37m"     # Gray
NC="\033[0m"         # No Color

center() {
  printf "%*s\n" $(((${#1} + $(tput cols)) / 2)) "$1"
}

# Ambil data sistem
HOST=$(hostname)
USER=$(whoami)
IP=$(hostname -I | awk '{print $1}')
UP=$(uptime -p | sed 's/up //')
TIME=$(date '+%Y-%m-%d %H:%M:%S')

# Ambil spek hardware
CPU=$(grep -m1 "model name" /proc/cpuinfo | cut -d: -f2 | xargs)
CORE=$(nproc)
RAM=$(free -m | awk '/Mem:/ {printf "%dMB / %dMB", $3, $2}')
DISK=$(df -h / | awk 'NR==2 {print $3 " / " $2}')

clear
echo ""
echo -e "${C1}$(center "WELCOME TO YOUR SERVER")${NC}"
echo -e "${C2}$(center "Managed by AwanCore")${NC}"
echo ""

# Tampilan Info Utama
echo -e "${DIM}Identity    ${NC}: ${TXT}$HOST${NC} ${DIM}(User: ${USER})${NC}"
echo -e "${DIM}Local IP    ${NC}: ${TXT}$IP${NC}"
echo -e "${DIM}Server Time ${NC}: ${C2}$TIME${NC}"
echo -e "${DIM}Uptime      ${NC}: ${C3}$UP${NC}"

echo -e "${C1}--------------------------------------------------${NC}"

# Tampilan Hardware
echo -e "${DIM}CPU Model   ${NC}: ${C2}$CPU${NC} ${DIM}(${CORE} Cores)${NC}"
echo -e "${DIM}Memory (RAM)${NC}: ${C3}$RAM${NC}"
echo -e "${DIM}Disk Space  ${NC}: ${TXT}$DISK used${NC}"
echo ""
echo -e "${C2}Happy Sysadmin! Jangan lupa backup berkala.${NC}"
echo ""
```

### 3. berikan izin eksekusi
agar script ini bisa jalan pas login, kita harus ngasih izin perintah `executable` ke filenya. 
```bash
sudo chmod +x /etc/profile.d/welcome.sh
```

### 4. tes tampilan tanpa relogin
gak perlu keluar masuk ssh buat liat hasilnya. cukup ketik perintah:
```bash
source /etc/profile.d/welcome.sh
```

### 5. opsional: hapus motd default (ubuntu)
biar banner kamu nggak "beradu" sama banner default ubuntu yang panjang, kamu bisa matiin motd default lewat perintah ini:
```bash
sudo chmod -x /etc/update-motd.d/*
```
*catatan: kalau nanti mau balikin banner asli ubuntu, tinggal ganti `-x` jadi `+x` lagi.*

---

## troubleshooting
kalau bannernya nggak muncul, pastikan:
- shell yang kamu pake adalah **Bash**. kalau kamu pake Zsh, pastikan `/etc/zsh/zprofile` kamu memanggil script di `/etc/profile.d/`.
- file script punya baris pertama `#!/bin/bash` yang bener.
- folder `/etc/profile.d/` ada di vps kamu (hampir semua distro modern punya ini).

---

*p.s. butuh vps murah dan kenceng? cek di [awancore.biz.id](https://awancore.biz.id/) ya!*
