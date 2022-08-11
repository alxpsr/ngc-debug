var panels = chrome.devtools.panels;

panels.elements.createSidebarPane(
    '@Component',
    function (sidebar) {
        function getNodeV2() {
            /**
             * 
             * @param {String} entryPoint name of component
             * @returns { component: ComponentRef, parent: { component: ComponentRef } }
             */
            function getClosestComponent(entryPoint) {
                const ref = ng.getComponent(entryPoint);

                if (!ref) {
                    const parent = entryPoint.parentElement;

                    if (parent) {
                        return getClosestComponent(parent);
                    } else {
                        return;
                    }

                }

                const parent = ng.getHostElement(ref).parentElement;

                return {
                    Component: ref,
                    Parent: parent ? getClosestComponent(parent) : null
                };
            }
            
            if (typeof ng !== 'undefined') {
                if (ng.probe && ng.probe($0)) {

                    return {
                        "Component": ng.probe($0).componentInstance,
                        "Parent": ng.probe($0).parent ? ng.probe($0).parent.componentInstance : 'root level',
                        "_debug": ng.probe($0)
                    }
                } else {
                    return {
                        "Component": getClosestComponent($0),
                    }
                }
            }
        }

        function updatePane() {
            sidebar.setExpression("(" + getNodeV2.toString() + ")()");
        }

        updatePane();

        panels.elements.onSelectionChanged.addListener(updatePane);
    }
)