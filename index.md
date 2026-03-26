---
layout: default
title: home
description: tempat sharing ide, kode, dan hasil ngulik-ngulik tech.
keywords: [home, gilang, blog, teknologi]
---

<div class="post-list">
  {% for post in site.posts %}
  <article class="post">
  {% if page.image %}
  <div class="post-hero">
    <img src="{{ page.image | relative_url }}" alt="{{ page.title }}">
  </div>
  {% endif %}
  <header class="post-header">
    <h1 class="post-title">{{ page.title }}</h1>
    <div class="post-meta">
      {{ post.date | date: "%-d %B %Y" | downcase }}
    </div>
    {% if post.image %}
    <div class="post-thumbnail">
      <a href="{{ post.url | relative_url }}">
        <img src="{{ post.image | relative_url }}" alt="{{ post.title }}">
      </a>
    </div>
    {% endif %}
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
