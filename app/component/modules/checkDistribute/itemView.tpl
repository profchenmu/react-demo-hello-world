<td class="table-item custom-td"><%= name %></td>
<td class="table-item custom-td"><%= amount %></td>
<td class="table-item custom-td"><%= rawAddTime %></td>

<td class="table-item custom-td">
	<% if(status==='01'||status==='02'){ %>
			<a class="table-action" id="devide-pass" href="javascript:;">通过</a> ｜ 
			<a class="table-action" id="devide-deny" href="javascript:;">拒绝</a>
	<% }else{ %>
		<%= auditTime %>	
	<% } %>
</td>

<td class="table-item custom-td">
	<a class="table-action" id="show-roles" href="javascript:;">查看规则明细</a>
</td>