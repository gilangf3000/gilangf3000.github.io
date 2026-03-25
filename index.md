---
layout: default
title: Home
---

blog pribadi yg simpel buat nyatet apa aja yg menurutku menarik.  
postingan, referensi, dan hal random lainnya.

---

## latest post

{% for post in site.posts %}
- **{{ post.date | date_to_string }}**  
  [{{ post.emoji }} {{ post.title }}]({{ post.url }})
{% endfor %}

---

<div align="center">
• &ensp; • &ensp; •
</div>

---

## halaman lain

{% for page in site.misc %}
- [{{ page.title }}]({{ page.url }})
{% endfor %}
