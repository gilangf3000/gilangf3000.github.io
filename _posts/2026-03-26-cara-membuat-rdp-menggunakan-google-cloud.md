---
layout: post
title: "tutorial: cara membuat rdp menggunakan google cloud (windows & ubuntu lengkap)"
date: 2026-03-26
emoji: 🖥️
keywords: [google cloud, gcp, rdp, vps, windows, ubuntu, tutorial, linux, server]
image: /assets/img/rdp-header.png
---

*butuh komputer yang nyala terus 24 jam nonstop buat running bot, download file gede, atau buat browsing super cepat tanpa lag? google cloud platform (gcp) punya solusinya. lewat tutorial lengkap ini, kita bakal bahas dua cara ampuh buat bikin rdp: pake windows server (vm asli) buat kamu yang pengen kualitas windows murni, atau pake trik ubuntu desktop lewat cloud shell yang gratis dan super kilat.*

![preview rdp gcp](/assets/img/rdp-header.png)

---

## persiapan awal
sebelum mulai, pastikan kamu sudah punya akun google cloud yang aktif. biasanya google kasih **$300 credit** (gratis trial) buat pengguna baru. ini modal utama kita buat bikin rdp secara gratis.

---

## opsi a: windows rdp "spek dewa" (pake vm instance)

metode ini disarankan buat kamu yang butuh windows "asli" dengan akses administrator penuh. cocok buat rdp harian yang berat.

### 1. buat vm instance baru
- buka dashboard gcp, cari menu **compute engine > vm instances**.
- klik tombol **create instance**.
- kasih nama bebas, misal `vps-windows-rdp`.
- pilih region terdekat (misal `asia-southeast2` jakarta) biar ping-nya kecil.

### 2. pilih boot disk windows server
ini bagian paling krusial! scroll ke blok **boot disk** dan klik **change**. 
- ganti operating system ke **windows server**.
- saranku pilih versi **windows server 2022 datacenter**.
- ubah ukuran disk minimal **50gb** (default biasanya 50gb). klik select.

### 3. atur firewall & identity
- di bagian firewall, centang **allow http traffic** dan **allow https traffic**.
- klik tombol **create** dan tunggu status vm-nya muncul centang hijau.

### 4. generate password windows
setelah vm menyala, klik tanda panah kecil di sebelah tombol RDP, lalu pilih **set windows password**. 
- buat username bebas.
- klik set, dan google bakal kasih password unik panjang. **simpan pasword ini baik-baik!**

### 5. hubungkan via rdp
buka aplikasi **remote desktop connection** di komputer kamu. masukkan **ip external** dari dashboard gcp. login pake username dan password yang tadi dikasih. selamat, rdp windows-mu sudah aktif!

---

## opsi b: ubuntu rdp kilat (pake cloud shell & docker)

ini adalah cara "life-hack" buat kamu yang pengen rdp instan tanpa setup vm yang lama. kita bakal pake docker buat jalanin browser desktop ubuntu.

### 1. buka cloud shell
klik logo **shell** (`>_`) di pojok kanan atas dashboard cloud console. tunggu sampai terminalnya terbuka dan terkoneksi.

![icon shell dashboard](/assets/img/rdp-step-1.png)

### 2. jalankan perintah docker
copy dan paste perintah sakti ini ke terminal cloud shell:
```bash
docker run -p 6070:80 dorowu/ubuntu-desktop-lxde-vnc
```
tunggu sampai proses pull image dan running-nya selesai. proses ini biasanya cuma makan waktu 1-2 menit saja.

![status docker running](/assets/img/rdp-step-4.png)

### 3. akses via web preview
setelah script jalan, kita perlu buka aksesnya lewat browser:
- klik logo **web preview** (kotak panah ke atas) di pojok kanan atas Cloud Shell.
- pilih menu **change port**.
- masukkan port **6070**, lalu klik **change and preview**.

![change port gcp](/assets/img/rdp-step-6.png)

### 4. beres!
browser Anda bakal buka tab baru yang isinya tampilan desktop ubuntu desktop. kenceng banget buat ditaruh bot atau sekadar browsing iseng.

![desktop ubuntu aktif](/assets/img/rdp-final.png)

---

*p.s. butuh vps murah dan kenceng? cek di [awancore.biz.id](https://awancore.biz.id/) ya!*