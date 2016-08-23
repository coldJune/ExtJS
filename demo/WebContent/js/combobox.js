/**
 * 
 */
Ext.override(Ext.form.TextField,{
	unitText:'',
	onRender:function(ct,position){
		Ext.form.TextField.superclass.onRender.call(this,ct,position);
		//如果单位字符串已定义，则在后方增加单位对象
		if(this.unitText!=''){
			this.unitEl = ct.createChild({
				tag:'div',
				html:this.unitText
			});
			this.unitEl.addClass('x-form-unit');
			
			this.width=this.width-(this.unitText.replace(/[^\x00-\xff]/g,"xx").length*6+2);
			this.alignErrorIcon=function(){
				this.errorIcon.alignTo(this.unitEl,'tl-tr',[2,0]);
			};
		}
	}
});

Ext.onReady(function(){
	Ext.QuickTips.init();
	Ext.form.TextField.prototype.msgTarget='side';
	
	//提交按钮方法
	var btnsubmitclick = function(){
		Ext.MessageBox.alert("提示", "你一点击提交按钮");
	}
	
	//重置按钮方法
	var btnresetclick=function(){
		form.getForm().reset();
	}
	
	//提交按钮
	var btnsubmit = new Ext.Button({
		text:'提交',
		handler:btnsubmitclick
	});
	
	//重置按钮
	var btnreset= new Ext.Button({
		text:'重置',
		handle:btnresetclick
	});
	
	//姓名
	var username = new Ext.form.TextField({
		width:140,
		fieldLabel:'用户名',
		name:'username',
		allowBlank:false,
		maxLength:20,
		blankText:'请输入用户名',
		maxLengthText:'用户名不能超过20个字符'
	});
	
	//密码
	var passwd = new Ext.form.TextField({
		width:140,
		fieldLabel:'密码',
		name:'password',
		inputType:'password',
		allowBlank:false,
		maxLength:20,
		blankText:'请输入密码',
		maxLengthText:'密码不能超过20个字符'
	});
	
	var numberfield = new Ext.form.NumberField({
		width:80,
		fieldLabel:'身高',
		decimalPrecision:1,
		minValue:0.01,
		maxValue:200,
		unitText:'cm',
		allowBlank:false,
		blankText:'请输入身高'
	});
	
	var hiddenfield = new Ext.form.Hidden({
		name:'userid',
		value:'1'
	});
	
	var datefield = new Ext.form.DateField({
		fieldLabel:'出生日期',
		format:'Y-m-d',
		editable:false,
		allowBlank:false,
		blankText:'请选择日期'
	});
	
	var radiogroup = new Ext.form.RadioGroup({
		fieldLabel:'性别',
		width:100,
		items:[{
			name:'sex',
			inputValue:'0',
			boxLabel:'男',
			checked:true
		},{
			name:'sex',
			inputValue:'1',
			boxLabel:'女'
		}]
	});
	radiogroup.on('change',function(rdgroup,checked){
		alert(checked.getRawValue());
	});
	
	var checkboxgroup = new Ext.form.CheckboxGroup({
		fieldLabel:'兴趣爱好',
		width:170,
		items:[{
			boxLabel:'购物',
			inputValue:'0'
		},{
			boxLabel:'看书',
			inputValue:'1'
		},{
			boxLabel:'音乐',
			inputValue:'2'
		}]
	});
	checkboxgroup.on('change',function(cbgroup,checked){
		for(var i =0;i<checked.length;i++){
			alert(checked[i].getRawValue());
		}
	});
	
	//----------------------下拉列表开始----------------------//
	//创建数据源[数组数据源]
	var combostore = new Ext.data.ArrayStore({			//创建一个新的数组数据源
		fields:['id','name'],						//数据源包含两列，列名分别为'id','name'
		data:[[1,'团员'],[2,'党员'],[3,'其他']]			//数据源对应的数据
	});
	//创建combobox
	var combobox = new Ext.form.ComboBox({			//创建一个下拉列表
		fieldLabel:'政治面貌',
		store:combostore,							//数据源为上面创建的数据源，这个属性时combobox的必需属性
		displayField:'name',
		valueField:'id',							//combobox对应数据源的显示列与列值，这两个属性也是必须的
		triggerAction:'all',						//请设置为"all",否则默认为"query"的情况下，选择某个值后再次下拉，只出现匹配项，设置为all每次下拉均显示全部选项
		emptyText:'请选择。。。',
		allowBlank:false,
		blankText:'请选择政治面貌',
		editable:false,								//默认情况下combobox是可以编辑的，该属性设置为false
		mode:'local'								//指定数据源为本地数据源，如果是本地创建的数据源，该属性也是必须的，如果数据源来自于服务器，设置为'remote'表示数据源来自于服务器
	});
	//Combobox获取值
	combobox.on('select',function(){
		alert(combobox.getValue());					//选择是alert出下拉列表的值
	});
	//表单
	var form = new Ext.form.FormPanel({
		frame:true,
		title:'注册',
		style:'margin:10px',
		html:'<div style="padding:10px">这是表单内容</div>',
		items:[username,passwd,numberfield,hiddenfield,
		       combobox,datefield,radiogroup,checkboxgroup],
		buttons:[btnsubmit,btnreset]
	});
	
	//窗体
	var win = new Ext.Window({
		title:'窗体',
		width:476,
		height:374,
		html:'<div>这里是窗体内容</div>',
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

/*
 * combo这个组件需要绑定一个数据源才能使用，所以store和displayField和valueField是必须的
 * 常用属性
 * valueField:"字符型",value值字段
 * displayField:"字符型",显示文本字段
 * editable:false//false则不可编辑，默认为true
 * triggerAction:"all"//请设置为"all",否则默认为"query"的情况下，选择某个值后再次下拉，只出现匹配项，设置为all每次下拉均显示全部选项
 * hiddenName:string//真正提交时此comno的name，请一定要注意
 * typeAhead:true//延时查询，与下面参数配合
 * typeAheadDelay:3000//默认250
 */