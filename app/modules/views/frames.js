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
            var currentSequence = this.model.status.get("currentSequence");

            this.updatedNewPageButtonState( currentSequence );
            this.renderSequenceFrames( currentSequence );
            this.makeSortable();
            this.makeDroppable();
            currentSequence.frames.on("add", this.onFrameAdd, this );
            currentSequence.frames.on("remove", this.onFrameRemove, this );
        },

        updatedNewPageButtonState: function( currentSequence ) {
            if ( app.project.get("remix").remix ) {
                if ( currentSequence.frames.length < currentSequence.frames.remixPageMax ) {
                    // enable
                    this.$(".add-frame")
                        .removeClass("disabled")
                        .attr("title","add new page");
                } else {
                    //disable
                    this.$(".add-frame")
                        .addClass("disabled")
                        .attr("title","You have reached the page limit");
                }
            }
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

        makeDroppable: function() {
            this.$(".frame-list").droppable({
                accept: ".item, .draggable-layer-type",
                tolerance: "pointer",
                drop: function( e, ui ) {
                    if ( _.contains( ["Audio"], app.dragging.get("layer_type") )) {
                        app.emit("soundtrack_added", app.dragging );
                        app.status.get('currentSequence').setSoundtrack( app.dragging, app.layout.soundtrack, { source: "drag-to-workspace" } );
                    } else {
                        app.emit("item_dropped", app.dragging );
                        // console.log("DROP TO FRAME LIST")
                        // make new page
                        // add layer to page
                        // this.model.addLayerByItem( app.dragging, { source: "drag-to-workspace" });
                    }
                }.bind( this )

            });
            // console.log("make droppable")
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
            var currentSequence = this.model.status.get("currentSequence");

            this.$(".frame-list").sortable("destroy");

            if ( frameModel.editorAdvanceToPage !== false ) {
                this.model.status.setCurrentFrame( frameModel );
            }
            this.renderSequenceFrames( currentSequence );
            this.updateFrameOrder( );
            app.emit("page_added", null);
            this.makeSortable();
            this.updatedNewPageButtonState( currentSequence );
        },

        onFrameRemove: function( frameModel, collection ) {
            var currentSequence = this.model.status.get("currentSequence");

            this.renderSequenceFrames( currentSequence );
            this.updatedNewPageButtonState( currentSequence );
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
