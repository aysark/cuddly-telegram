<form novalidate>
  <div class="form-group">
    <label>Name
      <input type="text" ng-model="widget.name" />
    </label>
  </div>
  <div class="form-group">
    <label>Description
      <input type="text" ng-model="widget.description" />
    </label>
  </div>
  <div class="form-group">
    <label>Color
      <input type="text" ng-model="widget.color" />
    </label>
  </div>
  <div class="form-group">
  <label>Size
    <input type="text" ng-model="widget.size" />
  </label>
  </div>
  <div class="form-group">
  <label>Quantity
    <input type="text" ng-model="widget.quantity" />
  </label>
  </div>
  <button ng-click="saveWidget()" class="btn btn-default">Save Widget</button>
</form>
