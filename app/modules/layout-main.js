define([
    "app",

    "modules/views/project-head",

    "modules/views/frames",
    "modules/views/workspace",
    "modules/views/layers",
    "modules/views/layer-drawer",
    "modules/views/soundtrack",
    "modules/views/media-drawer",
    "modules/views/instructions",
    // "modules/search.model",
    "mousetrap",
    "tipsy",

    "backbone"
],

function( app, ProjectHead, Frames, Workspace, Layers, LayerDrawer, Soundtrack, MediaDrawer, Instructions ) {

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
            this.insertView( ".workspace", new Workspace({ model: app }) );
            this.insertView( ".layers", new Layers({ model: app }) );
        },

        afterRender: function() {

            new ProjectHead({
                model: app,
                el: this.$(".project-head")
            }).render();

            this.soundtrack = new Soundtrack({
                el: this.$(".soundtrack")
            });

            this.soundtrack.render();

            new LayerDrawer({
                model: app,
                el: this.$(".layer-picker")
            }).render();

            new Frames({
                model: app,
                el: this.$(".frames")
            }).render();

            new MediaDrawer({
                model: app.mediaBrowser,
                el: this.$(".media-drawer")
            }).render();

            this.onLayoutReady();
        },

        listenForKeys: function() {
            Mousetrap.bind(["command+c", "ctrl+c"], this.copyLayer );
            Mousetrap.bind(["command+v", "ctrl+v"], this.pasteLayer );
            Mousetrap.bind(["backspace"], this.deleteLayer );

            // window.onbeforeunload = function() { return "Do you really want to navigate away??"; }
        },

        onLayoutReady: function() {
            _.delay(function(){
                this.initTips();
                this.instructions = new Instructions();
            }.bind( this ), 1000);
        },

        initTips: function() {
            // see http://onehackoranother.com/projects/jquery/tipsy/ for docs
            $("[title]").tipsy({

                fade: true,
                gravity: function() {
                    return $(this).data("gravity") || "s";
                }
            });
        },

        copyLayer: function() {
            var layerToCopy = app.status.get("currentLayer");

            if ( layerToCopy ) {
                app.status.copyLayer( layerToCopy );

                return false;
            }
        },

        deleteLayer: function( e ) {
            var layer = app.status.get("currentLayer");

            if ( layer && confirm("do you really want to delete this layer?") ) {
                app.status.setCurrentLayer( null );
                app.status.get("currentFrame").layers.remove( layer );
            }
            e.preventDefault();
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
