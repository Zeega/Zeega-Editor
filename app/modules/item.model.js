define([
    "app",
    "backbone",
    "modules/views/item"

],

function( app, Backbone, ItemView ) {

    return Backbone.Model.extend({
        
        view: null,

        initialize: function() {
            this.view = new ItemView({ model: this });
        }

    });

});
