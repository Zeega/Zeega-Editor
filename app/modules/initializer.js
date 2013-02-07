define([
    "app",
    "backbone",
    // Modules
    "modules/layout-main",
    // Plugins
    "zeega-parser/parser"
],

function( app, Backbone, Layout, ZeegaParser ) {

    // Create a new module
    var Initializer = app.module();

    // This will fetch the tutorial template and render it.
    Initializer.Model = Backbone.Model.extend({
        
        initialize: function() {
            console.log('inittttter')
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
            app.project = new ZeegaParser.parse( response, {});
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
            console.log( app.project );
            this.insertLayout();
        },

        insertLayout: function() {
            console.log("insert layout");
            app.layout = new Layout();
            app.layout.render();
        }

    });

    return Initializer;

});
