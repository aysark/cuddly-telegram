<form name="widgetForm" novalidate>
  <div class="form-group">
    <label>Name
      <input type="text" name="widgetName" ng-model="widget.name" required />
      <span ng-show="widgetForm.widgetName.$touched && widgetForm.widgetName.$invalid">Name is required</span>
    </label>
  </div>
  <div class="form-group">
    <label>Description
      <textarea name="widgetDescription" ng-model="widget.description" rows="5" cols="8"></textarea>
    </label>
  </div>
  <div class="form-group">
    <label>Color
      <select ng-model="widget.color" name="widgetColor"
      ng-options="widget.color as widget.color for widget in widgets | orderBy:'color'">
        <option value="">Select one...</option>
      </select>
    </label>
  </div>
  <div class="form-group">
    <fieldset>
      <legend>Choose a size</legend>
      <label>
        <input name="widgetSize" ng-model="widget.size" type="radio" value="size">Tiny
      </label>
      <label>
        <input name="widgetSize" ng-model="widget.size" type="radio" value="size">Small
      </label>
      <label>
        <input name="widgetSize" ng-model="widget.size" type="radio" value="size">Medium
      </label>
      <label>
        <input name="widgetSize" ng-model="widget.size" type="radio" value="size">Large
      </label>
    </fieldset>
  </div>
  <div class="form-group">
  <label>Quantity
    <input type="number" ng-model="widget.quantity" />
  </label>
  </div>
  <button ng-click="saveWidget()" class="btn btn-default" ng-disabled="widgetForm.$invalid">Save Widget</button>
  <button ng-click="deleteWidget()" ng-if="widget.id" class="btn btn-default">Delete Widget</button>
  <button ng-click="returnHome()" class="btn btn-default">Home</button>
</form>
