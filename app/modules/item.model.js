define([
    "app",
    "modules/views/item",
    "backbone"
],

function( app, ItemView ) {

    return Backbone.Model.extend({
        
        view: null,

        initialize: function() {
            this.view = new ItemView({ model: this });
        }

    });

});
