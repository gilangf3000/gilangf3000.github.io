---
layout: default
title: Home
---

{% for post in site.posts %}
- **{{ post.date | date_to_string }}**  
  [{{ post.emoji }} {{ post.title }}]({{ post.url }})
{% endfor %}
