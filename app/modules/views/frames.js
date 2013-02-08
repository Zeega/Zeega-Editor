define([
    "app",
    "backbone",
    "modules/views/frame"
],

function( app, Backbone, FrameView ) {


    return Backbone.View.extend({

        template: "frames",
        className: "ZEEGA-frames",

        initialize: function() {
            console.log( this.model.status.get("currentSequence") );
            this.model.status.get("currentSequence").frames.each(function( frame ) {
                this.insertView(".frame-list", new FrameView({
                    model: frame,
                    attributes: {
                        "data-id": frame.id
                    }
                }) );
            }.bind( this ));
        },

        events: {
            "click .add-sequence a": "addSequence"
        },

        addSequence: function() {
            
        }
        
    });

});
