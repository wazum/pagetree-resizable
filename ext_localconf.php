<?php

defined('TYPO3_MODE') or die();

if (TYPO3_MODE === 'BE') {
    $GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['typo3/template.php']['preHeaderRenderHook']['wazum/pagetree-resizeable'] =
        \Wazum\PagetreeResizable\Hooks\Backend\Template\DocumentTemplate::class . '->preHeaderRenderHook';
}
