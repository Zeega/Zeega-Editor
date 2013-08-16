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
            this.updatedNewPageButtonState();
            this.renderSequenceFrames();
            this.makeSortable();
            this.makeDroppable();

            app.zeega.getCurrentProject().pages.on("add", this.onFrameAdd, this );
            app.zeega.getCurrentProject().pages.on("remove", this.onFrameRemove, this );
        },

        updatedNewPageButtonState: function() {
            var currentProject = app.zeega.getCurrentProject()

            if ( currentProject.get("remix").remix ) {
                if ( currentProject.pages.length < currentProject.pages.remixPageMax ) {
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
                    app.emit("pages_reordered", app.zeega.getCurrentProject() );
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
//                        app.status.get('currentSequence').setSoundtrack( app.dragging, app.layout.soundtrack, { source: "drag-to-workspace" } );
                    } else {
                        app.emit("item_dropped", app.dragging );
                        // console.log("DROP TO FRAME LIST")
                        // make new page
                        // add layer to page
                        app.zeega.getCurrentProject().addPageByItem( app.dragging );
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
                app.zeega.getCurrentProject().pages.get( frameID ).set("_order", i );
            }, this );

            app.zeega.getCurrentProject().pages.sort();
            app.zeega.getCurrentProject().setPageOrder( frameOrder );
            
        },

        onFrameAdd: function( pageModel, collection ) {
            this.$(".frame-list").sortable("destroy");

            if ( pageModel.editorAdvanceToPage !== false ) {
                app.zeega.setCurrentPage( pageModel );
            }

            this.renderSequenceFrames();
            this.updateFrameOrder( );
            app.emit("page_added", null);
            this.makeSortable();
            this.updatedNewPageButtonState();
        },

        onFrameRemove: function( frameModel, collection ) {
            this.renderSequenceFrames();
            this.updatedNewPageButtonState();
        },

        renderSequenceFrames: function() {
            this.$(".frame-list").empty();

            app.zeega.get("currentProject").pages.each(function( page ) {
                if ( !page._frameView ) {
                    page._frameView = new FrameView({
                        model: page,
                        attributes: {
                            "data-id": page.id
                        }
                    });
                }

                this.$(".frame-list").append( page._frameView.el );

                if ( app.zeega.get("currentPage").id == page.id ) {
                    page._frameView.$el.addClass("active");
                }
                
                page._frameView.render();
            }.bind( this ));
        },

        events: {
            "click .add-frame a": "addFrame"
        },

        addFrame: function() {
            var pageIndex = 1 + app.zeega.getCurrentProject().pages.indexOf( app.zeega.getCurrentPage() );

            app.zeega.getCurrentProject().pages.addPage( pageIndex );
        }
        
    });

});
