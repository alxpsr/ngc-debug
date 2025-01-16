var panels = chrome.devtools.panels;

panels.elements.createSidebarPane(
  '@Component',
  function (sidebar) {
    function _exec() {
      let safeNg = {};

      function getError(e) {
        return {
          message: 'Something went wrong',
          stackError: e.stack,
        }
      }

      /**
       * Recursive search for closest angular element
       * @param {String} selectedEl component instance from DOM
       * @param ng debug tool instance
       * @returns { component: ComponentRef, parent: { component: ComponentRef } }
       */
      function getClosestComponent(selectedEl, ng) {
        const ref = ng.getComponent(selectedEl);

        if (!ref) {
          const parent = selectedEl.parentElement;

          if (parent) {
            return getClosestComponent(parent, ng);
          } else {
            return {
              message: 'Root'
            };
          }
        }

        const parent = ng.getHostElement(ref).parentElement;

        return {
          Component: ref,
          Parent: parent ? getClosestComponent(parent, ng) : null
        };
      }

      try {
        // Check for ReferenceError
        safeNg = ng;
      } catch (e) {
        // If cant - maybe we are inside iframe,
        // so try get it from iframe
        try {
          safeNg = $0.ownerDocument.defaultView.ng;

          if (!safeNg) {
            throw new Error('Could not find ng tool in current env');
          }
        } catch (e) {
          return getError(e);
        }
      }

      try {
        /**
         * Angular old versions support
         */
        if (safeNg.probe && safeNg.probe($0)) {
          return {
            "Component": safeNg.probe($0).componentInstance,
            "Parent": safeNg.probe($0).parent ? safeNg.probe($0).parent.componentInstance : 'root level',
            "_debug": safeNg.probe($0)
          }
        } else {
          return getClosestComponent($0, safeNg);
        }
      } catch (e) {
        return getError(e);
      }
    }

    function updatePane() {
      sidebar.setExpression(`(${_exec.toString()})()`);
    }

    updatePane();

    panels.elements.onSelectionChanged.addListener(updatePane);
  }
)