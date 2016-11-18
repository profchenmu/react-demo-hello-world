<td class="table-item custom-td"><%= fundRemitName %></td>
<td class="table-item custom-td"><%= totalAmount %></td>
<td class="table-item custom-td"><%= createdDateStr %></td>

<td class="table-item custom-td">
	
	<%= words %>
	<% if(status==='04'){ %>
		<br>
		拒绝理由: <%= message %><%= message %>
	<% } %>

</td>
<td class="table-item custom-td">
<% if(status!=='04'){ %>
	<%= updatedDateStr %>
<% } %>	
</td>
<td class="table-item custom-td">
	<% if(status==='03'){ %>
		<a class="table-action" id="devide-change" href="javascript:;">变更</a> ｜ 
		<a class="table-action" id="devide-undo" href="javascript:;">撤销</a>
	<% } %>
</td>