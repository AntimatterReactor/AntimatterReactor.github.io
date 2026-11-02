---
layout: page
title: Writing
permalink: /writing/
redirect_from: /posts/
---
{% assign poems = site.posts | where: "layout", "poem" %}
{% assign essays = site.posts | where_exp: "p", "p.layout != 'poem'" %}
{% assign date_format = "%b %-d, %Y" %}

{% if essays.size > 0 %}
## Posts

<ul class="list-unstyled">
{% for post in essays %}
  <li><span class="text-secondary">{{ post.date | date: date_format }}</span> · <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></li>
{% endfor %}
</ul>
{% endif %}

{% if poems.size > 0 %}
## Poems

<ul class="list-unstyled">
{% for post in poems %}
  <li><span class="text-secondary">{{ post.date | date: date_format }}</span> · <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></li>
{% endfor %}
</ul>
{% endif %}
