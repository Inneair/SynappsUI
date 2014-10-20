Ext.define('SynappsPackage.model.Credentials', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.String'
    ],

    fields: [
        {
            type: 'string',
            name: '_username'
        },
        {
            type: 'string',
            name: '_password'
        }
    ]
});
