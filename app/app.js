define([
    "backbone.layoutmanager"
], function() {

    // Provide a global location to place configuration settings and module
    // creation.
    var app = {
        // The root path to run the application.
        root: "/",
        parserPath: "app/zeega-parser/",
        api: "http://dev.zeega.org/joseph/web/api/",
        dragging: null
    };

    // Localize or create a new JavaScript Template object.
    var JST = window.JST = window.JST || {};


    // Curry the |set| method with a { silent: true } version
    // to avoid repetitious boilerplate code throughout project
    Backbone.Model.prototype.put = function() {
        var args = [].slice.call( arguments ).concat([ { silent: true } ]);
        return this.set.apply( this, args );
    };

    // Configure LayoutManager with Backbone Boilerplate defaults.
    Backbone.LayoutManager.configure({
        // Allow LayoutManager to augment Backbone.View.prototype.
        manage: true,

        // prefix: "app/templates/",

        fetch: function(path) {
            // Concatenate the file extension.
            path = "app/templates/" + path + ".html";

            // If cached, use the compiled template.
            if (JST[path]) {
                return JST[path];
            }

            // Put fetch into `async-mode`.
            var done = this.async();

            // Seek out the template asynchronously.
            $.get(app.root + path, function(contents) {
                done(JST[path] = _.template(contents));
            });
        }
    });

    // Mix Backbone.Events, modules, and layout management into the app object.
    return _.extend(app, {

        Backbone: Backbone,
        // Create a custom object with a nested Views object.
        module: function(additionalProps) {
            return _.extend({ Views: {} }, additionalProps);
        },

        $: jQuery,

        // Helper for using layouts.
        useLayout: function(options) {
            // Create a new Layout with options.
            var layout = new Backbone.Layout(_.extend({
                el: "body"
            }, options));

            // Cache the refererence.
            return this.layout = layout;
        }
    }, Backbone.Events);

});
