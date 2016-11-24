<div class="modal-dialog modal-md"  role="document">
	<div class="modal-content">
		<div class="modal-header">
        	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        	<h5 class="modal-title" id="myModalLabel">发放确认</h5>
      	</div>
      	<div class="modal-body">
      	请仔细检查核对发放信息：<br/>
        福利名称：<span class="red-font"><%=info%></span><br/>
        <%if (price!=''){%>
        福利金额：<span class="red-font"><%=price%></span>元/人<br/>
        <%}%>
        发放总额：<span class="red-font"><%=totalPrice%></span>元<br/>
        <form id="change-check">
        <div class="check-list">
        <div class="form-group">
          <%= userAgencyList.length>0? '请选择本次发放的审批人<br>': ''  %>
          
          <% _.each(userAgencyList, function(e){ %>
          <span>
            <input type="radio" class="check-name" name="check-name" value="<%= e.userName %>">
            <label for="check-name"><%= e.userName %></label>
          </span>
          <% }) %>
        </div>
        </div>
        <button type="submit"  id="confirm-button" class="btn btn-primary">确 认</button>
          <button type="button" class="btn btn-default cancel" data-dismiss="modal">取 消</button>  
          </form>
      	</div>

      	<div class="modal-footer">
        	     
      	</div>
	</div>
</div>
