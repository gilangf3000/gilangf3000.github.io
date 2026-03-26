---
layout: post
title: "tutorial cloudflare tunnel online-kan vps tanpa perlu ip publik!"
date: 2026-03-25
emoji: ☁️
keywords: [cloudflare, tunnel, vps, security, tutorial, linux, zero trust, cloudflared, bypass nat, vps tanpa ip publik, tutorial cloudflare tunnel indonesia]
image: /assets/img/tunnel.png
---

*pernah denger istilah "server tanpa ip publik"? atau bingung cara online-kan website dari vps yang ada di balik network kantor yang ketat? cloudflare tunnel (sebelumnya argo tunnel) adalah jawaban "sultan" untuk masalah ini. di panduan tingkat tinggi (guru-guide) ini, kita bakal kupas tuntas cara setup tunnel yang nggak cuma jalan, tapi juga aman dengan standar zero trust security.*

![preview](/assets/img/tunnel.png)

### pendahuluan: kenapa hacker benci cloudflare tunnel?

di sistem konvensional, kamu harus buka port 80/443 di firewall vps dan membiarkan ip publik kamu terekspos. hacker bisa dengan mudah melakukan scanning ip dan menyerang server kamu langsung. dengan **cloudflare tunnel**, server kamu **tidak butuh port terbuka sama sekali**. server kamu hanya melakukan koneksi *outbound* ke cloudflare, dan cloudflare yang akan mengirimkan trafik ke server kamu lewat jalur terenkripsi.

---

## keunggulan menggunakan argo tunnel (cloudflared)

sebelum masuk ke langkah teknis, mari kita bedah kenapa para ahli keamanan memilih ini:
1. **zero attack surface**: tidak ada ip publik yang bisa diping atau discan oleh botnet.
2. **bypass firewall/nat**: bisa jalan di vps nat (seperti vps liteserver atau provider lokal) bahkan di laptop rumah.
3. **automatic ssl**: kamu dapet sertifikat ssl premium dari cloudflare tanpa perlu install certbot/letsencrypt di server sendiri.
4. **identity-aware proxy**: kamu bisa tambahkan login email sebelum orang bisa akses website kamu (via zero trust access).

---

## langkah 1: instalasi cloudflared (the binary)

kita butuh aplikasi kecil bernama `cloudflared` yang berfungsi sebagai "jembatan" antara vps kamu dan jaringan google-nya cloudflare.

```bash
# download binary versi linux amd64 terbaru
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb

# install menggunakan dpkg
sudo dpkg -i cloudflared-linux-amd64.deb
```
pastikan instalasi sukses dengan mengetik `cloudflared --version`. kalau muncul versi aplikasinya, berarti aman.

---

## langkah 2: pembuatan tunnel (the dashboard way)

ada dua cara: via cli atau dashboard. saya sangat menyarankan via dashboard (zero trust dashboard) karena lebih gampang dimonitor.

1. login ke [Cloudflare Zero Trust](https://one.dash.cloudflare.com/).
2. klik menu **Networks > Tunnels**.
3. pilih **Create a Tunnel** dan kasih nama (misal: `vps-utama-tunnel`).
4. pilih **Cloudflared** sebagai environment.
5. copy **TOKEN** unik yang muncul di dashboard. token ini adalah "kunci" yang menghubungkan vps kamu ke tunnel tersebut.

---

## langkah 3: konfigurasi as a service

agar tunnel kamu nggak mati saat terminal ditutup atau saat vps reboot, kita harus pasang sebagai systemd service.

```bash
# ganti <TOKEN> dengan token asli dari dashboard tadi
sudo cloudflared service install <TOKEN-ANDA>

# jalankan service
sudo systemctl start cloudflared
sudo systemctl enable cloudflared
```
cek statusnya di dashboard cloudflare. kalau indikatornya sudah **Healthy (Hijau)**, selamat! jembatan kamu sudah terbangun.

![status tunnel healthy](/assets/img/healthy.png)

---

## langkah 4: routing domain (the final touch)

sekarang jembatannya sudah ada, tapi cloudflare belum tau trafik ke domain mana yang harus dikirim ke tunnel ini.
- di dashboard tunnel, klik tab **Public Hostname**.
- klik **Add a public hostname**.
- **subdomain**: misal `web`.
- **domain**: pilih domain kamu (misal `gilang.com`).
- **service type**: pilih `HTTP`.
- **url**: masukkan `localhost:80` (jika aplikasi web kamu jalan di port 80).

![konfigurasi hostname](/assets/img/tunnel-dash.png)

---

## level expert: multi-app & security hardening

jangan cuma satu website! satu tunnel bisa dipakai buat banyak subdomain sekaligus.

### routing ke banyak port
kamu bisa tambahkan hostname lagi:
- `api.gilang.com` -> `localhost:3000`
- `panel.gilang.com` -> `localhost:8888`

### proteksi tambahan (cloudflare access)
kamu bisa setting agar website kamu cuma bisa diakses oleh email kamu saja. masuk ke **Access > Applications** di dashboard zero trust. tambahkan domain web kamu, lalu buat policy "Allow" untuk email pribadi kamu. sekarang tiap orang yang buka web kamu bakal dimintain kode OTP yang dikirim ke email. **Hacker beneran nangis liat ini.**

---

## monitoring & troubleshooting

sebagai sysadmin, kamu wajib tau cara liat log jika tunnel bermasalah:
```bash
# liat log real-time
sudo journalctl -u cloudflared -f
```
**masalah umum:**
- **quic error**: terkadang terjadi karena firewall isp blokir protokol udp/quic. solusinya paksa tunnel pake protokol h2 (tambahkan flag `--protocol http2`).

---

*p.s. vps kenceng buat test tunnel? cek [awancore.biz.id](https://awancore.biz.id/) - harga miring spek nendang!*
