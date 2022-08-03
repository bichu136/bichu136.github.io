---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
title: bichu136's Blogs
---

{% for tag in site.tags %}
# {{ tag[0] }}
<hr>
<div class='tag-content'>
    {% for post in tag[1] %}
    <div class="post_item">
            <figure>
                <img src="/assets/newspaper.jpeg" style="max-width: 100%;">
            </figure>
            <a href = '{{post.url}}'>
                <div class = 'post-card'>
                    <h4>{{ post.title }}</h4><br>{{post.tag}}
                </div>
            </a>
    </div>
    {% endfor %}
 </div>
{% endfor %}
<script>
{% for tag in site.tags %}

console.log("{{ tag[0] }}");
{% endfor %}
</script>
