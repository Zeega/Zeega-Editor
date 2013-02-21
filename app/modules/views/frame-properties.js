define([
    "app",
    "backbone"
],

function() {

    return Backbone.View.extend({

        tagName: "li",
        template: "frame-properties",
        className: "ZEEGA-frame-properties"

    });

});
