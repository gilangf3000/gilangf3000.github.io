---
layout: post
title: "Tutorial Cloudflare Tunnel Online-kan VPS Tanpa Perlu IP Publik!"
date: 2026-03-25
emoji: ☁️
keywords: [cloudflare, tunnel, vps, security, tutorial, linux, zero trust, cloudflared, bypass nat, vps tanpa ip publik, tutorial cloudflare tunnel indonesia]
image: /assets/img/tunnel.png
---

Pernah kepikiran nggak, pengen online-kan website dari VPS tapi males ribet setting IP publik atau takut kena DDoS? Atau mungkin kamu pake provider internet yang IP-nya nggak bisa diakses dari luar (kena NAT)? Tenang, Cloudflare Tunnel (cloudflared) itu solusinya.

Dulu kita kudu buka port di firewall server, yang mana itu bahaya banget karena hacker bisa langsung nge-scan IP asli kita. Nah, kalo pake Tunnel ini, server kita jadi "tersembunyi". Koneksinya cuma satu arah (outbound) ke Cloudflare, jadi aman banget dari serangan direct-to-ip.

![preview](/assets/img/tunnel.png)

---

## Kenapa Kamu Bakal Suka Cloudflare Tunnel?

Gini lho, sebenernya ada banyak alasan kenapa tech stack ini sekarang jadi favorit sysadmin:
1. **Gak Perlu Buka Port**: Firewall server bisa kamu tutup rapet-rapet. Gak perlu buka port 80 atau 443 lagi.
2. **Bypass Internet ISP**: Buat kamu yang pake Indihome, Starlink, atau VPS yang nggak dapet IP publik statis, website kamu tetep bisa diakses dunia lewat domain.
3. **Gratis SSL**: Gak usah pusing install Certbot atau Letsencrypt lagi, Cloudflare yang ngurusin sertifikatnya secara otomatis.
4. **Keamanan Ekstra**: Karena IP asli server kamu nggak ketauan, serangan DDoS bakal mental di pintu depan Cloudflare.

---

## Cara Pasangnya (Gampang Banget!)

Kita bakal pake metode **Tunnel Token** yang baru. Jauh lebih praktis daripada cara lama yang ribet.

### 1. Install 'cloudflared' di Server
Pertama-tama, kita dapetkan dulu aplikasinya. Jalanin aja perintah ini di terminal VPS kamu:
```bash
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb
```

### 2. Ambil Kunci (Token) dari Dashboard
Sekarang, buka browser kamu dan login ke [Cloudflare Zero Trust](https://one.dash.cloudflare.com/). 
- Cari menu **Networks > Tunnels**, terus klik **Create a Tunnel**.
- Kasih nama bebas (misal: `tunnel-vps-ku`).
- Di bagian instalasi, pilih **Linux (64-bit)**. Nanti bakal muncul perintah panjang berisi **TOKEN**.
- Copy aja bagian token-nya (kode random yang panjang itu).

### 3. Aktifkan Service-nya
Balik lagi ke terminal VPS, kita pasang token tadi biar tunnelnya jalan terus biarpun VPS di-reboot. 
```bash
sudo cloudflared service install <PASTE-TOKEN-KAMU-DI-SINI>
```
Nanti kalo udah berhasil, status di dashboard Cloudflare bakal berubah jadi **Healthy (Ijo)**. Beres dehh!

### 4. Setting Alamat Domain
Nah, langkah terakhir biar orang bisa buka lewat domain: 
- Di dashboard Cloudflare Tunnel tadi, klik tab **Public Hostname**.
- Masukin subdomain yang kamu mau (misal: `web.domainku.com`).
- Di bagian **Service**, pilih `HTTP` dan arahkan ke `http://localhost:80` (kalo web server kamu jalan di port 80).
- Klik **Save**. Tunggu 1 menit, dan website kamu sudah online lewat jalur aman!
### 4. arahkan domain
- tab **public hostname > add hostname**
- isi domain/subdomain
- service: `http` url: `localhost:80`
- save.

### tips
satu tunnel bisa buat banyak domain. tinggal tambah **public hostname** baru di dashboard. misal `panel.domainku.com` tembak ke port `8888`.

kalo error, cek log:
```bash
sudo journalctl -u cloudflared -f
```

---
*p.s. vps kenceng mulai 15rb-an? cek [awancore.biz.id](https://awancore.biz.id/)*
