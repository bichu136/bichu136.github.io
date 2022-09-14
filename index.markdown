---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
title: bichu136's Blogs

---
{%include mainBanner.html%}
{% include header.html%}
<div class ='post-content' style = 'overflow: auto;'>
    
    <h2 id="About">About</h2>
    {% include about.html%}
    
    {% include demos.html%}


    <h2 id="What-you-can-find-in-here">What you can find in here</h2>
    {%include carosel.html%}


    <h2 id="Recent Post">Recent Post</h2>
    {% include all_posts.html%}
</div>

{% include ToC.html%}