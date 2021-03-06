'use strict';

/* globals TID, chrome*/

TID.directories = { };

TID.directories.list = [];

TID.directories.html = '';

/**
 * Update the list of download directories
 * @param {Function} callback Optional callback to call when the update is done
 */
TID.directories.update = function (callback) {

    chrome.storage.sync.get({saveDirectories: []}, function (object) {

        if (object.saveDirectories.length) {
            TID.directories.list = object.saveDirectories;
        }

        TID.directories.html = TID.directories.format();

        if (callback) {
            callback.call(undefined);
        }

    });

};

/**
 * Format HMTL the list fo current directories
 * @return {string} The formatted HTML for the download directories
 */
TID.directories.format = function () {

    if (!TID.directories.list.length) {
        return '<ul><li class="' + TID.classes.help + '">' + TID.msg('noConfiguredDirectories') + '</li></ul>';
    }

    var list = '<ul>';

    TID.directories.list.forEach(function (directory) {

        var name = directory.replace(/(.+\/)/, '<span>$1</span>')
                            .replace(/\/(?!\w+>)/g, '<span>/</span>');

        list += '<li title="' + TID.msg('downloadDirectoryTitle', directory) + '" data-directory="' + directory + '">';
        list += name;
        list += '</li>';

    });

    list += '</ul>';

    return list;

};

/**
 * Toggle whether or not to display the directories dropdowns on the page
 * @param {boolean} setting Whether or not to show the directories
 */
TID.directories.setVisibility = function (setting) {
    document.body.classList[setting ? 'remove' : 'add'](TID.classes.hideLocations);
};
