---
layout: post
title: "tutorial: cara setup cloudflare tunnel di vps (akses tanpa ip publik)"
date: 2026-03-26
emoji: ☁️
keywords: [cloudflare, tunnel, vps, security, tutorial, linux]
image: /assets/img/tunnel.png
---

*biasanya kalau mau online-kan website di vps, kita harus buka port di firewall atau punya ip publik yang terekspos langsung ke internet. tapi pakai cloudflare tunnel (cloudflared), kita bisa bikin jalur khusus yang aman tanpa perlu buka port sama sekali. selain lebih aman dari serangan ddos, ini juga solusi cerdas buat kamu yang vps-nya ada di balik nat atau gak punya ip publik statis.*

![preview](/assets/img/tunnel.png)

dengan cloudflare tunnel, trafik dari user bakal dilewatkan ke jaringan cloudflare dulu baru diteruskan ke vps kamu melalui koneksi outbound yang terenkripsi. hasilnya? server kamu jadi "tersembunyi" dari publik tapi tetap bisa diakses dengan lancar lewat domain.

---

## cara pasang

kita bakal pakai tool resmi namanya `cloudflared`. pastikan kamu sudah punya akun cloudflare dan domain yang sudah aktif di sana.

### 1. download & install cloudflared
jalankan perintah ini di vps kamu buat install versi terbarunya:
```bash
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb
```

![proses instalasi sukses](/assets/img/install.png)

### 2. login ke cloudflare
ketik perintah ini, lalu klik link yang muncul buat otorisasi domain kamu:
```bash
cloudflared tunnel login
```

![halaman otorisasi di browser](/assets/img/login.png)

### 3. buat tunnel baru
kasih nama bebas buat tunnel kamu, misal "vps-tunnel":
```bash
cloudflared tunnel create vps-tunnel
```

![id tunnel berhasil dibuat](/assets/img/create.png)
*catatan: simpan id tunnel yang muncul (berupa kode unik panjang).*

### 4. konfigurasi routing
hubungkan tunnel tersebut dengan subdomain yang kamu mau:
```bash
cloudflared tunnel route dns vps-tunnel domain.kamu.com
```

### 5. jalankan tunnel
terakhir, hubungkan tunnel ke service lokal kamu (misal website jalan di port 80):
```bash
cloudflared tunnel run --url http://localhost:80 vps-tunnel
```

![status tunnel aktif dan connected](/assets/img/status.png)

---

*p.s. butuh vps murah dan kenceng? cek di [awancore.biz.id](https://awancore.biz.id/) ya!*
