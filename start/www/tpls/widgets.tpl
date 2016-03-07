<table class="table table-striped table-bordered">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Color</th>
      <th>Size</th>
      <th>Qty</th>
    </tr>
  </thead>
  <tbody>
    <tr ng-repeat="widget in widgets | orderBy:'name'">
      <td>{{widget.name}}</td>
      <td>{{widget.description}}</td>
      <td>{{widget.color}}</td>
      <td>{{widget.size}}</td>
      <td>{{widget.quantity}}</td>
    </tr>
  </tbody>
</table>
