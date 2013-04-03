define([
    "app",

    "modules/views/navbar",
    "modules/views/project-meta",
    "modules/views/sequences",
    "modules/views/frames",
    "modules/views/frame-controls",
    "modules/views/workspace",
    "modules/views/layers",
    "modules/views/layer-controls",
    "modules/views/layer-drawer",
    "modules/views/soundtrack",

    "modules/views/media-drawer",
    "modules/views/project-preview",
    // "modules/search.model",
    "mousetrap",

    "backbone"
],

function( app, Navbar, ProjectMeta, Sequences, Frames, FrameControls, Workspace, Layers, LayerControls, LayerDrawer, Soundtrack, MediaDrawer, ProjectPreview ) {

    return Backbone.Layout.extend({

        el: "#main",
        template: "layout-main",
        manage: true,

        initialize: function() {
            app.on("rendered", this.lazyResize, this );
            $( window ).resize( this.lazyResize );
            this.listenForKeys();
        },

        beforeRender: function() {
            this.insertView( ".nav", new Navbar({ model: app }) );
            this.insertView( ".sequences", new Sequences({ model: app }) );
            this.insertView( ".workspace", new Workspace({ model: app }) );
            this.insertView( ".layers", new Layers({ model: app }) );
        },

        afterRender: function() {

            new Soundtrack({
                el: this.$(".soundtrack")
            }).render();

            new ProjectPreview({
                model: app,
                el: this.$(".project-preview")
            }).render();


            // new ProjectMeta({
            //     model: app,
            //     el: this.$(".project-meta")
            // }).render();

            new LayerDrawer({
                model: app,
                el: this.$(".layer-picker")
            }).render();

            new Frames({
                model: app,
                el: this.$(".frames")
            }).render();

            // new FrameControls({
            //     model: app,
            //     el: this.$(".frame-controls")
            // }).render();

            // new LayerControls({
            //     model: app,
            //     el: this.$(".layer-controls"),
            //     afterRender: function() {
            //         app.trigger("rendered");
            //     }
            // }).render();

            new MediaDrawer({
                model: app.mediaBrowser,
                el: this.$(".media-drawer")
            }).render();

        },

        listenForKeys: function() {
            Mousetrap.bind(['command+c', 'ctrl+c'], this.copyLayer );
            Mousetrap.bind(['command+v', 'ctrl+v'], this.pasteLayer );
        },

        copyLayer: function() {
            var layerToCopy = app.status.get("currentLayer");

            if ( layerToCopy ) {
                app.status.copyLayer( layerToCopy );

                return false;
            }
        },

        pasteLayer: function() {
            var layerToPaste = app.status.get("copiedLayer");

            if ( layerToPaste ) {
//                console.log("Paste", layerToPaste, app.status.get("currentFrame") );
                app.status.get("currentFrame").pasteLayer( layerToPaste );

                return false;
            }
        },

        lazyResize: _.debounce(function() {
            app.trigger("window-resize");
        }, 500 )

    });

});
