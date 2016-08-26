/**
 * 
 */

Ext.onReady(function(){
	//---------------继承了CheckboxGroup使其能够取remote数据源开始--------------//
	Ext.namespace("Ext.ux");
	Ext.ux.RemoteCheckboxGroup= Ext.extend(Ext.form.CheckboxGroup,{
		url:'',
		boxLabel:'',
		inputValue:'',
		items:'',
		setValue:function(val){
			if(val.split){
				val=val.split(',');
			}
			this.reset();
			for(var i = 0;i<val.length;i++){
				this.items.each(function(c){
					if(c.inputValue ==value[i]){
						c.setValue(true);
					}
				} );
			}
		},
		reset:function(){
			this.items.each(function(c){
				c.setValue(false);
			});
		},
		getValue:function(){
			var val =[];
			this.items.each(function(c){
				if(c.getValue()==true){
					val.push(c.inputValue);
				}
			});
			return val.join(',');
		},
		onRender:function(ct,position){
			var items=[];
			if(!this.items){	//如果没有指定就从URL获取
				Ext.Ajax.request({
					url:this.url,
					scope:this,
					async:false,			//设置为同步
					success:function(response){
						
						var data = Ext.util.JSON.decode(response.responseText);
						var Items2 = this.items;
						if(this.panel){
							var columns = this.panel.items;
							if(columns){
								for(var i=0;i<columns.items.length;i++){
									column = columns.items[i];
									column.removeAll();
								}
								Items2.clear();
							}
						}
						for(var i=0;i<data.length;i++){
							var d = data[i];
							var chk={
									boxLabel:d[this.boxLabel],
									name:this.name,
									inputValue:d[this.inputValue]
							};
							items.push(chk);
							
						}
					}
				});
				
				this.items=items;
			}
			Ext.ux.RemoteCheckboxGroup.superclass.onRender.call(this,ct,position);
		}
		
	});
	Ext.reg('remotecheckboxgroup',Ext.ux.RemoteCheckboxGroup);
	//-----------继承了CheckboxGroup使其能够取remote数据源结束------------------//
	var checksource = new Ext.ux.RemoteCheckboxGroup({
		name:'checksource',							//名称，当客户端提交的时候，服务器会根据该名称接收值，当值为多选是  post结果如下[1,2,3],用','分隔
		boxLabel:'name',							//显示的字段
		inputValue:'id',							//checkBox存的值
		url:'../Category.action',					//数据源地址
		fieldLabel:'招聘来源',
		style:'padding-top:3px;height:17px;'
	});
	//创建panel
	var panel= new Ext.Panel({
		title:'动态复选框',
		width:200,
		height:200,
		frame:true,
		items:[checksource]
	});
	
	//创建窗体
	var win = new Ext.Window({
		title:'窗口',
		id:'window',
		width:476,
		height:374,
		resizable:true,
		modal:true,
		closable:true,
		maximizable:true,
		minimizable:true,
		items:[panel]
	});
	win.show();
});