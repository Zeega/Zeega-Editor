define([
    "app",

    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        controls: [],
        inFocus: null,

        template: "layer-controls",
        className: "ZEEGA-control-floater",

        initialize: function() {
            app.status.on("change:currentLayer", this.onLayerFocus, this );
        },

        afterRender: function() {
            var $target = this.options.target.$el;

            app.trigger("rendered", this );
            this.loadControls();

            this.$el.css({
                top: $target.offset().top + "px",
                right: "160px",
                height: ( $target.height() - 2 )+ "px"
            });
            console.log("this", this)
        },

        loadControls: function() {
            _.each( this.model._controls, function( control ) {
                this.$(".layer-controls-inner").append( control.el );
                control.render();
            });

        },

        // onLayerFocus: function( status, layerModel ) {

        //     if ( this.inFocus ) {
        //         this.stopListening( this.inFocus );
        //     }

        //     if ( layerModel !== null ) {
        //         this.$(".layer-bar-title").text( layerModel.getAttr("title") );
        //         this.loadControls( layerModel );
        //     } else if ( layerModel === null ) {
        //         this.clearControls();
        //     }
        //     this.listen( layerModel );
        // },

        // listen: function( layerModel ) {
        //     if ( layerModel ) {
        //         layerModel.on("focus", this.onFocus, this );
        //         layerModel.on("blur", this.onBlur, this );
        //         layerModel.on("remove", this.onRemove, this );
        //     }
        // },

        // onFocus: function() {

        // },

        // onBlur: function() {
        //     this.clearControls();
        // },

        // onRemove: function() {
        //     this.stopListening( this.inFocus );
        //     this.clearControls();
        // },

        // clearControls: function() {
        //     this.$(".layer-bar-title").empty();
        //     this.$(".layer-controls-inner").empty();
        // }

    });

});
