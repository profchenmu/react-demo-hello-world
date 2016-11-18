<!-- Modal -->
<!-- <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"> -->
  <div class="modal-dialog modal-md" id="check-devide-deny-modal" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h5 class="modal-title" id="myModalLabel">拒绝资金划拨申请</h5>
      </div>
      <div class="modal-body">
        <form class="check-form" id="check-devide-form">
          <div class="form-group">
            <p>福利名称：<span><%= fundRemitName %></span></p>
            <p>发放总额：<span><%= amount %></span>元</p>
          </div>
          <div class="form-group">
          <textarea placeholder="请填写拒绝原因，最多20个汉字（必填）" maxlength="20" id="deny-reason" name="denyreason" class="form-control"></textarea>
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

