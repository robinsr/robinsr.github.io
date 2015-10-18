---
title: KnockoutJS Best Practices
category: javascript
tags: [Knockout,javascript,best practices]
excerpt: "Here's a collection of some simple best practices I've picked up while working with knockout."
---

Here's a collection of some simple best practices I've picked up while working with knockout.

### Always use self

Save yourself some headaches and capture the value of 'this' into a variable as the first thing you do when writing a view model:

{% highlight javascript %}
var vm = function(){
    var self = this;

    self.computedO = ko.computed(function(){
        // now I can use 'this' and 'self'
        return this;
    })
}
{% endhighlight %}

### Exposing a viewmodel

Instead of simply calling applyBindings( new myViewModel ), try this:

{% highlight javascript %}
var myVM = { viewModel : new myViewModel() }
ko.applyBindings(myVM.viewModel)
{% endhighlight %}

This way you can access the viewmodel externally like this:

{% highlight javascript %}
myVM.viewmodel.someObservable( 'set to this value ');
{% endhighlight %}

### Keep bindings simple

Avoid bindings that look like this:

{% highlight html %}
<input data-bind="value: message.val, attr: { name: message.name, id: message._id }, css: {'input-success': message.received() == 'not received, 'input-error':  message.reveived() == 'received'}, disable: message.editable() == false, hasFocus: doStuff()"></div>
{% endhighlight %}

and write all this logic in a knockout custom binding:

{% highlight html %}
<div data-bind="messageInput: message"></div>
{% endhighlight %}

{% highlight javascript %}
ko.bindingHandlers: messageInput = {
    init: function() {
        // attach focus listener
        // apply name & id attributes
    }
    update: function() {
        // respond to changes (add/remove css, disable or enable)
    }
}
{% endhighlight %}

This will make your code easier to read and understand as well as test and maintain. Checkout [this](knockout-bindings) article for more.

That's it for now. To be updated whenever I think of things. 