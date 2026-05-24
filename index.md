---
layout: layouts/base.njk
title: Home
---

<section class="post-list" aria-label="Posts">
{% for post in collections.chronologicalPosts %}
  <article class="post-list-item">
    <h4><a href="{{ post.url }}">{{ post.data.title }}</a></h4>
    <p class="post-date">
      <time datetime="{{ post.date | htmlDateString }}">{{ post.date | readableDate }}</time>
    </p>
  </article>
{% endfor %}
</section>
