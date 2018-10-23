<?php
declare(strict_types=1);

namespace Wazum\PagetreeResizable\Hooks\Backend\Template;

use TYPO3\CMS\Core\Page\PageRenderer;
use TYPO3\CMS\Core\Utility\VersionNumberUtility;

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

        if ($width = $this->getUserPageTreeWidth()) {
            $pageRenderer->addCssInlineBlock('wazum/pagetree-resizable', '
                .scaffold-content-navigation-expanded .scaffold-content-navigation {
                    width: ' . $width . 'px;
                }
                .scaffold-content-navigation-expanded .scaffold-content-module {
                    left: ' . $width . 'px;
                }
            ');
        }

        [$version] = explode('.', VersionNumberUtility::getCurrentTypo3Version());
        if (\in_array((int)$version, [8, 9], true)) {
            $pageRenderer->addCssFile('EXT:pagetree_resizable/Resources/Public/Stylesheet/PagetreeResizable.css');
            $pageRenderer->loadRequireJsModule('TYPO3/CMS/PagetreeResizable/PagetreeResizable' . $version);
        }
    }

    /**
     * @return int
     */
    protected function getUserPageTreeWidth(): int
    {
        return (int)($GLOBALS['BE_USER']->uc['Backend']['PagetreeResizable']['width'] ?? 0);
    }

}
