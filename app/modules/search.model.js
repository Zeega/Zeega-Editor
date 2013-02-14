define([
    "app",
    "backbone",

    "modules/search.collection",
    "modules/views/items"
],

function( app, Backbone, SearchCollection, ItemsView ) {

    return Backbone.Model.extend({
        
        items: null,
        history: [],

        defaults: {
            collection: "",
            content: "-Project",
            page: 1,
            query: "",
            sort: "date-desc"
        },

        initialize: function() {

            app.once("rendered", this.onLayoutRendered, this );
            // create collection. bootstraps itself
            this.collection = new SearchCollection([], { search: this });
            this.collection.on("reset", this.onCollectionReset, this );
        },

        onLayoutRendered: function() {
            var itemsView = new ItemsView({
                model: app,
                el: app.layout.$(".media-drawer")
            });

            itemsView.render();
            app.layout.itemsView = itemsView;
        },

        onCollectionReset: function( collection ) {
            app.layout.itemsView.collection = collection;
            console.log(app.layout.itemsView)
            app.layout.itemsView.renderItems();
        }

    });

});
