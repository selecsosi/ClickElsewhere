(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], function ($) {
            return (root.ClickElsewhere = factory($));
        });
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(require(['jquery']));
    } else {
        // Browser globals
        root.ClickElsewhere = factory(jQuery);
    }
}(this, function($) {
    "use strict";
    var Module = {};

    var dataKey = "clickElsewhere";

    /**
     * Attaches a document level click listener that will invoke a callback
     * whenever a click is registered outside of the passed element
     *
     * @param el a DOM or jquery element that we want to watch for click outside of
     * @param callback the callback to invoke when a click is registered outside of the element
     * @param [thisArg] optional this argument to bind the callback to
     */
    var onClickElsewhere = Module.onClickElsewhere = function(el, callback, thisArg) {
        var $el;
        if(el.jquery){
            $el = el;
        } else {
            $el = $(el);
        }

        // Nifty trick from http://stackoverflow.com/a/15576211/418505
        // Adds a global listener to the document using jquery's one method to prevent
        // function duplication. checks if the resultant click interception is targeting
        // the view or not. If it is targeting the view we re-add a listener using one.
        // Otherwise we trigger the callback
        //
        // The only problem with this implementation is that it is difficult to test
        // as the implementation of `one` in jQuery wraps the callback with an anno function
        // and doesnt expose/tag the event in any direct manner. The document might have many
        // click listeners attached to it so it is also a poor candidate to examine it's event
        // registrations
        var attachDocumentOnClickCallback = function($el, callback, thisArg) {
            var onClick = function(e) {
                if($el.has(e.target).length === 0 && $el[0] != e.target){
                    $el.removeData(dataKey);
                    if(callback) {
                        if(thisArg) callback.call(thisArg);
                        else callback();
                    }
                } else {
                    $el.data(dataKey, onClick);
                    $(document).one('click', onClick);
                }
            };

            $(document).one('click', onClick);
            $el.data(dataKey, onClick);
        };

        //Check for an already attached listener before attaching
        if(!$el.data(dataKey)) {
            attachDocumentOnClickCallback($el, callback, thisArg)
        }
    };

    /**
     * Removes any events registered by onClickElsewhere
     *
     * @param el the element you want to remove the event listener from
     */
    var removeOnClickElsewhere = Module.removeOnClickElsewhere = function(el) {
        var $el;
        if(el.jquery){
            $el = el;
        } else {
            $el = $(el);
        }

        var listener = $el.data(dataKey);
        //Check if we have attached a listener to this element already
        if(listener) {
            $(document).off("click", listener);
            $el.removeData(dataKey);
        }
    };

    $.fn.onClickElsewhere = function(callback, thisArg) {
        return this.each(function() {
            onClickElsewhere(this, callback, thisArg);
        });
    };

    $.fn.removeOnClickElsewhere = function() {
        return this.each(function() {
            removeOnClickElsewhere(this);
        });
    };

    return Module;

}));
