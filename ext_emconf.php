<?php

$EM_CONF[$_EXTKEY] = [
    'title' => 'TYPO3 CMS Backend page tree resizable',
    'description' => 'Make the backend page tree horizontally resizable',
    'category' => 'backend',
    'author' => 'Wolfgang Klinger',
    'author_email' => 'wolfgang@wazum.com',
    'state' => 'stable',
    'clearCacheOnLoad' => true,
    'author_company' => 'wazum.com',
    'version' => '1.2.1',
    'constraints' => [
        'depends' => [
            'typo3' => '8.7.0-10.4.99',
        ]
    ]
];
