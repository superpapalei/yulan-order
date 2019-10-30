
<template>
  <div>
    <el-card shadow="hover">

      <div slot="header">
        <span class="fstrong f16">送货单</span>
      </div>

      <div id="tbar" class="tbarStyle">
        <el-date-picker
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="查询开始日期"
          v-model="beginTime"
          style="width:14%;"
        ></el-date-picker> --
        <el-date-picker
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="查询截止日期"
          v-model="finishTime"
          style="width:14%;"
        ></el-date-picker>

        <el-select v-model="SELECT_STATUS" style="margin-left:10px;width:160px;" placeholder="状态">
          <el-option
            v-for="item in statusArray"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
        @keyup.enter.native="search()"
        placeholder="请输入送货单号进行查询"
        v-model="SEARCHKEY"
        style="width:220px;margin-left:10px"
         >
         </el-input>
        <el-button size="medium" type="success" style="margin-left:10px" @click="search()">查询</el-button>
        <el-button size="medium" type="primary"  style="float:right"  @click="_addRecord()">送货新增</el-button>
      </div>
      
      <div style="margin-top:10px">
        <el-table
          border
          :data="DeliverData"
          style="width: 100%"
          class="table_1"
        >
          <el-table-column
            label="状态"
            align="center"
            width="50px"
          >
          <template slot-scope="scope">
            {{ scope.row.INVOICE_STATUS | transStatus}}
            </template>
          </el-table-column>
          <el-table-column prop="INVOICE_NO" label="送货单号" align="center" width="120px">
          </el-table-column>
          <el-table-column prop="CREATE_DATE" label="创建时间" align="center" width="110px">
            <template slot-scope="scope1">
                {{ scope1.row.CREATE_DATE | datatrans }}
              </template>
          </el-table-column>
          <el-table-column
            prop="CREATE_PERSON"
            label="创建人"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            prop="LOGISTICS_COMPANY"
            label="物流公司"
            align="center"
            width="110px"
          ></el-table-column>
          <el-table-column
            prop="LOGISTICS_NUMBER"
            label="物流单号"
            align="center"
          ></el-table-column>
          <el-table-column prop="AREA_DISTRICT" label="送货地址" align="center" width="150px">
            
          </el-table-column>
          <el-table-column prop="PUR_NO" label="采购单号" align="center" width="110px">
            
          </el-table-column>
          <el-table-column prop="INVOICE_DATE" label="采购日期" align="center" width="100px">
            <template slot-scope="scope2">
                {{ scope2.row.INVOICE_DATE | datatrans }}
              </template>
          </el-table-column>
          <el-table-column prop="SUPPLY_LINKMAN" label="供应商联系人" align="center" width="120px">
            
          </el-table-column>
          <el-table-column prop="LINKMAN_TEL" label="供应商联系人电话" align="center" width="140px">
            
          </el-table-column>
          <el-table-column prop="REMARKS" label="备注" align="center" width="100px">
            
          </el-table-column>
          <el-table-column align="center" label="操作" width="100px">
            <template slot-scope="scope" >
              <el-button
                @click="_CheckDetail(scope.row)"
                type="warning"
                size="mini"
                icon="el-icon-search"
                circle
                v-show="scope.row.INVOICE_STATUS==0||scope.row.INVOICE_STATUS==1"
              ></el-button>
             <el-button
                @click="_EditDetail(scope.row)"
                type="primary"
                size="mini"
                icon="el-icon-edit"
                circle
                v-show="scope.row.INVOICE_STATUS == 2"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div style="margin:0 25%;margin-top:10px" class="block">
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
    </el-card>

    <el-dialog title="送货单明细" :visible.sync="lanjuDetail" :close-on-click-modal="false" width="80%">
      <!-- 查看区 -->
      <div v-show="isCheck" class="checkTable">
        <table class="" style="width:100%;font-size:12px">
          <tr >
            <td >发货单号：</td>
            <td>{{DeliverData_1.INVOICE_NO}}</td>
            <td>发货日期：</td>
            <td>{{DeliverData_1.INVOICE_DATE|datatrans}}</td>
            <td>供应商联系人：</td>
            <td>{{DeliverData_1.SUPPLY_LINKMAN}}</td>
          </tr>
          <tr>
            <td>创建日期：</td>
            <td>{{DeliverData_1.CREATE_DATE|datatrans}}</td>
            <td>创建人：</td>
            <td>{{DeliverData_1.CREATE_PERSON}}</td>
            <td>供应商联系人电话：</td>
            <td>{{DeliverData_1.LINKMAN_TEL}}</td>
          </tr>
          <tr>
            <td>物流公司：</td>
            <td>{{DeliverData_1.LOGISTICS_COMPANY}}</td>
            <td>物流单号：</td>
            <td>{{DeliverData_1.LOGISTICS_NUMBER}}</td>
            <td>详细地址：</td>
            <td>{{DeliverData_1.AREA_DISTRICT}}</td>
          </tr>
          <tr>
            <td>备注：</td>
            <td>{{DeliverData_1.REMARKS}}</td>
          </tr>
        </table>
        <hr>
        <el-table
            :data="DetailData"
            border
            highlight-current-row
            style="width: 100%;font-weight:normal;font-size:12px"
            class="table_1">
           <el-table-column prop="ITEM_NO" label="物料编码" align="center" width="150px"></el-table-column>
           <el-table-column prop="NAMEE" label="物料名称" align="center" width="150px"></el-table-column>
           <el-table-column prop="INVOICE_QTY" label="发货数量" align="center" width="150px"></el-table-column>
           <el-table-column prop="UNIT1" label="单位" align="center" width="150px"></el-table-column>
           <el-table-column prop="MAT_BRAND" label="品牌" align="center" width="150px"></el-table-column>
           <el-table-column prop="WEIGHT1" label="规格/型号" align="center" width="150px"></el-table-column>
           <el-table-column prop="REMARKS" label="赠品" align="center" width="150px"></el-table-column>
           <el-table-column prop="NOTE" label="备注" align="center" width="150px"></el-table-column>
        </el-table>
      </div> 
      <!-- 编辑区 -->
      <div v-show="isEdit" class="checkTable">
        <table class="" style="width:100%;font-size:12px">
          <tr >
            <td >发货单号：</td>
            <td>{{editData.INVOICE_NO}}</td>
            <td>发货日期：</td>
            <td>
              <div style="width:100%">
              <input
                  v-model="submit.INVOICE_DATE"
                  placeholder="(客户必填)"
                  clearable
                  class="inputStyle_1">
                  <span><el-date-picker
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="修改日期"
                  v-model="ruleForm_1.dateValue"
                  style="width:200px;text-align:right"
                ></el-date-picker></span>
              </div>
              </td>
              <td>供应商联系人：</td>
            <td>{{editData.SUPPLY_LINKMAN}}</td>
          </tr>
          <tr>
            <td>创建日期：</td>
            <td>{{editData.CREATE_DATE|datatrans}}</td>
            <td>创建人：</td>
            <td>{{editData.CREATE_PERSON}}</td>
            <td>供应商联系人电话：</td>
            <td>{{editData.LINKMAN_TEL}}</td>
          </tr>
          <tr>
            <td>物流公司：</td>
            <td><input
                  v-model="submit.LOGISTICS_COMPANY"
                  placeholder="(客户必填)"
                  clearable
                  class="inputStyle"></td>
            <td>物流单号：</td>
            <td><input
                  v-model="submit.LOGISTICS_NUMBER"
                  placeholder="(客户必填)"
                  clearable
                  class="inputStyle"></td>
            <td>详细地址：</td>
            <td><input
                  v-model="submit.AREA_DISTRICT"
                  placeholder="(客户必填)"
                  clearable
                  class="inputStyle"></td>
          </tr>
          <tr>
            <td>备注：</td>
            <td colspan="5"><input
                  v-model="submit.REMARKS"
                  placeholder="(客户必填)"
                  clearable
                  class="inputStyle"></td>
          </tr>
        </table>
        <hr>
        <el-table
            :data="DetailData"
            border
            highlight-current-row
            style="width: 100%;font-weight:normal;font-size:12px"
            class="table_1">
           <el-table-column prop="ITEM_NO" label="物料编码" align="center" width="150px"></el-table-column>
           <el-table-column prop="NAMEE" label="物料名称" align="center" width="150px"></el-table-column>
           <el-table-column prop="INVOICE_QTY" label="发货数量" align="center" width="150px"></el-table-column>
           <el-table-column prop="UNIT1" label="单位" align="center" width="150px"></el-table-column>
           <el-table-column prop="MAT_BRAND" label="品牌" align="center" width="150px"></el-table-column>
           <el-table-column prop="WEIGHT1" label="规格/型号" align="center" width="150px"></el-table-column>
           <el-table-column prop="REMARKS" label="赠品" align="center" width="150px"></el-table-column>
           <el-table-column prop="NOTE" label="备注" align="center" ></el-table-column>
        </el-table>
        <el-button style="margin-left:40%;margin-top:10px" class="trueButton" @click="Delete">删除送货单</el-button>
        <el-button class="trueButton" @click="isTrueEdit">确认</el-button>
      </div> 
    </el-dialog>
    <el-dialog title="送货单新增" :visible.sync="DeliverDetail" :close-on-click-modal="false" width="80%">
        <el-dialog
          width="60%"
          title="采购单明细"
          :visible.sync="innerVisible"
          append-to-body>
          <el-table
            :data="PURData"
            @selection-change="handleSelectionChange"
            border
            highlight-current-row
            style="width: 100%;font-weight:normal;font-size:12px"
            class="table_1">
           <el-table-column type="selection" width="100"></el-table-column>
           <el-table-column prop="ITEM_NO" label="编码" align="center" width="150px"></el-table-column>
           <el-table-column prop="MNAME" label="名称" align="center" width="150px"></el-table-column>
           <el-table-column prop="GRADE" label="规格" align="center" width="150px"></el-table-column>
           <el-table-column prop="QTY_PUR" label="用量" align="center" width="150px"></el-table-column>
           <el-table-column prop="PRICE_TAXIN" label="含税单价" align="center" width="150px"></el-table-column>
           <el-table-column prop="TOTAL_MONEY" label="金额" align="center" width="150px"></el-table-column>
           <el-table-column prop="PRODUCT_NOTE" label="制作说明" align="center" width="150px"></el-table-column>
           <el-table-column prop="NOTES" label="备注" align="center" width="150px"></el-table-column>
           <el-table-column label="约定日期" align="center" width="150px">
             <template slot-scope="scope1">
                {{ scope1.row.DATE_REG | datatrans }}
              </template>
           </el-table-column>
           <el-table-column label="送货日期" align="center" width="150px">
             <template slot-scope="scope2">
                {{ scope2.row.DATE_DELIVER | datatrans }}
              </template>
           </el-table-column>
        </el-table>
        <div style="margin-left:45%">
          <el-button @click="isTrue" class="trueButton">确认</el-button>
        </div>
        </el-dialog>
      <!-- 新增 -->
      <div >
        <el-input
        @keyup.enter.native="searchPUR()"
        placeholder="请输入采购单号"
        v-model="find"
        style="width:280px;float:right"
      >
        <el-button @click="searchPUR()" class="button_1" slot="append" icon="el-icon-search" 
          >搜索</el-button
        >
      </el-input>
      </div>
      <div v-show="isAdd||isEdit" class="table-c">
        <table style="width:100%">
          <tr>
            <td>发货单号：</td>
            <td v-if="isAdd">(系统生成)</td>
            <td v-if="isEdit">{{DeliverData_2.INVOICE_NO}}</td>
            <td>发货日期：</td>
            <td v-if="isAdd">
              <el-date-picker
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="结束日期区间"
                  v-model="ruleForm_2.dateValue"
                  style="width:100%"
                ></el-date-picker>
            </td>
            <td v-if="isEdit">{{DeliverData_2.INVOICE_DATE}}</td>
          </tr>
          <tr>
            <td>创建日期：</td>
            <td v-if="isAdd">(系统生成)</td>
            <td v-if="isEdit">{{DeliverData_2.CREATE_DATE}}</td>
            <td>创建人：</td>
            <td v-if="isAdd"><input
                  v-model="submitForm.create_person"
                  placeholder="(客户选填)"
                  clearable
                  class="inputStyle"></td>
            
          </tr>
          <tr>
            <td>物流公司：</td>
            <td v-if="isAdd"><input
                  v-model="submitForm.logistics_company"
                  placeholder="(客户必填)"
                  clearable
                  class="inputStyle"></td>
            <td v-if="isEdit">{{DeliverData_2.LOGISTICS_COMPANY}}</td>
            <td>物流单号：</td>
            <td v-if="isAdd"><input
                  v-model="submitForm.logistics_number"
                  placeholder="(客户必填)"
                  clearable
                  class="inputStyle"></td>
            <td v-if="isEdit">{{DeliverData_2.LOGISTICS_NUMBER}}</td>
          </tr>
          <tr>
            <td>详细地址：</td>
            <td v-if="isAdd"><input
                  v-model="submitForm.area_district"
                  placeholder="(客户必填)"
                  clearable
                  class="inputStyle"></td>
            <td v-if="isEdit">{{DeliverData_2.AREA_DISTRICT}}</td>
            <td>备注：</td>
            <td v-if="isAdd">
              <input
                  v-model="submitForm.remarks"
                  placeholder="(客户选填)"
                  clearable
                  class="inputStyle">
            </td>
            <td v-if="isEdit">{{DeliverData_2.REMARKS}}</td>
          </tr>
        </table>
        <hr>
        <el-table
            :data="multipleSelection_1"
            border
            highlight-current-row
            style="width: 100%;font-weight:normal;font-size:12px"
            class="table_1">
            <el-table-column type="index" width="50" label="序号">
            </el-table-column>
            <el-table-column prop="PUR_NO" label="采购单号" align="center" width="150px"></el-table-column>
            <el-table-column prop="ITEM_NO" label="编码" align="center" width="150px"></el-table-column>
           <el-table-column prop="MNAME" label="名称" align="center" width="150px"></el-table-column>
           <el-table-column prop="GRADE" label="规格" align="center" width="150px"></el-table-column>
           <el-table-column prop="QTY_PUR" label="用量" align="center" width="150px"></el-table-column>
           <el-table-column prop="PRICE_TAXIN" label="含税单价" align="center" width="150px"></el-table-column>
           <el-table-column prop="TOTAL_MONEY" label="金额" align="center" width="150px"></el-table-column>
           <el-table-column prop="PRODUCT_NOTE" label="制作说明" align="center" width="150px"></el-table-column>
           <el-table-column prop="NOTES" label="备注" align="center" width="150px"></el-table-column>
           <el-table-column label="约定日期" align="center" width="150px">
             <template slot-scope="scope1">
                {{ scope1.row.DATE_REG | datatrans }}
              </template>
           </el-table-column>
           <el-table-column label="送货日期" align="center" width="150px">
             <template slot-scope="scope2">
                {{ scope2.row.DATE_DELIVER | datatrans }}
              </template>
           </el-table-column>
        </el-table>
      </div> 
      <div style="margin-left:45%">
          <el-button @click="isAddTrue" class="trueButton">提交确认新增</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { 
  GetAllData,
  CheckDetailByID,
  addSubmit,
  editByCustomer,
 } from "@/api/lanju";
 import{
  GetRelativeDelivery,
  GetDeliveryDetail,
  GetPoDetail,
  AddDelivery,
  UpdateDelivery,
  DeleteDelivery
 } from "@/api/supplierASP"
import {
  UploadFiles,
} from "@/api/imageStoreASP";
import { downLoadFile } from "@/common/js/downLoadFile";
import Cookies from "js-cookie";
const Head = "http://14.29.223.114:10250/upload";

export default {
  name: "DeliveryList",
  data() {
    return {

      editData:[],
      submit: {
        INVOICE_STATUS:"",
        INVOICE_DATE:"",
        CREATE_DATE:"",
        CREATE_PERSON:"",
        LOGISTICS_COMPANY:"",
        LOGISTICS_NUMBER:"",
        AREA_DISTRICT:"",
        REMARKS:"",
        SUPPLY_LINKMAN:"",
        LINKMAN_TEL:"",
      },
      newStatus: 2,
      editStatus:1,
      multipleSelection_2:[],
      multipleSelection_1:[],
      invoice_id:0,
      ruleForm_1: { dateValue: "" },
      ruleForm_2: { dateValue: "" },
      multipleSelection:[],
      innerVisible:false,
      PURData:[],
      find:"",
      DeliverData_2:[],
      DetailData_1:[],
      DetailData_2:[],
      DeliverDetail:false,
      DetailData:[],
      DeliverData_1:[],
      DeliverData:[],
      dateStamp: "",
      fileChange: false,
      deleteFile: [],
      subtractDeleteFile:[],//点击减号准备删除明细，预删除的文件集合
      deleteIndex:[],//删除文件对应的明细的索引
      btnDisable: false,
      companyId: "",
      CID: Cookies.get("cid"), //客户账号
      CNAME: "", //客户名
      beginTime: "", //查询的开始时间
      finishTime: "", //查询的结束时间
      SEARCHKEY: "", //搜索栏关键字
      SELECT_STATUS: "", //存储下拉框的值
      rowPlus:0,//兰居软装设计需求表中的户型编辑项添加数
      isAdd: false, //新增记录
      isEdit: false, //编辑记录
      isCheck: false, //查看记录
      initRowspan:5,//基本信息中的初始行数
      usedRowspan:5,//基本信息中的行数
      fileListGM:[],//广美上传的文件集合
      successCount:0,
      allCount:0,
      ServiceDetail:false,
      lanjuDetail: false,
      limit: 10,
      count: 0,
      detailCount:0,//新增户型记录数
      currentPage: 1,
      statusArray: [
        {
          label: "全部",
          value: ""
        },
        {
          label: "已发货",
          value: "1"
        },
        {
          label: "待发货",
          value: "2"
        },
        
      ],
      lanjuData: [],
      submitForm:[],//提交的表头信息
      submitDetailForm:[], //提交的明细信息
    };
  },
  created: function() {
    let time = new Date();
    this.refresh();
  },
  mounted() {
    // 初始化查询，默认为前一天
    this.ruleForm_2.dateValue = this.timeDefault_2;
  },
  computed: {  
    timeDefault_2() {      
      var date = new Date();      
      var s1 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate());      
      return s1;    
      }  
    },
  filters: {
    transStatus(value) {
      switch (value) {
        case 0:
          return "全部"
          break;
        case 1:
          return "已发货";
          break;
        case 2:
          return "待发货";
          break;
       
      }
    },
    datatrans(value) {
      //时间戳转化大法
      if (value == null || value == "9999/12/31 00:00:00") {
        return "";
      }
      let date = new Date(value);
      let y = date.getFullYear();
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
      return y + "-" + MM + "-" + d + " ";
    },
    datatransDetail(value) {
      //时间戳转化大法
      if (value == null || value == "9999/12/31 00:00:00") {
        return "";
      }
      let date = new Date(value);
      let y = date.getFullYear();
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
      return y + "-" + MM + "-" + d + " " + h + ":" + m;
    },
  },
  methods: {
    //确认新增
    isAddTrue(){
      
      //判断是否填完所有信息
      if (
        this.submitForm.logistics_company == "" ||
        this.submitForm.area_district == ""||
        this.submitForm.logistics_number == ""
      ) {
        this.$alert("请完善发货信息", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      this.isAdd = false;
      this.DeliverDetail = false;
      this.submitForm.PUR_NO = this.multipleSelection_1[0].PUR_NO
      this.submitForm.INVOICE_DATE = this.ruleForm_2.dateValue
      this.submitForm.INVOICE_STATUS = this.newStatus
     AddDelivery({headForm:this.submitForm,gridData:this.multipleSelection_2,cid:Cookies.get("companyId")}).then(res =>{
       if(res.data.code == "0"){
              this.$alert("保存成功", "提示", {
              confirmButtonText: "确定",
              type: "success"
            });
          }
      
     })
     this.refresh()
    },
    //确认采购单
    isTrue(){
      this.innerVisible = false
      this.getData()      
    },
    //采购单详情的选择
    handleSelectionChange(val) {
       this.multipleSelection = val
       
    },
    //采购单的字段改变
    getData(){
        this.multipleSelection_1 = this.multipleSelection
        for(var i =0;i<this.multipleSelection_1.length;i++){
        this.multipleSelection_2[i] = {
        ITEM_NO : this.multipleSelection_1[i].ITEM_NO,
        INVOICE_QTY : this.multipleSelection_1[i].QTY_PUR,
        INVOICE_QTY :this.multipleSelection_1[i].QTY_PUR,
        //PRICE :this.multipleSelection_1[i].PRICE1,
        MONEY1 :this.multipleSelection_1[i].TOTAL_MONEY,
        //this.multipleSelection.MONEY_TAX =val.MONEY_TAX;
        PRICE_TAXIN :this.multipleSelection_1[i].PRICE_TAXIN,
        TOTAL_AMOUNT :this.multipleSelection_1[i].TOTAL_MONEY,
        UNIT1:this.multipleSelection_1[i].UNIT1,
        //WEIGHT1:this.multipleSelection_1[i].WEIGHT,
        NAMEE:this.multipleSelection_1[i].MNAME,
        GRADE :this.multipleSelection_1[i].GRADE,
        //this.multipleSelection.QTY_BACK =val.PUR_ID;
        //this.multipleSelection.FREE_ITEM =val.PUR_ID;
        NOTE :this.multipleSelection_1[i].NOTES,
        PUR_ID :this.multipleSelection_1[i].PUR_ID,
        PUR_NO :this.multipleSelection_1[i].PUR_NO,
        }
        this.$set(this.multipleSelection_2,i,this.multipleSelection_2[i])
        }
    },
    //采购单搜索
    searchPUR(){
      if(this.find.length == ""){
        this.$alert("请输入采购单号", "提示", {
              confirmButtonText: "确定",
              type: "warning"
      })
      }else{
      this.innerVisible = true
      var data = {
        PUR_NO:this.find
      }
      GetPoDetail(data).then(res =>{
        this.PURData = res.data
        
      })
      }
    },
    //表头模糊搜索
    search() {
      this.currentPage = 1;
      this.refresh();
    },
    //根据所选页面条数显示数据
    handleSizeChange(val) {
      this.limit = val;
      this.currentPage = 1;
      this.refresh();
    },
    //翻页获取信息
    handleCurrentChange(val) {
      this.currentPage = val;
      this.refresh();
    },
    //查询表头
    refresh() {
      var data = {
        companyId: Cookies.get("companyId"),
        limit: this.limit,
        page: this.currentPage,
        beginTime: this.beginTime,
        finishTime: this.finishTime,
        status: this.SELECT_STATUS,
      };
      if (!data.beginTime) {
        data.beginTime = "0001/1/1";
      }
      if (!data.finishTime) {
        data.finishTime = "9999/12/31";
      } else {
        data.finishTime = data.finishTime + " 23:59:59";
      }
      GetRelativeDelivery(data).then(res => {
        this.count = res.count;
        this.DeliverData = res.data;
      });
    },
    //点击新建采购单
    _addRecord() {
        this.invoice_id = 0
        this.isAdd = true
        this.DeliverDetail = true
        this.isEdit = false
        this.submitForm = {
        create_person:"",
        logistics_company:"",
        logistics_number:"",
        area_district:"",
        remarks:"",
        PUR_NO:"",
        INVOICE_DATE:"",
        INVOICE_STATUS:0,
        
      },
        this.multipleSelection = []
        this.multipleSelection_1 = []
        this.multipleSelection_2 = []
    },
    //新增记录提交
    _addSubmit() {
      //判断是否填完所有信息
      if (
        this.submitForm.MANAGER == "" ||
        this.submitForm.MANAGER_TEL == ""||
        this.submitForm.EMAIL == ""||
        this.submitForm.SOLUTION_NAME == ""
      ) {
        this.$alert("请完善单据信息", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      var flag=0;
      //判断户型信息是否填写完整
      for (let i = 0; i < this.submitDetailForm.length; i++) {
          if(this.submitDetailForm[i].STYLE == "")
          {
              this.$alert("请完善户型信息（如风格、偏好等信息）", "提示", {
                 confirmButtonText: "确定",
                 type: "warning"
               });
              return;
          }
          if(this.submitDetailForm[i].fileList.length == 0)
          {
              flag+=1;
          }
      }
      if(flag==this.submitDetailForm.length)
      {
          addSubmit({model:this.submitForm,detailModels:this.submitDetailForm}).then(res => {
            if (res.code == 0) {
              this.$alert("提交成功", "提示", {
              confirmButtonText: "确定",
              type: "success"
            });
            this.currentPage = 1;
            this.usedRowspan=5;
            this.refresh();
            this.lanjuDetail = false;
            return;
            } else {
              this.$alert("提交失败，请稍后重试", "提示", {
              confirmButtonText: "确定",
              type: "warning"
            });
            return;
            }
          });
      }
      for (let i = 0; i < this.submitDetailForm.length; i++) {
         this.$refs.upload[i].submit();
      }
    },
    //查看发货单列表详情
    _CheckDetail(val) {
      this.isCheck = true
      this.lanjuDetail = true;
      this.isEdit = false;
      let data = {
        INVOICE_NO: val.INVOICE_NO,//发货单号
        INVOICE_DATE:val.INVOICE_DATE,//发货日期
        CREATE_DATE:val.CREATE_DATE,//创建日期
        CREATE_PERSON:val.CREATE_PERSON,//创建人
        LOGISTICS_COMPANY:val.LOGISTICS_COMPANY,//物流公司
        LOGISTICS_NUMBER:val.LOGISTICS_NUMBER,//物流单号
        AREA_DISTRICT:val.AREA_DISTRICT,//详细地址
        REMARKS:val.REMARKS,//备注
        SUPPLY_LINKMAN:val.SUPPLY_LINKMAN,//供应商联系人
        LINKMAN_TEL:val.LINKMAN_TEL,//供应商联系人电话
      };
      this.DeliverData_1 = data
      var data_1 = {
        deliverNo:val.INVOICE_NO
      }
      GetDeliveryDetail(data_1).then(res =>{
        this.DetailData = res.data
      })
    },
    //编辑状态下查看列表详情
    _EditDetail(val) {
      this.isEdit = true
      this.isCheck = false
      this.lanjuDetail = true;
      this.submit.INVOICE_STATUS = val.INVOICE_STATUS
      this.submit.INVOICE_NO = val.INVOICE_NO
      this.submit.INVOICE_DATE = val.INVOICE_DATE 
      this.submit.CREATE_DATE = val.CREATE_DATE 
      this.submit.CREATE_PERSON = val.CREATE_PERSON 
      this.submit.LOGISTICS_COMPANY = val.LOGISTICS_COMPANY 
      this.submit.LOGISTICS_NUMBER = val.LOGISTICS_NUMBER 
      this.submit.AREA_DISTRICT = val.AREA_DISTRICT 
      this.submit.REMARKS = val.REMARKS
      this.submit.SUPPLY_LINKMAN=val.SUPPLY_LINKMAN
      this.submit.LINKMAN_TEL=val.LINKMAN_TEL
      let data = {
        INVOICE_NO: val.INVOICE_NO,//发货单号
        INVOICE_DATE:val.INVOICE_DATE,//发货日期
        CREATE_DATE:val.CREATE_DATE,//创建日期
        CREATE_PERSON:val.CREATE_PERSON,//创建人
        LOGISTICS_COMPANY:val.LOGISTICS_COMPANY,//物流公司
        LOGISTICS_NUMBER:val.LOGISTICS_NUMBER,//物流单号
        AREA_DISTRICT:val.AREA_DISTRICT,//详细地址
        REMARKS:val.REMARKS,//备注
        SUPPLY_LINKMAN:val.SUPPLY_LINKMAN,//供应商联系人
        LINKMAN_TEL:val.LINKMAN_TEL,//供应商联系人电话
      }
      this.editData = data
      var data_1 = {
        deliverNo:val.INVOICE_NO
      }
      GetDeliveryDetail(data_1).then(res =>{
        this.DetailData = res.data
      })
    },
    //删除
    Delete(){
      var data = {
        invoice_no:this.submit.INVOICE_NO
      }
      DeleteDelivery(data).then(res =>{

      })
      this.lanjuDetail = false
    },
    //编辑
    isTrueEdit(){
      this.lanjuDetail = false
      this.submit.INVOICE_STATUS = this.editStatus
      if(this.ruleForm_1.dateValue !== ""){
          this.submit.INVOICE_DATE = this.ruleForm_1.dateValue
      }
      UpdateDelivery({headForm:this.submit,gridData:this.DetailData,cid:Cookies.get("companyId")}).then(res =>{
       if(res.code == "0"){
              this.$alert("保存成功", "提示", {
              confirmButtonText: "确定",
              type: "success"
            });
          }
      
    })
    this.refresh()
    },
      // CheckDetailByID(data).then(res => {
      //     if (res.count > 0) {
      //       this.submitDetailForm = res.data;
      //       this.detailCount=res.count;
      //       this.submitForm.CUSTOMER_AGENT = this.submitDetailForm[0].CUSTOMER_AGENT;
      //       this.submitForm.OFFICE_TEL= this.submitDetailForm[0].OFFICE_TEL;
      //     }
      //     //将数据库里文件路径集合数据拆解，拆分成可以访问的路径
      //     for (let j = 0; j < this.submitDetailForm.length; j++) {
      //     this.submitDetailForm[j].rowNumber=this.initRowspan+j;
      //     var list = this.submitDetailForm[j].ATTACHMENT_FILE.split(";");
      //     this.submitDetailForm[j].fileList=[];
      //     for (var i = 0; i < list.length - 1; i++) {
      //     var index = list[i].lastIndexOf("/");
      //     var fileName = list[i].substr(index + 1);
      //     this.submitDetailForm[j].fileList.push({
      //     name: fileName,
      //     url: list[i]
      //     });
      //     }
      //     }
        //  this.usedRowspan=this.initRowspan+this.detailCount-1;
        //  this.dateStamp = new Date().getTime();
        //  this.isAdd = false;
        //  this.isEdit = true;
        //  this.isCheck = false;
        //  this.lanjuDetail = true;
        //  });
    
    //编辑列表详情修改
    _editSubmit() {
      //判断是否填完所有信息
      if (
        this.submitForm.MANAGER == "" ||
        this.submitForm.MANAGER_TEL == ""||
        this.submitForm.EMAIL == ""||
        this.submitForm.SOLUTION_NAME == ""
      ) {
        this.$alert("请完善单据信息", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      //点击提交，将预删除的文件传入要删除的文件的数组中
      for (let i = 0; i < this.subtractDeleteFile.length; i++) {
            this.deleteFile.push(this.subtractDeleteFile[i]);
      }
      if (this.fileChange) {
        //文件发生改变，重新上传一次(仅选中修改后的文件，而不是所有文件效率会更高)
        for (let i = 0; i < this.submitDetailForm.length; i++) {
            this.$refs.upload[i].submit();
            this.submitDetailForm[i].ATTACHMENT_FILE = "";
            for (let j = 0; j < this.submitDetailForm[i].fileList.length; j++) {
               this.submitDetailForm[i].ATTACHMENT_FILE +=
                "/Files/LANJU_STORE/" +
               this.CID +
               "/" +
               this.dateStamp +
                "/" +
               this.submitDetailForm[i].fileList[j].name +
                ";"; 
              }
          this.submitDetailForm[i].ATTACHMENT_FILE_FOLDER =
        "/Files/LANJU_STORE/" + this.CID + "/" + this.dateStamp;
        }
      } else {
        if (this.deleteFile.length > 0) {
          for (let i = 0; i < this.deleteFile.length; i++) {
            this.submitDetailForm[this.deleteIndex[i]].ATTACHMENT_FILE="";
            for (var j = 0; j < this.submitDetailForm[this.deleteIndex[i]].fileList.length; j++) {
                this.submitDetailForm[this.deleteIndex[i]].ATTACHMENT_FILE += this.submitDetailForm[this.deleteIndex[i]].fileList[j].url + ";";
            }
          }
        }
        this.submitEDITANSYC();
      }
    },
    //添加基本信息中的户型编辑项数目
    _rowPlus(){
        if(this.usedRowspan>=11)
        {
        this.$alert("已经达到编辑项的上限", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
        }
        else{
        this.submitDetailForm.push({
        ID: "", 
        HOUSE_CODE:"",
        HOUSING_AREA: "", 
        STYLE: "", 
        PREFERENCE_NOTE: "", 
        PREFERENCE_URL: "", 
        DESIGN_ID: "", 
        ATTACHMENT_FILE: "",
        ATTACHMENT_FILE_FOLDER:"",
        fileList:[],
        rowNumber:this.usedRowspan+1,
        }),
         this.usedRowspan+=1;
        }
    },
    _rowSubtract(index){
        if(this.usedRowspan==5)
        {
        this.$alert("必须至少有一项该类信息", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
        }
        else{
          var flag=false;
          for (let i = 0; i < this.submitDetailForm.length; i++) {
            if(this.submitDetailForm[i].rowNumber-5==index)
            {
              this.submitDetailForm.splice(index,1);
              this.usedRowspan-=1;
              flag=true;
              //将删除的明细的文件存进预删除数组中
              for (let j = 0; j < this.submitDetailForm[i].fileList.length; j++) {
                   this.subtractDeleteFile.push(this.submitDetailForm[i].fileList[j].url);
              }    
            }   
            if(flag)
            {
                for (let j = i; j < this.submitDetailForm.length; j++) {
                  this.submitDetailForm[j].rowNumber-=1;
                }
                break;
            }
          }
        }
    },
    _checkServiceDetail()
    {
        this.ServiceDetail=true;
    },
    handleChange(file, fileList,index) {
      console.log(index);
      this.submitDetailForm[index].fileList = fileList;
      this.fileChange = true;
    },
    handleRemove(file, fileList,index) {
      this.submitDetailForm[index].fileList = fileList;
      if ((file.status = "success")) {
        this.deleteFile.push(file.url);
        this.deleteIndex.push(index)
      }
    },
    handleSuccess(res, file, fileList,index) {
      var flag=true;
      for (let i = 0; i < this.submitDetailForm.length; i++) {
         if(this.submitDetailForm[i].fileList.filter(item=>item.status == "uploading").length == 0 && this.submitDetailForm[i].fileList.filter(item=>item.status == "success").length == this.submitDetailForm[i].fileList.length)
         {
         }   
         else{
           flag=false;
           break;
         }
      }
      if (flag) {
        if (this.isEdit) {
          this.submitEDITANSYC();
        } else {
          this.sumbitNEWANSYC();
        }
      }
    },
    submitEDITANSYC() {
      //相当于同步，等提交成功后再执行
      editByCustomer({model:this.submitForm,detailModels:this.submitDetailForm, attchmentChange: this.fileChange,deleteFile: this.deleteFile}).then(res => {
        if (res.code == 0) {
          this.$alert("修改成功", "提示", {
            confirmButtonText: "确定",
            type: "success"
          });
          this.currentPage = 1;
          this.refresh();
          this.usedRowspan=5;
          this.lanjuDetail = false;
          return;
        } else {
          this.$alert("修改失败，请稍后重试", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
          return;
        }
      });
    },
    sumbitNEWANSYC() {
      //相当于同步，等提交成功后再执行
      //附件拼接
      for (let i = 0; i < this.submitDetailForm.length; i++) {
          for (let j = 0; j < this.submitDetailForm[i].fileList.length; j++) {
               this.submitDetailForm[i].ATTACHMENT_FILE +=
                "/Files/LANJU_STORE/" +
               this.CID +
               "/" +
               this.dateStamp +
                "/" +
               this.submitDetailForm[i].fileList[j].name +
                ";"; 
              }
          this.submitDetailForm[i].ATTACHMENT_FILE_FOLDER =
        "/Files/LANJU_STORE/" + this.CID + "/" + this.dateStamp;
      }
      addSubmit({model:this.submitForm,detailModels:this.submitDetailForm}).then(res => {
        if (res.code == 0) {
          this.$alert("提交成功", "提示", {
            confirmButtonText: "确定",
            type: "success"
          });
          this.currentPage = 1;
          this.usedRowspan=5;
          this.refresh();
          this.lanjuDetail = false;
        } else {
          this.$alert("提交失败，请稍后重试", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
        }
      });
    },
    handleError(err, file, fileList) {
      this.$refs.upload.clearFiles();
      this.fileList = [];
      this.dateStamp = new Date().getTime();
      this.btnDisable = false;
      this.$alert("文件上传失败", "提示", {
        confirmButtonText: "确定",
        type: "success"
      });
    },
    downLoad(path) {
      downLoadFile(
        this.Global.baseUrl + `DownLoadAPI/DownloadFile?path=${path}&`
      );
    },
    
  },
}
</script>

<style>
.table_1 .el-table__row {
  height: 6px;
}
 
</style>

 <style scoped>
 .trueButton{
    background: #8bc34a;
    color: rgb(255, 255, 255);
    
 }
 .button_1{
   background: #8bc34a;
   color: rgb(255, 255, 255);
 }
 .checkTable table{
    border-right: 1px solid black;
    border-bottom: 1px solid black;
 }
.checkTable table td{
  border-left: 1px solid black;
  border-top: 1px solid black;
   font-size: 14px;
   height: 30px;
   text-align: center;
 }
.table-c table {
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}
.table-c table td {
  border-left: 1px solid black;
  border-top: 1px solid black;
  height: 35px;
  text-align: center;
  font-size: 14px;
}
.tableCol {
  background: #f0f9eb;
}
.grayTD {
  background: rgb(241, 242, 243);
}
.headerStyle {
  display: inline-block;
  width: 100px;
  font-weight: bold;
}
.timeRight {
  font-size: 14px;
  line-height: 30px;
  display: inline-block;
  margin-right: 20px;
  font-weight: bold;
}
.timeLeft {
  font-size: 14px;
  line-height: 30px;
  display: inline-block;
}
.ISimg {
  width: 100px;
  height: 100px;
  cursor: pointer;
}
.BIGimg {
  width: 333px;
  height: 333px;
}
.inputWidth {
  width: 220px;
}
.tbarStyle {
  margin-bottom: 13px;
}
.statusCombobox {
  margin-left: 10px;
}
</style>

<style>
.el-table .success-row {
  background: #f0f9eb;
}

.avatar-uploader .el-upload {
  border: 1px dashed black;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.avatar {
  width: 30px;
  height: 30px;
  display: block;
}
.inputStyle {
  border: 0;
  height: 100%;
  width: 100%;
  font-size: 16px;
  text-align: center;
}
.inputStyle_1 {
  border: 0;
  height: 100%;
  width: 200px;
  font-size: 16px;
  text-align: left;
}
.inputStyleNew {
  border: 0;
  height: 100%;
  width: 54%;
  font-size: 16px;
  text-align: center;
}
.upload-de .el-upload-dragger {
  height: 30px;
  width:200px;
}

</style>