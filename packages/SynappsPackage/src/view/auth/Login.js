Ext.define('SynappsPackage.view.auth.Login',{
    extend: 'Ext.window.Window',

    requires: [
        'SynappsPackage.view.auth.LoginController',
        //'SynappsPackage.view.auth.LoginModel',
        'Ext.form.Panel',
        'Ext.form.field.Text'/*,
        'Ext.form.field.Checkbox',
        'Ext.button.Button'*/
    ],

    controller: 'auth-login',
    /*viewModel: {
        type: 'auth-login'
    },*/

    closable: false,
    modal: true,
    cls: 'login',
    width: 400,

    items: {
        xtype: 'form',
        reference: 'loginForm',
        bodyPadding: 10,
        modelValidation: true,

        items: [{
            xtype: 'textfield',
            anchor: '100%',
            fieldLabel: 'Username',
            name: '_username',
            emptyText: 'username',
            allowBlank: false
        }, {
            xtype: 'textfield',
            anchor: '100%',
            fieldLabel: 'Password',
            name: '_password',
            emptyText: 'password',
            inputType: 'password',
            allowBlank: false
        }/*, {
            xtype: 'checkbox',
            fieldLabel: 'Remember me',
            name: '_remember_me',
            value: 'on'
        }*/],

        buttons: [{
            xtype: 'component',
            reference: 'formErrorState',
            invalidCls: Ext.baseCSSPrefix + 'form-invalid',
            validCls: Ext.baseCSSPrefix + 'form-valid',
            baseCls: 'form-error-state',
            autoHeight: true,
            flex: 1
        }, {
            text: 'Login',
            formBind: true,
            disabled: true
        }]
    }
});
