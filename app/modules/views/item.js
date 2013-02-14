define([
    "app",
    "backbone"
],

function( app, Backbone, ItemView ) {

    return Backbone.View.extend({

        className: function() {
            return "item item-" + this.id;
        },
        tagName: "li",
        template: "item",

        initialize: function() {
            
        },

        serialize: function() {
            return this.model.toJSON();
        },

        afterRender: function() {
            console.log('item after render', this );
        }

    });

});
