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

            this.$el.css(_.extend({
                top: ( this.$target.offset().top + ( this.$target.height() / ( this.model.get("verticalDivision") || 2 ) ) - 21 ),
                left: "-1000%"
            }, this.model.get("css") ));

            this.render();
        },

        afterRender: function() {
            var css = {};

            if ( this.model.get("pointDirection") == "right" ) {
                css.left = this.$target.offset().left - this.$el.width() - 20 - 15 ; 
            } else {
                css.left = this.$target.offset().left + this.$target.width() + 15;
            }

            if ( css.left < 0 ) css.left = 5;

            this.$el.css( css ).show();
        },

        hide: function() {
            this.$el.fadeOut(function() {
                this.remove();
                this.options.parent.trigger("end");
            }.bind( this ));
        },

        cancel: function() {
            this.$el.fadeOut(function() {
                this.remove();
            }.bind( this ));
        },

        events: {
            "click .stop-pointing": "stopPointing"
        },

        stopPointing: function() {
            this.options.parent.collection.cancel();
        }
    });
});
