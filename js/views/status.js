define(
['jquery', 'lodash', 'backbone', 'utils/tpl'],

function($, _, Backbone, tpl) {

	StatusView = Backbone.View.extend({

		initialize: function() {
			this.template = _.template(tpl.get('status'));
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this.el;
		}

	});

	return StatusView;

});