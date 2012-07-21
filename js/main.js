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
    'models/wine-collection'
],

function($, _, Backbone, HeaderView, StartView, DeletedView, StatusView, WineView, WineListView, tpl, Wine, WineCollection) {

    Backbone.View.prototype.close = function() {
        //console.log('Closing view ' + this);
        if (this.beforeClose) {
            this.beforeClose();
        }
        this.remove();
        this.unbind();
    };

    var AppRouter = Backbone.Router.extend({

        initialize: function() {
            $('#header').html(new HeaderView().render());
            this.initWineList();
        },

        routes: {
            "": "list",
            "wines/new": "newWine",
            "wines/deleted": "deleted",
            "wines/saved": "saved",
            "wines/:id": "wineDetails"
        },

        list: function() {
            this.showView('#content', new StartView());
        },

        wineDetails: function(id) {
            var wine = this.wineList.get(id);

            if (wine) { // If the wine with that ID exists
                this.showView('#content', new WineView({
                    model: wine
                }));
            } else { // Couldn't find a wine with that ID
                this.showView('#content', new DeletedView());
            }
        },

        newWine: function() {
            this.showView('#content', new WineView({
                model: new Wine()
            }));
        },

        deleted: function() {
            this.showStatus('deleted');
        },

        saved: function() {
            this.showStatus('saved');
        },

        showStatus: function(status) {
            var model = new Backbone.Model({message:status});
            this.showView('#content', new StatusView({model: model}));
        },

        showView: function(selector, view) {
            if (this.currentView) this.currentView.close();

            $(selector).html(view.render());
            this.currentView = view;

            return view;
        },

        initWineList: function(callback) {
            this.wineList = new WineCollection();
            this.wineList.fetch({
                success: function() {
                    var winelist = new WineListView({
                        model: app.wineList
                    });

                    $('#sidebar').html(winelist.render());
                }
            });
        }

    });

    tpl.loadTemplates(['header', 'wine-details', 'wine-list-item', 'start', 'deleted', 'status'], function() {
        window.app = new AppRouter();
        Backbone.history.start();
    });

}); // End require
