<form id="add-user-form" class="form-horizontal required-validate">
	<div class="form-group ">
		<label class="control-label col-lg-2" >审核员账户：</label>
	    <div class="col-lg-4">
		    <input value="<%= userName %>" type="text" class="form-control" id="user-name"  name="user-name" placeholder="允许最多18位数字，字母，符号">
		</div>
	</div>
    <div class="form-group">
        <label class="control-label col-lg-2" >审核员手机号：</label>
        <div class="col-lg-4">
		    <input type="text" value="<%= phone %>" class="form-control" id="phone"  name="phone">
		</div>
	</div>
	<div class="form-group" id="code-div">
        <label class="control-label col-lg-2" >图形验证码：</label>
        <div class="col-lg-6">
       <p><input type="text"  class="form-control"  id="check-code"  size="7">   <img id="image-auth" src="<%= vcodeImg %>">看不清？<a href="javascript:;" id="reload-img">点击刷新</a><input type="hidden" id="timestamp"><input type="text"  class="hidden-input"  id="code"  name="code" /> </p>
       
        </div>
    </div>

	<div class="form-group" >
		<label class="control-label col-lg-2" >审核范围：</label>
		<div class="col-lg-10">
			<% _.each(authTree, function(e){ %>
			<div class="col-lg-3 auth-tree">
				<input type="checkbox" class="org-checks" value="<%= e.id %>" <%= e.state? "checked":"" %> name="org">
				<label class="org-label" for="org"><%= e.text %></label>
			</div>
			<% }) %>
		</div>
	</div>

	<div class="form-group" >
		<label class="control-label col-lg-2" for="data-auth" >审核组织：</label>
		<div class="col-lg-10">
		<select id="test-select" multiple="multiple">
			<% _.each(treeA, function(e){ %>
			<%= e.checked %>
				<option value="<%= e.value %>" data-section="<%= e.text %>" <%= e.checked?'selected':'' %>><%= e.text0 %></option>
			<% }) %>
		</select>
		</div>
	</div>
	
	<div class="form-group">
		<div class="col-lg-2"></div>
		<div class="col-lg-10">
			<button type="submit" class="btn btn-default btn-primary" id="auth-manage-save">提交</button>
		</div>
	</div>

</form>
			

