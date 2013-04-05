define([
    "app",
    // Modules
    "modules/status",
    "modules/layout-main",
    // Plugins
    "zeega-parser/parser",
    "modules/media-browser",
    "backbone"
],

function( app, Status, Layout, ZeegaParser, MediaBrowser ) {

    return Backbone.Model.extend({
        
        initialize: function() {
            app.mediaBrowser = new MediaBrowser();
            this.loadProject();
        },

        loadProject: function( attributes ) {
            if ( window.projectJSON ) {
                this._parseData( jQuery.parseJSON( window.projectJSON ) );
            } else {
                var rawDataModel = new Backbone.Model();

                // mainly for testing

                rawDataModel.url = app.api + "projects/"+ app.projectId;

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
            this.insertLayout();
        },

        insertLayout: function() {
            app.layout = new Layout();
            app.layout.render();
        }

    });

});
