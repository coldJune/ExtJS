Ext.onReady(function(){
	var jsonstore = new Ext.data.JsonStore({					//创建一个新的数据源
		data:[													//data:数据项，如数据库的存储一样
		      {id:1,name:'笨',sex:'0',birthday:'2001/02/03'},	//id	name	sex	birthday
		      {id:2,name:'傻',sex:'0',birthday:'2002/03/04'},	//1		笨		0	2001/02/03
		      {id:3,name:'jun',sex:'1',birthday:'2003/03/04'}	//2		傻		0	2002/03/04
		      ],												//3		jun		1	2003/03/04
		      fields:[											//列的定义，指出数据源应该有几列，每列的名称和数据类型等信息，如上所示，说明存在4列，列名为：id,name,sex,birthday
		              'id','name','sex',{						
		            	  name:'birthday',
		            	  type:'date',
		            	  dateformate:'Y/m/d'
		              }
		              ]
	});
	//复选框列
	var sm = new Ext.grid.CheckboxSelectionModel();				//创建一个复选框的列 	sm在两个地方使用，1.告诉列模型,29行 	2.告诉列表，67行
	//渲染性别
	/*
	 * value:当前单元格的值
	 * metaData:设置元素<div>男</div>的样式表与属性值,这个参数包含两个属性：metaData.css与metaData.attr
	 * record:当前Record对象应用
	 * rowIndex:当前单元格行的索引
	 * colIndex:当前单元格列的索引
	 * store:store的引用
	 * 我们最常用的是value,平时大多数只传value，var sexrender=function(value){处理方法}
	 */
	var sexrender = function(value,metaData,record,rowIndex,cloIndex,store){		
		if(value=='0'){
			metaData:attr ='style="font-weight:bold";'
				return '女';
		}else{
			return '男';
		}
	}
		var column = new Ext.grid.ColumnModel({			//定义grid应该有几列
			columns:[
			         sm,											//复选框
			         {header:'编号',dataIndex:'id',sortable:true},	//header:显示grid上面的标题，dataIndex:'id'对应数据源的映射关系
			         {header:'姓名',dataIndex:'name'},
			         {header:'性别',dataIndex:'sex',renderer:sexrender},
			         {header:'出生日期',dataIndex:'birthday',renderer:Ext.util.Format.dateRenderer('Y-m-d')}
			         ]
		});
		
		//添加按钮
		var tbtn = new Ext.Toolbar.Button({			//创建一个工具栏按钮，tbar可以添加多个按钮，处理不同的方法，如"添加"，"删除"，"修改"
			text:'查看选中项',
			listeners:{
				'click':function(){
					var row = grid.getSelectionModel().getSelections();		//获取选中项的行
					for(var i =0;i<row.length;i++){
						alert(row[i].get('id'));
					}
				}
			}
		});
		
		//分页控件
		var pager = new Ext.PagingToolbar({
			pageSize:2,										//页码大小为2
			store:jsonstore,								//分页的数据源
			listeners:{										//由于没有连接后天数据库动态绑定数据库，这里点下一页"beforechange"事件return false
				"beforechange":function(bbar,params){
					var grid = bbar.ownerCt;
					var store = grid.getStore();
					var start = params.start;				//起始数据的索引号
					var limit = params.limit;				//每页的大小
					alert(store.getCount());
					return false;
				}
			}
		});
		//列表
		var grid = new Ext.grid.GridPanel({		//声明一个新的grid
			sm:sm,					//选择列
			title:'GridPanel',		
			height:200,				
			store:jsonstore,		//数据源
			tbar:[tbtn],			//顶部的按钮
			bbar:pager,				//底部的分页
			colModel:column			//列表头与列
		});
		
		//表单
		var form = new Ext.form.FormPanel({
			frame:true,
			fileUpload:true,
			url:'../kindeditor/jsp/upload_json.jsp',
			title:'表单标题',
			style:'margin:10px',
			items:[grid]
		});
		
		//窗体
		var win = new Ext.Window({
			title:'窗体',
			width:476,
			height:374,
			resizable:true,
			modal:true,
			closable:true,
			maximizable:true,
			minimizable:true,
			buttonAlign:'center',
			items:form
		});
		win.show();
});