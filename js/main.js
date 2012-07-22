require([
    'jquery',
    'lodash',
    'backbone',
    'views/header',
    'views/start',
    'views/deleted',
    'views/status',
    'views/wine-details',
    'views/wine-list',
    'utils/tpl',
    'models/wine-model',
    'models/wine-collection',
    'models/status'
],

function($, _, Backbone, HeaderView, StartView, DeletedView, StatusView, WineView, WineListView, tpl, Wine, WineCollection, Status) {

    Backbone.View.prototype.close = function() {
        if (this.beforeClose) {
            this.beforeClose();
        }
        this.remove();
        this.unbind();
    };

    var AppRouter = Backbone.Router.extend({

        initialize: function() {
            this.header = new HeaderView();
            $('#header').html(this.header.render());
            //$('#header').append(new StatusView({model:new Status()}).render());
        },

        routes: {
            "": "list",
            "wines/new": "newWine",
            "wines/:id": "wineDetails"
        },

        list: function() {
            this.initWineList(function() {
                this.showView('#content', new StartView());
            });
        },

        wineDetails: function(id) {
            this.initWineList(function() {
                var wine = this.wineList.get(id);
                if (wine) { // If the wine with that ID exists
                    this.showView('#content', new WineView({
                        model: wine
                    }));
                } else { // Couldn't find a wine with that ID
                    this.showView('#content', new DeletedView());
                }
            });
        },

        newWine: function() {
            this.initWineList(function() {
                this.showView('#content', new WineView({
                    model: new Wine()
                }));
            });
        },

        showView: function(selector, view) {
            if (this.currentView) this.currentView.close();

            $(selector).html(view.render());
            this.currentView = view;

            return view;
        },

        initWineList: function(callback, ctx) {
            ctx = ctx || this;

            if (this.wineList) {
                callback.call(ctx);
            } else {
                this.wineList = new WineCollection();
                this.wineList.fetch({
                    success: function() {
                        var winelist = new WineListView({
                            model: app.wineList
                        });

                        $('#sidebar').html(winelist.render());

                        callback.call(ctx);
                    }
                });
            }
        }

    });

    tpl.loadTemplates(['header', 'wine-details', 'wine-list-item', 'start', 'deleted', 'status'], function() {
        window.app = new AppRouter();
        Backbone.history.start();
    });

}); // End require
