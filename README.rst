=======================================
inesonic-ninja-forms-password-validator
=======================================
You can use this small plugin to force NinjaForms to impose a minimum set of
requirements on password fields used in registration and login forms.  This
plugin is currently used on the `Inesonic, LLC website <https://inesonic.com>`
registration form.

To use, simply copy this entire directory into your WordPress plugins directory
and then activate the plugin from the WordPress admin panel.

Once activated, the plugin will detect the use of NinjaForms password fields
and impose the following requirements:

* Passwords must be at least 8 characters long,
* must contain an upper case letter,
* must contain a lower case letter,
* must contain a digit, and
* must contain at least one character that is not alphanumeric.

An error message will be displayed and form submission will be blocked if any
of the above requirements are not met.
