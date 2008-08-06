/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2008 Derrell Lipman

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Derrell Lipman (derrell)

************************************************************************ */

/* ************************************************************************

#module(ui_progressive)

************************************************************************ */

/**
 * Structure definition for Progressive
 */
qx.Class.define("qx.ui.progressive.structure.Abstract",
{
  type       : "abstract",
  extend     : qx.core.Object,

  construct : function(pane)
  {
    this.base(arguments);

    // If no pane was specified. Create one.
    if (! pane)
    {
      this.__container =
        new qx.ui.container.Composite(new qx.ui.layout.Basic());
      this._pane = this.__container;
    }
    else
    {
      this.__container = null;
      this._pane = pane;
    }

    this._pane.getContentElement().setStyle("overflowY", "auto");
  },

  members :
  {
    /**
     */
    applyStructure : function(progressive)
    {
      throw new Error("applyStructure() is abstract");
    },

    getPane : function()
    {
      return this._pane;
    }
  },

  destruct : function()
  {
    if (this.__container)
    {
      this.__container.dispose();
      this.__container = null;
    }
    
    this._pane = null;
  }
});
