define(
['jquery', 'lodash', 'backbone', 'utils/tpl'],

function($, _, Backbone, tpl) {

	DeletedView = Backbone.View.extend({

		initialize: function() {
			this.template = _.template(tpl.get('deleted'));
		},

		render: function() {
			this.$el.html(this.template());
			return this.el;
		}

	});

	return DeletedView;

});