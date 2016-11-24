<div class="search-bar">
	<form class="form-inline" id="search-ache-form">
	  <div class="form-group">
	    <label class="" for="search-username">组织编码：</label>
	    <input type="text" class="form-control" id="search-username" name="agencyCode">
	  </div>
	  <div class="form-group">
	    <label class="" for="search-phone">组织名称：</label>
	    <input type="text" class="form-control" id="search-phone" name="agencyName">
	  </div>
	  <button type="button" class="btn btn-default btn-primary" id="search-btn">搜  索</button>
	  <button type="button" class="btn btn-default btn-primary" id="reset-btn">重  置</button>
	  <button type="button" id="add-staff" class="btn btn-default btn-transparent pull-right" >+  新增组织</button>


	  </div>

	  


	  	

	</form>
</div>
<table class="table table-bordered users-table custom-table">
	<thead id="list-header">
		<tr>
			<th class="custom-th">组织编码</th>
			<th class="custom-th">组织名称</th>
			<th class="custom-th">父组织编码</th>
			<th class="custom-th">操作</th>
		</tr>
	</thead>
	<tbody id="list-detail">
		
	</tbody>
</table>
<!-- <div class="loading">正在加载...</div>
<div class="no-content">暂无数据</div> -->
<div class="table-pagenation2"></div>