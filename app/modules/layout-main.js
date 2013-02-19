define([
    "app",

    "modules/views/navbar",
    "modules/views/project-meta",
    "modules/views/sequences",
    "modules/views/frames",
    "modules/views/workspace",
    "modules/views/layers",
    "modules/views/frame-properties",
    "modules/search.model",

    "backbone"
],

function( app, Navbar, ProjectMeta, Sequences, Frames, Workspace, Layers, FrameProperties, SearchModel ) {

    return Backbone.Layout.extend({

        el: "#main",
        template: "layout-main",

        initialize: function() {
            var lazyResize = _.debounce(function() {
                this.lazyResize();
            }.bind( this ), 300);

            $( window ).resize( lazyResize );
        },

        beforeRender: function() {
            this.insertView( ".nav", new Navbar({ model: app }) );
            //this.insertView( ".project-meta", new ProjectMeta({ model: app }) );
            this.insertView( ".sequences", new Sequences({ model: app }) );
            //this.insertView( ".frames", new Frames({ model: app }) );
            this.insertView( ".workspace", new Workspace({ model: app }) );
            this.insertView( ".layers", new Layers({ model: app }) );
        },

        afterRender: function() {
            // I like this better. eliminates wasted elements
            app.search = new SearchModel();

            new ProjectMeta({
                model: app,
                el: this.$(".project-meta")
            }).render();

            new Frames({
                model: app,
                el: this.$(".frames")
            }).render();

            new FrameProperties({
                model: app,
                el: this.$(".frame-properties"),
                afterRender: function() {
                    app.trigger("rendered");
                }
            }).render();

        },

        lazyResize: function() {
            // var height, width;

            // width = window.innerWidth - $(".left-column").width();
            // height = window.innerHeight - $(".project-navs").height();
            // console.log("lazy resize", this, width, height)
            app.trigger("window-resize");
        }
    });

});
