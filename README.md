# pagetree-resizable

> Make the TYPO3 backend page tree and file tree container horizontally resizable again (including element/link browser dialog).

# Background

The possibility to change the width was removed in TYPO3 8.
This becomes a problem in bigger installations or when your tree structure is deeper (or simply the names of your pages are a little bit longer).
You would have to scroll a loooooot!

# What does it do?

This extension adds a little bit of Javascript and CSS to allow any user to resize the page and file tree container horizontally again.

This works in the Web > Page, File > Filelist module _and_ (**new since version 1.2.0!**) in the element/link browser dialog too.

The set width is then saved in the backend user preferences (`uc` field) as `Backend.PagetreeResizable.width` and for the element/link browser as `Backend.PagetreeResizable.Browser.width`.

If you double click on the resize handle, the container expands as wide as required for the content to fit.

It works with TYPO3 8.7 LTS and TYPO3 9.5 LTS and I tested it with recent versions of Chrome, Firefox and Internet Explorer.

# Installation

Require the package:

    composer require wazum/pagetree-resizable
    

Available on packagist:
https://packagist.org/packages/wazum/pagetree-resizable

