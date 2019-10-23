<template>
  <div class="lanJuport">
    <el-card shadow="hover">
      <!-- X开头（窗帘）确认采购单界面 -->
      <el-dialog
        :show-close="true"
        :visible.sync="checkX_Visible"
        :close-on-click-modal="false"
        disabled="true"
        width="1070px"
        top="8vh"
      >
        <div style="width:100%">
          <div style="margin-bottom:10px">
            <h1>广东玉兰集团股份有限公司采购单（{{ pur_headForm.PUR_NO }}）</h1>
            <span style="float:right">{{
              pur_headForm.DATE_PUR | datatrans
            }}</span>
          </div>
          <div>
            <h1>收货人：{{ pur_headForm.LINKMAN }}</h1>
          </div>
          <div style="margin-bottom:10px">
            <h1>备注信息：{{ pur_headForm.NOTES }}</h1>
          </div>
          <hr />
          <div style="width:100%">

            <el-table
                    :data="colName"
                      :show-header="false"
                    border
                    object_class="_Object:GridTable"
                    object_hashcode="6"
                    cellpadding="0"
                    style="width:100%"
                    class="th-font"
                   >
                    <af-table-column
                      property="name1"
                      width="160"
                      label="位置"
                    ></af-table-column>
                    <af-table-column
                      property="name2"
                      width="80"
                      label="名称"
                    ></af-table-column>
                     <af-table-column
                      property="name3"
                      width="120"
                      label="编码"
                    ></af-table-column>
                    <af-table-column
                      property="name4"
                      label="名称"
                       width="150"
                    ></af-table-column>
                    <!--width="50" -->
                    <af-table-column
                      property="name5"
                      label="规格:米/对"
                         width="60"
                    ></af-table-column>
                    <el-table-column
                      property="name6"
                      label="用量"
                      width="60"
                    ></el-table-column>
                    <el-table-column property="name7" label="含税单价" width="100">
                    
                    </el-table-column>
       
                    <el-table-column
                      property="name8"
                      label="金额"
                      width="80"
                    ></el-table-column>
                    <el-table-column
                      property="name9"
                      label="制造说明"
                      width="80"
                    ></el-table-column>
                    <el-table-column
                      property="name10"
                      label="备注"
                    ></el-table-column>
                  </el-table>
                  <div  >
                    <div v-for="(item, index) of items" :key="index">
                  <!-- 循环因子 -->
                  <el-card body-style="padding: 0px">
                 <el-card     style="width:155px;float:left;"  body-style="padding: 5px" align="left">
                  <div>
                     <template>
                        <div>
                          <label style="font-weight:bold">{{ index + 1 }} &nbsp; 位置：</label>
                          {{
                            item.tab1[index].cl_place === null ||
                            item.tab1[index].cl_place == ""
                              ? "无"
                              : item.tab1[index].cl_place
                          }}
                        </div>
                        <div class="messageBox">
                          <div>
                            <label>款号：</label>
                            <div class="messageInput">
                              {{ item.tab1[index].cl_item_no }}
                            </div>
                          </div>
                          <div>
                            <label>成品宽：</label>
                            <div class="messageInput">
                              {{ item.tab1[index].cl_width }}
                            </div>
                            m
                          </div>
                          <div>
                            <label>成品高：</label>
                            <div class="messageInput">
                              {{ item.tab1[index].cl_high }}
                            </div>
                            m
                          </div>
                          <div>
                            <label>假帘高：</label>
                            <div class="messageInput">
                              {{ item.tab1[index].cl_high_jia }}
                            </div>
                            m
                          </div>
                          <div>
                            <label>帘倍数：</label>
                            <div class="messageInput">
                              {{ item.tab1[index].cl_size_times }}
                            </div>
                          </div>
                        </div>
                        <!-- <div class="line_noDiv"><span class="line_noSpan">{{item.tab1[index].cl_place_id}}</span></div> -->
                      </template>
                  </div>
                 </el-card>
                      <div style="width:159; float:left">
                     
                    </div>

                <el-table
                    :data="item.tab2[index]"
                   :show-header="false"
                    border
                    object_class="_Object:GridTable"
                    object_hashcode="6"
                    cellpadding="0"
                    style="width:866px; float:right"
                    
                   >
                    
                                <el-table-column  width="80" label="inner名称"> <template slot-scope="scope">{{getTypeName(scope.row.cl_name)}}</template> </el-table-column>
                                <el-table-column width="120" label="inner编码"> <template slot-scope="scope">{{scope.row.item_no}} </template> </el-table-column>
                                <el-table-column label="inner名称"  header-align="center" width="150"><template slot-scope="scope">{{scope.row.mname}} </template></el-table-column>
                                <el-table-column label="inner规格:米/对"  header-align="center" width="60"><template slot-scope="scope">{{scope.row.grade}} </template> </el-table-column>
                                <el-table-column label="inner用量"  header-align="center" width="60" ><template slot-scope="scope">{{scope.row.qty_pur}}{{scope.row.unit1}} </template></el-table-column>
                                <el-table-column label="inner含税单价"  header-align="center" width="100" align="right"><template slot-scope="scope">{{scope.row.price_taxin|numFilter}} </template></el-table-column>
                                <el-table-column label="inner金额"  header-align="center" width="80"  align="right"><template slot-scope="scope">{{scope.row.total_money|numFilter}} </template></el-table-column>
                                <el-table-column label="inner制造说明"  header-align="center" width="80"> <template slot-scope="scope">{{scope.row.product_note}} </template> </el-table-column>
                                <el-table-column label="inner备注"  header-align="center"> <template slot-scope="scope">{{scope.row.notes}} </template></el-table-column>
                  </el-table>

                  </el-card>
               <el-table class="th-font" style="width:100%;" :show-header="false" :data="item.tab3[index]" border>
                   <el-table-column label="预约" header-align="center" width="160" > <template slot-scope="scope"> {{scope.row.date_req}} </template></el-table-column>
                    <el-table-column label="交货"  header-align="center" width="200"><template slot-scope="scope"> {{scope.row.date_deliver}} </template></el-table-column>
                    <!-- <el-table-column label="编码" header-align="center" width="130"> </el-table-column> -->
                    <!-- <el-table-column label="交货"  header-align="center" width="80"></el-table-column> -->
                    <el-table-column label="名称"  header-align="center" width="150"></el-table-column>
                    <el-table-column label="规格:米/对" header-align="center" align="center" width="60"> </el-table-column>
                    <el-table-column label="用量" width="60" header-align="center" align="center"></el-table-column>
                    <el-table-column label="含税单价"  width="100"  header-align="center"  align="center"><template > 小计 </template></el-table-column>
                    <el-table-column label="金额" width="80" header-align="left" align="right"> <template slot-scope="scope"> {{scope.row.littleSum|numFilter}} </template> </el-table-column>
                    <el-table-column label="制造说明" width="80" header-align="center" align="center"> </el-table-column>
                    <el-table-column label="备注"  header-align="center" align="center"> </el-table-column>
                </el-table>

                 <!-- 循环因子 -->
                 </div>
                 </div>
                  <el-table
                    :data="sumMoneyCol"
                   :show-header="false"
                    border
                    object_class="_Object:GridTable"
                    object_hashcode="6"
                    cellpadding="0"
                    style="width:100%"
                    class="th-font"
                   >
                    <af-table-column
                      property="name1"
                      width="160"
                      label="位置"
                    ></af-table-column>
                    <af-table-column
                      property="name2"
                      width="80"
                      label="名称"
                    ></af-table-column>
                     <af-table-column
                      property="name3"
                      width="120"
                      label="编码"
                    ></af-table-column>
                    <af-table-column
                      property="name4"
                      label="名称"
                       width="150"
                    ></af-table-column>
                    <!--width="50" -->
                    <af-table-column
                      property="name5"
                      label="规格:米/对"
                         width="60"
                    ></af-table-column>
                    <el-table-column
                      property="name6"
                      label="用量"
                      width="60"
                    ></el-table-column>
                      <el-table-column property="name7" label="含税单价" width="100" align="center">
                    
                    </el-table-column>
       
                    <el-table-column
                  
                      label="金额"
                      width="80"
                      align="right"
                    >
                    <template slot-scope="scope">
                    {{scope.row.name8|numFilter}}
                    </template>
                     </el-table-column>
                    <el-table-column
                      property="name9"
                      label="制造说明"
                      width="80"
                    ></el-table-column>
                    <el-table-column
                      property="name10"
                      label="备注"
                    ></el-table-column>
                  </el-table>
            
      
          
            <hr />
            <div style="margin-top:10px">
              <div style="margin-bottom:10px;width:100%" class="data_1">
                <el-card style="min-height:100px">
                  <div slot="header"><span>送货日期</span></div>
                  <div>
                    <el-date-picker
                      v-model="date_deliver"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="选择时间"
                      style="width:15%"
                    ></el-date-picker>
                    <el-button
                      style="width:16%"
                      class="button_clolur"
                      @click="Unitdeliver"
                      >统一设置送货期</el-button
                    >
                    <el-button
                      style="width:16%;margin-top:10px"
                      class="button_clolur"
                      @click="AllAccordPromise"
                      >全部设为约定日期</el-button
                    >
                  </div>
                </el-card>
              </div>
              <div
                style="margin-bottom:10px;width:100%;margin-top:10px"
                class="data_1"
              >
                <el-card style="min-height:100px">
                  <div slot="header"><span>说明</span></div>
                  <div>
                    <el-input
                      v-model="supply_check_notes"
                      placeholder="说明:"
                      style="width:30%;height:10px"
                      clearable
                    ></el-input>
                    <el-button
                      @click="SaveNotes()"
                      style="width:10%;"
                      class="button_clolur"
                      >保存说明
                    </el-button>
                  </div>
                </el-card>
              </div>
            </div>
            <div>
              <el-button
                @click="SubmitVue"
                style="width:10%;margin-left:35%;margin-top:10px"
                type="warning"
                size="small"
                >确认</el-button
              >
              <el-button
                @click="returnMain"
                style="width:10%;margin-left:5%;margin-top:10px"
                type="primary"
                size="small"
                >返回</el-button
              >
            </div>
          </div>
        </div>
      </el-dialog>

      <!-- 非X开头确认采购单界面兰 -->
      <el-dialog
        :show-close="true"
        :visible.sync="checkY_Visible"
        :close-on-click-modal="false"
        disabled="true"
        width="1070px"
        top="8vh"
      >
        <div style="margin-bottom:10px">
          <h1>广东玉兰集团股份有限公司采购单（{{ pur_headForm.PUR_NO }}）</h1>
          <span style="float:right">{{
            pur_headForm.DATE_PUR | datatrans
          }}</span>
        </div>
        <div>
          <h1>收货人：{{ pur_headForm.LINKMAN }}</h1>
        </div>
        <div style="margin-bottom:10px">
          <h1>备注信息：{{ pur_headForm.NOTES }}</h1>
        </div>
        <hr />
        <div style="width:100%">
          <el-table :data="gridData" style="width:100%" max-height="400px">
            <el-table-column type="index" :index="indexMethod">
            </el-table-column>
            <af-table-column
              property="ITEM_NO"
              label="物料号"
            ></af-table-column>
            <af-table-column
              property="MGUIGE"
              label="物料型号"
            ></af-table-column>
            <af-table-column property="MNAME" label="名称"></af-table-column>
            <!--width="50" -->
            <af-table-column property="GRADE" label="规格"></af-table-column>
            <af-table-column
              property="QTY_PUR"
              label="数量"
              width="60"
            ></af-table-column>
            <el-table-column label="含税单价" width="80">
              <template slot-scope="scope">
                <span>{{ scope.row.PRICE_TAXIN | numFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column
              property="UNIT1"
              label="单位"
              width="50"
            ></el-table-column>
            <af-table-column
              property="TOTAL_MONEY"
              label="金额"
              width="70"
            ></af-table-column>
            <el-table-column property="NOTE" label="备注"></el-table-column>
            <el-table-column property="DATE_REQ" label="约定日期" width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.DATE_REQ | datatrans }}</span>
              </template>
            </el-table-column>
            <el-table-column label="送货日期" width="120">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.DATE_DELIVER"
                  align="right"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column label="说明" width="100">
              <template slot-scope="scope">
                <el-input v-model="scope.row.SUPPLY_NOTES" clearable></el-input>
              </template>
            </el-table-column>
          </el-table>
          <el-table
                    :data="sumMoneyCol"
                    :show-header="false"
                       class="th-font"
                    id="PURCHASEDETAILLISTTABLE"
                    object_class="_Object:GridTable"
                    object_hashcode="6"
                    cellpadding="0"
                    style="width:100%"
                  >
                    <el-table-column width="48">
                    </el-table-column>
                    <af-table-column
                      property="name1"
                      label="物料号"
                    ></af-table-column>
                    <af-table-column
                      property="name1"
                      label="物料型号"
                    ></af-table-column>
                    <af-table-column
                      property="name1"
                      label="名称"
                    ></af-table-column>
                    <!--width="50" -->
                    <af-table-column
                      property="name1"
                      label="规格"
                    ></af-table-column>
                    <el-table-column
                      property="name1"
                      label="数量"
                      width="60"
                    ></el-table-column>
                
                    <el-table-column
                      property="name7"
                      label="总金额"
                      width="120"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      property="TOTAL_MONEY"
                      label="金额"
                      width="70"
                      align="right"
                    > <template slot-scope="scope">
                    {{scope.row.name8|numFilter}}
                    </template></el-table-column>
                    <el-table-column
                      property="name1"
                      label="备注"
                    ></el-table-column>
                    <el-table-column
                      property="name1"
                      label="约定日期"
                      width="100"
                    >
                      <template slot-scope="scope">
                        <span>{{ scope.row.DATE_REQ | datatrans }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      property="name1"
                      label="送货日期"
                      width="100"
                    >
                      <template slot-scope="scope">
                        <span>{{ scope.row.DATE_DELIVER | datatrans }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      property="name1"
                      label="说明"
                    ></el-table-column>
          </el-table>
          <hr />
          <div style="margin-top:10px">
            <div style="margin-bottom:10px;width:100%" class="data_1">
              <el-card style="min-height:100px">
                <div slot="header"><span>送货日期</span></div>
                <div>
                  <el-date-picker
                    v-model="date_deliver"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="选择时间"
                    style="width:15%"
                  ></el-date-picker>
                  <el-button
                    style="width:16%"
                    class="button_clolur"
                    @click="Unitdeliver"
                    >统一设置送货期</el-button
                  >
                  <el-button
                    style="width:16%;margin-top:10px"
                    class="button_clolur"
                    @click="AllAccordPromise"
                    >全部设为约定日期</el-button
                  >
                </div>
              </el-card>
            </div>
            <div
              style="margin-bottom:10px;width:100%;margin-top:10px"
              class="data_1"
            >
              <el-card style="min-height:100px">
                <div slot="header"><span>说明</span></div>
                <div>
                  <el-input
                    v-model="supply_check_notes"
                    placeholder="说明:"
                    style="width:30%;height:10px"
                    clearable
                  ></el-input>
                  <el-button
                    @click="SaveNotes()"
                    style="width:10%;"
                    class="button_clolur"
                    >保存说明
                  </el-button>
                </div>
              </el-card>
            </div>
          </div>
          <div>
            <el-button
              @click="SubmitVue"
              style="width:10%;margin-left:35%;margin-top:10px"
              type="warning"
              size="small"
              >确认</el-button
            >
            <el-button
              @click="returnMain"
              style="width:10%;margin-left:5%;margin-top:10px"
              type="primary"
              size="small"
              >返回</el-button
            >
          </div>
        </div>
      </el-dialog>
      <!-- X开头（窗帘）订单已确认采购单详情界面 -->
      <el-dialog
        title=""
        :visible.sync="checkedX_Visible"
        :show-close="true"
        :close-on-click-modal="false"
        v-if="reFresh"
        width="1070px"
        top="8vh"
      >
        <div style="width:100% ;margin:0 auto;">
          <table style=" width:100% ;margin:0 auto; ">
            <tbody>
              <tr>
                <td
                  colspan="2"
                  style="font-family:黑体;font-size:1.6em;font-weight:bold;"
                  align="center"
                >
                  采购单
                </td>
              </tr>
              <tr>
                <td style="border-bottom:solid 3px gray;text-align:left">
                  订单状态
                  <span style="margin-left:font-weight:bold;">{{
                    pur_headForm.STATUS | pur_headStatus
                  }}</span>
                </td>
                <td style="border-bottom:solid 3px gray;" align="right">
                  <span style="margin-left:font-weight:bold;">{{
                    now.getFullYear() + "-" + Month + "-" + now.getDate()
                  }}</span>
                </td>
              </tr>
              <tr>
                <td
                  style="border-right:solid 1px gray;border-bottom:solid 3px gray;"
                  width="50%"
                  valign="top"
                >
                  <table class="PUR_HEAD_COLUMNS" style="text-align:right">
                    <tbody>
                      <tr>
                        <td style="text-align:right" width="100">流水号：</td>
                        <td style="text-align:left">
                          {{ pur_headForm.PUR_NO }}
                        </td>
                      </tr>
                      <tr>
                        采购员：
                        <td style="text-align:left">
                          {{ pur_headForm.BUYER }}
                        </td>
                      </tr>
                      <tr>
                        建立日期：
                        <td style="text-align:left">
                          {{ pur_headForm.DATE_PUR }}
                        </td>
                      </tr>
                      <tr>
                        采购商：
                        <td style="text-align:left">
                          {{ pur_headForm.PUR_MYFACT }}
                        </td>
                      </tr>
                      <tr>
                        采购商地址：
                        <td style="text-align:left">
                          {{ pur_headForm.C_ADDRESS }}
                        </td>
                      </tr>
                      <tr>
                        开户银行：
                        <td style="text-align:left">
                          {{ pur_headForm.C_BANK }}
                        </td>
                      </tr>
                      <tr>
                        邮政编码：
                        <td style="text-align:left">
                          {{ pur_headForm.C_POST }}
                        </td>
                      </tr>
                      <tr>
                        银行账号：
                        <td style="text-align:left">
                          {{ pur_headForm.C_BANKNO }}
                        </td>
                      </tr>
                      <tr>
                        税务登记号：
                        <td style="text-align:left">
                          {{ pur_headForm.C_TAX }}
                        </td>
                      </tr>
                      <tr>
                        联系电话：
                        <td style="text-align:left">
                          {{ pur_headForm.OWN_TEL }}
                        </td>
                      </tr>
                      <tr>
                        付款方式：
                        <td style="text-align:left">
                          {{ pur_headForm.PAY_TYPE }}
                        </td>
                      </tr>
                      <tr>
                        付款期限：
                        <td style="text-align:left">
                          {{ pur_headForm.PAY_DATELIMIT }}
                        </td>
                      </tr>
                      <tr>
                        备注：
                        <td style="text-align:left">
                          {{ pur_headForm.NOTES }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>

                <td
                  style="border-left:solid 1px gray;border-bottom:solid 3px gray;"
                  width="50%"
                >
                  <table class="PUR_HEAD_COLUMNS" style="text-align:right">
                    <tbody>
                      <tr>
                        <td style="text-align:right" width="100">采购部门：</td>
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.DEPT_NO }}
                        </td>
                      </tr>

                      <tr>
                        合同号：
                        <td colsan="3" style="text-align:left"></td>
                      </tr>
                      <tr>
                        供应商：
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.SUPPLY_CODE }}
                        </td>
                      </tr>
                      <tr>
                        供应商地址：
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.G_ADDRESS }}
                        </td>
                      </tr>
                      <tr>
                        联系人：
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.G_LINK }}
                        </td>
                      </tr>
                      <tr>
                        传真号码：
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.G_TYPE }}
                        </td>
                      </tr>
                      <tr>
                        电话：
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.G_PHONE }}
                        </td>
                      </tr>
                      <tr>
                        手机：
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.HANDSET }}
                        </td>
                      </tr>
                      <tr>
                        B2B订单号：
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.ORDER_NO }}
                        </td>
                      </tr>
                      <tr>
                        ERP订单号：
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.OA_NO }}
                        </td>
                      </tr>
                      <tr>
                        接单人：
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.ORDER_MAN }}
                        </td>
                      </tr>
                      <tr>
                        收货人：
                        <td colsan="3" style="text-align:left"></td>
                      </tr>
                      <tr>
                        客户名称：
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.CUSTOMER_NAME }}
                        </td>
                      </tr>
                      <tr>
                        联系人：
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.LINKMAN }}
                        </td>
                      </tr>
                      <tr>
                        联系电话：
                        <td colsan="4" style="text-align:left">
                          {{ pur_headForm.LINKTEL }}
                        </td>
                      </tr>
                      <tr>
                        发货地址：
                        <td colsan="4" style="text-align:left">
                          {{ pur_headForm.POST_ADDRESS }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <!-- 明明细细 -->
                <td colspan="2">
                  <el-table
                    :data="colName"
                      :show-header="false"
                    border
                    object_class="_Object:GridTable"
                    object_hashcode="6"
                    cellpadding="0"
                    style="width:100%"
                    class="th-font"
                   >
                    <af-table-column
                      property="name1"
                      width="160"
                      label="位置"
                    ></af-table-column>
                    <af-table-column
                      property="name2"
                      width="80"
                      label="名称"
                    ></af-table-column>
                     <af-table-column
                      property="name3"
                      width="120"
                      label="编码"
                    ></af-table-column>
                    <af-table-column
                      property="name4"
                      label="名称"
                       width="150"
                    ></af-table-column>
                    <!--width="50" -->
                    <af-table-column
                      property="name5"
                      label="规格:米/对"
                         width="60"
                    ></af-table-column>
                    <el-table-column
                      property="name6"
                      label="用量"
                      width="60"
                    ></el-table-column>
                    <el-table-column property="name7" label="含税单价" width="100">
                    
                    </el-table-column>
       
                    <el-table-column
                      property="name8"
                      label="金额"
                      width="80"
                    ></el-table-column>
                    <el-table-column
                      property="name9"
                      label="制造说明"
                      width="80"
                    ></el-table-column>
                    <el-table-column
                      property="name10"
                      label="备注"
                    ></el-table-column>
                  </el-table>
                  <div  >
                    <div v-for="(item, index) of items" :key="index">
                  <!-- 循环因子 -->
                  <el-card body-style="padding: 0px">
                 <el-card     style="width:155px;float:left;"  body-style="padding: 5px" align="left">
                  <div>
                     <template>
                        <div>
                          <label style="font-weight:bold">{{ index + 1 }} &nbsp; 位置：</label>
                          {{
                            item.tab1[index].cl_place === null ||
                            item.tab1[index].cl_place == ""
                              ? "无"
                              : item.tab1[index].cl_place
                          }}
                        </div>
                        <div class="messageBox">
                          <div>
                            <label>款号：</label>
                            <div class="messageInput">
                              {{ item.tab1[index].cl_item_no }}
                            </div>
                          </div>
                          <div>
                            <label>成品宽：</label>
                            <div class="messageInput">
                              {{ item.tab1[index].cl_width }}
                            </div>
                            m
                          </div>
                          <div>
                            <label>成品高：</label>
                            <div class="messageInput">
                              {{ item.tab1[index].cl_high }}
                            </div>
                            m
                          </div>
                          <div>
                            <label>假帘高：</label>
                            <div class="messageInput">
                              {{ item.tab1[index].cl_high_jia }}
                            </div>
                            m
                          </div>
                          <div>
                            <label>帘倍数：</label>
                            <div class="messageInput">
                              {{ item.tab1[index].cl_size_times }}
                            </div>
                          </div>
                        </div>
                        <!-- <div class="line_noDiv"><span class="line_noSpan">{{item.tab1[index].cl_place_id}}</span></div> -->
                      </template>
                  </div>
                 </el-card>
                      <div style="width:159; float:left">
                     
                    </div>

                <el-table
                    :data="item.tab2[index]"
                   :show-header="false"
                    border
                    object_class="_Object:GridTable"
                    object_hashcode="6"
                    cellpadding="0"
                    style="width:866px; float:right"
                    
                   >
                    
                                <el-table-column  width="80" label="inner名称"> <template slot-scope="scope">{{getTypeName(scope.row.cl_name)}}</template> </el-table-column>
                                <el-table-column width="120" label="inner编码"> <template slot-scope="scope">{{scope.row.item_no}} </template> </el-table-column>
                                <el-table-column label="inner名称"  header-align="center" width="150"><template slot-scope="scope">{{scope.row.mname}} </template></el-table-column>
                                <el-table-column label="inner规格:米/对"  header-align="center" width="60"><template slot-scope="scope">{{scope.row.grade}} </template> </el-table-column>
                                <el-table-column label="inner用量"  header-align="center" width="60" ><template slot-scope="scope">{{scope.row.qty_pur}}{{scope.row.unit1}} </template></el-table-column>
                                <el-table-column label="inner含税单价"  header-align="center" width="100" align="right"><template slot-scope="scope">{{scope.row.price_taxin|numFilter}} </template></el-table-column>
                                <el-table-column label="inner金额"  header-align="center" width="80"  align="right"><template slot-scope="scope">{{scope.row.total_money|numFilter}} </template></el-table-column>
                                <el-table-column label="inner制造说明"  header-align="center" width="80"> <template slot-scope="scope">{{scope.row.product_note}} </template> </el-table-column>
                                <el-table-column label="inner备注"  header-align="center"> <template slot-scope="scope">{{scope.row.notes}} </template></el-table-column>
                  </el-table>

                  </el-card>
               <el-table class="th-font" style="width:100%;" :show-header="false" :data="item.tab3[index]" border>
                   <el-table-column label="预约" header-align="center" width="160" > <template slot-scope="scope"> {{scope.row.date_req}} </template></el-table-column>
                    <el-table-column label="交货"  header-align="center" width="200"><template slot-scope="scope"> {{scope.row.date_deliver}} </template></el-table-column>
                    <!-- <el-table-column label="编码" header-align="center" width="130"> </el-table-column> -->
                    <!-- <el-table-column label="交货"  header-align="center" width="80"></el-table-column> -->
                    <el-table-column label="名称"  header-align="center" width="150"></el-table-column>
                    <el-table-column label="规格:米/对" header-align="center" align="center" width="60"> </el-table-column>
                    <el-table-column label="用量" width="60" header-align="center" align="center"></el-table-column>
                    <el-table-column label="含税单价"  width="100"  header-align="center"  align="center"><template > 小计 </template></el-table-column>
                    <el-table-column label="金额" width="80" header-align="left" align="right"> <template slot-scope="scope"> {{scope.row.littleSum|numFilter}} </template> </el-table-column>
                    <el-table-column label="制造说明" width="80" header-align="center" align="center"> </el-table-column>
                    <el-table-column label="备注"  header-align="center" align="center"> </el-table-column>
                </el-table>

                 <!-- 循环因子 -->
                 </div>
                 </div>
                  <el-table
                    :data="sumMoneyCol"
                   :show-header="false"
                    border
                    object_class="_Object:GridTable"
                    object_hashcode="6"
                    cellpadding="0"
                    style="width:100%"
                    class="th-font"
                   >
                    <af-table-column
                      property="name1"
                      width="160"
                      label="位置"
                    ></af-table-column>
                    <af-table-column
                      property="name2"
                      width="80"
                      label="名称"
                    ></af-table-column>
                     <af-table-column
                      property="name3"
                      width="120"
                      label="编码"
                    ></af-table-column>
                    <af-table-column
                      property="name4"
                      label="名称"
                       width="150"
                    ></af-table-column>
                    <!--width="50" -->
                    <af-table-column
                      property="name5"
                      label="规格:米/对"
                         width="60"
                    ></af-table-column>
                    <el-table-column
                      property="name6"
                      label="用量"
                      width="60"
                    ></el-table-column>
                             <el-table-column property="name7" label="含税单价" width="100" align="center">
                    
                    </el-table-column>
       
                    <el-table-column
                  
                      label="金额"
                      width="80"
                      align="right"
                    >
                    <template slot-scope="scope">
                    {{scope.row.name8|numFilter}}
                    </template>
                     </el-table-column>
                    <el-table-column
                      property="name9"
                      label="制造说明"
                      width="80"
                    ></el-table-column>
                    <el-table-column
                      property="name10"
                      label="备注"
                    ></el-table-column>
                  </el-table>
                    <div><el-button @click="downLoadX()" type="primary" size="small">导出Excel</el-button> </div>
                </td>
                <!-- 明明细细 -->
              </tr>
            </tbody>
          </table>
        </div>
      </el-dialog>

      <!-- 非X开头（窗帘）订单 已确认采购单详情界面 -->
      <el-dialog
        id="checkedX"
        title=""
        :visible.sync="checkedY_Visible"
        :show-close="true"
        :close-on-click-modal="false"
        width="1070px"
        top="8vh"
      >
        <div style="width:100% ;margin:0 auto;">
          <table style=" width:100% ;margin:0 auto; ">
            <tbody>
              <tr>
                <td
                  colspan="2"
                  style="font-family:黑体;font-size:1.6em;font-weight:bold;"
                  align="center"
                >
                  采购单
                </td>
              </tr>
              <tr>
                <td style="border-bottom:solid 3px gray;text-align:left">
                  订单状态
                  <span style="margin-left:font-weight:bold;">
                    {{ pur_headForm.STATUS | pur_headStatus }}</span
                  >
                </td>
                <td style="border-bottom:solid 3px gray;" align="right">
                  <span style="margin-left:font-weight:bold;">{{
                    now.getFullYear() + "-" + Month + "-" + now.getDate()
                  }}</span>
                </td>
              </tr>
              <tr>
                <td
                  style="border-right:solid 1px gray;border-bottom:solid 3px gray;"
                  width="50%"
                  valign="top"
                >
                  <table class="PUR_HEAD_COLUMNS" style="text-align:right">
                    <tbody>
                      <tr>
                        <td style="text-align:right" width="100">流水号：</td>
                        <td style="text-align:left">
                          {{ pur_headForm.PUR_NO }}
                        </td>
                      </tr>
                      <tr>
                        采购员：
                        <td style="text-align:left">
                          {{ pur_headForm.BUYER }}
                        </td>
                      </tr>
                      <tr>
                        建立日期：
                        <td style="text-align:left">
                          {{ pur_headForm.DATE_PUR }}
                        </td>
                      </tr>
                      <tr>
                        采购商：
                        <td style="text-align:left">
                          {{ pur_headForm.PUR_MYFACT }}
                        </td>
                      </tr>
                      <tr>
                        采购商地址：
                        <td style="text-align:left">
                          {{ pur_headForm.C_ADDRESS }}
                        </td>
                      </tr>
                      <tr>
                        开户银行：
                        <td style="text-align:left">
                          {{ pur_headForm.C_BANK }}
                        </td>
                      </tr>
                      <tr>
                        邮政编码：
                        <td style="text-align:left">
                          {{ pur_headForm.C_POST }}
                        </td>
                      </tr>
                      <tr>
                        银行账号：
                        <td style="text-align:left">
                          {{ pur_headForm.C_BANKNO }}
                        </td>
                      </tr>
                      <tr>
                        税务登记号：
                        <td style="text-align:left">
                          {{ pur_headForm.C_TAX }}
                        </td>
                      </tr>
                      <tr>
                        联系电话：
                        <td style="text-align:left">
                          {{ pur_headForm.OWN_TEL }}
                        </td>
                      </tr>
                      <tr>
                        付款方式：
                        <td style="text-align:left">
                          {{ pur_headForm.PAY_TYPE }}
                        </td>
                      </tr>
                      <tr>
                        付款期限：
                        <td style="text-align:left">
                          {{ pur_headForm.PAY_DATELIMIT }}
                        </td>
                      </tr>
                      <tr>
                        备注：
                        <td style="text-align:left">
                          {{ pur_headForm.NOTES }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>

                <td
                  style="border-left:solid 1px gray;border-bottom:solid 3px gray;"
                  width="50%"
                >
                  <table class="PUR_HEAD_COLUMNS" style="text-align:right">
                    <tbody>
                      <tr>
                        <td style="text-align:right" width="100">采购部门：</td>
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.DEPT_NO }}
                        </td>
                      </tr>

                      <tr>
                        合同号：
                        <td colsan="3" style="text-align:left"></td>
                      </tr>
                      <tr>
                        供应商：
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.SUPPLY_CODE }}
                        </td>
                      </tr>
                      <tr>
                        供应商地址：
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.G_ADDRESS }}
                        </td>
                      </tr>
                      <tr>
                        联系人：
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.G_LINK }}
                        </td>
                      </tr>
                      <tr>
                        传真号码：
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.G_TYPE }}
                        </td>
                      </tr>
                      <tr>
                        电话：
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.G_PHONE }}
                        </td>
                      </tr>
                      <tr>
                        手机：
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.HANDSET }}
                        </td>
                      </tr>
                      <tr>
                        B2B订单号：
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.ORDER_NO }}
                        </td>
                      </tr>
                      <tr>
                        ERP订单号：
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.OA_NO }}
                        </td>
                      </tr>
                      <tr>
                        接单人：
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.ORDER_MAN }}
                        </td>
                      </tr>
                      <tr>
                        收货人：
                        <td colsan="3" style="text-align:left"></td>
                      </tr>
                      <tr>
                        客户名称：
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.CUSTOMER_NAME }}
                        </td>
                      </tr>
                      <tr>
                        联系人：
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.LINKMAN }}
                        </td>
                      </tr>
                      <tr>
                        联系电话：
                        <td colsan="4" style="text-align:left">
                          {{ pur_headForm.LINKTEL }}
                        </td>
                      </tr>
                      <tr>
                        发货地址：
                        <td colsan="4" style="text-align:left">
                          {{ pur_headForm.POST_ADDRESS }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <el-table
                    :data="gridData"
                   
                    id="PURCHASEDETAILLISTTABLE"
                    class="GCGRID"
                    object_class="_Object:GridTable"
                    object_hashcode="6"
                    cellpadding="0"
                    style="width:100%"
                    border
                  >
                    <el-table-column type="index" :index="indexMethod">
                    </el-table-column>
                    <af-table-column
                      property="ITEM_NO"
                      label="物料号"
                      width="110"
                      :show-overflow-tooltip="true"
                    ></af-table-column>
                    <af-table-column
                      property="MGUIGE"
                      label="物料型号"
                       width="110"
                       :show-overflow-tooltip="true"
                    ></af-table-column>
                    <af-table-column
                      property="MNAME"
                      label="名称"
                      width="60" 
                     :show-overflow-tooltip="true"
                    ></af-table-column>
                    
                    <af-table-column
                      property="GRADE"
                      label="规格"
                      width="50"
                      :show-overflow-tooltip="true"
                    ></af-table-column>
                    <el-table-column
                      property="QTY_PUR"
                      label="数量"
                      :show-overflow-tooltip="true"
                      width="60"
                    ></el-table-column>
                    <el-table-column label="含税单价" width="80">
                      <template slot-scope="scope">
                        <span>{{ scope.row.PRICE_TAXIN | numFilter }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      property="UNIT1"
                      label="单位"
                      :show-overflow-tooltip="true"
                      width="50"
                    ></el-table-column>
                    <el-table-column
                      property="TOTAL_MONEY"
                      label="金额"
                      :show-overflow-tooltip="true"
                      width="70"
                    ></el-table-column>
                    <el-table-column
                      property="NOTE"
                      :show-overflow-tooltip="true"
                      label="备注"
                    ></el-table-column>
                    <el-table-column
                      property="DATE_REQ"
                      label="约定日期"
                     
                      width="100"
                    >
                      <template slot-scope="scope">
                        <span>{{ scope.row.DATE_REQ | datatrans }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      property="DATE_DELIVER"
                      label="送货日期"
                      width="100"
                    >
                      <template slot-scope="scope">
                        <span>{{ scope.row.DATE_DELIVER | datatrans }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      property="SUPPLY_CHECK_NOTES"
                      label="说明"
                      :show-overflow-tooltip="true"
                    ></el-table-column>
                  </el-table>

                 <el-table
                    :data="sumMoneyCol"
                    :show-header="false"
                       class="th-font"
                    id="PURCHASEDETAILLISTTABLE"
                    object_class="_Object:GridTable"
                    object_hashcode="6"
                    cellpadding="0"
                    style="width:100%"
                  >
                    <el-table-column width="48">
                    </el-table-column>
                    <af-table-column
                      property="name1"
                      label="物料号"
                    ></af-table-column>
                    <af-table-column
                      property="name1"
                      label="物料型号"
                    ></af-table-column>
                    <af-table-column
                      property="name1"
                      label="名称"
                    ></af-table-column>
                    <!--width="50" -->
                    <af-table-column
                      property="name1"
                      label="规格"
                    ></af-table-column>
                    <el-table-column
                      property="name1"
                      label="数量"
                      width="60"
                    ></el-table-column>
                
                    <el-table-column
                      property="name7"
                      label="总金额"
                      width="120"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      property="TOTAL_MONEY"
                      label="金额"
                      width="100"
                      align="right"
                    > <template slot-scope="scope">
                    {{scope.row.name8|numFilter}}
                    </template></el-table-column>
                    <el-table-column
                      property="name1"
                      label="备注"
                    ></el-table-column>
                    <el-table-column
                      property="name1"
                      label="约定日期"
                      width="100"
                    >
                      <template slot-scope="scope">
                        <span>{{ scope.row.DATE_REQ | datatrans }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      property="name1"
                      label="送货日期"
                      width="100"
                    >
                      <template slot-scope="scope">
                        <span>{{ scope.row.DATE_DELIVER | datatrans }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      property="name1"
                      label="说明"
                    ></el-table-column>
                  </el-table>
                  <div><el-button @click="downLoadX()" type="primary" size="small">导出Excel</el-button> </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-dialog>

      <!-- 待确认页签 -->
      <div id="supplyCon">
        <el-card shadow="hover">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="待确认" name="first" align="left">
              <div align="right">
                <template>
                  <el-select
                    v-model="selvalue"
                    @change="SelectClick"
                    placeholder="全部"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </template>
              </div>

              <el-table border :data="pur_headData" style="width: 100%" stripe>
                <el-table-column type="index" :index="indexMethod">
                </el-table-column>
                <el-table-column
                  prop="PUR_NO"
                  width="140"
                  label="单号"
                  align="left"
                ></el-table-column>
                <el-table-column
                  prop="CUSTOMER_NAME"
                  width="250"
                  label="客户名称"
                  align="left"
                ></el-table-column>
                <el-table-column label="状态" width="60" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.STATUS | pur_headStatus }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="产品类型" width="150" align="center">
                  <template slot-scope="scope">
                    <span>{{ getProductType(scope.row.ORDER_NO) }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="DATE_PUR"
                  width="120"
                  label="建立日期"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.DATE_PUR | datatrans }}</span></template>
                </el-table-column>
                <el-table-column
                  prop="NOTES"
                  width="240"
                  label="备注"
                  align="left"
                ></el-table-column>
                <el-table-column
                  prop="LJ_SUGGESTION"
                  label="兰居备注"
                  align="left"
                ></el-table-column>
                <el-table-column label="" width="120" align="center">
                  <template slot-scope="scope">
                    <button
                      @click="openDialog(scope.row.PUR_NO, scope.row.ORDER_NO)"
                      class="btn-style"
                    >
                      前往确认
                    </button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
<el-tab-pane label="已确认" name="second" align="left">
              <div align="center">
                <el-input
                  @keyup.enter.native="SelectClick()"
                  prefix-icon="el-icon-search"
                  style="width:6%; min-width:200px;"
                  placeholder=" 采购单号：（精确）"
                  v-model="po"
                >
                </el-input>
                <el-date-picker
                  v-model="date1"
                  @change="SelectClick"
                  align="right"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
                <span class="demonstration">至</span>
                <el-date-picker
                  v-model="date2"
                  @change="SelectClick"
                  align="right"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
                <template>
                  <el-select
                    v-model="selvalue"
                    @change="SelectClick"
                    placeholder="全部"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </template>
                <el-button
                  @click="SelectClick()"
                  size="small"
                  style="margin-left:8px"
                  class="button_2"
                  >搜索</el-button
                >
                <el-button
                  @click="downLoadAll()"
                  size="small"
                  style="margin-left:8px"
                  class="button_1"
                  >下载表头及明细</el-button
                >
              </div>
              <el-table
                border
                :data="pur_headData"
                style="width: 100%"
                cellpadding="0"
                stripe
              >
                <el-table-column type="index" :index="indexMethod">
                </el-table-column>
                <el-table-column
                  prop="PUR_NO"
                  width="120"
                  label="单号"
                  align="left"
                ></el-table-column>
                <el-table-column
                  prop="CUSTOMER_NAME"
                  width="250"
                  label="客户名称"
                  align="left"
                ></el-table-column>
                <el-table-column label="状态" width="60" align="center">
                  <template slot-scope="scope"
                    ><span>{{
                      scope.row.STATUS | pur_headStatus
                    }}</span></template>
                </el-table-column>
                <el-table-column label="产品类型" width="150" align="center">
                  <template slot-scope="scope">
                    <span>{{ getProductType(scope.row.ORDER_NO) }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  fomate="yyyy-MM-dd"
                  width="120"
                  label="建立日期"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.DATE_PUR | datatrans }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="NOTES"
                  width="260"
                  label="备注"
                  align="left"
                ></el-table-column>
                <el-table-column
                  prop="LJ_SUGGESTION"
                  label="兰居备注"
                  align="left"
                ></el-table-column>
                <el-table-column label="" width="120" align="center">
                  <template slot-scope="scope">
                    <button
                      @click="openDialog1(scope.row.PUR_NO, scope.row.ORDER_NO)"
                      class="btn-style"
                    >
                      查看详情
                    </button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
           
            <div style="margin:0 25%;" class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="limit"
                layout="total,sizes, prev, pager, next, jumper"
                :total="count"
              ></el-pagination>
            </div>
          </el-tabs>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  GetPoDetail,
  GetRelativePo,
  SaveHeadNotes,
  Submit,
  CreateExcel
} from "@/api/supplierASP";
import { downLoadFile } from "@/common/js/downLoadFile";
import Cookies from "js-cookie";

export default {
  name: "LanJuPort",
  data() {
    return {
      colName:[{
            name1:"位置",
            name2:"名称",
            name3:"编码",
            name4:"名称",
            name5:"规格",
            name6:"用量",
            name7:"含税单价",
            name8:"金额",
            name9:"制造说明",
            name10:"备注",
      }],
      sumMoneyCol:[{
       
            name7:"总金额:",
            name8:0, 
      }],

        locCol:[{
            name1:"位置div",
      }],

detailCol:[
  {
      name2:"名称",
            name3:"编码",
            name4:"名称",
            name5:"规格",
            name6:"用量",
            name7:"含税单价",
            name8:"金额",
            name9:"制造说明",
            name10:"备注",
  }
],

      int_add: 1,
      reFresh: true,
      menuTree: [],
      companyId: Cookies.get("companyId"),
      current_id: Cookies.get("cid"),
      sumMoney: 0,
      items: [],
      po: "",
      date1: "0001/1/1",
      date2: "9999/1/1",
      now: new Date(),
      Month: new Date().getMonth() + 1,
      input: "",
      selvalue: "all",
      date_deliver: "",
      checkX_Visible: false,
      checkY_Visible: false,
      checkedX_Visible: false,
      checkedY_Visible: false,
      supply_check_notes: "",
      gridData: [],
      po_type: "all",
      limit: 10,
      count: 0,
      currentPage: 1,
      activeName: "first",
      count: 0,
      check_flag: 0,
      pur_headData: [],
      pur_headForm: {},
      options: [
        { value: "all", label: "所有状态" },
        { value: "cancel", label: "取消" },
        { value: "efficient", label: "生效" },
        { value: "enforce", label: "执行" },
        { value: "fulfill", label: "完成" }
      ],

      //存一行的数据
      detailData: [{ cl_place: -1, cl_item_no: "D13445435" }]
    };
  },
  watch: {
    menuTree() {
      this.reFresh = false
      this.$nextTick(() => {
        this.reFresh = true

      })

    }
  },
  methods: {
    //强制根据组件id刷新
    forceHandle(id) {
      let dom = document.getElementById(id);
      this.$nextTick(() => {
        //checkedX
      })

    },
    datatransMethod(value) {
      //时间戳转化大法
      if (value == null || value == "") {
        return "";
      }
      let date = new Date(value);
      let y = date.getFullYear();
      if (y > 5000) {
        return "";
      }
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " "; /* + h + ':' + m + ':' + s; */
    },
    //获取窗帘大类名称
    getTypeName(val) {
      switch (val) {
        case "lt":
          return "帘头";
        case "ls":
          return "帘身";
        case "lspb":
          return "帘身配布";
        case "sha":
          return "纱";
        case "pjb":
          return "配件";
        default:
          return "暂无名称";
      }
    },
    addToTable() {
      var tablec = document.getElementById();
    },
    //获取产品类型
    getProductType(value) {
      if (value.substring(0, 1) == "X") {
        return "窗帘";      }
      else if (value.substring(0, 1) == "Y") {
        return "软装";      }
      else if (value.substring(0, 1) == "W") {
        return "墙纸配套类";      }
    },

    //获取当月第一天零时
    getCurrentMonthFirst() {
      var date = new Date();
      date.setDate(1);
      date.setHours(0, 0, 0);
      return date;
    },
    //获取最近一周时间
    getCurrentWeek() {
      var date = new Date();
      date.setDate(date.getDate() - 7);
      date.setHours(0, 0, 0);
      return date;
    },
    //获取截止时间一天中的最后时间
    getTodayMaxTime() {
      var date = new Date();
      date.setHours(24, 0, 0);
      return date;
    },
    //获取前500年时间
    getLongAgao() {
      var date = new Date();
      date.setFullYear(date.getFullYear() - 500);
      date.setHours(0, 0, 0);
      return date;
    },
    //获取后500年时间
    getLongLater() {
      var date = new Date();
      date.setFullYear(date.getFullYear() + 500);
      date.setHours(0, 0, 0);
      return date;
    },
    //打开确认页面，确认页面也分两种情况
    openDialog(PUR_NO, ORDER_NO) {
      if (ORDER_NO == "" || ORDER_NO == null) {
        this.checkY_Visible = true;
        // console.log("无B2B订单号");
      } else if (ORDER_NO.substring(0, 1) == "X") {
        this.checkX_Visible = true;
      } else {
        this.checkY_Visible = true;
      }
      this.autoSearchDetail(PUR_NO);
    },
    openDialog1(PUR_NO, ORDER_NO) {
      this.int_add = this.int_add + 1
      this.detailData[0].cl_place = this.int_add
      this.autoSearchDetail(PUR_NO);
      this.forceHandle("checkedX");
      if (ORDER_NO == "" || ORDER_NO == null) {
        this.checkedY_Visible = true;
        // console.log("无B2B订单号");
      } else if (ORDER_NO.substring(0, 1) == "X") {
        this.checkedX_Visible = true;
      } else {
        this.checkedY_Visible = true;
      }


      //将表头内容填充到明细
    },
    //统一送货日期
    Unitdeliver() {
      if (this.date_deliver == "") {
        this.$alert("请选择一个统一的时间！", "提示", {
          confirmButtonText: "好的",
          type: "warning"
        });
        return;
      }
      for (let i = 0; i < this.gridData.length; i++) {
        this.gridData[i].DATE_DELIVER = this.date_deliver;
      }
    },
    //全部按约定日期
    AllAccordPromise() {
      for (let i = 0; i < this.gridData.length; i++) {
        this.gridData[i].DATE_DELIVER = this.gridData[i].DATE_REQ;
      }
    },
    //选择或输入条件后搜索
    SelectClick() {
      this.currentPage = 1;
      this.po_type = this.selvalue;
      this.autoSearch();
    },
    //大表合并方法 1-9列合并成1列。0列存表一
    bigTableSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return {
          rowspan: 1,
          colspan: 1
        };
      }
      if (columnIndex === 1) {
        return {
          rowspan: 1,
          colspan: 9
        };
      } else {
        return {
          rowspan: 0,
          colspan: 0
        };
      }
    },
    //标签页切换
    handleClick(tab) {
      var tabName = tab.name;
      this.currentPage = 1;
      switch (tabName) {
        case "first":
          this.check_flag = 0;
          this.selvalue = "all";
          this.po_type = "all";
          this.po = "";
          this.date1 = this.getLongAgao();
          this.date2 = this.getLongLater();
          break;
        case "second":
          this.check_flag = 1;
          this.selvalue = "all";
          this.po_type = "all";
          this.po = "";
          this.date1 = this.getCurrentWeek();
          this.date2 = this.getTodayMaxTime();
          break;
      }
      this.autoSearch();
    },
    //首列序号自定义
    indexMethod(index) {
      return index + 1;
    },
    //页面条数
    handleSizeChange(val) {
      this.limit = val;
      this.currentPage = 1;
      this.autoSearch();
    },
    //翻页获取订单
    handleCurrentChange(val) {
      this.currentPage = val;
      this.autoSearch();
    },
    SaveNotes() {
      var data = {
        PUR_NO: this.pur_headForm.PUR_NO,
        NOTE: this.supply_check_notes
      };
      SaveHeadNotes(data).then(res => {
        if (res.code == 0) {
          this.$alert("保存说明成功", "提示", {
            confirmButtonText: "确定",
            type: "success"
          });
          this.autoSearch();
          this.checkX_Visible = false;
          this.checkY_Visible = false;
        } else {
          this.$alert("保存失败，请稍后重试", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
        }


      });
    },
    returnMain() {
      this.checkY_Visible = false;
      this.checkX_Visible = false;
    },
    //确认之前要检查是否填好必要的信息
    SubmitVue() {
      this.pur_headForm.SUPPLY_CHECK_NOTES = this.supply_check_notes;
      for (let i = 0; i < this.gridData.length; i++) {
        if (
          this.gridData[i].DATE_DELIVER == "9999/12/31 00:00:00" ||
          this.gridData[i].DATE_DELIVER == ""
        ) {
          this.$alert("送货日期不能为空！", "提示", {
            confirmButtonText: "好的",
            type: "warning"
          });
          return;
        }
      }
      var data = {
        pur_headForm: this.pur_headForm,
        gridData: this.gridData
      };

      Submit(data).then(res => {
        if (res.code == 0) {
          this.$alert("确认成功", "提示", {
            confirmButtonText: "确定",
            type: "success"
          });
          this.autoSearch();
          this.checkX_Visible = false;
          this.checkY_Visible = false;
        } else {
          this.$alert("确认失败，请稍后重试", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
        }
      });
    },
    autoSearch() {
      var data = {
        limit: this.limit,
        page: this.currentPage,
        current_id: Cookies.get("cid"),
        customer: "",
        po_type: this.po_type, //  status状态   cancel    efficient 生效（新采购单）   enforce 已执行（已确认）   fulfill 已完成
        check_flag: this.check_flag,
        beginTime: this.date1,
        finishTime: this.date2,
        po: this.po
      };
      GetRelativePo(data).then(res => {
        this.count = res.count;
        this.pur_headData = res.data;
      });
    },

       downLoadX() {
      var PUR_NO = this.pur_headForm.PUR_NO;
      downLoadFile(
        this.Global.baseUrl + `PUR_HEAD/CreateExcel?PUR_NO=${PUR_NO}`
      );
    },
      downLoadY() {
      var PUR_NO = this.pur_headForm.PUR_NO;
      downLoadFile(
        this.Global.baseUrl + `PUR_HEAD/CreateExcelY?PUR_NO=${PUR_NO}`
      );
    },
    downLoadAll() {
      var cid = this.companyId;
      var po = (this.po == null || this.po == "") ? "all" : this.po;
      var beginTime = this.datatransMethod(this.date1);
      var finishTime = this.datatransMethod(this.date2);
      var po_type = (this.po_type == null || this.po_type == "") ? "all" : this.po_type;
      var selvalue = this.selvalue;
      downLoadFile(
        this.Global.baseUrl + `PUR_HEAD/HeadAndDetailExcel?cid=${cid}&po=${po}&beginTime=${beginTime}&finishTime=${finishTime}&po_type=${po_type}&selvalue=${selvalue}`,


      );
    },
    autoSearchDetail(PUR_NO) {
      var data = {
        PUR_NO: PUR_NO
      };
      GetPoDetail(data).then(res => {
        this.gridData = res.data;
        let details = this.gridData;
        let loc = [];
        let tab1 = [];
        let tab2 = [];
        let tab3 = [];
        for (let i = 0; i < this.gridData.length; i++) {
          if (this.gridData[i].DATE_DELIVER == "9999/12/31 00:00:00") {
            this.gridData[i].DATE_DELIVER = "";
          }
          //将所有位置列出来
          if (loc.indexOf(this.gridData[i].CL_PLACE_ID) == -1) {
            loc.push(this.gridData[i].CL_PLACE_ID);

            let temObj1 = {
              cl_place_id: this.gridData[i].CL_PLACE_ID,
              cl_place: this.gridData[i].CL_PLACE,
              cl_item_no: this.gridData[i].CL_ITEM_NO,
              cl_width: this.gridData[i].CL_WIDTH,
              cl_high: this.gridData[i].CL_HIGH,
              cl_high_jia: this.gridData[i].CL_HIGH_JIA,
              cl_size_times: this.gridData[i].CL_SIZE_TIMES
            };
            let date1 =
              "预约：" + this.datatransMethod(this.gridData[i].DATE_REQ);
            let date2 =
              "交货：" + this.datatransMethod(this.gridData[i].DATE_DELIVER);
            let temObj3 = {
              date_req: date1,
              date_deliver: date2,
              littleSum: 0
            };
            let tempArr3 = [];
            tempArr3.push(temObj3);
            tab1.push(temObj1);
            tab3.push(tempArr3);
          }
        }
        this.items = []; //先请空items
        this.sumMoney = 0;
        for (let k = 0; k < tab1.length > 0; k++) {
          let tabArr2 = [];
          tab3[k].littleSum = 0.0;
          for (let i = 0; i < this.gridData.length; i++) {
            if (tab1[k].cl_place_id == this.gridData[i].CL_PLACE_ID) {
              let temObj2 = {
                cl_name: this.gridData[i].CL_NAME,
                item_no: this.gridData[i].ITEM_NO,
                mname: this.gridData[i].MNAME,
                grade: this.gridData[i].GRADE,
                qty_pur: this.gridData[i].QTY_PUR,
                unit1: this.gridData[i].UNIT1,
                price_taxin: this.gridData[i].PRICE_TAXIN,
                total_money: this.gridData[i].TOTAL_MONEY,
                product_note: this.gridData[i].PRODICT_NOTE,
                notes: this.gridData[i].NOTE
              };
              tabArr2.push(temObj2);
              tab3[k][0].littleSum += this.gridData[i].TOTAL_MONEY;
              this.sumMoney += this.gridData[i].TOTAL_MONEY;
              this.sumMoneyCol[0].name8=this.sumMoney;
            }
          }
          tab2.push(tabArr2);
          let sumObj = { id: k, tab1: tab1, tab2: tab2, tab3: tab3 };
          this.items.push(sumObj);
        }


        //无效
        // for(let i=0;i<this.items.length;i++){
        //   for(let j=0;j<this.items[i].tab1.length;j++){
        //     this.$set(this.items[i].tab1,j,this.items[i].tab1[j])
        //   }
        // }
        this.pur_headForm.PUR_NO = this.gridData[0].PUR_NO;
        this.pur_headForm.LINKMAN = this.gridData[0].LINKMAN;
        this.pur_headForm.DATE_PUR = this.gridData[0].DATE_PUR;
        this.pur_headForm.DATE_DELIVER = this.gridData[0].DATE_DELIVER;
        this.pur_headForm.NOTES = this.gridData[0].NOTES;
        this.pur_headForm.SUPPLY_CHECK_NOTES = this.gridData[0].SUPPLY_CHECK_NOTES;
        this.pur_headForm.DEPT_NO = this.gridData[0].DEPT_NO;
        this.pur_headForm.DEPT_NO2 = this.gridData[0].DEPT_NO2;
        this.pur_headForm.SUPPLY_CODE = this.gridData[0].SUPPLY_CODE;
        this.pur_headForm.G_ADDRESS = this.gridData[0].G_ADDRESS;
        this.pur_headForm.G_LINK = this.gridData[0].G_LINK;
        this.pur_headForm.G_TYPE = this.gridData[0].G_TYPE;
        this.pur_headForm.G_PHONE = this.gridData[0].G_PHONE;
        this.pur_headForm.HANDSET = this.gridData[0].HANDSET;
        this.pur_headForm.ORDER_NO = this.gridData[0].ORDER_NO;
        this.pur_headForm.OA_NO = this.gridData[0].OA_NO;
        this.pur_headForm.ORDER_MAN = this.gridData[0].ORDER_MAN;
        this.pur_headForm.CUSTOMER_NAME = this.gridData[0].CUSTOMER_NAME;
        this.pur_headForm.PUR_MYFACT = this.gridData[0].PUR_MYFACT;
        this.pur_headForm.BUYER = this.gridData[0].BUYER;
        this.pur_headForm.PAY_TYPE = this.gridData[0].PAY_TYPE;
        this.pur_headForm.PAY_DATELIMIT = this.gridData[0].PAY_DATELIMIT;
        this.pur_headForm.C_BANK = this.gridData[0].C_BANK;
        this.pur_headForm.C_ADDRESS = this.gridData[0].C_ADDRESS;
        this.pur_headForm.C_POST = this.gridData[0].C_POST;
        this.pur_headForm.C_BANKNO = this.gridData[0].C_BANKNO;
        this.pur_headForm.C_TAX = this.gridData[0].C_TAX;
        this.pur_headForm.OWN_TEL = this.gridData[0].OWN_TEL;
        this.pur_headForm.LINKTEL = this.gridData[0].LINKTEL;
        this.pur_headForm.POST_ADDRESS = this.gridData[0].POST_ADDRESS;
        this.pur_headForm.STATUS = this.gridData[0].STATUS;
        this.input = this.pur_headForm.SUPPLY_CHECK_NOTES;
        this.supply_check_notes = this.pur_headForm.SUPPLY_CHECK_NOTES;
        this.date_deliver = "";
      });
    }
  },
  filters: {
    pur_headStatus(value) {
      switch (value) {
        case "cancel":
          return "取消";
          break;
        case "efficient":
          return "生效";
          break;
        case "enforce":
          return "执行";
          break;
        case "fulfill":
          return "完成";
          break;
      }
    },
    numFilter(value) {
      var value = Math.round(parseFloat(value) * 100) / 100;
      var s = value.toString().split(".");
      if (s.length == 1) {
        value = value.toString() + ".00";
        return value;
      }
      if (s.length > 1) {
        if (s[1].length < 2) {
          value = value.toString() + "0";
        }
        return value;
      }
    },
    datatrans(value) {
      //时间戳转化大法
      if (value == null || value == "") {
        return "";
      }
      let date = new Date(value);
      let y = date.getFullYear();
      if (y > 5000) {
        return "";
      }
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " "; /* + h + ':' + m + ':' + s; */
    }
  },
  created() {
    this.po_type = "all";
    this.autoSearch();
  }
};
</script>

<style scoped>
.div-flex{
  display: flex;
}
.th-font{
  font-size:18;
  font-weight:bold;
}
.button_1 {
  width: 130px;
  height: 40px;
  background: #8bc34a;
  margin-left: 10px;
  color: rgb(255, 255, 255);
  text-align: center;
}
.button_2 {
  width: 60px;
  height: 40px;
  background: #8bc34a;
  margin-left: 10px;
  color: rgb(255, 255, 255);
  text-align: center;
}
.btn-style {
  font: 12px Arial;
  height: 24px;
  width: 80px;
  background: #409eff;
  color: rgb(255, 255, 255);
  border: 3px solid #409eff;
  border-radius: 5px;
}
.zoomRight {
  font-weight: 400;
  font-size: 15px;
  margin-right: 10px;
  font-weight: bold;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #f9fafc;
}
.bg-purple-light {
  background: #f9fafc;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.messageInput {
  margin: 3px;
  border: 1px solid #c3c3c3;
  margin-right: 3px;
  /* padding: 3px 6px 3px 6px; */
  min-width: 45px;
  border-radius: 4px;
  color: gray;
  display: inline-block;
}
.button_clolur {
  background: #8bc34a;
  color: rgb(255, 255, 255);
}
.messageBox {
  padding: 3px 0;
}
.data_1 {
  font-size: 1.5em;
}
td {
  text-align: center;
}
.line_noDiv {
  width: 20px;
  height: 20px;
  border: 1px solid black;
  border-radius: 20px;
  text-align: center;
  position: absolute;
  top: 0px;
  left: 0;
}
.line_noSpan {
  width: 20px;
  height: 20px;
  text-align: center;
  margin: -1px 0 0 -1px;
  display: block;
}
</style>
<style>
.lanJuport .el-table td,
.lanJuport .el-table th {
  padding: 3px 0 !important;
}
</style>