define([
    "app",
    // Modules
    "modules/status",
    "modules/layout-main",
    // Plugins
    "zeega-parser/parser",
    "modules/media-collection",
    "backbone"
],

function( app, Status, Layout, ZeegaParser, MediaCollection ) {

    return Backbone.Model.extend({
        
        initialize: function() {
            this.loadMetadata();
            app.mediaCollection = new MediaCollection();
            this.loadProject();
        },

        loadMetadata: function() {
            var meta = $("meta[name=zeega]");

            app.userId = meta.data("userId");
            app.projectId = meta.data("projectId");
            app.root = meta.data("root");
        },

        loadProject: function( attributes ) {
            if ( window.projectJSON ) {
                this._parseData( jQuery.parseJSON( window.projectJSON ) );
            } else {
                var rawDataModel = new Backbone.Model();

                rawDataModel.url = "test.json";
                rawDataModel.fetch().success(function( response ) {
                    this._parseData( response );
                }.bind( this )).error(function() {
                    throw new Error("Ajax load fail");
                });
            }
        },

        _parseData: function( response ) {
            app.status = new Status();
            app.project = new ZeegaParser.parse( response, {
                pluginsPath: "app/zeega-parser/plugins/",
                attach: {
                    status: app.status
                }
            });

            app.status.set({
                currentSequence: app.project.sequences.at( 0 ),
                currentFrame: app.project.sequences.at( 0 ).frames.at( 0 )
            });
            console.log( app.project );
            this.insertLayout();
        },

        insertLayout: function() {
            app.layout = new Layout();
            app.layout.render();
        }

    });

});
