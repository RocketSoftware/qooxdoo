/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)
     * Sebastian Werner (wpbasti)

************************************************************************ */

/**
 * Central instance pool for event objects. All event objects dispatched by the
 * event loader are pooled using this class.
 */
qx.Class.define("qx.event.Pool",
{
  extend : qx.util.ObjectPool,
  type : "singleton",


  // Even though this class contains almost no code it is required because the
  // legacy code needs a place to patch the event pooling behavior.


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function() {
    this.base(arguments, 30);
  },

  members: {
    //https://jira.rocketsoftware.com/browse/LS-18169 - [#LS-18169] JavaScript heap is increasing and causing client performance issues over time
    poolObject: function(obj) {
      this.base(arguments, obj);

      if(obj._originalTarget) {
        obj._originalTarget = null;
      }

      if(obj._currentTarget) {
        obj._currentTarget = null;
      }

      if(obj._relatedTarget) {
        obj._relatedTarget = null;
      }

      if(obj._target) {
        obj._target = null;
      }

      if(obj._native) {
        obj._native = null;
      }

      if(obj.cleanupData) {
        obj.cleanupData();
      }
    }
  }
});
