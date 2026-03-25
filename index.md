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
      {{ post.date | date: "%B %-d, %Y" | downcase }}
    </div>
    <h2 class="post-title">
      <a href="{{ post.url | relative_url }}">
        {{ post.emoji }} {{ post.title }}
      </a>
    </h2>
    <div class="post-excerpt">
      {{ post.excerpt | strip_html | truncatewords: 30 }}
    </div>
  </article>
  {% endfor %}
</div>
