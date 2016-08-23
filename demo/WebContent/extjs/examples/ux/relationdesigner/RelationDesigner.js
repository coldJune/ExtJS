/*!
 * Ext JS Library 3.2.1
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ns('Ext.ux.inspur');
/**
 * @class Ext.ux.inspur.RelationDesigner
 * @extends Ext.Window
 * 数据绑定综合窗口
 * ◇为容器，◆为组件
 * ◇整体WINDOW◇-border布局
 * 	┣━◆基本信息面板◆━north
 * 	┣━◇tab面板◇━center，tab(card)布局
 * 	┃		┣━◆grid数据列表 1◆
 * 	┃		┣━◆grid数据列表 2◆
 * 	┃		┣━......
 * 	┃		┗━◆grid数据列表 n◆
 * 	┗━◇绑定数据展示面板◇━east，默认布局
 * 			┣━◆绑定数据VIEW 1◆
 * 			┣━◆绑定数据VIEW 2◆
 * 			┣━......
 * 			┗━◆绑定数据VIEW n◆
 */
Ext.ux.inspur.RelationDesigner = Ext.extend(Ext.Window, {
	/**
	 * 配置**常量部分**默认值
	 */
	MAIN_WINDOW_ID					:'relation-designer',
	MAIN_WINDOW_TITLE				:'',
	MAIN_WINDOW_SHOW_MODE			:'panel',//'panel','window'
	MAIN_WINDOW_HEIGHT				:200,
	MAIN_WINDOW_WIDTH				:300,
	MAIN_WINDOW_FLYFROM				:'',
	MAIN_WINDOW_EDID_MODE			:'add',//'add','modify','detail'
	SAVE_URL						:'',
	UPDATE_URL						:'',
	INFO_PANEL_ISSHOW				:true,
	INFO_PANEL_HEIGHT				:100,
	VIEW_PANEL_WIDTH				:500,
	DELETE_IMAGE_SRC				:context_path+'/eoms-skins/default/images/common-delete.gif',
	/**
	 * 配置**组件部分**声明
	 */
	basicInfoPanel					:null,
	
	dataGridTab						:null,
	dataGridCfgs					:null,
	dataGridInsArray				:new Array(),
	currDataGrid					:null,
	lastDataGrid					:null,
	
	templateViewPanel				:null,
	viewPanelInsArray				:new Array(),
	currViewPanel					:null,
	lastViewPanel					:null,
	/**
	 * 配置**必要方法**声明
	 */
	getParamsAndRelations			:null,
	setParamsAndRelations			:null,
	ajaxCallback					:null,
	/**
	 * 可用方法
	 */
	//渲染前验证组件是否完善
	checkForInit:			function(){
								if(this.MAIN_WINDOW_SHOW_MODE != 'panel' && 
										this.MAIN_WINDOW_SHOW_MODE != 'window')
									return "MAIN_WINDOW_SHOW_MODE属性应该为panel或window的一种";
								if(this.INFO_PANEL_ISSHOW && !this.basicInfoPanel)
									return "需要显示基本信息面板，但未将基本信息面板赋值到basicInfoPanel中";
								if(this.MAIN_WINDOW_SHOW_MODE == 'window'){
									if(typeof this.MAIN_WINDOW_HEIGHT !== 'number' 
										|| typeof this.MAIN_WINDOW_WIDTH !== 'number')
										return "在窗口模式下，必须指定数字型的窗口的高度与宽度";
								}
								if(this.INFO_PANEL_ISSHOW){
									if(!this.basicInfoPanel.formIsValid)
										return "如果显示信息面板，信息面板必须实现formIsValid的方法";
								}
								if(!this.VIEW_PANEL_WIDTH || typeof this.VIEW_PANEL_WIDTH !== 'number')
									return "视图面板的宽度未设定或者没有定制为数字";
								if(!this.dataGridCfgs || !this.dataGridCfgs.length){
									return "关联数据表格的配置属性dataGridCfgs为空！";
								}else{
									for ( var i = 0; i < this.dataGridCfgs.length; i++) {
										var dataGridCfg = this.dataGridCfgs[i];
										if(!dataGridCfg.title || !dataGridCfg.selected || !dataGridCfg.id
												|| !dataGridCfg.idProperty || !dataGridCfg.nameProperty
												|| !dataGridCfg.store || !dataGridCfg.cm || !dataGridCfg.selStoreId)
											return "第"+(i+1)+"个关联数据表格的配置属性不完整，请检查是否具有"
													+"id,idProperty,nameProperty,title,selected,selStoreId,store,cm属性！";
									}
								}
								if(!this.getParamsAndRelations || !this.setParamsAndRelations || !this.ajaxCallback)
									return "属性中必须实现getParamsAndRelations,ajaxCallback与setParamsAndRelations方法";
							},
	enableButton:			function(){
								Ext.getCmp('btn-save').enable();
							},
	disableButton:			function(){
								Ext.getCmp('btn-save').disable();
							},
	//停止所有动画
	stopAllAnimation:		function(){
								for ( var i = 0; i < this.viewPanelInsArray.length; i++) {
									if(this.viewPanelInsArray[i].getEl().hasActiveFx()){
										this.viewPanelInsArray[i].getEl().stopFx();
									}
								}
							},
	//根据配置初始化基本参数
	initBaseCfg:			function(){
								//基础参数
								var cfg = {
										layout				: 'border',
										//plain				: true,
										bodyStyle			: 'padding:5px;background-color:#e7f6ff'
								};
								//是否最大化而引起的变化
								if(this.MAIN_WINDOW_SHOW_MODE == 'panel'){
									cfg.maximizable			= false;
									cfg.closable			= false;
									cfg.resizable			= false;
									cfg.draggable			= false;
								}else if(this.MAIN_WINDOW_SHOW_MODE == 'window'){
									cfg.height				= this.MAIN_WINDOW_HEIGHT;
									cfg.width				= this.MAIN_WINDOW_WIDTH;
									cfg.closable			= true;
									cfg.maximizable			= true;
									cfg.constrain			= true;
									cfg.modal				= true;
									cfg.closeAction			= 'hide';
									if(this.MAIN_WINDOW_FLYFROM){
										cfg.animateTarget 	= this.MAIN_WINDOW_FLYFROM;
									}
								}
								return cfg;
							},
	//初始化各个组件
	initBaseComponent:		function(){
								var cfg = {items:new Array(),buttons:new Array(),buttonAlign:'center'};
								//初始化基本信息面板
								if(this.INFO_PANEL_ISSHOW){
									//首先加入必须有的参数
									Ext.apply(this.basicInfoPanel,{
										region				: 'north',
										height				: this.INFO_PANEL_HEIGHT
									});
									cfg.items.push(this.basicInfoPanel);
								}
								//初始化表格tab
								this.dataGridTab = new Ext.TabPanel({
									region:'center',
									//border:false,
									cls:'rel-grid-tab',
									defaults:{
										tabCls:'rel-grid-tab-item'
									},
									items:[],
									listeners:{
										tabchange:function(tab,grid){
											grid.getStore().load({params:{start:0}});
											if(this.ownerCt.currDataGrid){
												this.ownerCt.lastDataGrid = this.ownerCt.currDataGrid;
											}
											this.ownerCt.currDataGrid = grid;
											if(this.ownerCt.currViewPanel){
												this.ownerCt.lastViewPanel = this.ownerCt.currViewPanel;
											}
											this.ownerCt.currViewPanel = Ext.getCmp('view-'+grid.getId());
											//如果不是首次进入
											if(this.ownerCt.lastViewPanel){
												//首先停止所有动画效果
												this.ownerCt.stopAllAnimation();
												//当前视图页面亮起，波纹显示
												this.ownerCt.currViewPanel.getEl()
													.shift({opacity:1, duration: 1});
													//.frame("71f697", 100, { duration: 1 });
												//当前视图div改变class
												var tempdiv = document.getElementById('rel_'+grid.id+'_div');
												if(tempdiv){
													tempdiv.className = 'block-hover';
												}
												//上一个视图页面渐隐
												this.ownerCt.lastViewPanel.getEl()
													.shift({opacity: .50, duration: 1});
												//上一个视图div恢复class
												var tempdiv = document.getElementById('rel_'+this.ownerCt.lastDataGrid.id+'_div');
												if(tempdiv){
													tempdiv.className = '';
												}
											}
										}
									}
								});
								//初始化关联关系视图
								this.templateViewPanel = new Ext.Panel({
									region:'east',
									autoScroll:true,
									border:false,
									bodyStyle:'background-color:#e7f6ff;',
									padding:'5 5 5 5',
									width:this.VIEW_PANEL_WIDTH,
									items:[]
								});
								var scope = this;
								var dblis = function(store){
									//当前视图div改变class
									var tempdiv = document.getElementById('rel_'+scope.currDataGrid.id+'_div');
									tempdiv.className = 'block-hover';
								}
								//初始化关联数据表格与视图面板
								for ( var i = 0; i < this.dataGridCfgs.length; i++) {
									var dataGridCfg = this.dataGridCfgs[i];
									//生成关联关系视图
									//初始化视图面板
									var relationview = null;
									if(dataGridCfg.customXTemplate){
										relationview = new Ext.DataView({
											id:'dataview_'+dataGridCfg.id,
									        cls: 'relation-view',
									        tpl: dataGridCfg.customXTemplate,
									        itemSelector: 'div.relation-block',
									        overClass: 'relation-over',
									        selectedClass: 'relation-selected',
									        singleSelect: true,
									        store: dataGridCfg.selected,
									        listeners:{afterrender:function(view){
												//为store加监听事件
												view.getStore().on('add',dblis);
											}}
									    });
									}else{
										relationview = new Ext.DataView({
											id:'dataview_'+dataGridCfg.id,
									        cls: 'relation-view',
									        tpl: '<div id="rel_'+dataGridCfg.id+'_div">' + 
									        	 '<tpl for=".">' +
									                '<div class="relation-block">' +
									                	'<div class="block-sel-l"><div class="block-sel-r"><div class="block-sel-c">' +
											        		'<table>' +
											                    '<tr><td>'+dataGridCfg.title+'：</td>'+
											                    '<td ext:qtip="{'+dataGridCfg.nameProperty+'}">{'+dataGridCfg.nameProperty+':ellipsis('+Math.floor((this.VIEW_PANEL_WIDTH-160)/12)+')}</td>'+
											                    '<td><img src="'+this.DELETE_IMAGE_SRC+'" onclick="Ext.StoreMgr.get(\''
											                    +dataGridCfg.selStoreId+'\').removeAt(Ext.StoreMgr.get(\''+dataGridCfg.selStoreId+'\').find(\''
											                    +dataGridCfg.idProperty+'\',\'{'+dataGridCfg.idProperty+'}\',0,true,true))" /></td></tr>' +
											                '</table>'+
											            '</div></div></div>' +
									                '</div>' +
									             '</tpl>' +
									             '</div>',
									        itemSelector: 'div.relation-block',
									        overClass: 'relation-over',
									        selectedClass: 'relation-selected',
									        singleSelect: true,
									        store: dataGridCfg.selected,
									        listeners:{afterrender:function(view){
												//为store加监听事件
												view.getStore().on('add',dblis);
											}}
									    });
									}
									//需要摘出来！！
									var icons = ['common-role.png','common-form.png','common-service.png'];
									var relationViewInsPanel = new Ext.form.FieldSet({
										id:'view-'+dataGridCfg.id,
										zoneGroup:'zone_'+dataGridCfg.id,
										viewStore:dataGridCfg.selected,
										idProperty:dataGridCfg.idProperty,
										title:'<p style="vertical-align: center;" ext:qtip="请双击或拖拽项目到此处">'
												+'<img style="vertical-align: bottom;" src="'+context_path+'/eoms-skins/default/images/'+icons[i]+'" />'
												+'&nbsp;&nbsp;'+dataGridCfg.title+'</p>',
										iconCls:icons[i],
										frame:true,
										//bodyStyle:'background-color:#fff3b2',
										//padding:5,
										items:relationview,
										listeners:{
											render:function(view){
												view.dropZone = new Ext.dd.DropTarget(view.body.dom,{
													ddGroup : view.zoneGroup,
													notifyDrop:function(source, e, data){
														//拖拽过来的record
														var sourceRec = data.selections[0];
														//如果有自定义的方法，则首先运行，如果返回false，则不继续
														if(scope.currDataGrid.retrieveRelation){
															if(!scope.currDataGrid.retrieveRelation(scope.currDataGrid,scope.currDataGrid.selected,sourceRec)){
																return;
															}
														}
														//目标store
														var aimStore = view.viewStore;
														//在不存在的时候才加入store
														if(aimStore.find(view.idProperty,sourceRec.get(view.idProperty))==-1){
															var dblis = function(store){
																//当前视图div改变class
																var tempdiv = document.getElementById('rel_'+scope.currDataGrid.id+'_div');
																tempdiv.className = 'block-hover';
																aimStore.un('add',dblis);
															}
															aimStore.on('add',dblis);
															aimStore.add(sourceRec);
														}
													}
												})
											}
										}
									});
									this.templateViewPanel.add(relationViewInsPanel);
									this.viewPanelInsArray.push(relationViewInsPanel);
									//生成数据表格
									Ext.apply(dataGridCfg,{
										sm : new Ext.grid.RowSelectionModel({
											singleSelect:true
										}),
										ddGroup : 'zone_'+dataGridCfg.id
									});
									var grid = this.dataGridTab.add(new Ext.ux.inspur.RelationDesignerGird(dataGridCfg));
									this.dataGridInsArray.push(grid);
								}
								cfg.items.push(this.dataGridTab);
								cfg.items.push(this.templateViewPanel);
								//生成按钮
								cfg.buttons.push({
									text:'保存',
									id:'btn-save',
									handler:function(){
										//获取到window的句柄
										var designer = this.ownerCt.ownerCt;
										designer.getEl().mask("保存中……请稍候");
										//如果有信息表单，则进行验证，验证不通过的话，返回，并提示
										if(designer.INFO_PANEL_ISSHOW && !designer.basicInfoPanel.formIsValid()){
											alert("表单验证不通过！");
											return;
										}
										//获取提交时的所有参数
										var params = designer.getParamsAndRelations();
										//根据模式，进行表单提交
										var url = "";
										if(designer.MAIN_WINDOW_EDID_MODE == 'add'){
											url = designer.SAVE_URL;
										}else if(designer.MAIN_WINDOW_EDID_MODE == 'modify'){
											url = designer.UPDATE_URL;
										}
										if(!url){
											alert("未正确获取到url");
											return;
										}
										Ext.Ajax.request({
											url: url,
											params: params,
											success: function(response) {
												designer.getEl().unmask();
												var responseData = Ext.decode(response.responseText);
												designer.ajaxCallback(responseData,true);
											},
											failure:function(response){
												designer.getEl().unmask();
												var responseData = Ext.decode(response.responseText);
												designer.ajaxCallback(responseData,false);
											}
										});
									}
								});
								return cfg;
							},
	/**
	 * 封装开始
	 */
	initComponent:			function(cfg){
								//导入自定义配置
								Ext.apply(this,cfg);
								//进行初始化验证
								var checkMsg = this.checkForInit();
								if(checkMsg){
									Ext.Msg.alert('错误',checkMsg);
									return;
								}
								//注入基本参数
								Ext.apply(this,this.initBaseCfg());
								//注入组件
								Ext.apply(this,this.initBaseComponent());
								Ext.ux.inspur.RelationDesigner.superclass.initComponent.call(this);
							},
	listeners:				{
								show:function(designer){
									//需要排除异常，防止tab中无项时报错
									try{designer.dataGridTab.setActiveTab(0)}catch(e){};
									//如果是编辑模式或者查看模式，则进行抽取并录入数据
									if(designer.MAIN_WINDOW_EDID_MODE == 'modify' || 
											designer.MAIN_WINDOW_EDID_MODE == 'detail')
										designer.setParamsAndRelations();
									//如果是查看模式，还要禁用保存按钮
									if(designer.MAIN_WINDOW_EDID_MODE == 'detail')
										Ext.getCmp('btn-save').setVisible(false);
									//渐隐非焦点窗口，显示焦点窗口
									for ( var i = 0; i < designer.viewPanelInsArray.length; i++) {
										if(i != 0){
											designer.viewPanelInsArray[i].getEl()
												.shift({opacity:.5, duration: 1});
										}else{
											designer.viewPanelInsArray[i].getEl()
												.shift({opacity:1, duration: 1 ,callback:function(){
													//当前视图div改变class
													var tempdiv = document.getElementById('rel_'+designer.dataGridInsArray[0].id+'_div');
													if(tempdiv){
														tempdiv.className = 'block-hover';
													}
												}});
										}
									}
								},
								hide:function(designer){
									//清空所有store
									for ( var i = 0; i < designer.dataGridCfgs.length; i++) {
										var dataGridCfg = designer.dataGridCfgs[i];
										dataGridCfg.selected.removeAll();
									}
								}
							}
});
Ext.ux.inspur.RelationDesignerGird = Ext.extend(Ext.grid.GridPanel,{
	loadMask				: {msg : '加载数据中，请稍候...'},
	stripeRows				: true,
	viewConfig				: {forceFit:true},
	enableDragDrop			: true,
	listeners				: {
								rowdblclick:function(grid,rowIndex,e){
									//如果有自定义的方法，则首先运行，如果返回false，则不继续
									var record = grid.getStore().getAt(rowIndex);
									if(grid.retrieveRelation){
										if(!grid.retrieveRelation(grid,grid.selected,record)){
											return;
										}
									}
									if(grid.selected.find(grid.idProperty,record.get(grid.idProperty))==-1){
										grid.selected.add(record);
									}
								}
							}
});