-<!--兰居的付款委托书界面-->
<template>
  <div>
    <el-card shadow="hover">

      <div slot="header">
        <span class="fstrong f16">付款委托书</span>
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
        placeholder="请输入关键字进行查询"
        v-model="SEARCHKEY"
        style="width:220px;margin-left:10px"
         >
         </el-input>

        <el-button size="medium" type="success" style="margin-left:10px" @click="search()">查询</el-button>
      </div>
      
      <div style="margin-top:10px">
       <el-table
        border
        :data="payData"
        style="width: 100%"
      >
        <el-table-column
          width="140"
          prop="ID"
          label="委托编号"
          align="center"
        ></el-table-column>
        <el-table-column width="120" label="提交时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.DATE_CRE | datatrans }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="CUSTOMER_NAME"
          width="130"
          label="客户"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SUM_MONEY"
          width="110"
          label="代付金额"
          align="center"
        ></el-table-column>
        <el-table-column label="状态" align="center" width="120px">
            <template slot-scope="scope">
              <span>{{ scope.row.STATE | transStatus }}</span>
            </template>
        </el-table-column>
        <el-table-column
          prop="USER_CRE"
          label="创建人"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column width="120" label="确认时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.DATE_AFFIRM | datatrans }}</span>
          </template>
        </el-table-column>
        <el-table-column width="130" label="确认人" align="center"  prop="USER_AFFIRM">
        </el-table-column>
        <el-table-column  label="退回原因" width="295" align="center"  prop="RETURN_REASON">
        </el-table-column>
        <el-table-column align="center" label="操作" >
            <template slot-scope="scope" >
              <el-button
                @click="_EditDetail(scope.row)"
                type="primary"
                size="mini"
                icon="el-icon-edit"
                circle
                v-if="scope.row.STATE=='2'"
              ></el-button>
              <el-button
                @click="_CheckDetail(scope.row)"
                type="warning"
                size="mini"
                icon="el-icon-search"
                circle
                v-if="scope.row.STATE!='2'"
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

    <el-dialog title="付款委托书" :visible.sync="payDetail" :close-on-click-modal="false" width="55%">
      <!-- 查看区 -->
      <div v-show="isCheck" class="table-c">
        <table width="100%" border="0px" cellspacing="0px" cellpadding="0">
          <tr>
            <td class="grayTD" style="font-size:20px;height:30px" colspan="4">基本信息</td>
          </tr>
          <tr>
            <td class="grayTD"  colspan="1" rowspan="1" style="width:15%;height:15px">流水号</td>
            <td colspan="1" rowspan="1" style="width:35%;height:15px">{{submitForm.ID}}</td>
            <td colspan="1" rowspan="1" class="grayTD" style="width:15%;height:15px">客户编码</td>
            <td colspan="1" rowspan="1" style="width:35%;height:13px">{{submitForm.CUSTOMER_CODE}}</td>
          </tr>

          <tr>
            <td class="grayTD"  colspan="1" rowspan="1" style="height:15px">付款总金额</td>
            <td colspan="1" rowspan="1" style="height:15px">{{submitForm.SUM_MONEY}}</td>
            <td colspan="1" rowspan="1" class="grayTD" style="height:15px">付款时间范围</td>
            <td colspan="1" rowspan="1" style="height:15px">{{submitForm.TIME_SLOT}}</td>
          </tr>

          <tr>
            <td class="grayTD" style="font-size:20px;height:30px" colspan="4">委托书明细</td>
          </tr>
          <tr>
            <td class="grayTD"  colspan="1" rowspan="1" style="height:15px">行号</td>
            <td class="grayTD"  colspan="1" rowspan="1" style="height:15px">受委托人姓名</td>
            <td class="grayTD"  colspan="1" rowspan="1" style="height:15px">委托金额</td>
            <td class="grayTD"  colspan="1" rowspan="1" style="height:15px">附件</td>
          </tr>
          
          <tr v-for="(item,index) of submitDetailForm" :key="index" >
            <td colspan="1" rowspan="1" style="height:15px">{{item.LINE_NO}}</td>
            <td colspan="1" rowspan="1" style="height:15px">{{item.NAME}}</td>
            <td colspan="1" rowspan="1" style="height:15px">{{item.MONEY}}</td>
            <td colspan="1" rowspan="1" style="height:15px">
              <ul  class="el-upload-list el-upload-list--text" >
              <li 
                  v-for="(file, i) in item.fileList"
                  :key="i"
                  class="el-upload-list__item is-success"
                  tabindex="0"
                >
                  <a class="el-upload-list__item-name" >
                    <i class="el-icon-document" ></i>{{ file.name }}
                  </a>
                  <label style="display:block;position:absolute;top:0px;right:30px;">
                    <a style="cursor:pointer;" @click="downLoad(file.url)">下载附件</a>
                  </label>
              </li>
              </ul>
            </td>
          </tr>

          <tr v-if="this.submitForm.STATE=='4'">
            <td class="grayTD"  colspan="4" rowspan="1"  style="font-size:20px;height:30px" >审核信息（退回）</td>
          </tr>
          <tr v-if="this.submitForm.STATE=='4'">
            <td class="grayTD"  colspan="1" rowspan="1"  style="height:50px" >退回原因</td>
            <td colspan="3" rowspan="1"  style="height:50px" >{{submitForm.RETURN_REASON}}</td>
          </tr>
        </table>
      </div> 

  
      <!--编辑区 -->
      <div v-show="isEdit" class="table-c" >
       <div>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="grayTD" style="font-size:20px;height:30px" colspan="4">基本信息</td>
          </tr>
          <tr>
            <td class="grayTD"  colspan="1" rowspan="1" style="width:15%;height:15px">流水号</td>
            <td colspan="1" rowspan="1" style="width:35%;height:15px">{{submitForm.ID}}</td>
            <td colspan="1" rowspan="1" class="grayTD" style="width:15%;height:15px">客户编码</td>
            <td colspan="1" rowspan="1" style="width:35%;height:13px">{{submitForm.CUSTOMER_CODE}}</td>
          </tr>

          <tr>
            <td class="grayTD"  colspan="1" rowspan="1" style="height:15px">付款总金额</td>
            <td colspan="1" rowspan="1" style="height:15px">{{submitForm.SUM_MONEY}}</td>
            <td colspan="1" rowspan="1" class="grayTD" style="height:15px">付款时间范围</td>
            <td colspan="1" rowspan="1" style="height:15px">{{submitForm.TIME_SLOT}}</td>
          </tr>

          <tr>
            <td class="grayTD" style="font-size:20px;height:30px" colspan="4">委托书明细</td>
          </tr>
          <tr>
            <td class="grayTD"  colspan="1" rowspan="1" style="height:15px">行号</td>
            <td class="grayTD"  colspan="1" rowspan="1" style="height:15px">受委托人姓名</td>
            <td class="grayTD"  colspan="1" rowspan="1" style="height:15px">委托金额</td>
            <td class="grayTD"  colspan="1" rowspan="1" style="height:15px">附件</td>
          </tr>
          
          <tr v-for="(item,index) of submitDetailForm" :key="index" >
            <td colspan="1" rowspan="1" style="height:15px">{{item.LINE_NO}}</td>
            <td colspan="1" rowspan="1" style="height:15px">{{item.NAME}}</td>
            <td colspan="1" rowspan="1" style="height:15px">{{item.MONEY}}</td>
            <td colspan="1" rowspan="1" style="height:15px">
              <ul  class="el-upload-list el-upload-list--text" >
              <li 
                  v-for="(file, i) in item.fileList"
                  :key="i"
                  class="el-upload-list__item is-success"
                  tabindex="0"
                >
                  <a class="el-upload-list__item-name" >
                    <i class="el-icon-document" ></i>{{ file.name }}
                  </a>
                  <label style="display:block;position:absolute;top:0px;right:30px;">
                    <a style="cursor:pointer;" @click="downLoad(file.url)">下载附件</a>
                  </label>
              </li>
              </ul>
            </td>
          </tr>

          <tr v-if="this.submitForm.STATE=='2'">
            <td class="grayTD"  colspan="4" rowspan="1"  style="font-size:20px;height:30px" >审核信息（退回）</td>
          </tr>
          <tr v-if="this.submitForm.STATE=='2'">
            <td class="grayTD"  colspan="1" rowspan="1"  style="height:50px" >退回原因</td>
            <td colspan="3" rowspan="1"  style="height:50px" >
            <el-input
                v-model="submitForm.RETURN_REASON"
                type="textarea"
                maxlength="200"
                placeholder="（请输入退回原因）"
                clearable
                class="inputStyle"
              >
              </el-input>
            </td>
          </tr>
        </table>
       </div>
        <br />      
        <div style="text-align:center">
        <el-button type="success"   @click="_editSubmit(3)" >通过</el-button>                    
        <el-button type="danger"   @click="_editSubmit(4)" >退回</el-button>  
        </div>     

      </div>

      <div v-show="isCheck" style="margin-top:5px;font-weight:bold;">
        <table width="100%" border="0px" cellspacing="0px" cellpadding="0">
          <tr >
             <td style="width:8%"><h4>创建时间：</h4></td>
             <td style="width:25%;margin-left:-30px;"><h4>{{ submitForm.DATE_CRE| datatransDetail }}</h4></td>
             <td style="width:8%"><h4>确认时间：</h4></td>
             <td style="width:25%;margin-left:-30px;"><h4>{{ submitForm.DATE_AFFIRM| datatransDetail }}</h4></td>
             <td style="width:8%"><h4>审核时间：</h4></td>
             <td v-if="submitForm.STATE=='3'||submitForm.STATE=='4'" style="width:26%;margin-left:-30px;"><h4>{{ submitForm.AUDIT_TIME| datatransDetail }}</h4></td>
             <td v-if="submitForm.STATE!='3'&& submitForm.STATE!='4'" style="width:26%;margin-left:-30px;"><h4></h4></td>
          </tr>
          <tr >
             <td style="width:8%"><h4>创建人：</h4></td>
             <td style="width:25%;margin-left:-30px;"><h4>{{ submitForm.USER_CRE }}</h4></td>
             <td style="width:8%"><h4>确认人：</h4></td>
             <td style="width:25%;margin-left:-30px;"><h4>{{ submitForm.USER_AFFIRM }}</h4></td>
             <td style="width:8%"><h4>审核人：</h4></td>
             <td v-if="submitForm.STATE=='3'||submitForm.STATE=='4'" style="width:26%;margin-left:-30px;"><h4>{{ submitForm.AUDITOR }}</h4></td>
             <td v-if="submitForm.STATE!='3'&& submitForm.STATE!='4'" style="width:26%;margin-left:-30px;"><h4></h4></td>
          </tr>
          <tr >
             <td style="width:8%"><h4>单据状态：</h4></td>
             <td v-if="submitForm.STATE=='3'" style="width:25%;margin-left:-30px;color:green;"><h4>{{ submitForm.STATE|transStatus }}</h4></td>
             <td v-if="submitForm.STATE=='4'" style="width:25%;margin-left:-30px;color:red;"><h4>{{ submitForm.STATE|transStatus }}</h4></td>
             <td v-if="submitForm.STATE!='3'&&submitForm.STATE!='4'" style="width:25%;margin-left:-30px;"><h4>{{ submitForm.STATE|transStatus }}</h4></td>
          </tr>
        </table> 
      </div>  
    </el-dialog>
  </div>
</template>

<script>
import { 
  GetAllDelegation,
  CheckDetailByID,
  editByCustomer,
  editSubmit
 } from "@/api/supplierASP";
import { downLoadFile } from "@/common/js/downLoadFile";
import Cookies from "js-cookie";
const Head = "http://14.29.223.114:10250/upload";

export default {
  name: "payDelegationExamine",
  data() {
    return {
      dateStamp: "",
      fileChange: false,
      deleteFile: [],
      subtractDeleteFile:[],//点击减号准备删除明细，预删除的文件集合
      deleteIndex:[],//删除文件对应的明细的索引
      btnDisable: false,
      companyId: "",
      CID: Cookies.get("cid"), //账号
      CNAME: Cookies.get("realName"), //账号名
      beginTime: "", //查询的开始时间
      finishTime: "", //查询的结束时间
      SEARCHKEY: "", //搜索栏关键字
      SELECT_STATUS: "0", //存储下拉框的值
      rowPlus:0,//兰居软装设计需求表中的户型编辑项添加数
      isEdit: false, //编辑记录
      isCheck: false, //查看记录
      initRowspan:5,//基本信息中的初始行数
      usedRowspan:5,//基本信息中的行数
      fileListGM:[],//广美上传的文件集合
      successCount:0,
      allCount:0,
      ServiceDetail:false,
      payDetail: false,
      limit: 10,
      count: 0,
      detailCount:0,//新增户型记录数
      currentPage: 1,
      statusArray: [
        {
          label: "全部状态",
          value: "0"
        },
        {
          label: "待客户确认",
          value: "1"
        },
        {
          label: "客户确认",
          value: "2"
        },
        {
          label: "通过",
          value: "3"
        },
        {
          label: "退回",
          value: "4"
        },
      ],
      payData: [],
      submitForm:[],//查看或编辑的表头信息
      submitDetailForm:[], //查看或编辑的明细信息
    };
  },
  created: function() {
    this.refresh();
  },
  filters: {
    transStatus(value) {
      switch (value) {
        case "0":
          return "全部状态";
          break;
        case "1":
          return "待客户确认";
          break;
        case "2":
          return "客户确认";
          break;
        case "3":
          return "通过";
          break;
        case "4":
          return "退回";
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
    rateTrans(value) {
      switch (value) {
        case "1":
          return "极差";
        case "2":
          return "失望";
        case "3":
          return "一般";
        case "4":
          return "满意";
        case "5":
          return "惊喜";
      }
    },
    houseTrans(value){
      switch (value) {
        case  1:
          return "简装";
        case  2:
          return "豪宅";
      }
    },
  },
  methods: {
    //模糊搜索
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
    //翻页获取投诉信息
    handleCurrentChange(val) {
      this.currentPage = val;
      this.refresh();
    },
    //查询满足条件的该用户的委托书信息
    refresh() {
      var data = {
        companyId: Cookies.get("companyId"),
        limit: this.limit,
        page: this.currentPage,
        CID: Cookies.get("cid"),
        beginTime: this.beginTime,
        finishTime: this.finishTime,
        STATUS: this.SELECT_STATUS,
        SEARCHKEY: this.SEARCHKEY
      };
      if (!data.beginTime) {
        data.beginTime = "0001/1/1";
      }
      if (!data.finishTime) {
        data.finishTime = "9999/12/31";
      } else {
        data.finishTime = data.finishTime + " 23:59:59";
      }
       GetAllDelegation(data).then(res => {
        this.count = res.count;
        this.payData = res.data;
      });
    },
    //查看列表详情
    _CheckDetail(val) {
      this.submitDetailForm = [];
      this.submitForm = val;
      this.fileListGM=[];
      let data = {
        ID: val.ID
      };
      CheckDetailByID(data).then(res => {
        if (res.count > 0) {
          this.submitDetailForm = res.data;
          this.detailCount = res.count;
        }
        for (let j = 0; j < this.submitDetailForm.length; j++) {
          var list = this.submitDetailForm[j].ATTACHMENT_FILE.split(";");
          this.submitDetailForm[j].fileList = [];
          for (var i = 0; i < list.length - 1; i++) {
            var index = list[i].lastIndexOf("/");
            var fileName = list[i].substr(index + 1);
            this.submitDetailForm[j].fileList.push({
              name: fileName,
              url: list[i]
            });
          }
        }
        this.isEdit = false;
        this.isCheck = true;
        this.payDetail = true;
      });
    },
    //编辑状态下查看列表详情
    _EditDetail(val) {
      this.submitDetailForm = [];
      this.submitDetailForm.fileList = [];//可能有问题，lanju里是新增的时候向对象里添加该属性了
      this.submitForm = val;
      this.fileListGM=[];
      this.deleteFile = [];
      let data = {
        ID: val.ID
      };
      CheckDetailByID(data).then(res => {
        if (res.count > 0) {
          this.submitDetailForm = res.data;
          this.detailCount = res.count;
        }
        //将数据库里文件路径集合数据拆解，拆分成可以访问的路径
        for (let j = 0; j < this.submitDetailForm.length; j++) {
          var list = this.submitDetailForm[j].ATTACHMENT_FILE.split(";");
          this.submitDetailForm[j].fileList=[];
          for (var i = 0; i < list.length - 1; i++) {
          var index = list[i].lastIndexOf("/");
          var fileName = list[i].substr(index + 1);
          this.submitDetailForm[j].fileList.push({
          name: fileName,
          url: list[i]
          });
          }
        }
        this.dateStamp = new Date().getTime();
        this.isEdit = true;
        this.isCheck = false;
        this.payDetail = true;
      });
    },
    //编辑列表详情修改
    _editSubmit(val) {
      this.submitForm.STATE=val;
      this.submitForm.AUDITOR=this.CNAME;
      editSubmit(this.submitForm).then(res => {
        if (res.code == 0) {
          this.$alert("修改成功", "提示", {
            confirmButtonText: "确定",
            type: "success"
          });
          this.currentPage = 1;
          this.refresh();
        } else {
          this.$alert("修改失败，请稍后重试", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
        }
      });
      this.payDetail = false;
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
        } 
      }
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
          this.payDetail = false;
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
.table-c table {
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}
.table-c table td {
  border-left: 1px solid black;
  border-top: 1px solid black;
  height: 45px;
  text-align: center;
  font-size: 16px;
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