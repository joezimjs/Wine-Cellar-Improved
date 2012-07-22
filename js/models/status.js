define(
['jquery', 'lodash', 'backbone'],

function($, _, Backbone) {

    var Status = Backbone.Model.extend({
        defaults: {
            "type": "success",
            "operation": "operated on"
        }
    });

    return Status;
});