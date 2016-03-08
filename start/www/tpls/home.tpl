<div ng-include="'/tpls/widgets.tpl'"></div>
<button ng-click="setAddWidget()" class="btn btn-default">Add Widget</button>
<br/><br/>
<div ng-if="addWidget">
  <div ng-include="'/tpls/addWidget.tpl'"></div>
</div>
