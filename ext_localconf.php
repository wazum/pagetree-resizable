<?php

defined('TYPO3_MODE') or die();

if (TYPO3_MODE === 'BE') {
    $GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['typo3/template.php']['preHeaderRenderHook']['wazum/pagetree-resizeable'] =
        \Wazum\PagetreeResizable\Hooks\Backend\Template\DocumentTemplate::class . '->preHeaderRenderHook';


    // Necessary for TYPO3 v10
    $GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['LinkBrowser']['hooks']['wazum/pagetree-resizeable']['handler'] = \Wazum\PagetreeResizable\Hooks\Backend\Template\DocumentTemplate::class;
    $GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['typo3/backend.php']['renderPreProcess']['wazum/pagetree-resizeable'] =
        \Wazum\PagetreeResizable\Hooks\Backend\Template\DocumentTemplate::class . '->mainBackendModule';
}
