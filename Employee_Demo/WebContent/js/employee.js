/**
 * 
 */

//------------------重写文本框开始-------------------//
Ext.override(Ext.form.TextField,{
	unitText:'',
	onRender:function(ct,position){
		Ext.form.TextField.superclass.onRender.call(this,ct,position);
		
		if(this.unitText!=''){
			this.unitEl = ct.createChild({
				tag:'div',
				html:this.unitText
			});
			
			this.unitEl.addClass('x-form-unit');
			this.width = this.width-(this.unitText.replace(/[^\x00-\xff]/g,"xx").length*6+2);
			
			this.alignErrorIcon = function(){
				this.errorIcon.alignTo(this.unitEl,'tl-tr',[2,0]);
			};
		}
	},
});
//-----------------重写文本框结束-----------------------//
Ext.onReady(function(){
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget='side';
	
	//---------------第一列内容开始-----------------//
	//姓名
	var username = new Ext.form.TextField({
		width:130,
		allowBlank:false,
		maxLength:4,
		name:'username',
		fieldLabel:'姓名',
		blankText:'请输入姓名',
		maxLengthText:'姓名不能超过4个字符'
	});
	//政治面貌数据源
	var combostore = new Ext.data.ArrayStore({
		fields:['id','name'],
		data:[[1,'团员'],[2,'党员'],[3,'其他']]
	});
	//政治面貌下拉列表
	var cobpolitical = new Ext.form.ComboBox({
		width:130,
		allowBlank:false,
		fieldLabel:'政治面貌',
		store:combostore,
		displayField:'name',
		valueField:'id',
		triggerAction:'all',
		emptyText:'请选择...',
		blankText:'请选择政治面貌',
		editable:false,
		mode:'local'
	});
	
	//毕业院校
	var graduateschool = new Ext.form.TextField({
		width:130,
		allowBlank:false,
		maxLength:10,
		name:'graduateschool',
		fieldLabel:'毕业院校',
		blankText:'请输入毕业院校',
		maxLengthText:'输入不能大于10'
	});
	
	//通信地址
	var address = new Ext.form.TextField({
		width:130,
		allowBlank:false,
		maxLength:30,
		name:'address',
		fieldLabel:'通信地址',
		blankText:'请输入通信地址',
		maxLengthText:'通信地址不能超过30个字符'
	});
	
	//第一列包含4行
	var column1 = {
			columnWidth:.28,
			layout:'form',
			items:[
			       username,cobpolitical,graduateschool,address
			       ]
	}
	//------------------第一列内容结束------------------//
	//------------------第二列内容开始------------------//
	//性别
	var rdosex = new Ext.form.RadioGroup({
		fieldLabel:'性别',
		width:130,
		style:'padding-top:3px;height:17px;',
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
	//身高
	var height = new Ext.form.TextField({
		width:117,
		fieldLabel:'身高',
		decimalPrecision:0,
		minValue:1,
		maxValue:400,
		name:'height',
		unitText:'cm',
		allowBlank:false,
		blankText:'请输入身高'
	});
	
	//毕业专业
	var professional = new Ext.form.TextField({
		width:130,
		allowBlank:false,
		maxLength:30,
		name:'prefessional',
		fieldLabel:'毕业专业',
		blankText:'请输入毕业专业',
		maxLengthText:'毕业专业不能超过30个字符'
	});
	
	//联系电话
	var phone = new Ext.form.TextField({
		width:130,
		allwoBlank:false,
		maxLength:20,
		name:'phone',
		fieldLabel:'联系电话',
		blankText:'请输入联系电话',
		maxLengthText:'联系电话不能超过20个字符'
	});
	//第二列包含4行
	var column2 ={
			columnWidth:.28,
			layout:'form',
			items:[rdosex,height,professional,phone]
	};
	//-------------------第2列结束----------------//
	//------------------第3列开始----------------//
	//年龄
	var age =  new Ext.form.TextField({
		width:117,
		fieldLabel:'年龄',
		decimalPrecision:0,
		minValue:1,
		maxValue:120,
		name:'age',
		unitText:'岁',
		allowBlank:false,
		blankText:'请输入年龄',
	});
	
	//体重
	var weight = new Ext.form.TextField({
		width:117,
		fieldLabel:'体重',
		decimalPrecision:0,
		minValue:1,
		maxValue:200,
		name:'weight',
		unitText:'kg',
		allowBlank:false,
		blankText:'请输入体重'
	});
	
	//毕业日期
	var dategraduation = new Ext.form.DateField({
		fieldLabel:'毕业日期',
		name:'dategraduation',
		width:117,
		format:'Y-m-d',
		editable:false,
		allowBlank:false,
		blankText:'请选择毕业日期'
	});
	
	//第3列包含3行
	var column3 ={
			columWidth:.25,
			layout:'form',
			items:[age,weight,dategraduation]
	}
	//-----------------第3列结束---------------------//
	//-----------------第4列内容开始-----------------//
	//创建div组件
	var imagebox =new Ext.BoxComponent({
		autoEl:{
			style:'width:65px;height:60px;margin:0px auto;border:1px solid #ccc;text-align:center;padding-top:10px;margin-bottom:8px',
			tag:'div',
			id:'imageshow',
			html:'暂无相片'
		}
	});
	var uploadbutton = new Ext.Button({
		text:'上传照片',
		style:'margin:0px auto;',
		handler:function(){
			alert('弹出新窗体上传照片');
		}
	});
	var column4={
			columnWidth:.16,
			layout:'form',
			items:[imagebox,uploadbutton]
	}
	//--------------------第4列内容结束---------------//
	//招聘来源
	var checksource = new Ext.form.CheckboxGroup({
		fieldLabel:'招聘来源',
		style:'padding-top:3px;height:17px',
		items:[{
			boxLabel:'报纸招聘',
			inputValue:'0'
		},{
			boxLabel:'校园招聘',
			inputValue:'1'
		},{
			boxLabel:'人才市场',
			inputValue:'2'
		},{
			boxLabel:'招聘网站',
			inputValue:'3'
		}]
	});
	
	//创建文本上传域
	var editor = new Ext.form.HtmlEditor({
		fieldLabel:'其他信息',
		width:745,
		height:320
	});
	
	//表单
	var form = new Ext.form.FormPanel({
		frame:true,
		title:'员工信息',
		style:'margin:10px',
		labelWidth:70,
		buttonAlign:'cneter',
		items:[{
			layout:'column',
			items:[column1,column2,column3,column4]
		},checksource,editor
		],
		buttons:[{
			text:'保存',
			handler:function(){
				alert('保存');
			}
		},
		{
				text:'重置',
				handler:function(){
					form.getForm().reset();
				}
		}]
	});
	
	//窗体
	var win = new Ext.Window({
		title:'窗口',
		width:900,
		height:580,
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