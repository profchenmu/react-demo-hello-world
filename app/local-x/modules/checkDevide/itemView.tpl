w<td class="table-item custom-td fundRemitName"><%= fundRemitName %></td>
<td class="table-item custom-td amount"><%= amount %></td>
<td class="table-item custom-td addDate"><%= rawAddTime %></td>
<td class="table-item custom-td toAgencyName"><%= toAgencyName %></td>

<td class="table-item custom-td">
<% if(status==='01'||status==='02'){ %>
		<a class="table-action" id="devide-pass" href="javascript:;">通过</a> ｜ 
		<a class="table-action" id="devide-deny" href="javascript:;">拒绝</a>
<% }else{ %>
	<%= auditTime %>	
<% } %>

</td>
