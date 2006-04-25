/* ************************************************************************

   qooxdoo - the new era of web interface development

   Copyright:
     (C) 2004-2006 by Schlund + Partner AG, Germany
         All rights reserved

   License:
     LGPL 2.1: http://creativecommons.org/licenses/LGPL/2.1/

   Internet:
     * http://qooxdoo.oss.schlund.de

   Authors:
     * Sebastian Werner (wpbasti)
       <sebastian dot werner at 1und1 dot de>
     * Andreas Ecker (aecker)
       <andreas dot ecker at 1und1 dot de>

************************************************************************ */

/* ************************************************************************

#package(border)
#post(qx.renderer.border.BorderObjectPresets)

************************************************************************ */

qx.OO.defineClass("qx.renderer.border.BorderObject", qx.renderer.border.Border,
function(vWidth, vStyle, vColor)
{
  this._dependentObjects = {};

  qx.renderer.border.Border.call(this, vWidth, vStyle, vColor);
});



/*
---------------------------------------------------------------------------
  UTILITY
---------------------------------------------------------------------------
*/

qx.renderer.border.BorderObject.fromString = function(vDefString)
{
  var vBorder = new qx.renderer.border.BorderObject;
  var vAllParts = vDefString.split(/\s+/);
  var vPart, vTemp;

  for (var i=0; i<vAllParts.length; i++)
  {
    vPart = vAllParts[i];

    switch(vPart)
    {
      case qx.Const.BORDER_STYLE_GROOVE:
      case qx.Const.BORDER_STYLE_RIDGE:
      case qx.Const.BORDER_STYLE_INSET:
      case qx.Const.BORDER_STYLE_OUTSET:
      case qx.Const.BORDER_STYLE_SOLID:
      case qx.Const.BORDER_STYLE_DOTTED:
      case qx.Const.BORDER_STYLE_DASHED:
      case qx.Const.BORDER_STYLE_DOUBLE:
      case qx.Const.BORDER_STYLE_NONE:
        vBorder.setStyle(vPart);
        break;

      default:
        vTemp = parseFloat(vPart);

        if(vTemp == vPart || qx.lang.String.contains(vPart, qx.Const.CORE_PIXEL))
        {
          vBorder.setWidth(vTemp);
        }
        else
        {
          vPart = vPart.toLowerCase();
          vBorder.setColor(qx.renderer.color.Color.themedNames[vPart] ? new qx.renderer.color.ColorObject(vPart) : new qx.renderer.color.Color(vPart));
        };

        break;
    };
  };

  return vBorder;
};






/*
---------------------------------------------------------------------------
  WIDGET CONNECTION
---------------------------------------------------------------------------
*/

qx.Proto.addListenerWidget = function(o) {
  this._dependentObjects[o.toHashCode()] = o;
};

qx.Proto.removeListenerWidget = function(o) {
  delete this._dependentObjects[o.toHashCode()];
};

qx.Proto._sync = function(vEdge)
{
  var vAll = this._dependentObjects;
  var vCurrent;

  for (vKey in vAll)
  {
    vCurrent = vAll[vKey];

    if (vCurrent.isCreated()) {
      vCurrent._updateBorder(vEdge);
    };
  };
};







/*
---------------------------------------------------------------------------
  DISPOSER
---------------------------------------------------------------------------
*/

qx.Proto.dispose = function()
{
  if (this.getDisposed()) {
    return;
  };

  if (typeof this._dependentObjects === qx.Const.TYPEOF_OBJECT)
  {
    var vAll = this._dependentObjects;
    for (vKey in vAll) {
      delete vAll[vKey];
    };

    vAll = null;
    delete this._dependentObjects;
  };

  return qx.renderer.border.Border.prototype.dispose.call(this);
};







/*
---------------------------------------------------------------------------
  PRESETS
---------------------------------------------------------------------------
*/

qx.Class.presets =
{
  inset : new qx.Class(2, qx.Const.BORDER_STYLE_INSET),
  outset : new qx.Class(2, qx.Const.BORDER_STYLE_OUTSET),
  groove : new qx.Class(2, qx.Const.BORDER_STYLE_GROOVE),
  ridge : new qx.Class(2, qx.Const.BORDER_STYLE_RIDGE),
  thinInset : new qx.Class(1, qx.Const.BORDER_STYLE_INSET),
  thinOutset : new qx.Class(1, qx.Const.BORDER_STYLE_OUTSET),
  verticalDivider : new qx.Class(1, qx.Const.BORDER_STYLE_INSET),
  horizontalDivider : new qx.Class(1, qx.Const.BORDER_STYLE_INSET),

  shadow : new qx.Class(1, qx.Const.BORDER_STYLE_SOLID, "threedshadow"),
  lightShadow : new qx.Class(1, qx.Const.BORDER_STYLE_SOLID, "threedlightshadow"),
  info : new qx.Class(1, qx.Const.BORDER_STYLE_SOLID, "infotext")
};

qx.Class.presets.verticalDivider.setLeftWidth(0);
qx.Class.presets.verticalDivider.setRightWidth(0);

qx.Class.presets.horizontalDivider.setTopWidth(0);
qx.Class.presets.horizontalDivider.setBottomWidth(0);
