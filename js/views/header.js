define(
['jquery', 'lodash', 'backbone', 'utils/tpl'],

function($, _, Backbone, tpl) {

    var HeaderView = Backbone.View.extend({

        initialize: function() {
            this.template = _.template(tpl.get('header'));
        },

        render: function(eventName) {
            this.$el.html(this.template());
            return this.el;
        },

        events: {
            "click .new": "newWine"
        },

        newWine: function(event) {
            app.navigate("wines/new", true);
            return false;
        },

        addStatus: function(view) {
            var el = view.render();
            this.$el.parent().append(el);

            var removeStatus = function(){
                $(el).fadeOut('slow', function() {
                    view.close();
                });
            };

            setTimeout(removeStatus, 5000);
        }

    });

    return HeaderView;

});