Ext.define('SynappsPackage.model.Account', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.String',
        'SynappsPackage.data.field.Email'
    ],

    fields: [
        {
            type: 'string',
            name: 'username'
        },
        {
            type: 'email',
            name: 'email'
        }
    ]
});
