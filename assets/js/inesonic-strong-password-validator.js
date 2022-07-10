// ****************************************************************************
// Copyright 2020 - 2022, Inesonic, LLC
//
// GNU Public License, Version 3:
//   This program is free software: you can redistribute it and/or modify it
//   under the terms of the GNU General Public License as published by the Free
//   Software Foundation, either version 3 of the License, or (at your option)
//   any later version.
//
//   This program is distributed in the hope that it will be useful, but
//   WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
//   or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
//   for more details.
//
//   You should have received a copy of the GNU General Public License along
//   with this program.  If not, see <https://www.gnu.org/licenses/>.
// ****************************************************************************

// Function that validates a password, returning null if the password is
// acceptable or an error message if the password is too weak.
function inesonicCheckPassword(str) {
    if (str.length < 8) {
        result = 'Your password must be at least 8 characters in length.';
    } else {
        var digits = /\d/;
        if (!str.match(digits)) {
            result = 'Your password must contain at least one numeric digit.';
        } else {
        var punctuation = /[^0-9a-zA-Z]/;
            if (!str.match(punctuation)) {
                result = 'Your password must contain a punctuation character.';
            } else {
                var upperCase = /[A-Z]/;
                if (!str.match(upperCase)) {
                    result = 'Your password must contain an upper-case letter.';
                } else {
                    var lowerCase = /[a-z]/;
                    if (!str.match(lowerCase)) {
                        result = 'Your password must contain a lower-case letter.';
                    } else {
                        result = null
                    }
                }
            }
        }
    }

    return result;
}


var inesonicStrongPasswordValidator = Marionette.Object.extend({
    // Sets up Marionette to call the validateChange and validateSubmit
    // functions when a password field is updated.
    initialize: function() {
        var submitChannel = Backbone.Radio.channel('submit');
        this.listenTo(submitChannel, 'validate:field', this.validatePassword);

        var fieldsChannel = Backbone.Radio.channel('fields');
        this.listenTo(fieldsChannel, 'change:modelValue', this.validatePassword);
    },

    // Function that is called whenever a field changes.
    validatePassword: function(model) {
        var fieldType  = model.get('type');
        if (fieldType == 'password') {
            var fieldKey = model.get('key');
            if (!fieldKey.includes('login')) {
                var fieldValue = model.get('value');
                var fieldId = model.get('id')
                var result = inesonicCheckPassword(fieldValue);

                Backbone.Radio.channel('fields').request(
                    'remove:error',
                    fieldId,
                    'inesonic-strong-password-validator'
                );

                if (result !== null) {
                    Backbone.Radio.channel('fields').request(
                        'add:error',
                        fieldId,
                        'inesonic-strong-password-validator',
                        result
                    );
        }
            }
        }
    }
});

// Function that registers the password validator with Marionette.
jQuery(document).ready(function($) {
    new inesonicStrongPasswordValidator();
});
