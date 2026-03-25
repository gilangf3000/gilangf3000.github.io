---
layout: default
title: Home
---

{% for post in site.posts %}
<div style="opacity: 0.5">{{ post.date | date_to_string  }}</div>
<h2><a href="{{ post.url }}">{{ post.emoji }} {{ post.title }}</a></h2>
{% endfor %}
