define(
['jquery', 'lodash', 'backbone', 'utils/tpl'],

function($, _, Backbone, tpl) {

    WineView = Backbone.View.extend({

        initialize: function() {
            this.template = _.template(tpl.get('wine-details'));
            this.model.bind("change", this.render, this);
            
            this.model.bind('all', function(x) {
                console.log(x);
            });
        },

        render: function(eventName) {
            this.$el.html(this.template(this.model.toJSON()));
            return this.el;
        },

        events: {
            "click .save": "saveWine",
            "click .delete": "deleteWine"
        },

        saveWine: function() {
            this.model.set({
                name: $('#name').val(),
                grapes: $('#grapes').val(),
                country: $('#country').val(),
                region: $('#region').val(),
                year: $('#year').val(),
                description: $('#description').val()
            });
            if (this.model.isNew()) {
                app.wineList.create(this.model, {
                    success: function() {
                        app.navigate('wines/saved', true);
                    }
                });
            } else {

                this.model.save({
                    // Strange error: If you call save on a model that has no changes,
                    // then this success handler will not be called.
                    success: function() {
                        app.navigate('wines/saved', true);
                    }
                });

            }

            return false;
        },

        deleteWine: function() {
            this.model.destroy({
                success: function() {
                    app.navigate('wines/deleted', true);
                }
            });
            return false;
        }

    });

    return WineView;

});