// Created by Josh Hunt
// joshhunt180@gmail.com
// v2.1.0
tinymce.PluginManager.requireLangPack('fontawesome');
tinymce.PluginManager.add('fontawesome', function(editor, url) {
	var version = 'v4.7.0';
    var translate = tinymce.util.I18n.translate;

    // This is the json format of https://gist.github.com/anthonykozak/84e07a2cf8c27d3e5a8f181742ca293d

	// Sort the icons alphabetically
    iconList.sort(function(a, b) {
        if (a.objectID < b.objectID) {
            return -1;
        }

        if (a.objectID > b.objectID) {
            return 1;
        }

        return 0;
    });

    var iconListGroups = [];
	iconListGroups['brands'] = [];
    var categoryName;
    for (var i = 0; i < iconList.length; i++) {
        for (var ii = 0; ii < iconList[i].categories.length; ii++) {
            categoryName = iconList[i].categories[ii].toLowerCase().replace(/ (.)/g, function(match, group1) {
                return group1.toUpperCase();
            });
			
            if (!iconListGroups[categoryName]) {
                iconListGroups[categoryName] = [];
            }

            iconListGroups[categoryName].push(iconList[i]);
        }

		if (iconList[i].styles[0] === 'brands') {
			iconListGroups['brands'].push(iconList[i]);
		}
    }

    function showDialog() {
        function groupHtml(group, iconTitle) {

            var iconGroup = iconListGroups[group];
            var gridHtml;
            var id;

            gridHtml = '<div class="mce-fontawesome-panel-accordion">';
                gridHtml += '<div class="mce-fontawesome-panel-title">' + iconTitle + '<span class="mce-fontawesome-panel-accordion-indicator fa-chevron-right"></span></div>';
                gridHtml += '<div class="mce-fontawesome-panel-content">';

                for (var y = 0; y < (iconGroup.length / width); y++) {
                    for (var x = 0; x < width; x++) {
                        if (iconGroup[y * width + x]) {
                            id = iconGroup[y * width + x].objectID;
                            name = iconGroup[y * width + x].name;
							
							id = id.replace('i:', '');
                            gridHtml += '<div class="mce-icon-cell js-mce-fontawesome-insert" title="' + name + '" data-id="' + id + '"' + (group === 'spinners' ? ' data-spin="true"' : '' ) + '>';
                                gridHtml += '<span class="fa' + (group === 'brands' ? 'b' : 's' ) + ' fa-' + id + (group === 'spinners' ? ' fa-spin' : '' ) +'"></span>';
                            gridHtml += '</div>';
                        }
                    }
                }
                gridHtml += '</div>';
            gridHtml += '</div>';

            return gridHtml;
        }

        var win;
        var width = 23;

        var panelHtml = groupHtml('accessibility', translate('Accessibility'))
					  + groupHtml('health', translate('Health'))
					  + groupHtml('vehicles', translate('Vehicles'))
					  + groupHtml('users-people', translate('Users'))
					  + groupHtml('business', translate('Business'))
					  + groupHtml('communication', translate('Communication'))
					  + groupHtml('design', translate('Design'))
					  + groupHtml('images', translate('Images'))
					  + groupHtml('objects', translate('Objects'))
					  + groupHtml('date-time', translate('Date and Time'))
					  + groupHtml('editors', translate('Editors'))
					  + groupHtml('hands', translate('Hands'))
					  + groupHtml('medical', translate('Medical'))
					  + groupHtml('payments-shopping', translate('Payments and Shopping'))
					  + groupHtml('maps', translate('Maps'))
					  + groupHtml('arrows', translate('Arrows'))
					  + groupHtml('code', translate('Code'))
					  + groupHtml('moving', translate('Moving'))
					  + groupHtml('writing', translate('Writing'))
					  + groupHtml('files', translate('Files'))
					  + groupHtml('spinners', translate('Spinners'))
					  + groupHtml('audio-video', translate('Audio / Video'))
					  + groupHtml('interfaces', translate('Interfaces'))
					  + groupHtml('shapes', translate('Shapes'))
					  + groupHtml('status', translate('Status'))
					  + groupHtml('logistics', translate('Logistics'))
					  + groupHtml('sports', translate('Sports'))
					  + groupHtml('currency', translate('Currency'))
					  + groupHtml('charity', translate('Charity'))
					  + groupHtml('chess', translate('Chess'))
					  + groupHtml('chat', translate('Chat'))
					  + groupHtml('computers', translate('Computers'))
					  + groupHtml('gender', translate('Gender'))
					  + groupHtml('brands', translate('Brands'))
                      + '<p class="mce-fontawesome-search-noresults" style="display: none;">' + translate('No icons matched your search') + '.</p>';

        win = editor.windowManager.open({
            autoScroll: true,
            width: 690,
            height: 500,
            title: translate('Icons'),
            spacing: 20,
            padding: 10,
            classes: 'fontawesome-panel',
            items: [
                {
                    type: 'container',
                    html: panelHtml
                }
            ],
            buttons: [{
                text: translate('Close'),
                onclick: function() {
                    win.close();
                }
            }]
        });

        // Insert icon
        function insertIcon() {
            var id = this.getAttribute('data-id');
            if (this.hasAttribute('data-spin')) {
                id += ' fa-spin';
            }
            var content = '<span class="fa fa-' + id + '"></span>';
            if (editor.selection.getNode().textContent === '') {
                content += '&nbsp;';
            }
            editor.execCommand('mceInsertContent', false, content);
            win.close();
        }

        var iconInserts = document.querySelectorAll('.js-mce-fontawesome-insert');

        for (var i = 0; i < iconInserts.length; i++) {
            iconInserts[i].addEventListener('click', insertIcon);
        }

        // Accordion
        var accordionItems = document.querySelectorAll('.mce-fontawesome-panel-accordion');
        var accordionTitle;
        var accordionContent;

        for (i = 0; i < accordionItems.length; i++) {
            accordionTitle = accordionItems[i].querySelector('.mce-fontawesome-panel-title');
            accordionTitle.addEventListener('click', toggleItem);

            accordionContent = accordionItems[i].querySelector('.mce-fontawesome-panel-content');
            accordionContent.style.height = '0';
        }

        // Open first item
        var firstAccordion = document.querySelector('.mce-fontawesome-panel-accordion');
        firstAccordion.classList.add('mce-fontawesome-panel-accordion-open');

        var firstAccordionContent = firstAccordion.querySelector('.mce-fontawesome-panel-content');
        firstAccordionContent.style.height = 'auto';
        var nextHeight = Math.ceil(firstAccordionContent.offsetHeight);
        firstAccordionContent.style.height = nextHeight + 'px';
        firstAccordionContent.style.transitionDuration = transitionCalc(nextHeight);

        var firstAccordionIndicator = firstAccordion.querySelector('.mce-fontawesome-panel-accordion-indicator');
        firstAccordionIndicator.classList.remove('fa-chevron-right');
        firstAccordionIndicator.classList.add('fa-chevron-down')

        function toggleItem() {
            // Check if search is in use
            if (document.querySelector('.mce-fontawesome-panel-search')) {
                return;
            }

            var accordionItem = this.parentNode;
            var open = false;
            if (accordionItem.classList.contains('mce-fontawesome-panel-accordion-open')) {
                open = true;
            }

            // Hide all items
            var accordionPanel;
            for (var i = 0; i < accordionItems.length; i++) {
                accordionItems[i].classList.remove('mce-fontawesome-panel-accordion-open');

                accordionPanel = accordionItems[i].querySelector('.mce-fontawesome-panel-content');
                accordionPanel.style.height = '0';

                var accordionIndicator = accordionItems[i].querySelector('.mce-fontawesome-panel-accordion-indicator');
                accordionIndicator.classList.remove('fa-chevron-down');
                accordionIndicator.classList.add('fa-chevron-right')
            }

            // Show this item if it was previously hidden
            if (!open) {
                var accordionItemContent = accordionItem.querySelector('.mce-fontawesome-panel-content');

                accordionItemContent.style.height = 'auto';
                var nextHeight = Math.ceil(accordionItemContent.offsetHeight);
                accordionItemContent.style.height = '0';
                accordionItem.classList.add('mce-fontawesome-panel-accordion-open');
                accordionItemContent.style.transitionDuration = transitionCalc(nextHeight);

                accordionIndicator = accordionItem.querySelector('.mce-fontawesome-panel-accordion-indicator');
                accordionIndicator.classList.remove('fa-chevron-right');
                accordionIndicator.classList.add('fa-chevron-down')

                // Force reflow
                window.getComputedStyle(accordionItemContent).opacity;
                accordionItemContent.style.height = nextHeight + 'px';
            }
        }

        // Transition length based on height but also has min / max
        function transitionCalc(length) {
            var result = length / 300;

            if (result > .8) {
                result = .8;
            }

            if (result < .3) {
                result = .3;
            }

            return result + 's';
        }

        // Initialize search input
        var foot = document.querySelector('.mce-fontawesome-panel .mce-foot .mce-container-body');
        var searchContainer = document.createElement('div');
        searchContainer.className = 'mce-fontawesome-search-container';
        searchContainer.innerHTML = '<input type="search" placeholder="' + translate('Search') + '"><div class="mce-fontawesome-search-container-clear"><span class="fas fa-times-circle"></span></div>';
        foot.insertBefore(searchContainer, foot.firstChild);

        var searchInput = searchContainer.querySelector('input');
        searchInput.addEventListener('input', search);

        function search() {
            var categoryList = document.querySelectorAll('.mce-fontawesome-panel-accordion');
            var categoryContentList = document.querySelectorAll('.mce-fontawesome-panel-content');
            var iconList = document.querySelectorAll('.js-mce-fontawesome-insert');
            var searchTerm = this.value.toLowerCase().replace(' ', '-');
            var i;
            var hiddenCategories = 0;

            if (this.value.length) {
                document.querySelector('.mce-fontawesome-panel').classList.add('mce-fontawesome-panel-search');

                // Check whether to hide or show icons
                for (i = 0; i < iconList.length; i++) {
                    hideOrShowIcon(searchTerm, iconList[i]);
                }

                for (i = 0; i < categoryList.length; i++) {
                    // Open all categories
                    categoryList[i].classList.add('mce-fontawesome-panel-accordion-open');

                    // Check if the category has an icons that aren't hidden
                    if (categoryList[i].querySelector('.js-mce-fontawesome-insert:not(.js-mce-fontawesome-insert-hidden)')) {
                        categoryList[i].style.display = '';
                    } else {
                        categoryList[i].style.display = 'none';
                        hiddenCategories++;
                    }
                }

                // Open all categories
                for (i = 0; i < categoryContentList.length; i++) {
                    categoryContentList[i].style.height = 'auto';
                }

                // Show or hide no results message
                if (hiddenCategories === categoryList.length) {
                    document.querySelector('.mce-fontawesome-search-noresults').style.display = 'block';
                } else {
                    document.querySelector('.mce-fontawesome-search-noresults').style.display = 'none';
                }
            } else {
                document.querySelector('.mce-fontawesome-panel').classList.remove('mce-fontawesome-panel-search');
                document.querySelector('.mce-fontawesome-search-noresults').style.display = 'none';

                for (i = 0; i < iconList.length; i++) {
                    iconList[i].classList.remove('js-mce-fontawesome-insert-hidden');
                    iconList[i].style.display = '';
                }

                for (i = 0; i < categoryList.length; i++) {
                    // Close all categories
                    categoryList[i].classList.remove('mce-fontawesome-panel-accordion-open');
                    categoryList[i].style.display = '';
                }

                // Close all categories
                for (i = 0; i < categoryContentList.length; i++) {
                    categoryContentList[i].style.height = '0';
                }
            }
        }

        function hideOrShowIcon(search, iconElement) {
            var id = iconElement.getAttribute('data-id'),
				original_object_id,
				object_id;

            if (strInStr(search, id)) {
                iconElement.classList.remove('js-mce-fontawesome-insert-hidden');
                iconElement.style.display = '';
                return;
            }

            for (var i = 0; i < iconList.length; i++) {
				original_object_id = iconList[i].objectID;
				object_id = original_object_id.replace('i:', '');
				
                if (object_id === id) {
                    if (iconList[i].name_suffixes) {
                        for (var ii = 0; ii < iconList[i].name_suffixes.length; ii++) {
                            if (strInStr(search, iconList[i].name_suffixes[ii])) {
                                iconElement.classList.remove('js-mce-fontawesome-insert-hidden');
                                iconElement.style.display = '';
                                return;
                            }
                        }
                    }
                    iconElement.classList.add('js-mce-fontawesome-insert-hidden');
                    iconElement.style.display = 'none';
                }
            }
        }

        function strInStr(needle, haystack) {
            return haystack.indexOf(needle) > -1;
        }

        // Focus the searchbox on open
        searchInput.focus();

        document.querySelector('.mce-fontawesome-search-container-clear').addEventListener('click', function() {
            searchInput.value = '';
            search.call(searchInput);
            searchInput.focus();
        });
    }

    // Include plugin CSS
    editor.on('init', function() {
        var csslink = editor.dom.create('link', {
            rel: 'stylesheet',
            href: '/template-admin/tinymce/src/plugins/fontawesome/css/fontawesome.min.css'
        });
        document.getElementsByTagName('head')[0].appendChild(csslink);
		
		var falink = editor.dom.create('link', {
            rel: 'stylesheet',
            href: 'https://pro.fontawesome.com/releases/' + version + '/css/all.css'
        });
        document.getElementsByTagName('head')[0].appendChild(falink);
    });		

    editor.addButton('fontawesome', {
        icon: 'flag',
        tooltip: translate('Icons'),
        onclick: showDialog
    });

    editor.addMenuItem('fontawesome', {
        icon: 'flag',
        onclick: showDialog,
        context: 'insert'
    });
});