<div class="search-bar">
	<form class="form-horizontal" id="search-e-form">
	  <div class="form-group col-md-4">
	    <label class="col-md-4 control-label" for="search-username">员工编号:</label>
	    <div class="col-md-8">
	    	<input type="text" class="form-control" id="search-username" name="ecode">
	    </div>
	  </div>


	  <div class="form-group col-md-3">
	    <label class="col-md-4 control-label" for="gender">性别:</label>
	    <div class="col-md-8">
			<select class="form-control"  id="gender" name="gender" >
                <option value="" >全部</option>
            </select>
	    </div>
	  </div>
	<div class="form-group col-md-4">
	    <label class="col-md-3 control-label" for="search-phone">姓名:</label>
	    <div class="col-md-9">
	    <input type="text" class="form-control" id="search-phone" name="name">
	    </div>
	  </div>
	<div class="form-group col-md-2">
	  		<button type="button" id="add-staff" class="btn btn-default btn-transparent pull-right" >+ 新增员工</button>
	  </div>
	  
	  <div class="form-group col-md-4">
	    <label class="col-md-4 control-label" for="mobile">手机号:</label>
	    <div class="col-md-8">
	    <input type="text" class="form-control" id="search-phone" name="mobile">
	    </div>
	  </div>
	  <div class="form-group col-md-3">
	    <label class="col-md-4 control-label" for="org_code">组织:</label>
	    <div class="col-md-8">
	    <input type="text" readonly="readonly" class="form-control" id="search-org" name="org_name">
	    <input type="hidden" readonly="readonly" class="form-control" id="search-org-code" name="org_code">
	    </div>
	  </div>
	  <div class="form-group col-md-4">
	    <label class="col-md-3 control-label" for="job">职位:</label>
	    <div class="col-md-9">
	    <select id="role-select" class="form-control chosen-select" name="job">
	    <option value="" >全部</option>
		</select>
		</div>
	  </div>
<div class="form-group col-md-2">
	  <button type="submit" class="btn btn-default btn-primary" id="search-btn">搜  索</button>
	  <button type="button" class="btn btn-default btn-primary" id="reset-btn">重  置</button>
	  </div>
	  
	  <div class="form-group col-md-4">
			<label class="col-md-4 control-label" >入职期限:</label>
			<div class="col-md-8">
			    <div class="input-group col-md-12 date padding-left15 float-left">
				  <input id="join-date" name="hire_date" type="text" class="input-date form-control" readonly="readonly">
				  <span class="input-group-addon">
				  <!-- <i class="glyphicon glyphicon-th"></i> -->
				  之前
				  </span>
					
				</div>
				
			</div>
	  </div>




	  

	  


	  	

	</form>
</div>
<table class="table table-bordered users-table custom-table">
	<thead id="list-header">
		<tr>
			<th class="custom-th">员工编号</th>
			<th class="custom-th">姓名</th>
			<th class="custom-th">性别</th>
			<th class="custom-th">手机号</th>
			<th class="custom-th">组织</th>
			<th class="custom-th">职位</th>
			<th class="custom-th">入职时间</th>
			<th class="custom-th">操作</th>
		</tr>
	</thead>
	<tbody id="list-detail">
		
	</tbody>
</table>
<!-- <div class="loading">正在加载...</div>
<div class="no-content">暂无数据</div> -->
<div class="table-pagenation2"></div>