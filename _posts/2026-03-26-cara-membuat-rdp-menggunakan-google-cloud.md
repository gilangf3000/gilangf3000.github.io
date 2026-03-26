---
layout: post
title: "cara paling gampang bikin rdp google cloud (trial $300) gratis!"
date: 2026-03-26
emoji: 🖥️
keywords: [google cloud, gcp, rdp, vps, windows, ubuntu, tutorial, linux, server, rdp gratis, vps murah, gcp rdp, remote desktop google, cara membuat rdp]
image: /assets/img/rdp-gcp-ok.png
---

Lagi butuh RDP kenceng buat jalanin bot atau sekadar browsing anti-lemot? Nah, pas banget. Google Cloud Platform (GCP) itu juaranya kalau soal RDP gratisan yang stabil. Lewat program trial-nya, kita dikasih saldo **$300** buat bebas ngulik server spek dewa selama 3 bulanan. 

Gak usah pusing sama settingan ribet, di sini saya share dua cara paling ampuh: pake Windows Server (yang ada GUI-nya) atau pake trik Ubuntu Desktop lewat Cloud Shell yang praktis banget.

![preview rdp gcp](/assets/img/rdp-gcp-ok.png)

---

## Opsi A: Windows RDP "Spek Dewa" (Pake VM Instance)

Kalau kamu tipe yang butuh Windows beneran buat install software `.exe` atau trading, cara ini yang paling rekomendasi. Tapi inget, Windows itu makan RAM, jadi jangan pelit spek ya.

### 1. Masuk ke Google Console
Pertama, buka dulu [Google Cloud Console](https://console.cloud.google.com/). Kalau udah login, langsung aja cari menu **Compute Engine > VM Instances**, terus klik **Create Instance**.

### 2. Setting Spek Mesin (Jangan Salah Pilih!)
Nah, ini kuncinya. Biar RDP kamu nggak 'ngelag', jangan pilih yang spek paling bawah.
- **Machine Type**: Pilih minimal `e2-medium` (2 vCPU, 4GB RAM). Kalau dipaksa pake `e2-micro`, dijamin bakal emosi sendiri pas ngeremote nanti.
- **Region**: Pilih yang paling deket, saran saya sih `asia-southeast2` (Jakarta) biar ping-nya kecil.

### 3. Ganti OS ke Windows
Scroll ke bawah dikit, cari bagian **Boot Disk** terus klik **Change**.
- Ganti Operating System jadi **Windows Server**.
- Versinya bebas, tapi saya biasanya pake **Windows Server 2022 Datacenter**.
- Ukuran disk kasih aja **50GB**. Kalau bisa pilih yang **SSD** biar pas buka aplikasi makin sat-set.

### 4. Aktivasi Firewall
Di bagian Firewall, centang aja **Allow HTTP** sama **Allow HTTPS**. Kalau udah, klik **Create** dan tunggu sampe mesinnya dapet centang hijau.

### 5. Ambil Password RDP
Nah, kalau udah nyala, klik tanda panah di samping tombol RDP, terus pilih **Set Windows Password**.
- Masukin username bebas (misal: `admin`).
- Nanti bakal muncul password random. **Wajib copy dan simpan ya!** Karena kalau udah ditutup, Google nggak bakal ngasih liat lagi.

### 6. Login & Beres!
Sekarang tinggal buka **Remote Desktop Connection** di PC kamu, masukin IP External-nya, masukin username & password tadi. Selamat, RDP Sultan-mu sudah aktif!

---

## Opsi B: RDP Ubuntu Kilat (Cloud Shell & Docker)

Kalau kamu cuma butuh browsing cepat atau download file gede tanpa mau ribet daftar kartu kredit/trial, trik ini solusinya. Kita pake Docker buat jalanin desktop Ubuntu di dalem browser.

### 1. Buka Cloud Shell
Klik icon shell `( >_ )` di pojok kanan atas dashboard GCP. Tunggu sampe terminalnya kebuka.

### 2. Copy Paste Perintah Ini
Langsung aja hajar perintah ini di terminal:
```bash
docker run -p 6070:80 dorowu/ubuntu-desktop-lxde-vnc
```
Tungguin bentar sampe filenya selesai didownload semua. Kalau udah muncul tulisan running, lanjut ke langkah terakhir.

![proses docker running](/assets/img/rdp-gcp-docker.png)

### 3. Intip Hasilnya
Klik icon **Web Preview** (yang gambarnya monitor kecil), terus pilih **Change Port**. Masukin angka **6070**, terus klik **Change and Preview**.

Ajaib! Browser kamu bakal buka tab baru yang isinya tampilan Desktop Ubuntu. Tinggal buka browser di dalem sana dan nikmatin speed internet khas Google Cloud.

---

## Tips Biar RDP Makin Ngacir
Biar makin enteng, pas sudah masuk Windows nanti:
- Klik kanan `This PC` > Properties > Advanced System Settings > Performance.
- Pilih yang **Adjust for best performance**. 
Langkah ini bakal matiin animasi-animasi Windows yang nggak guna, jadi RDP kamu kerasa jauh lebih responsif biarpun internet kamu lagi pas-pasan.

---

*P.S. Butuh VPS kenceng tanpa ribet daftar GCP? Cek aja di [awancore.biz.id](https://awancore.biz.id/) ya! Mulai 15rb-an aja, tapi cuma VPS bukan RDP.*