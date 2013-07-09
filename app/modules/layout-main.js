define([
    "app",

    "modules/views/project-head",

    "modules/views/frames",
    "modules/views/workspace",
    "modules/views/layers",
    "modules/views/layer-drawer",
    "modules/views/soundtrack",
    "modules/views/media-drawer",
    "modules/pointers/pointers",
    "modules/intro-modal/intro-modal.view",
    "mousetrap",
    "tipsy",

    "backbone"
],

function( app, ProjectHead, Frames, Workspace, Layers, LayerDrawer, Soundtrack, MediaDrawer, Pointers, IntroModalView ) {

    return Backbone.Layout.extend({

        el: "#main",
        template: "app/templates/layout-main",

        initialize: function() {
            app.on("rendered", this.lazyResize, this );
            $( window ).resize( this.lazyResize );
            this.listenForKeys();
            
            this.animate = [];
            this.animate[ 0 ] = 0;
            this.animate[ 1 ] = 0;
            this.animate[ 2 ] = 0;
            app.on("media_drawer_toggle", function( api ){ this.onMediaDrawerToggle( api ); }, this );
            this.onMediaDrawerToggle("Zeega");
        },

        onMediaDrawerToggle: function( api ){
            clearInterval ( this.animateInterval );
            this.animated = 0;
            console.log("on media drawer toggle");
            if( api == "Zeega" || api == "MyZeega" || api == "Giphy" ){
                var animator = $.proxy(function(){this.animateThumbs();}, this );
                this.animateInterval = setInterval( animator, 3000 );
            }
        },

        animateThumbs: function(){
            this.animated++;
            
            $($(".browser-thumb")[this.animate[ 0 ]]).trigger("mouseout");
            $($(".browser-thumb")[this.animate[ 1 ]]).trigger("mouseout");
            $($(".browser-thumb")[this.animate[ 2 ]]).trigger("mouseout");
            
            if(this.animated < 4){
                this.animate[ 0 ] = Math.floor(Math.random( ) * Math.min($(".browser-thumb").length,20) );
                this.animate[ 1 ] = Math.floor(Math.random() * Math.min($(".browser-thumb").length,20)  );
                this.animate[ 2 ] = Math.floor(Math.random() * Math.min($(".browser-thumb").length ,20));

                $($(".browser-thumb")[this.animate[ 0 ]]).trigger("mouseover");
                $($(".browser-thumb")[this.animate[ 1 ]]).trigger("mouseover");
                $($(".browser-thumb")[this.animate[ 2 ]]).trigger("mouseover");
            } else {
                clearInterval( this.animateInterval );
            }
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
            var isEmpty =  app.project.sequences.length == 1 &&
                app.project.sequences.at( 0 ).frames.length == 1 &&
                app.project.sequences.at( 0 ).frames.at( 0 ).layers.length === 0;

            this.initialInstructions = new Pointers( this.initialSequence );

            _.delay(function(){
                this.initTips();

                if ( isEmpty && app.metadata.newUser == 1 ) {
                    this.onFirstVisit();
                }
            }.bind( this ), 1000);
        },

        onFirstVisit: function() {
            var introModalView = new IntroModalView();

            introModalView.start();
            this.initialInstructions.startPointing();
            this.pointing = true;
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
        }, 500 ),


        initialSequence: [
                {
                    listenFor: "item_dropped",

                    pointers: [{
                        target: ".ZEEGA-items",
                        content: "Drag stuff from here…",
                        color: "red",
                        canCancel: false,
                        pointDirection: "left",
                        verticalDivision: 4
                    },{
                        target: ".ZEEGA-workspace",
                        content: "…to here",
                        color: "blue",
                        canCancel: true,
                        pointDirection: "right"
                    }]
                },{
                    listenFor: "media_drawer_toggle",
                    
                    pointers: [{
                        target: ".socialz-soundcloud",
                        content: "Now pick a soundtrack for your Zeega. Click here to explore soundcloud.",
                        color: "red",
                        canCancel: true,
                        pointDirection: "left"
                    }]
                },{
                    listenFor: "soundtrack_added",

                    pointers: [{
                        target: ".ZEEGA-items",
                        content: "Drag stuff from here…",
                        color: "red",
                        canCancel: false,
                        pointDirection: "left",
                        verticalDivision: 4
                    },{
                        target: ".ZEEGA-workspace",
                        content: "…to here",
                        color: "blue",
                        canCancel: true,
                        pointDirection: "right"
                    }]
                },{
                    listenFor: "project_preview",
                    
                    pointers: [{
                        target: ".project-preview",
                        content: "Click here to see what you’ve made so far!",
                        color: "red",
                        canCancel: true,
                        pointDirection: "right"
                    }]
                },{
                    listenFor: "project_preview_ended",
                    
                    pointers: [{
                        target: ".ZEEGA-close",
                        content: "Hit ESC or click X to return to the editor",
                        color: "red",
                        canCancel: true,
                        pointDirection: "right",
                        css: {
                            zIndex: 200
                        }
                    }]
                },{
                    listenFor: "grave_open page_added",

                    pointers: [{
                        target: ".project-share",
                        content: "Now “share” what you’ve made!",
                        color: "red",
                        canCancel: true,
                        pointDirection: "right"
                    },{
                        target: ".add-frame",
                        content: "…or add a new page and keep creating",
                        color: "blue",
                        canCancel: true,
                        pointDirection: "left"
                    }]
                }

            ]

    });

});
