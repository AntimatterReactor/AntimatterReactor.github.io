---
layout: page
title: Projects
permalink: /projects/
---
{% if site.data.projects.size > 0 %}
{% for p in site.data.projects %}
### {{ p.name }}
{% if p.platform or p.status %}<p class="text-secondary">{{ p.platform }}{% if p.platform and p.status %} · {% endif %}{{ p.status }}</p>{% endif %}
{{ p.summary }}
{% if p.stack %}<p class="text-secondary">{{ p.stack | join: ", " }}</p>{% endif %}
{% if p.links %}<p>{% for l in p.links %}<a href="{{ l[1] }}">{{ l[0] }}</a>{% unless forloop.last %} · {% endunless %}{% endfor %}</p>{% endif %}
{% endfor %}
{% else %}
Nothing listed yet. Source code lives on [GitHub](https://github.com/{{ site.username.github }}).
{% endif %}
