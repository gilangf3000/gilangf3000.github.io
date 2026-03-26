---
layout: default
title: home
description: tempat sharing ide, kode, dan hasil ngulik-ngulik tech.
keywords: [home, gilang, blog, teknologi]
---

<div class="post-list">
  {% for post in site.posts %}
  <article class="post">
    <div class="post-title">
      <a href="{{ post.url | relative_url }}">
        {{ post.emoji }} {{ post.title }}
      </a>
    </div>
    <div class="post-excerpt">
      {{ post.content | strip_html | truncate: 165 }}
    </div>
  </article>
  {% endfor %}
</div>
