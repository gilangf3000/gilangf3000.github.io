# gilangf3000's space — catatan & arsip

blog pribadi yg simpel buat nyatet apa aja yg menurutku menarik.  
postingan, referensi, dan hal random lainnya.

---

## latest post

{% for post in site.posts %}
- **{{ post.date | date_to_string }}**  
  [{{ post.emoji }} {{ post.title }}]({{ post.url }})
{% endfor %}

---

## • &ensp; • &ensp; •

---

## halaman lain

{% for page in site.misc %}
- [{{ page.title }}]({{ page.url }})
{% endfor %}

---

## link link menarik

### [original index →](index1.html)

### neat stuff (masi berantakan tp oke lah):

- [The Ultimate Game Hacking Resource](https://github.com/dsasmblr/game-hacking)
- [The Ultimate Online Game Hacking Resource](https://github.com/dsasmblr/hacking-online-games)
- [vgce - Video Game Content Extraction](https://github.com/ohio813/vgce/tree/master/docs)

---

<div align="center">
  <sub>dibuat pake jekyll • santuy aja</sub>
</div>
