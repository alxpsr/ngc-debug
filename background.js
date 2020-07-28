var panels = chrome.devtools.panels;

panels.elements.createSidebarPane(
    '@Component',
    function(sidebar) {        
        function getNodeV2() {            
            if (typeof ng !== 'undefined') {
                if (ng.probe && ng.probe($0)) {
                    console.log('legacy');
                    return {
                        "Component": ng.probe($0).componentInstance,
                        "Parent": ng.probe($0).parent ? ng.probe($0).parent.componentInstance : 'root level',
                        "_debug": ng.probe($0)
                    }
                } else if (!ng.probe && ng.getComponent($0)) {
                    return {
                        "Component": ng.getComponent($0),
                    }
                }
            }

            
            return { "message": "content is not readable" };
        }
        
        function updatePane() {
            sidebar.setExpression("(" + getNodeV2.toString() + ")()");
        }

        updatePane();
        
        panels.elements.onSelectionChanged.addListener(updatePane);
    }
)