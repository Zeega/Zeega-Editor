define([
    "app",
    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        $target: null,

        className: function() {
            return "pointer point-" + this.model.get("pointDirection")
        },

        template: "pointer",

        serialize: function() {
            return this.model.toJSON();
        },

        show: function() {
            this.$target = $( this.model.get("target") );

            $("#main").prepend( this.el );

            this.$el.css({
                top: ( this.$target.offset().top + ( this.$target.height() / ( this.model.get("verticalDivision") || 2 ) ) - 21 ),
                left: "-1000%"
            });

            this.render();
        },

        afterRender: function() {
            var css = {};

            if ( this.model.get("pointDirection") == "right" ) {
                css.left = this.$target.offset().left - this.$el.width() - 20 - 15 ; 
            } else {
                css.left = this.$target.offset().left + this.$target.width() + 15;
            }

            this.$el.css( css );
        },

        hide: function() {
            this.$el.fadeOut(function() {
                this.remove();
                this.model.trigger("end");
            }.bind( this ));
        }
    });
});
