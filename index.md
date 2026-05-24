---
layout: layouts/base.njk
title: Home
---

<section class="post-list" aria-label="Posts">
{% for post in collections.chronologicalPosts %}
  <article class="post-list-item">
    <h4><a href="{{ post.url }}">{{ post.data.title }}</a></h4>
    <p class="post-meta">
      <time datetime="{{ post.date | htmlDateString }}">{{ post.date | readableDate }}</time>
      <span aria-hidden="true">|</span>
      <a href="/categories/{{ post.data.category }}/">{{ post.data.category }}</a>
    </p>
  </article>
{% endfor %}
</section>
