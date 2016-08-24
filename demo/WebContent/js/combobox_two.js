Ext.onReady(function(){
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget='side';
	
	//-----------下拉列表开始-------------//
	//创建市数据源
	var combocitystore = new Ext.data.Store({			//创建一个新的数据源
		//设定读取的地址
		proxy:new Ext.data.HttpProxy({url:'../City.action'}),	//数据代理为http代理，地址为。。。
		//设定读取的格式
		reader:new Ext.data.JsonReader({root:'data'}, [{name:'id'},{name:'name'}])//读取json返回值给节点为data，对象列为id和name
	});
	//创建区数据源
	var comboareastore=new Ext.data.Store({
		//设定读取的地址
		proxy:new Ext.data.HttpProxy({url:'../Area.action'}),
		reader:new Ext.data.JsonReader({root:'data'}, [{name:'id'},{name:'name'}])
	});
	
	//创建市Combobox
	var comboboxcity = new Ext.form.ComboBox({
		id:'comboboxcity',
		fieldLabel:'市',
		width:120,
		store:combocitystore,
		displayField:'name',
		valueField:'id',
		emptyText:'请选择...',
		allowBlank:false,
		blankText:'请选择城市',
		editable:false,
		mode:'local',
		listeners:{
			'render':function(){
				combocitystore.load();
			}
		}
	});
	
	//创建区Combobox
	var comboareacity = new Ext.form.ComboBox({
		fieldLabel:'区',
		width:120,
		store:comboareastore,
		displayField:'name',
		valueField:'id',
		triggerAction:'all',
		emptyText:'请选择...',
		allowBlank:false,
		blankText:'请选择区',
		editable:false
	});
	
	//联动的实现
	comboboxcity.on('select',function(){		//市选择变化时触发时间
		comboareastore.baseParams.id=comboboxcity.getValue();//前面是去的数据源，当市变化时，我们给区的数据源加上想service端发送的参数
		comboareacity.setValue('');				//把 区的下拉列表设置为空，由于非空验证，Ext会提示用户"请选择区"，这个地方可以把加载出来的第一个区显示在区的下拉列表中
		comboareastore.load();					//区的数据源重新加载
	})
	//-------------------下拉列表结束---------------//
	//表单
	var form = new Ext.form.FormPanel({
		frame:true,
		title:'联动',
		style:'margin:10px',
		items:[comboboxcity,comboareacity]
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