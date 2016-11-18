<!-- Modal -->
<!-- <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"> -->
  <div class="modal-dialog modal-md" id="check-devide-deny-modal" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h5 class="modal-title" id="myModalLabel">划拨申请变更</h5>
      </div>
      <div class="modal-body">
        <form class="check-form" id="check-devide-form">
          <div class="form-group">
            <p>福利名称：<span><%= fundRemitName %></span></p>
            <p>发放总额：<span><%= totalAmount %></span>元</p>
          </div>
          <div class="check-list form-group" data-audit="<%= auditId %>">
          <%= auditUserAll.length>0? '请选择本次划拨的审批人<br>': '' %>
          
            <% _.each(auditUserAll, function(e){ %>
            <span>
              <input type="radio" class="check-name" name="check-name" <%= e.checked?'checked':'' %> value="<%= e.userName %>">
              <label for="check-name"><%= e.userName %></label>
            </span>
            <% }) %>
          </div>
           <div class="modal-footer">
            <button type="submit" class="btn btn-primary" id="send-phone-change">确 认</button>
            <button class="btn btn-default cancel" data-dismiss="modal">取 消</button>   
          </div>
        </form>
      </div>
    </div>
  </div>
<!-- </div> -->

