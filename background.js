var panels = chrome.devtools.panels;

panels.elements.createSidebarPane(
    '@Component',
    function(sidebar) {        
        function updatePane() {
            function getNode() {
                return typeof ng === 'undefined' || !ng.probe($0) ? { "message": "content is not readable" } : {
                    "Component": ng.probe($0).componentInstance,
                    "Parent": ng.probe($0).parent ? ng.probe($0).parent.componentInstance : 'root level',
                    "_debug": ng.probe($0)
                }
            }

            sidebar.setExpression("(" + getNode.toString() + ")()");
        }

        updatePane();
        
        panels.elements.onSelectionChanged.addListener(updatePane);
    }
)