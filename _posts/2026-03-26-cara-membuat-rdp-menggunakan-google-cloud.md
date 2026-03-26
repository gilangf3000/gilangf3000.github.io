---
layout: post
title: "cara paling gampang bikin rdp google cloud (trial $300) gratis!"
date: 2026-03-26
emoji: 🖥️
keywords: [google cloud, gcp, rdp, vps, windows, ubuntu, tutorial, linux, server, optimasi, rdp gratis, vps murah, gcp rdp, remote desktop google, cara membuat rdp]
image: /assets/img/rdp-gcp-ok.png
---

*pengen punya rdp kenceng yang nyala 24 jam nonstop buat botting, trading, atau sekadar bypass internet lemot? google cloud platform (gcp) adalah pilihan terbaik dengan infrastruktur data center global yang super stabil. di artikel "masterclass" ini, kita nggak cuma bahas cara bikinnya, tapi juga trik optimasi biar rdp kamu makin enteng dan efisien. kita bahas dua metode: windows server vps dan ubuntu docker desktop.*

![preview rdp gcp](/assets/img/rdp-gcp-ok.png)

---

## pengenalan: kenapa googency** (kecepatan respon) dan **uptime**. dengan program triallnya ($300 credit), kamu bisa punya rdp spesifikasi tinggi secara gratis selama kurang lebih 3 bulan. ini sangat menguntungkan bagi developer atau peternak bot yang butuh banyak environment kerja.

**perbandingan metode:**
- **windows server (vm instance)**: akses gui murni, support semua aplikasi .exe, tapi makan resource lebih gede.
- **ubuntu docker (cloud shell)**: gratis selamanya (free tier), setup hitungan detik, enteng, tapi aksesnya via browser.

---

## opsi a: setup windows rdp spek sultan (vm instance)

metode ini memberikan kamu kontrol penuh 100% atas sistem operasi windows. kamu bisa install software apapun layaknya di laptop sendiri.

### 1. akses google cloud console
buka [Google Cloud Console](https://console.cloud.google.com/) dan pastikan project kamu sudah aktif. jika belum punya project, buat satu dengan nama `rdp-premium-project`.

### 2. konfigurasi spesifikasi mesin
- buka sidebar kiri, masuk ke **Compute Engine > VM Instances**.
- klik **Create Instance**.
- **Region**: Pilih yang paling dekat dengan lokasi targetmu. kalau buat browsing Indo, pilih `asia-southeast2` (Jakarta). kalau buat bot luar, pilih `us-central1` (Iowa).
- **Machine Configuration**: Untuk Windows, hukumnya wajib pake minimal `e2-medium` (2 vCPU, 4GB RAM). pake `e2-micro` cuma bakal bikin kamu emosi karena lemotnya GUI Windows.

### 3. pemilihan operating system (boot disk)
ini bagian yang sering salah. scroll ke bawah cari bagian **Boot Disk**, klik **Change**.
- **Operating System**: Ganti ke **Windows Server**.
- **Version**: Pilih **Windows Server 2022 Datacenter Desktop Experience**. kata "Desktop Experience" itu penting karena kalau cuma "Datacenter", tampilannya cuma terminal hitam tanpa GUI.
- **Disk Type**: Pilih **SSD Persistent Disk** (setidaknya 50GB) biar bootingnya secepat kilat.

### 4. firewall & networking
- centang **Allow HTTP traffic** dan **Allow HTTPS traffic**.
- (Opsional) Klik **Advanced Options > Networking**, di bawah **Networking Interface**, pastikan IP External-nya diset ke `Reserved` kalau kamu butuh IP yang nggak berubah-ubah (Static).

### 5. deploy & pembuatan password
klik **Create**. tunggu 1-2 menit sampai status instance centang hijau. 
- klik tanda panah di sebelah tulisan **RDP**, pilih **Set Windows Password**.
- buat Username baru (misal: `adminawan`).
- catat password yang muncul. **SANGAT PENTING**: Google cuma kasih liat password ini satu kali. jangan sampe ilang!

### 6. optimasi pasca instalasi (wajib!)
setelah login rdp via Remote Desktitle: "bikin tampilan ssh vps jadi keren pake custom welcome banner (motd)"
ingan:
- **disable animations**: buka `sysdm.cpl` > Advanced > Performance Settings > pilih "Adjust for best performance".
- **server manager**: matikan "IE Enhanced Security Configuration" agar kamu bisa download browser (Chrome/Edge) tanpa direcoki security popup tiap detik.
- **update drivers**: biarkan windows melakukan update driver cloud-nya sebentar agar performa grafis lebih stabil.

---

## opsi b: rdp ubuntu kilat & gratis (docker method)

ini solusinya buat yang males setup kartu kredit atau cuma butuh browsing cepat via browser. kita pake platform docker yang jalan di atas cloud shell.

### 1. jalankan google cloud shell
klik logo **Shell** (`>_`) di pojok kanan atas dashboard google.

![icon shell dashboard](/assets/img/rdp-gcp-shell-btn.png)

### 2. eksekusi perintah container
copy paste perintah di bawah ini ke terminal shell:
```bash
docker run -p 6070:80 dorowu/ubuntu-desktop-lxde-vnc
```
perintah ini bakal otomatis men-download lingkungan desktop ubuntu lengkap dengan sistem remote VNC yang sudah di-bundle ke dalam web. proses ini sangat efisien karena resource cpu/ram yang dipake adalah resource dari google cloud shell itu sendiri (gratiss!).

![proses docker running](/assets/img/rdp-gcp-docker.png)

### 3. akses via web preview
tunggu sampai log di terminal berhenti dan nunjukin kalau port 80 sudah aktif.
- klik logo **Web Preview** (icon monitor kecil).
- pilih **Change Port**.
- masukkan port **6070**, lalu klik **Change and Preview**.

![konfigurasi port rdp](/assets/img/rdp-gcp-web-preview.png)

### 4. login ke desktop ubuntu
halaman baru akan terbuka di browsermu dan menampilkan desktop ubuntu lengkap dengan taskbar dan start menu. kamu bisa buka browser di dalem sana buat download file atau browsing dengan speed internet datacenter google yang mencapai 1Gbps+.

---

## tips keamanan (security audit)

jangan sembarangan pake rdp di cloud! ikuti checklist ini biar vps kamu gak digondol hacker:
1. **change default port**: secara default RDP pake port 3389. kalau bisa, ubah lewat registry biar gak gampang di-bruteforce.
2. **firewall rules**: di dashboard GCP, batasi akses port RDP cuma dari IP publik rumahan kamu saja.
3. **password kuat**: jangan pake password `12345` atau sejenisnya. pake kombinasi simbol dan angka.

---

## faq (pertanyaan umum)

**t: rdp saya kok sering putus sendiri?**
j: cek stabilitas internet lokal kamu atau naikkan spesifikasi cpu vm-nya. seringkali cpu `e2-micro` mengalami "throttling" karena overload jalanin gui windows.

**t: bisa nggak rdp ini buat mining cryptoo?**
j: **JANGAN**. google cloud sangat ketat soal mining. akun kamu bakal langsung di-suspend permanen kalau ketahuan mining tanpa izin khusus.

**t: gimana cara perpanjang masa trial-nya?**
j: setelah $300 abis, kamu harus bayar sesuai penggunaan. triknya adalah selalu matikan (Stop) vm saat tidak dipakai agar kredit tidak terpotong terus-menerus.

---

*p.s. vps kenceng mulai 15rb-an? cek aja di [awancore.biz.id](https://awancore.biz.id/) - tempatnya para sysadmin ngumpul!*