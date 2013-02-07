define([
    "app",
    "backbone"
],

function( app, Backbone ) {

    // This will fetch the tutorial template and render it.
    ProjectMeta = Backbone.View.extend({

        template: "project-meta",
        className: "ZEEGA-project-meta",

        serialize: function() {
            console.log('meta')
            return this.model.project.toJSON();
        }
    });

    // Required, return the module for AMD compliance
    return ProjectMeta;

});
