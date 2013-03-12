define([
    "app",
    "modules/views/frame",

    "backbone"
],

function( app, FrameView ) {


    return Backbone.View.extend({

        template: "frames",
        className: "ZEEGA-frames",

        afterRender: function() {
            this.renderSequenceFrames( this.model.status.get("currentSequence") );
            this.makeSortable();
            this.model.status.get("currentSequence").frames.on("add remove", this.onFrameCollectionUpdate, this );
        },

        makeSortable: function() {
            this.$(".frame-list").sortable({
                axis: "x",
                containment: "parent",
                tolerance: "pointer",
                placeholder: "frame-placeholder",
                update: function( e, ui ) {
                    this.updateFrameOrder();
                }.bind(this)
            });
        },

        updateFrameOrder: function() {
            var frameOrder = _.map( this.$("ul.frame-list li"), function( frame ) {
                return parseInt( $( frame ).data("id"), 10 );
            });

            this.model.status.get("currentSequence").save("frames", _.compact( frameOrder ) );
        },

        onFrameCollectionUpdate: function( frameModel, collection ) {
            this.renderSequenceFrames( this.model.status.get("currentSequence") );
        },

        renderSequenceFrames: function( sequence ) {
            this.$(".frame-list").empty();

            sequence.frames.each(function( frame ) {
                var newFrameView = new FrameView({
                    model: frame,
                    attributes: {
                        "data-id": frame.id
                    }
                });

                this.$(".frame-list").append( newFrameView.el );

                if ( app.status.get("currentFrame").id == frame.id ) {
                    newFrameView.$el.addClass("active");
                }
                
                newFrameView.render();
            }.bind( this ));
        },

        events: {
            "click .add-frame a": "addFrame"
        },

        addFrame: function() {
            this.model.status.get("currentSequence").frames.addFrame();
        }
        
    });

});
