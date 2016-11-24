<div class="manage"  id="sub-root">
		<form class="form-horizontal" id="addstaff-form">




	  <div class="form-group col-md-8">
	    <label class="control-label col-md-3" for="search-username">员工编号：</label>
	    <div class="col-md-6">
	    <input type="text" class="form-control" id="search-username" <%= canChange? '':'readonly' %> value="<%= ecode %>" name="ecode">
	  </div>
	  </div>
	  <div class="form-group col-md-8">
	    <label class="control-label col-md-3" for="search-phone">性别：</label>
	    <div class="col-md-6">
	    <!-- <div class="> -->
	
			<select class="form-control"  id="gender" name="gender">
			<option value=""></option>
            </select>
            </div>
	    <!-- </div> -->
	  </div>
	  <div class="form-group col-md-8">
	    <label class="control-label col-md-3" for="search-phone">姓名：</label>
	    <div class="col-md-6">
	    <input type="text" class="form-control" id="staff-name" value="<%= name %>" name="name">
	  </div>
	  </div>
	  <div class="form-group col-md-8">
	    <label class="control-label col-md-3" for="search-phone">手机号：</label>
	    <div class="col-md-6">
	    <input type="text" class="form-control" id="mobile" value="<%= mobile %>" name="mobile">
	  </div>
	  </div>
	  <div class="form-group col-md-8">
	    <label class="control-label col-md-3" for="search-phone">组织：</label>
	    <div class="col-md-6">
	    <input type="text" readonly="readonly" class="form-control" id="search-org2" value="<%= orgId %>" name="org_name">
	    <input type="hidden" readonly="readonly" class="form-control" id="search-org3" value="<%= orgId %>" name="org_code">
	  </div>
	  </div>
	  <div class="form-group col-md-8">
	    <label class="control-label col-md-3" for="search-phone">职位：</label>
	    <div class="col-md-6">
	    <select id="role-select" class="form-control chosen-select " name="job">
	    <option value=""></option>
		</select>
		</div>
	  </div>
	  <div class="form-group col-md-8">
			<label class="control-label col-md-3" >入职日期：</label>
			<div class="col-md-6">
		    <div class="input-group date col-md-12 padding-left15 float-left">
			  <input id="join-date" name="hire_date" type="text" class="input-date form-control" value="<%= hireDateStr %>" readonly="readonly"><span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span> 
			</div>
			</div>
	  </div>
<div class="form-group col-md-8">
		<div class="col-md-3"></div>
		<div class="col-md-6">
			<button type="submit" class="btn btn-default btn-primary" id="auth-manage-save">提交保存</button>
			<a class="cancels" href="#staffinfo">取消</a>
		</div>
	</div>

	</form>
</div>
	
	

			

