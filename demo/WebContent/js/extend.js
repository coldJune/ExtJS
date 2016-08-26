/**
 * 
 */

Ext.onReady(function(){
	//-----------------------继承前开始---------------------//
	var Panel = new Ext.Panel({
		title:'标题',
		width:500,
		height:100,
		html:'hahah'
	});
	
	var Panel2 = new Ext.Panel({
		title:'标题',
		width:500,
		height:100,
		html:'heihei'
	});
	//-------------------继承前结束------------------------//
	//-------------------继承后开始------------------------//
	var MyPanel = Ext.extend(Ext.Panel,{					//Ext.extend用来继承已有的类，这里给title,width,height加上了默认值
		title:'标题',
		width:500,
		height:100
	});
	
	var MyPanel1 = new MyPanel({						//通过简单的继承，每次使用new新类即可
		html:'mimimahos'
	});
	
	var MyPanel2 = new MyPanel({
		html:'henheng哈'
	});
	//------------------继承后结束-----------------------//
	//定义新的类FormPanel，并把变化的属性暴露出来以便以后继承
	var MyFormPanel = Ext.extend(Ext.form.FormPanel,{
		title:'属性外露',
		width:500,
		labelWidth:80,
		initComponent:function(){						//给组件套用子组件须在initComponent:function(){}初始化组件加入，完成后调用父类构造方法
			this.items =[{
				xtype:'textfield',
				fieldLabel:'姓名',
				id:this.usernameid,	//变化的部分
				name:'username',
			}];
			this.buttons =[{
				text:'确定',
				handler:this.submit,//变化的部分
				scope:this
			},{
				text:'取消',
				handler:this.cancel,//变化的部分
				scope:this
			}];
			MyFormPanel.superclass.initComponent.call(this,arguments);	//调用父类的initComponent
		}
	});
	
	//创建测试对象1
	var testForm1 = new MyFormPanel({
		usernameid:'username',
		submit:function(){
			alert(Ext.getCmp('username').getValue());
		},
		cancel:function(){
			testForm1.getForm().reset();
		}
	});
	
	//创建测试对象2
	var testForm2 = new MyFormPanel({
		title:'覆盖属性',
		usernameid:'usernameid',
		submit:function(){
			alert(this.usernameid);
		},
		cancel:function(){
			testForm2.getForm().reset();
		}
	});
	
	//创建窗体
	var win  =new Ext.Window({
		title:'窗口',
		id:'window',
		width:500,
		height:620,
		resizable:true,
		closable:true,
		maximizable:true,
		minimizable:true,
		items:[Panel,Panel2,MyPanel1,MyPanel2,testForm1,testForm2]
	});
	win.show();
});