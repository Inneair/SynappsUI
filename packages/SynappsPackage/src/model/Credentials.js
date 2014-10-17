Ext.define('SynappsPackage.model.Credentials', {
    extend: 'Ext.data.Model',

    requires: [
        'SynappsPackage.data.field.Email',
        'SynappsPackage.data.field.Password'
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
