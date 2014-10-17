Ext.define('SynappsPackage.data.field.Password', {
    extend: 'Ext.data.field.Field',

    alias: 'data.field.password',

    validators: [{ type: 'format', matcher: /[a-z0-9]+/i }]
});
