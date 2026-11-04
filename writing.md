---
layout: page
title: Writing
permalink: /writing/
redirect_from: /posts/
---
{%- assign years = site.posts | group_by_exp: "p", "p.date | date: '%Y'" -%}
<div class="writing">
  <fieldset class="filter">
    <legend class="visually-hidden">Show</legend>
    <input type="radio" name="writing-filter" id="filter-all" checked>
    <label for="filter-all">All</label>
    <input type="radio" name="writing-filter" id="filter-post">
    <label for="filter-post">Posts</label>
    <input type="radio" name="writing-filter" id="filter-poem">
    <label for="filter-poem">Poems</label>
  </fieldset>

  {%- assign poem_count = site.posts | where: "layout", "poem" | size -%}
  {%- assign post_count = site.posts.size | minus: poem_count -%}
  {%- if post_count == 0 -%}<p class="filter-empty" data-for="post">No posts yet. <label for="filter-poem">Read the poems</label>.</p>{%- endif -%}
  {%- if poem_count == 0 -%}<p class="filter-empty" data-for="poem">No poems yet. <label for="filter-post">Read the posts</label>.</p>{%- endif -%}

  {%- for year in years -%}
  {%- assign year_poems = year.items | where: "layout", "poem" | size -%}
  <section class="year-group"{% if year_poems > 0 %} data-has-poem{% endif %}{% if year_poems < year.items.size %} data-has-post{% endif %}>
    <h2 class="year-heading">{{ year.name }}</h2>
    <ul class="tiles list-unstyled">
      {%- for post in year.items -%}
        {%- if post.layout == "poem" -%}
          {%- assign type = "poem" -%}
          {%- assign preview = post.content | strip_html | strip | split: "
" | first | strip -%}
        {%- else -%}
          {%- assign type = "post" -%}
          {%- assign preview = post.excerpt | strip_html | strip | truncatewords: 22 -%}
        {%- endif -%}
      <li class="tile" data-type="{{ type }}">
        <a class="tile-link" href="{{ post.url | relative_url }}">
          <span class="tile-head">
            <i class="bi {% if type == 'poem' %}bi-feather{% else %}bi-file-text{% endif %}" aria-hidden="true"></i>
            <span class="visually-hidden">{% if type == 'poem' %}Poem{% else %}Post{% endif %}:</span>
            <span class="tile-title">{{ post.title | escape }}</span>
          </span>
          <span class="tile-preview tile-preview-{{ type }}">{{ preview }}</span>
          <time class="tile-date" datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %-d" }}</time>
        </a>
      </li>
      {%- endfor -%}
    </ul>
  </section>
  {%- endfor -%}
</div>
