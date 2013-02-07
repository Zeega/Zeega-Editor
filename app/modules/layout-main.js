define([
    "app",
    "backbone",

    "modules/views/navbar",
    "modules/views/project-meta",
    "modules/views/sequences"

],

function( app, Backbone, Navbar, ProjectMeta, Sequences ) {

    return Backbone.Layout.extend({

        el: "#main",
        template: "layout-main",

        initialize: function() {

        },

        beforeRender: function() {
            this.insertView( ".nav", new Navbar({ model: app }) );
            this.insertView( ".project-meta", new ProjectMeta({ model: app }) );
            this.insertView( ".sequences", new Sequences({ model: app }) );
        }
    });

});
