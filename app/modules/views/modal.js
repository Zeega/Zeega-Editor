define([
    "app",
    "backbone"
],

function( app ) {


    return Backbone.View.extend({

        template: "modal",
        modalClass: "",
        
        className: function() {
            console.log("cname", this.options.modal )
            return "ZEEGA-modal " + this.options.modal.className;
        },

        serialize: function() {
            console.log('this', this)
            return this.options;
        },

        show: function() {
            $("body").append( this.el );
            $("#main").addClass("modal");
            this.render();
        },
        
        events: {
            "click .modal-close": "hide"
        },

        close: function() {
            $("#main").removeClass("modal");
            this.$el.fadeOut(function() {
                this.remove();
            }.bind( this ));
        },

        hide: function() {
            this.close();
        }

    });

});
