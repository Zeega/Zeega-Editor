define([
    "app",
    "backbone",
    // Modules
    "modules/status",
    "modules/layout-main",
    // Plugins
    "zeega-parser/parser"
],

function( app, Backbone, Status, Layout, ZeegaParser ) {

    return Backbone.Model.extend({
        
        initialize: function() {
            this.loadProject();
        },

        loadProject: function( attributes ) {
            if ( window.projectJSON ) {
                this._parseData( window.projectJSON );
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
            // app.project = new ZeegaParser.parse( response,
            //     _.extend({},
            //         this.toJSON(),
            //         {
            //             attach: {
            //                 status: this.status,
            //                 relay: this.relay
            //             }
            //         })
            //     );
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
