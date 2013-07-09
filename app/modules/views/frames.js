define([
    "app",
    "modules/views/frame",

    "backbone"
],

function( app, FrameView ) {


    return Backbone.View.extend({

        template: "app/templates/frames",
        className: "ZEEGA-frames",

        afterRender: function() {
            this.renderSequenceFrames( this.model.status.get("currentSequence") );
            this.makeSortable();
            this.model.status.get("currentSequence").frames.on("add", this.onFrameAdd, this );
            this.model.status.get("currentSequence").frames.on("remove", this.onFrameRemove, this );
        },

        makeSortable: function() {
            this.$(".frame-list").sortable({
                axis: "x",
                containment: "parent",
                tolerance: "pointer",
                placeholder: "frame-placeholder",
                update: function( e, ui ) {
                    this.updateFrameOrder();
                    app.emit("pages_reordered", this.model.status.get("currentSequence") );
                }.bind(this)
            });
        },

        updateFrameOrder: function( ) {
            var frameOrder = _.map( this.$("ul.frame-list li"), function( frame ) {
                return $( frame ).data("id");
            });

            frameOrder = _.compact( frameOrder );

            _.each( frameOrder, function( frameID, i ) {
                this.model.status.get("currentSequence").frames.get( frameID ).set("_order", i );
            }, this );

            this.model.status.get("currentSequence").frames.sort();
            this.model.status.get("currentSequence").save("frames", frameOrder );
            
        },

        onFrameAdd: function( frameModel, collection ) {
            this.$(".frame-list").sortable("destroy");

            if ( frameModel.editorAdvanceToPage !== false ) {
                this.model.status.setCurrentFrame( frameModel );
            }
            this.renderSequenceFrames( this.model.status.get("currentSequence") );
            this.updateFrameOrder( );
            app.emit("page_added", null);
            this.makeSortable();
        },

        onFrameRemove: function( frameModel, collection ) {
            this.renderSequenceFrames( this.model.status.get("currentSequence") );
        },

        renderSequenceFrames: function( sequence ) {
            this.$(".frame-list").empty();

            sequence.frames.each(function( frame ) {
                if ( !frame._frameView ) {
                    frame._frameView = new FrameView({
                        model: frame,
                        attributes: {
                            "data-id": frame.id
                        }
                    });
                }

                this.$(".frame-list").append( frame._frameView.el );

                if ( app.status.get("currentFrame").id == frame.id ) {
                    frame._frameView.$el.addClass("active");
                }
                
                frame._frameView.render();
            }.bind( this ));
        },

        events: {
            "click .add-frame a": "addFrame"
        },

        addFrame: function() {
            var frameIndex = 1 + this.model.status.get("currentSequence").frames.indexOf( this.model.status.get("currentFrame") );

            this.model.status.get("currentSequence").frames.addFrame( frameIndex );
        }
        
    });

});
