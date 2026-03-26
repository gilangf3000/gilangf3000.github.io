---
layout: post
title: "tutorial: cara membuat rdp menggunakan google cloud (windows & ubuntu desktop)"
date: 2026-03-26
emoji: 🖥️
keywords: [google cloud, gcp, rdp, vps, windows, ubuntu, tutorial, linux, server]
image: /assets/img/rdp-gcp-ok.png
---

*butuh komputer yang nyala terus buat bot atau sekadar browsing kenceng? google cloud platform (gcp) punya dua cara ampuh buat bikin rdp secara gratis. kamu bisa pilih mau pake windows server yang "asli" atau pake trik ubuntu desktop lewat cloud shell yang super cepat. di tutorial ini, kita bahas keduanya biar kamu tinggal pilih mana yang paling cocok buat kebutuhanmu.*

![preview rdp gcp](/assets/img/rdp-gcp-ok.png)

---

## opsi a: windows rdp "asli" (pake vm instance)

metode ini disarankan buat kamu yang butuh windows "asli" dengan akses administrator penuh. cocok buat rdp harian yang berat. 
**Langkah pertama:** Buka [Google Cloud Console](https://console.cloud.google.com/) dan login pake akun Google-mu.

### 1. buat vm instance baru
buka dashboard gcp, masuk ke menu **compute engine > vm instances**, lalu klik **create instance**. kasih nama yang gampang kyk `rdp-windows-ku`.

### 2. ubahkan boot disk ke windows
ini bagian paling penting! di **boot disk**, klik **change**. ganti opsinya dari debian ke **windows server**. pilih versi terbaru (windows server 2022). kasih ukuran disk minimal 50gb biar gak gampang penuh.

### 3. aktifkan firewall & rdp access
centang **allow http traffic** dan **allow https traffic**. setelah instance berhasil dibuat, klik tanda panah di sebelah tombol RDP, lalu pilih **set windows password**. tulis username-mu dan simpan password yang dikasih (jangan sampe ilang!).

### 4. hubungkan via rdp
buka aplikasi **remote desktop connection** di laptop kamu, masukkan **ip external** vps tadi, masukkan username & password. tara! windows rdp siap digeber.

---

## opsi b: ubuntu rdp kilat (pake cloud shell & docker)

ini adalah cara "life-hack" buat kamu yang pengen rdp instan tanpa setup vm yang lama. kita bakal pake docker buat jalanin browser desktop ubuntu.
**Langkah pertama:** Buka [Google Cloud Console](https://console.cloud.google.com/) dan klik logo shell di pojok kanan atas.

### 1. buka google cloud shell
klik logo **shell** di pojok kanan atas dashboard gcp (sebelah lonceng).

![klik shell btn](/assets/img/rdp-gcp-shell-btn.png)

### 2. jalankan shell desktop
copy dan paste perintah sakti ini ke terminal:
```bash
docker run -p 6070:80 dorowu/ubuntu-desktop-lxde-vnc
```
tunggu proses download sourcenya sampai selesai.

![proses shell rdp](/assets/img/rdp-gcp-docker.png)

### 3. setting port preview
klik icon **web preview** (kotak panah), pilih **change port**. masukkan port **6070**, lalu klik **change and preview**.

![change port vps](/assets/img/rdp-gcp-web-preview.png)

### 4. rdp browser aktif!
browser bakal buka tab baru yang isinya tampilan desktop ubuntu desktop. kenceng banget dan bisa dipake browsing atau jalanin aplikasi linux.

![hasil rdp browser](/assets/img/rdp-gcp-ok.png)

---

*p.s. butuh vps murah dan kenceng? cek di [awancore.biz.id](https://awancore.biz.id/) ya!*