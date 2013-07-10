define([
    "app",
    // Modules
    "modules/status",
    "modules/layout-main",
    // Plugins
    "engine/parser",
    "modules/media-browser/media-browser",
    "analytics/analytics",
    "backbone"
],

function( app, Status, Layout, ZeegaParser, MediaBrowser, Analytics ) {

    return Backbone.Model.extend({
        
        initialize: function() {
            app.mediaBrowser = new MediaBrowser();
            app.analytics = new Analytics();
            app.analytics.setGlobals({
                "projectId": app.metadata.projectId,
                "userId": app.metadata.userId,
                "userName": app.metadata.userName,
                "app": "editor"
            });
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
            window.history.pushState("", "", app.metadata.root + app.project.id );
            app.layout = new Layout();
            app.layout.render();
        }

    });

});