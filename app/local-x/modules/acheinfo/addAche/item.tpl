<div class="manage"  id="sub-root">
		<form class="form-horizontal" id="addache-form">
	  <div class="form-group">
	    <label class="control-label col-md-2" for="search-username">组织编号：</label>
	    <div class="col-md-6">
	    <input type="text" class="form-control" <%= canChange? '':'readonly="readonly"' %> id="agency-code" value="<%= agencyCode %>" name="agencyCode">
	    </div>
	  </div>

	  <div class="form-group">
	    <label class="control-label col-md-2" for="search-phone">组织名称：</label>
	    <div class="col-md-6">
	    <input type="text" class="form-control" id="agency-name" value="<%= agencyName %>" name="agencyName">
	    </div>
	  </div>

	  <div class="form-group">
	    <label class="control-label col-md-2" for="search-phone">父组织编号：</label>
	    <div class="col-md-6">
	    	<input readonly="readonly" type="text" class="form-control" id="parent-code" value="<%= parentCode %>" name="parentName">
	    	<input readonly="readonly" type="hidden" class="form-control" id="parent-name" value="<%= parentCode %>" name="parentCode">
	    </div>
	  </div>
	  
	  
<div class="form-group">
		<div class="col-md-2"></div>
		<div class="col-md-10">
			<button type="submit" class="btn btn-default btn-primary" id="auth-manage-save">提交保存</button>
			<a class="cancels" href="#acheinfo">取消</a>
		</div>
	</div>

	</form>
</div>
	
	

			

