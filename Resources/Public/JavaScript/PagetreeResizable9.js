// Only a wrapper for TYPO3 9 Storage
define([
    'jquery',
    'TYPO3/CMS/Backend/Storage/Persistent',
    'TYPO3/CMS/PagetreeResizable/PagetreeResizable'
], function ($, Storage, PagetreeResizable) {
    'use strict';
    PagetreeResizable.run(Storage);
});
