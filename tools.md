---
layout: page
title: Tools
permalink: /tools/
---
<ul class="tiles list-unstyled">
  {%- assign tools = site.tools | sort: "order" -%}
  {%- for tool in tools -%}
  <li class="tile">
    <a class="tile-link" href="{{ tool.url | relative_url }}">
      <span class="tile-head">
        <i class="bi {{ tool.icon }}" aria-hidden="true"></i>
        <span class="tile-title">{{ tool.title | escape }}</span>
      </span>
      <span class="tile-preview">{{ tool.summary }}</span>
    </a>
  </li>
  {%- endfor -%}
</ul>
