<div class="modal-dialog modal-md" id="edit-password-modal" role="document">
	<div class="modal-content">
		<div class="modal-header">
        	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        	<h5 class="modal-title" id="myModalLabel">修改密码</h5>
      	</div>
      	<div id="edit-modal-body">
        	<form id="edit-password-form2">
        		<div class="form-group clearfix">
		        	<label class="control-label  col-md-4">用户名：</label>
		        	<div class="col-md-8">
		            	<input type="text"  name="user-name" id="user-name" class="form-control ">
		            </div>
		     	</div>
	        	<div class="form-group clearfix">
		        	<label class="control-label  col-md-4">手机号码：</label>
		        	<div class="col-md-8">
		            	<input type="text" name="phone" id="phone" class="form-control ">

		            </div>
		            
		     	</div>
		     	<div class="form-group clearfix">
		        	<label class="control-label col-md-4">图形验证码：</label>
		        	<div class="col-md-8 specal-height">
			       		<input type="text" name="code" id="code" class="form-control">
			       		<img id="image-auth" src="asdfs" width="60" height="30"><a href="javascript:;" id="reload-img">点击刷新</a>
			       		<!-- <input type="text"  class="hidden-input"  id="code2"  name="code2" /> -->
		       		</div>
		    	</div>
	        	<div class="form-group clearfix">
		        	<label class="control-label col-md-4">手机验证码：</label>
		        	<div class="col-md-4">
			            <input type="text"  name="check-code" id="check-code" class="form-control">
		            </div>
		            <div class="col-md-4">
		            	<button  type="button" class="btn btn-primary" id="get-timer"><span id="timer"></span><span id="timer-text">发送验证码</span></button>
		            </div>
		     	</div>
		       	
	           	<div class="modal-footer">
	            	<button type="submit" class="btn btn-primary" id="edit-password-button">确 认</button>
	            	<button type="button" class="btn btn-default cancel" data-dismiss="modal">取 消</button>       
	          	</div>
        	</form>
		</div>
	</div>
</div>