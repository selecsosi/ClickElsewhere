# ClickElsewhere - [![Build Status](https://travis-ci.org/selecsosi/ClickElsewhere.svg?branch=master)](https://travis-ci.org/selecsosi/ClickElsewhere)

Plugin which allows you to bind a callback that runs when a click happens outside of a element

I was building form elements that had display/input modes that switched out (demo coming), and I wanted
to know when a user clicked outside of a bounded view (which was in an edit state) so that I could save the edit.

## Requirements:

jquery - uses jquery for event handingling

## Example usage:

Simple:

```javascript
var clickedOutsideButton = false;
var callback = function(e) {
    if(e) e.preventDefault();
    //do some other stuff
    clickedOutsideButton = true;
};

ClickElsewhere.onClickElsewhere($("#button"), callback);
```

More complex:

```javascript
var nameFinishedEditing = false;
var callback = function(e) {
    if(e) e.preventDefault();
    //do some other stuff
    nameFinishedEditing = true;
};

$("#name-field").click(function(e) {
    if(e) e.preventDefault();
    //do stuff to put the name field in and edit mode
    ClickElsewhere.onClickElsewhere(this, callback);
});
```

Remove Callback:

```javascript
//Callback attached to name-field
ClickElsewhere.removeOnClickElsewhere($("#name-field"));
```

jQuery Plugin

```javascript
var clickedOutsideButton = false;
var callback = function(e) {
    if(e) e.preventDefault();
    //do some other stuff
    clickedOutsideButton = true;
};

$("#button").onClickElsewhere(callback);
```

## Authors

[Sam Lahti](https://github.com/selecsosi)
