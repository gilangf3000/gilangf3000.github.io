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

dengan cloudflare tunnel, trafik dari user bakal dilewatkan ke jaringan cloudflare dulu baru diteruskan ke vps kamu melalui koneksi outbound yang terenkripsi. hasilnya? server kamu jadi "tersembunyi" dari publik tapi tetap bisa diakses dengan lancar lewat domain. di tutorial ini kita akan fokus menggunakan metode **Tunnel Token** yang baru dan jauh lebih praktis daripada cara lama.

---

## kenapa pakai cloudflare tunnel?

sebelum kita masuk ke tutorialnya, ada baiknya kamu paham kenapa tech stack ini sekarang jadi "standar" keamanan server kecil:
1. **zero open ports**: kamu nggak perlu buka port 80, 443, atau yang lainnya di VPS. firewall bisa dibuat sangat ketat.
2. **bypass nat**: solusinya buat kamu yang pake provider internet yang gak dapet ip publik (contohnya pake indihome atau starlink).
3. **built-in ssl**: cloudflare otomatis ngurus sertifikat SSL (HTTPS) kamu tanpa ribet config nginx/apache manual.
4. **identity protection**: ip asli server kamu benar-benar tersembunyi, jadi aman dari ddos direct-to-ip.

---

## langkah-langkah instalasi

kita bakal menggunakan tool resmi namanya `cloudflared`. pastikan kamu sudah punya akun cloudflare dan domain yang sudah aktif di dashboard cloudflare.

### 1. download & install `cloudflared`
jalankan perintah ini di vps kamu buat install binary cloudflared versi terbarunya:
```bash
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb
```

### 2. dapatkan tunnel token dari dashboard
sekarang, tinggalkan terminal sebentar dan buka dashboard cloudflare:
- pilih menu **Zero Trust** di dashboard kiri.
- masuk ke **Networks > Tunnels**.
- klik **Create a Tunnel**, kasih nama bebas (misal: `vps-tunnel-1`).
- di halaman instalasi, pilih **Cloudflared** sebagai connector dan pilih **Linux (64-bit)**.
- google bakal kasih satu baris perintah panjang yang isinya **TOKEN**. copy bagian token-nya saja.

![dashboard cloudflare tunnel](/assets/img/tunnel-dash.png)

### 3. jalankan tunnel sebagai service
jangan cuma jalankan perintah di terminal, kita install sebagai `Systemd Service` biar tunnelnya otomatis nyala pas VPS reboot. masukkan token yang kamu copy tadi ke perintah ini:
```bash
sudo cloudflared service install <COPY-TOKEN-KAMU-DI-SINI>
```
perintah di atas bakal bikin tunnel kamu konek terus di background.

![status instalasi service](/assets/img/service-ok.png)

### 4. konfigurasi routing (public hostname)
kembali ke dashboard cloudflare, klik tab **Public Hostname** di tunnel yang baru dibuat:
- masukkan **subdomain** yang kamu mau (misal: `api.domainku.com`).
- di bagian **Service**, pilih `HTTP` dan masukkan `http://localhost:80` (atau port berapapun aplikasi kamu jalan).
- klik **Save hostname**.

---

## pro-tip: multi-service routing

punya banyak aplikasi di satu VPS? kamu nggak perlu bikin tunnel baru tiap aplikasi. cukup tambahkan entry baru di tab **Public Hostname**:
- Entry 1: `web.domainku.com` -> `http://localhost:3000`
- Entry 2: `panel.domainku.com` -> `http://localhost:8888`
semuanya bakal lewat satu tunnel yang sama secara aman.

---

## troubleshooting & logs
kalau status di dashboard cloudflare masih "Inactive" atau "Down", kamu bisa cek logs di VPS kamu dengan perintah:
```bash
sudo journalctl -u cloudflared -f
```
perhatikan baris error-nya. biasanya masalahnya cuma di koneksi internet vps atau token yang salah copy-paste.

---

![status tunnel healthy](/assets/img/healthy.png)

*p.s. butuh vps murah dan kenceng? cek di [awancore.biz.id](https://awancore.biz.id/) ya!*
