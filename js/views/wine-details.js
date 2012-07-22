define(
['jquery', 'lodash', 'backbone', 'utils/tpl', 'models/status', 'views/status'],

function($, _, Backbone, tpl, Status, StatusView) {

    var WineView = Backbone.View.extend({

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
            var self = this;

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
                        self.sendStatus('success', 'saved');
                        app.navigate('wines/' + self.model.id , true);
                    }
                });
            } else {

                this.model.save(null, {
                    success: function() {
                        self.sendStatus('success', 'saved');
                    }
                });

            }

            return false;
        },

        deleteWine: function() {
            var self = this;
            this.model.destroy({
                success: function() {
                    self.sendStatus('success', 'deleted');
                    app.navigate('', true);
                }
            });
            return false;
        },

        sendStatus: function(type, op) {
            var status = new Status({type:type, operation:op});
            app.header.addStatus(new StatusView({model:status}));
        }

    });

    return WineView;

});