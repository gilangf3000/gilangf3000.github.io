---
layout: post
title: "tutorial: cara setup cloudflare tunnel di vps (akses tanpa ip publik)"
date: 2026-03-25
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

### 2. dapatkan tunnel token
buka dashboard cloudflare (zero trust > networks > tunnels). buat tunnel baru di sana, pilih "cloudflared" sebagai connector, lalu **copy token** yang diberikan.

![dashboard cloudflare tunnel](/assets/img/tunnel-dash.png)

### 3. jalankan tunnel dengan token
kamu gak perlu login lagi di terminal vps. cukup masukkan token yang sudah kamu copy tadi ke perintah ini untuk meng-install-nya sebagai service:
```bash
sudo cloudflared service install <copy-token-kamu-di-sini>
```

![status instalasi service](/assets/img/service-ok.png)

### 4. cek status
kamu bisa cek tunnel sudah online atau belum lewat dashboard cloudflare. kalau sudah status "healthy", berarti vps kamu sudah terhubung aman tanpa perlu buka ip publik!

![status tunnel healthy](/assets/img/healthy.png)

---

*p.s. butuh vps murah dan kenceng? cek di [awancore.biz.id](https://awancore.biz.id/) ya!*
