odoo.define('data_fake.faker', function (require) {
    "use strict";

    const base = require('web_editor.base'),
        rpc = require('web.rpc'),
        core = require('web.core'),
        _t = core._t,
        names = [_t('street'), _t('street2'), _t('city'), _t('postcode'), _t('url'), _t('job'), _t('email'), _t('phone'), _t('first_name'), _t('last_name'), _t('company'), _t('text'), _t('sentence'), _t('full_name')],
        types = ['street', 'street2', 'city', 'postcode', 'url', 'job', 'email', 'phone', 'first_name', 'last_name', 'company', 'text', 'sentence', 'full_name'],
        actions = [];

    let menu = undefined;

    function do_request($target, action = 'sentence') {
        rpc.query({
            model: 'data.fake',
            method: 'get_fake',
            args: [[], action],
        })
            .then(function (result) {
                $target.val(result);
            })
            .fail(function (error) {
                alert('Server Error: ' + error);
            });
    }

    _.each(types, function (item, index) {
        actions.push({
            name: names[index],
            type: item,
            onClick: function () {
                do_request(menu.$openTarget, this.type);
            }
        })
    });

    base.ready().then(function () {
        menu = new BootstrapMenu('input, textarea', {
            actions: actions
        });
    });
});