---
title: HTML5 ClassList
category: html
tags: [HTML5,cssFiles,classList]
excerpt: "It used to be pretty difficult to add and remove classes from page elements. Using vanilla JS required making a regular expression to search the elements class attribute for a match. JS libraries simplified the process but now HTML5 makes it even easier"
---

It used to be pretty difficult to add and remove classes from page elements. Using vanilla JS required making a regular expression to search the elements class attribute for a match. JS libraries simplified the process (such as jQuery's "toggleClass()"). But now HTML5 makes it even easier

{% highlight javascript %}
myElement.classList.add( 'myClassName' ); // now it's added
myElement.classList.remove( 'myClassName' ); // now it's removed
myElement.classList.toggle( 'myClassName' ); // toggle on or off
myElement.classList.contains( 'myClassName' ); //returns true or false
{% endhighlight %}

Supported in all major browsers (IE 10+) as of Feb 2013