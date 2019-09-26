<template>
  <div>
    <el-card shadow="hover">
      <div id="tbar" class="tbarStyle">
        <el-date-picker
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="查询开始日期"
          v-model="beginTime"
          style="width:14%;"
        ></el-date-picker>
        --
        <el-date-picker
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="查询截止日期"
          v-model="finishTime"
          style="width:14%;"
        ></el-date-picker>
        <el-select
          v-model="status"
          style="margin-left: 10px"
          placeholder="全部状态"
        >
          <el-option
            v-for="item in options"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button
          size="medium"
          type="success"
          style="margin-left: 10px"
          @click="search()"
          >查询</el-button
        >
        <el-button
          style="float:right"
          size="medium"
          @click="newOne()"
          type="primary"
          >新增申请单</el-button
        >
      </div>
      <el-table
        border
        :data="imageStoreData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          width="130"
          prop="ID"
          label="申请单号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="CREATER"
          label="申请人"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column width="100" label="申请时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.DATE_CRE | datatrans }}</span>
          </template>
        </el-table-column>
        <el-table-column width="100" label="店面形式" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.STORE_FORM | formTrans }}</span>
          </template></el-table-column
        >
        <el-table-column
          prop="STORE_AREA"
          label="店面面积(m2)"
          align="center"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="STORE_PLIE"
          label="层数"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column width="120" label="计划动工时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.PLAN_DATE | datatrans }}</span>
          </template>
        </el-table-column>
        <el-table-column width="100" label="实施形式" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.IMPLEMENTTATION_FORM | formTrans2 }}</span>
          </template>
        </el-table-column>
        <el-table-column width="100" label="上门测量" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.MEASURE == 1">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column width="100" label="状态" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.STATUS | transStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="
                scope.row.STATUS == 1 ||
                  scope.row.STATUS == 2 ||
                  scope.row.STATUS == 3
              "
              @click="checkDetail(scope.row)"
              type="warning"
              icon="el-icon-search"
              circle
            ></el-button>
            <el-button
              v-if="scope.row.STATUS == 4 || scope.row.STATUS == 5"
              @click="editIt(scope.row)"
              type="primary"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button
              v-if="scope.row.STATUS == 4 || scope.row.STATUS == 5"
              @click="deleteDetail(scope.row)"
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin:0 25%;" class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="limit"
          layout="total,sizes,prev, pager, next, jumper"
          :total="count"
        ></el-pagination>
      </div>
    </el-card>

    <el-dialog
      :visible.sync="imageStoreDetail"
      :close-on-click-modal="false"
      width="58%"
      top="5vh"
    >
      <!-- 编辑区 -->
      <div class="table-c">
        <h2 style="text-align:center;margin-bottom:10px;">
          形象店建设申请表
        </h2>
        <h3 v-if="EDITorCHECK">
          提交时间：{{ tableData.DATE_CRE | datatrans }}
        </h3>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td width="10%" class="grayTD" colspan="1" rowspan="3" border="0px">
              基本信息
            </td>

            <td width="15%" class="grayTD" colspan="1" style="height:28px;">
              客户名称
            </td>
            <td style="height:28px;">{{ tableData.CUSTOMER_NAME }}</td>

            <td class="grayTD" colspan="1" style="height:28px;">年销售任务</td>
            <td style="height:28px;">
              <el-input
                :disabled="EDITorCHECK"
                placeholder="（客户填写）"
                clearable
                class="inputStyle"
                size="mini"
                v-model="tableData.SALE_TARGET"
              ></el-input>
            </td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" style="height:28px;">
              店面地址<span style="color:red;">*</span>
            </td>
            <td colspan="3" style="height:28px;">
              <el-input
                :disabled="EDITorCHECK"
                placeholder="（客户必填）"
                clearable
                class="inputStyle"
                size="mini"
                v-model="tableData.STORE_ADDRESS"
              ></el-input>
            </td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" style="width:17%;height:28px;">
              联系人
            </td>
            <td style="width:27%;height:28px;">
              {{ tableData.CUSTOMER_AGENT }}
            </td>

            <td class="grayTD" colspan="1" style="width:17%;height:28px;">
              联系电话
            </td>
            <td style="width:27%;height:28px;">
              {{ tableData.OFFICE_TEL }}
            </td>
          </tr>

          <tr>
            <td
              class="grayTD"
              colspan="1"
              rowspan="2"
              border="0px"
              style="height:28px;"
            >
              店面信息
            </td>
            <td class="grayTD" colspan="1" style="height:28px;">
              店面形式<span style="color:red;">*</span>
            </td>
            <td colspan="3" style="text-align:left;height:28px;">
              <el-radio-group
                :disabled="EDITorCHECK"
                style="margin-left:50px;"
                v-model="tableData.STORE_FORM"
              >
                <el-radio label="street">街边店</el-radio>
                <el-radio label="market">商城店</el-radio>
              </el-radio-group>
            </td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" style="height:28px;">
              店面面积<span style="color:red;">*</span>
            </td>
            <td colspan="1" style="height:28px;">
              <el-input
                :disabled="EDITorCHECK"
                style="width:65%"
                placeholder="（客户必填）"
                clearable
                class="inputStyle"
                size="mini"
                oninput="value=value.replace(/[^\d.]/g,'')
                                .replace(/^\./g, '').replace(/\.{2,}/g, '.')
                                .replace('.', '$#$').replace(/\./g, '')
                                .replace('$#$', '.')
                                .slice(0,value.indexOf('.') === -1? value.length: value.indexOf('.') + 3)"
                v-model="tableData.STORE_AREA"
              ></el-input>
              <span>平方米</span>
            </td>

            <td class="grayTD" colspan="1" style="height:28px;">
              层数<span style="color:red;">*</span>
            </td>
            <td colspan="1" style="height:28px;">
              <el-input
                :disabled="EDITorCHECK"
                placeholder="（客户必填）"
                clearable
                class="inputStyle"
                size="mini"
                oninput="value=value.replace(/[^\d.]/g,'')
                                .replace(/^\./g, '').replace(/\.{2,}/g, '.')
                                .replace('.', '$#$').replace(/\./g, '')
                                .replace('$#$', '.')
                                .slice(0,value.indexOf('.') === -1? value.length: value.indexOf('.') + 3)"
                v-model="tableData.STORE_PLIE"
              ></el-input>
            </td>
          </tr>

          <tr>
            <td
              class="grayTD"
              colspan="1"
              rowspan="5"
              border="0px"
              style="height:28px;"
            >
              设计需求
            </td>
            <td class="grayTD" colspan="1" style="height:28px;">
              计划动工时间<span style="color:red;">*</span>
            </td>
            <td colspan="3" rowspan="1" style="text-align:left;height:28px;">
              <el-date-picker
                :disabled="EDITorCHECK"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择计划动工时间"
                v-model="tableData.PLAN_DATE"
                style="width:35%;margin-left:10px;"
              ></el-date-picker>
            </td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" style="height:30px;">
              实施形式<span style="color:red;">*</span>
            </td>
            <td colspan="3" style="text-align:left;height:45px;">
              <el-radio-group
                :disabled="EDITorCHECK"
                style="margin-left:10px;"
                v-model="tableData.IMPLEMENTTATION_FORM"
                @change="implentmentChange"
              >
                <el-radio style="margin-bottom:5px;" :label="1"
                  >①100%按公司设计方案落地，软装物料由公司配置，享受公司建店支持</el-radio
                >
                <br />
                <el-radio :label="2">②自行落地</el-radio>
              </el-radio-group>
            </td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" style="height:35px">
              是否需要上门测量
            </td>
            <td colspan="1" style="height:35px">
              <el-radio-group
                :disabled="tableData.IMPLEMENTTATION_FORM != '1' && EDITorCHECK"
                v-model="tableData.MEASURE"
              >
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </td>
            <td colspan="2" style="font-size:12px;color:gray;height:35px">
              *仅100%按公司设计方案落地客户可预约上门测量，并需承担上门人员食宿费用，
              如后期未100%按效果图实施，需承担上门人员交通费用。
            </td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" style="height:50px">其他需求说明</td>
            <td colspan="3" style="height:50px">
              <el-input
                class="inputStyle"
                type="textarea"
                :autosize="{ minRows: 2, maxRow: 4 }"
                resize="none"
                v-model="tableData.NOTE"
              ></el-input>
            </td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" style="height:14px;">附件</td>

            <td colspan="1" style="height:14px;">
              <!-- <el-upload
                class="avatar-uploader"
                accept="image/png, image/jpg, image/jpeg"
                action="http://14.29.223.114:10250/yulan-capital/upload/uploadPaymentBillImg.do"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="sumbit.imgUrl" :src="sumbit.imgUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload> -->
            </td>

            <td colspan="2" style="font-size:12px;color:gray">
              上传jpg、dwg、pdf等格式平面图，平面图尺寸要表达清晰，消防位等有阻碍设计的地方要标注清楚
            </td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" border="0px" style="height:28px;">
              付款信息
            </td>
            <td class="grayTD" colspan="1" style="height:28px;">付款凭证</td>
            <td colspan="1" style="height:28px;">
              <input placeholder="（是/否）" clearable class="inputStyle" />
            </td>
            <td colspan="2" style="font-size:12px;color:gray">
              选择付款凭证
            </td>
          </tr>

          <tr>
            <td colspan="3" border="0px" style="text-align:left;height:28px;">
              <span style="margin-left:10px;"
                >责任人签字<span style="color:red;">*</span>：</span
              >
            </td>
            <td colspan="2" style="text-align:left;height:28px;">
              <span style="margin-left:10px;"
                >日期：{{ new Date() | datatrans }}</span
              >
            </td>
          </tr>

          <tr style="height:60px">
            <td
              colspan="5"
              border="0px"
              style="font-size:13px;color:gray;text-align:left"
            >
              1.请提前15个工作日提交设计需求申请。<br />
              2.请附上店面平面图（清晰标注尺寸以及消防位等障碍位置）。<br />
              3.硬装部分有客户自行落地。<br />
              4.公司物料配置包含标识、展具、上样、情景四大模块，根据成本清单提供40%建店支持（不包含硬装）。以实用面积为100平店面测算出软装包成本约2700元/m²，店面面积越大，每平方价格相应降低。<br />
              5.申请2.0形象店设计需交10000元设计落地保证金，落地后抵扣软装包款项，如未100%按设计落地，保证金不予返还。<br />
            </td>
          </tr>
        </table>

        <div style="margin:0 auto; width:75px;">
          <br />
          <el-button v-if="newORedit" type="success" @click="submitEDIT"
            >确定</el-button
          >
          <el-button v-else-if="!EDITorCHECK" type="success" @click="sumbitNEW"
            >提交</el-button
          >
        </div>
      </div>
    </el-dialog>

    <el-dialog width="500px" title="查看图片" :visible.sync="BigPic">
      <div>
        <img class="BIGimg" :src="tableData.imgUrl" />
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { GetImageCustomer, InsertImageStore } from "@/api/imageStoreASP";
import { getCustomerInfo } from "@/api/orderListASP";
import Cookies from "js-cookie";

export default {
  name: "ImageShop",
  data() {
    return {
      chargeData: [],
      BigPic: false,
      sqlpath: "", //保存图片相对路径
      newORedit: false, //决定显示新建或者编辑
      EDITorCHECK: false, //决定显示编辑或者查看
      imageStoreData: [],
      tableData: [],
      isDelete: false,
      isChuli: false,
      isBack: false,
      imageStoreDetail: false,
      limit: 10,
      count: 0,
      currentPage: 1,
      beginTime: "",
      finishTime: "",
      status: "",
      options: [
        {
          label: "全部状态",
          value: ""
        },
        {
          label: "已提交",
          value: "1"
        },
        {
          label: "市场部确认",
          value: "2"
        },
        {
          label: "广美确认",
          value: "3"
        },
        {
          label: "市场部退回",
          value: "4"
        },
        {
          label: "广美退回",
          value: "5"
        }
      ]
    };
  },
  created: function() {
    this.chargeQuery();
    this.getDetail();
  },
  filters: {
    transStatus(value) {
      switch (value) {
        case 0:
          return "待提交";
          break;
        case 1:
          return "已提交";
          break;
        case 2:
          return "市场部确认";
          break;
        case 3:
          return "广美确认";
          break;
        case 4:
          return "市场部退回";
          break;
        case 5:
          return "广美退回";
          break;
      }
    },
    datatrans(value) {
      //时间戳转化大法
      if (value == null) {
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
      return y + "-" + MM + "-" + d + " "; /* + h + ':' + m + ':' + s; */
    },
    formTrans(value) {
      switch (value) {
        case "street":
          return "街边店";
          break;
        case "market":
          return "商城店";
          break;
      }
    },
    formTrans2(value) {
      switch (value) {
        case 1:
          return "公司方案";
          break;
        case 2:
          return "自行落地";
          break;
      }
    }
  },
  methods: {
    //查询经办人
    chargeQuery() {
      var data = {
        cid: Cookies.get("cid"),
        companyId: Cookies.get("companyId")
      };
      getCustomerInfo(data).then(res => {
        this.chargeData = res.data;
      });
    },
    implentmentChange() {
      if (this.tableData.IMPLEMENTTATION_FORM != "1")
        this.tableData.MEASURE = "";
    },
    //确定新建
    sumbitNEW() {
      //判断是否填完所有信息
      if (
        !this.tableData.STORE_ADDRESS ||
        !this.tableData.STORE_FORM ||
        !this.tableData.STORE_AREA ||
        !this.tableData.STORE_PLIE ||
        !this.tableData.PLAN_DATE ||
        !this.tableData.IMPLEMENTTATION_FORM
      ) {
        this.$alert("请完善信息", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      // //判断是否上传图片
      // if (this.sumbit.imgFileName == "") {
      //   this.$alert("请上传凭证", "提示", {
      //     confirmButtonText: "确定",
      //     type: "warning"
      //   });
      //   return;
      // }
      //this.sumbit.imgUrl = this.sqlpath; //转换为相对地址
      InsertImageStore(this.tableData).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.$alert("提交成功", "提示", {
            confirmButtonText: "确定",
            type: "success"
          });
          this.currentPage = 1;
          this.getDetail();
          this.imageStoreDetail = false;
        } else {
          this.$alert("提交失败，请稍后重试", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
        }
      });
    },
    //新建
    newOne() {
      this.EDITorCHECK = false;
      this.imageStoreDetail = true;
      this.newORedit = false;
      this.tableData = {
        CUSTOMER_CODE: Cookies.get("companyId"),
        CUSTOMER_NAME: Cookies.get("realName"),
        CUSTOMER_AGENT: this.chargeData.CUSTOMER_AGENT,
        OFFICE_TEL: this.chargeData.OFFICE_TEL,
        CREATER: Cookies.get("cid"),
        STATUS: 0
      };
    },
    //编辑列表详情
    editIt(tab) {
      console.log(tab.id);
      let url = Quest + "/PaymentBill/getPayBillContent.do";
      let data = {
        id: tab.id
      };
      getPayBillContent(url, data).then(res => {
        console.log(res);
        console.log(this.sumbit);
        this.sqlpath = res.data.imgUrl; //先保存一个
        res.data.imgUrl = Head + res.data.imgUrl;
        this.sumbit = res.data;
        this.EDITorCHECK = false;
        this.newORedit = true; //显示流水号 等编辑一类
        this.imageStoreDetail = true;
      });
    },
    //查看列表详情
    checkDetail(tab) {
      this.tableData = JSON.parse(JSON.stringify(tab));
      this.EDITorCHECK = true;
      this.imageStoreDetail = true;
    },
    //搜索
    search() {
      this.currentPage = 1;
      this.imageStoreData = [];
      this.getDetail();
    },
    getDetail() {
      let data = {
        companyId: Cookies.get("companyId"), //公司id
        status: this.status, //状态状态(SUBMITED（已提交）,PROCESED（已处理）,SENDBACK（退回）,CANCELED（作废）)
        beginTime: this.beginTime, //起始时间
        finishTime: this.finishTime, //结束时间
        limit: this.limit, //限制数
        page: this.currentPage //页数
      };
      if (!data.beginTime) {
        data.beginTime = "0001/1/1";
      }
      if (!data.finishTime) {
        data.finishTime = "9999/12/31";
      } else {
        data.finishTime = data.finishTime + " 23:59:59";
      }
      GetImageCustomer(data).then(res => {
        this.count = res.count;
        this.imageStoreData = res.data;
      });
    },
    //隔行变色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "success-row";
      }
      return "";
    },
    //放大图片
    BIG() {
      this.BigPic = true;
    },
    //翻页获取订单
    handleCurrentChange(val) {
      this.currentPage = val;
      this.imageStoreData = [];
      this.getDetail();
    },
    handleSizeChange(val) {
      this.limit = val;
      this.currentPage = 1;
      this.getDetail();
    },
    handleAvatarSuccess(res, file) {
      this.sumbit.imgUrl = URL.createObjectURL(file.raw);
      console.log(res);
      if (res.code == 0) {
        this.sqlpath = res.sqlpath;
        this.sumbit.imgUrl = Head + res.sqlpath;
        this.sumbit.imgFileName = res.fileName;
      }
      console.log(this.sumbit);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isLt2M;
    }
  }
};
</script>

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
.inputStyle {
  border: 0;
  height: 100%;
  width: 100%;
  font-size: 16px;
  text-align: center;
}
.lowHeightRow {
  height: 10px;
}
.ISimg {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.BIGimg {
  width: 450px;
  height: 450px;
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
.inputStyle .el-input__inner {
  border-radius: 0;
}
.inputStyle .el-textarea__inner {
  border-radius: 0;
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
  font-size: 12px;
  color: #8c939d;
  width: 14px;
  height: 14px;
  line-height: 14px;
  text-align: center;
}
.avatar {
  width: 14px;
  height: 14px;
  display: block;
}
</style>