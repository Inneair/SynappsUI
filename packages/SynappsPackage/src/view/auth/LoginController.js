Ext.define('SynappsPackage.view.auth.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth-login',

    /**
     * @event submit
     * Fires after the SUBMIT button has been clicked or the ENTER key has been pressed in fields via {@link #doLogin}.
     * @param {Origami.view.auth.Login} Login window
     */

    control: {
        field: {
            specialkey: 'onSpecialKey'
        },
        button: {
            click: 'onLogin'
        }
    },

    /**
     * @cfg {String/String[]/Ext.XTemplate} errorsTpl
     * The template used to format the Array of error messages passed to {@link #setActiveErrors} into a single HTML
     * string. It renders each message as an item in an unordered list.
     */
    errorsTpl: Ext.create(
        'Ext.XTemplate',
        '<tpl if="errors && errors.length"><ul><tpl for="errors"><li>{.}</li></tpl></ul></tpl>'
    ),

    /**
     * Intercept ENTER key pressed and do login.
     *
     * @param {Ext.form.field.Base} field
     * @param {Ext.event.Event} e
     */
    onSpecialKey: function(field, e) {
        if (e.getKey() === e.ENTER) {
            this.onLogin();
        }
    },

    /**
     * Fire 'submit' event, when form SUBMIT button clicked or ENTER key pressed in fields, if form is valid.
     */
    onLogin: function(){
        var view = this.getView(),
            form = this.lookupReference('loginForm'),
            record = form.getRecord();

        form.updateRecord();

        this.setErrors([]);
        view.fireEvent('login', record);
    },

    /**
     * Set record to form.
     * @param {Ext.data.Model} record
     */
    setRecord: function(record){
        this.lookupReference('loginForm').loadRecord(record);
    },

    /**
     * Display global form errors near submit button.
     *
     * @param {Array} errors
     */
    setErrors: function(errors) {
        var me = this,
            formErrorState = this.lookupReference('formErrorState');

        errors = Ext.Array.from(errors);

        // Update CSS class and tooltip content
        if (errors.length) {
            formErrorState.addCls(formErrorState.invalidCls);
            formErrorState.removeCls(formErrorState.validCls);
            formErrorState.update(me.errorsTpl.apply({ errors: errors }));
        } else {
            formErrorState.addCls(formErrorState.validCls);
            formErrorState.removeCls(formErrorState.invalidCls);
            formErrorState.update('');
        }
    }
});
