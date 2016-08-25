/**
 * 
 */
Ext.onReady(function(){
	var node ={
			text:'根',
			expanded:true,					//是否展开子节点，默认为false,如“如根下节点三”
			leaf:false,						//是否为叶子节点，如果设置为false但没有children那么会产生一直读取子节点的展示
			children:[
			          {
			        	  text:'根下节点一[user图标]',
			        	  leaf:true,
			        	  iconCls:'nodeicon'		//ExtJs自带的图标显示为"文件夹"或是"列表",通过iconCls可以换树形菜单的图标
			          },
			          {
			        	  text:'根下节点二',
			        	  leaf:true,
			          },
			          {
			        	  text:'根下节点三',
			        	  leaf:false,
			        	  children:[
			        	           {
			        	        	   text:'节点三子节点一',
			        	        	   leaf:true
			        	           },
			        	           {
			        	        	   text:'节点三子节点二',
			        	        	   leaf:false,
			        	        	   expanded:true,
			        	        	   children:[
			        	        	             {
			        	        	            	 text:'节点三子节点二节点一',
			        	        	            	 leaf:true
			        	        	             },{
			        	        	            	 text:'节点三子节点二节点二',
			        	        	            	 leaf:true
			        	        	             }
			        	        	             ]
			        	           }
			        	           
			        	           ]
			          }
			          ]
	};
	//树面板(本地数据源)
	var treelocal = new Ext.tree.TreePanel({		//创建一个新的TreePanel表单对象
		title:'TreePanelLocal',	
		root:node									//根节点
	});
	
	//树面板(服务器数据源)
	var treeservice = new Ext.tree.TreePanel({
		title:'TreePanelService',
		root:{
			text:'根',
			expanded:true							
		},
		loader:new Ext.tree.TreeLoader({			//树的数据载入组件，通过url寻找service端返回的json，并且自动转换成TreeNode	
			url:'../Tree.action'
		})
	});
	//表单
	var form = new Ext.form.FormPanel({
		frame:true,
		title:'表单标题',
		style:'margin:10px',
		items:[treelocal,treeservice],
		buttons:[{
			text:'获取选中项',
			handler:function(){
				selectNode= treelocal.getSelectionModel().getSelectedNode();		//获取选中项
				alert('TreePanelLocal:'+(selectNode==null?treelocal.root.text:selectNode.text));
			}
		}]
	});
	
	//窗体
	var win = new Ext.Window({
		title:'窗口',
		width:476,
		height:574,
		resizable:true,
		modal:true,
		closable:true,
		maximizable:true,
		minimizable:true,
		items:form
	});
	win.show();
});