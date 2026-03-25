---
layout: default
title: home
description: tempat sharing ide, kode, dan hasil ngulik-ngulik tech.
keywords: [home, gilang, blog, teknologi]
---

<div class="post-list">
  {% for post in site.posts %}
  <article class="post-item">
    <div class="post-meta">
      {{ post.date | date: "%-d %B %Y" | downcase }}
    </div>
    <div class="post-title">
      <a href="{{ post.url | relative_url }}">
        {{ post.emoji }} {{ post.title }}
      </a>
    </div>
    <div class="post-excerpt">
      {{ post.content | strip_html | split: "." | first | append: "..." }}
    </div>
  </article>
  {% endfor %}
</div>
