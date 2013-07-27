define([
    "app",
    // Modules
    "modules/status",
    "modules/layout-main",
    // Plugins
    "engine/parser",
    "analytics/analytics",
    "backbone"
],

function( app, Status, Layout, ZeegaParser, Analytics ) {

    return Backbone.Model.extend({
        
        initialize: function() {

            app.analytics = new Analytics();
            app.analytics.setGlobals({
                "projectId": app.metadata.projectId,
                "userId": app.metadata.userId,
                "userName": app.metadata.userName,
                "app": "editor"
            });

            if( app.metadata.newUser ){
                app.analytics.people.set({
                    $id : app.metadata.userId,
                    $username: app.metadata.userUsername,
                    $created: new Date(),
                    $name: app.metadata.userName,
                    $email: app.metadata.userEmail
                });
                app.emit("new_user", {});
            } else {
                app.analytics.people.set({
                    $id : app.metadata.userId,
                    $username: app.metadata.userUsername,
                    $name: app.metadata.userName
                });
            }

            app.analytics.identify( app.metadata.userUsername );

            if( app.metadata.newZeega ){
                app.analytics.people.increment("zeegas");
                app.emit("new_zeega", {});
            }

            app.analytics.people.increment("editor_sessions");

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
            if( !app.metadata.dev ){
                var location = app.metadata.root == "/" ? app.metadata.root + "editor/" + app.project.id : "/" + app.metadata.root + "editor/" + app.project.id;
                window.history.pushState("", "", location );
 
            }
           
            app.layout = new Layout();
            app.layout.render();
        }

    });

});