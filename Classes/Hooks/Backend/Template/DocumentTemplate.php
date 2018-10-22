<?php

namespace Wazum\PagetreeResizable\Hooks\Backend\Template;

use TYPO3\CMS\Core\Page\PageRenderer;

/**
 * Class DocumentTemplate
 * @package Wazum\PagetreeResizable\Hooks\Backend\Template
 * @author Wolfgang Klinger <wolfgang@wazum.com>
 */
class DocumentTemplate
{

    /**
     * @param array $parameters
     * @param \TYPO3\CMS\Backend\Template\DocumentTemplate $parent
     * @return void
     */
    public function preHeaderRenderHook(array $parameters, \TYPO3\CMS\Backend\Template\DocumentTemplate $parent)
    {
        /** @var PageRenderer $pageRenderer */
        $pageRenderer = $parameters['pageRenderer'];

        $pageRenderer->addCssFile('EXT:pagetree_resizable/Resources/Public/Stylesheet/PagetreeResizable.css');
        $pageRenderer->loadRequireJsModule('TYPO3/CMS/PagetreeResizable/PagetreeResizable');
    }

}
