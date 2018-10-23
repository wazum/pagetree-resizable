// Only a wrapper for TYPO3 8 Storage
define([
    'jquery',
    'TYPO3/CMS/Backend/Storage',
    'TYPO3/CMS/PagetreeResizable/PagetreeResizable'
], function ($, Storage, PagetreeResizable) {
    'use strict';
    PagetreeResizable.run(Storage.Persistent);
});

