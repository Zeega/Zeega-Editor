define([
    "app",
    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        template: "project-share",
        
        serialize: function() {
            return this.model.project.toJSON();
        },

        events: {
            // "click .project-share-toggle": "toggleShare",
        },

    });

});
