'use strict';

/* globals TID */

/**
 * Show a download confirmation dialog
 */
TID.confirmDialog = function () {
    return confirm('You\'ve already downloaded this image before.\n\n' +
                   'Are you sure you want to download it again?');
};

/**
 * Format the list of download directories
 */
TID.formatDirectories = function () {

    if (TID.directories.length) {

        var list = '';

        TID.directories.forEach(function (directory) {

            var name = directory.replace(/(.+\/)/, '<span>$1</span>')
                                .replace(/\/(?!\w+>)/g, '<strong>&#8260;</strong>');

            list += '<li title="Download inside: ' + directory + '" data-directory="' + directory + '">';
            list += name;
            list += '</li>';

        });

        return list;

    } else {

        return '<li class="' + TID.classes.help + '">' +
               'You can specify custom download\nlocations in the settings.\n' +
               'Click to configure.</li>';

    }

};
