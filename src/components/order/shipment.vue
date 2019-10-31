<template>
<div class="shipmentCard">
  <el-card class="centerCard">
    <div slot="header">
      <span class="headSpan">产品明细与提货信息</span>
      <el-button
        @click="addTab('order/myOrder')"
        style="float:right;"
        size="small"
        type="success"
        plain
      >返回</el-button>
    </div>
    <el-card class="tableCard" shadow="hover">
      <div slot="header">
        <p class="zoomLeft">
          订单号：
          <span class="zoomRight">{{dingdanhao}}</span>
        </p>
        <br />
        <span class="zoomLeft">
          产品型号：
          <span class="zoomRight">{{saleNo}}</span>
        </span>
        <br />
        <span class="zoomLeft">
          下单数量：
          <span class="zoomRight">{{zongshuliang}}</span>
        </span>
      </div>
      <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="SALE_NO" label="提货单号" align="center"></el-table-column>
        <el-table-column prop="QTY_DELIVER" label="数量" align="center"></el-table-column>
        <el-table-column prop="BATCH_NO" label="批号" align="center"></el-table-column>
        <el-table-column align="center" label="出货情况">
          <template slot-scope="scope">
            <span style="font-size:14px; color:black;" v-if="scope.row.DATE_OUT_STOCK==''||scope.row.DATE_OUT_STOCK=='9999/12/31 00:00:00'">待发货</span>
            <span style="font-size:14px; color:black;" v-else>已发货</span>
          </template>
        </el-table-column>
        <el-table-column label="发货日期" align="center">
          <template slot-scope="scope1">
            <span>{{scope1.row.DATE_OUT_STOCK | datatrans}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="FREIGHT" label="加收物流费" align="center"></el-table-column>
        <el-table-column prop="TRANSCOMPANY" label="物流公司" align="center"></el-table-column>
        <el-table-column prop="TRANS_ID" label="物流单号" align="center"></el-table-column>
        <el-table-column align="center" label="物流查看">
          <template slot-scope="scope">
            <a :href="kuaidi100" target="_blank" @click="searchWL(scope.row.TRANS_ID)">
              <el-button :disabled="scope.row.TRANS_ID===''" type="danger" size="small">查看物流</el-button>
            </a>
          </template>
        </el-table-column>
        <el-table-column align="center" label="">
          <template slot-scope="scope">
              <el-button :disabled="scope.row.TRANS_ID===''" type="primary" size="small" @click="addRecord(scope.row)" >投诉</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </el-card>

  <el-dialog title="投诉登记表" :visible.sync="complaintDetail" :close-on-click-modal="false" width="40%">
      <!-- 编辑区 -->
      <div v-show="isAdd" class="table-c">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr class="grayTD">
            <td style="font-size:20px;height:30px;" colspan="4">投诉登记表</td>
          </tr>

          <tr>
            <td class="grayTD" style="width:16%;height:15px">客户代码</td>
            <td style="width:34%;height:15px" class="grayTD">(提交后自动生成)</td>
            <td class="grayTD" style="width:16%;height:15px">客户名称</td>
            <td style="width:34%;height:15px" class="grayTD">(提交后自动生成)</td>
          </tr>

          <tr>
            <td class="grayTD" style="height:15px">提货单号</td>
            <td class="grayTD" style="height:15px"> {{submit.SALE_NO}}</td>
            <td class="grayTD" style="height:15px">物流单号</td>
            <td class="grayTD" style="height:15px">{{submit.C_TRANSBILL}}</td>
          </tr>
          <tr>
            <td class="grayTD" style="height:15px">订单号</td>
            <td class="grayTD" style="height:15px">{{submit.DINGDANHAO}}</td>
            <td class="grayTD" style="height:15px">产品型号</td>
            <td class="grayTD" style="height:15px">{{submit.SALENO}}</td>
          </tr>

          <tr>
            <td class="grayTD" style="font-size:20px;height:30px" colspan="4">投诉信息</td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" style="height:16px">投诉类型</td>
            <td colspan="1" style="text-align:left;height:16px;">
              <el-select
                style="height:16px%;width:100%;padding:0px 0px 0px 0px;"
                v-model="submit.TYPE"
                filterable
                placeholder="选择相应类型"
              >
                <el-option
                  v-for="item in typeArray"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </td>
            <td class="grayTD" colspan="1" style="height:16px">货物数量</td>
            <td v-if="submit.TYPE=='丢失'"  class="grayTD" colspan="1" style="height:20px">
                <el-input
                  v-model="submit.LOSED_QUANTITY"
                  placeholder="（丢失数量）"
                  clearable
                  class="inputStyle">
                </el-input>
            </td>
             <td v-if="submit.TYPE=='破损'"  class="grayTD" colspan="1" style="height:16px">
                <el-input
                  v-model="submit.DAMAGED_QUANTITY"
                  placeholder="（破损数量）"
                  clearable
                  class="inputStyle">
                </el-input>
            </td>
             <td v-else  class="grayTD" colspan="1" style="height:16px"> </td>
          </tr>

          <tr>
            <td class="grayTD"  colspan="1" rowspan="1" style="height:50px;" >投诉内容</td>
            <td colspan="3" rowspan="1" style="height:50px;">
                  <el-input
                  v-model="submit.MEMO"
                  type="textarea"
                  maxlength="200"
                  placeholder="（请输入投诉内容和要求）"
                  clearable
                  class="inputStyle">
                  </el-input>
            </td>
          </tr>


        </table>

        <div style="margin:0 auto; width:75px;">
          <br />
          <el-button type="success"  @click="_addSubmit()">提 交</el-button>                       <!-- 新增时的按钮 -->
        </div>

      </div>
  </el-dialog>
</div>
</template>

<script>
import Axios from "axios";
import {
    addSubmit,
} from "@/api/complaint";
import Cookies from "js-cookie";
import { getShipment } from "@/api/orderList";
import { getPackDetailInfo } from "@/api/orderListASP";
import { mapMutations, mapActions } from "vuex";
import { mapState } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      submit:[],
      complaintDetail:false,
      isAdd:false,
      saleNo: "",//产品型号
      dingdanhao: "",
      lineNo: "",
      zongshuliang: "",
      daifashuliang: "",
      kuaidi100: "",
      kuaididanhao: "",
      typeArray: [
        {
          label: "晚点",
          value: "晚点"
        },
        {
          label: "破损",
          value: "破损"
        },
        {
          label: "丢失",
          value: "丢失"
        },
        {
          label: "服务",
          value: "服务"
        },
        {
          label: "其他",
          value: "其他"
        },
      ],
    };
  },
  filters: {
    datatrans(value) {
      if(value == '9999/12/31 00:00:00') return '';
      //时间戳转化大法
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
    }
  },
  methods: {
    //查看物流
    searchWL(tab) {
      console.log(tab);
      this.kuaididanhao = tab;
      let kongchuan = "";
      this.kuaidi100 =
        "https://www.kuaidi100.com/chaxun?com=" +
        kongchuan +
        "&nu=" +
        this.kuaididanhao;
    },
    //跳转调用接口
    init_shipment() {
      this.dingdanhao = this.$route.params.orderId;
      this.saleNo = this.$route.params.itemNo;
      this.lineNo = this.$route.params.lineNo;
      var data = {
        orderNo: this.dingdanhao,
        lineNo: this.lineNo,
        itemNo: this.saleNo
      };
      // Axios.post("/packDetail/getPackDetailAppoint.do", {
      //   itemNo: this.saleNo,
      //   orderId: this.dingdanhao,
      //   lineNo: this.lineNo
      // })
      getPackDetailInfo(data)
        .then(res => {
          console.log(res);
          this.tableData = res.data[0].packDetails;
          this.zongshuliang = res.data[0].allCount;

          //this.daifashuliang=res.allCount-res.packDetails[0].qtyDeliver
        })
        .catch(error => {
          console.log(error);
        });
    },
    //隔行变色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "success-row";
      }
      return "";
    },
    //新建一条记录
    addRecord(data) {
      this.isAdd=true,
      this.complaintDetail=true,
      this.CNAME=Cookies.get("realName"), //客户名
      this.submit = {
        SID: "", //投诉单id
        SALE_NO:"",//销售单号
        CUSTOMER_CODE: "", //客户编码
        SUBMITTS: "", //提交时间
        TYPE: "", //投诉类型
        MEMO: "", //备注——投诉内容
        OPERATOR: "", //处理人
        PROCESSTS: "", //处理时间
        PROCESSDESC:"",//处理结果——回复
        WLTS_THINK:"",//服务评价
        FEEDBACKTS:"",//评价时间
        STATUS: 1,
        TELEPHONE:"",
        IMGURL:"",
        LOSED_QUANTITY:"", //货物丢失数量
        DAMAGED_QUANTITY:"",//货物损坏数量
        C_TRANSBILL:"",//物流单号
        DINGDANHAO:"",
        SALENO:"",
      },
      this.submit.DINGDANHAO=this.dingdanhao;
      this.submit.SALENO=this.saleNo;
      this.submit.CUSTOMER_CODE = Cookies.get("companyId");
      this.submit.SALE_NO = data.SALE_NO;
      this.submit.C_TRANSBILL = data.TRANS_ID;
    },
    //新增记录提交
    _addSubmit() {
      let data = this.submit;
      //判断是否填完所有信息
      if (
        this.submit.SALE_NO == "" ||
        this.submit.C_TRANSBILL == "" ||
        this.submit.TYPE == "" ||
        this.submit.MEMO == ""
      )
      {
        this.$alert("请完善信息", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (this.submit.TYPE == "丢失" )
      {
          this.submit.DAMAGED_QUANTITY = 0;
      }
      if (this.submit.TYPE == "破损" )
      {
          this.submit.LOSED_QUANTITY = 0;
      }
      if (this.submit.TYPE != "破损" && this.submit.TYPE != "丢失")
      {
          this.submit.LOSED_QUANTITY = 0;
          this.submit.DAMAGED_QUANTITY = 0;
      }
      if (
        this.submit.DAMAGED_QUANTITY > this.zongshuliang || this.submit.LOSED_QUANTITY > this.zongshuliang
      )
      {
        this.$alert("填写数量必须小于下单数量", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (
        this.submit.DAMAGED_QUANTITY < 0 || this.submit.LOSED_QUANTITY < 0
      )
      {
        this.$alert("填写数量必须为非负数", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      console.log(data);
      addSubmit(data).then(res => {
        if (res.code == 0) {
          this.$alert("提交成功", "提示", {
            confirmButtonText: "确定",
            type: "success"
          });
          this.init_shipment();
        } else {
          this.$alert("提交失败，请稍后重试", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
        }
      });
      this.complaintDetail=false;
    },
    ...mapMutations("navTabs", ["addTab"]),
    ...mapActions("navTabs", ["closeTab", "closeToTab"])

  },
  created: function() {
    this.init_shipment();
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
  height: 22px;
  text-align: center;
  font-size: 16px;
}
.tableCol {
  background: #f0f9eb;
}
.grayTD {
  background: rgb(241, 242, 243);
}
.inputStyle{
     border:0;
     height:100%;
     width:100%;
     font-size:16px;
     text-align:center;
}
.centerCard {
  margin: 0 auto;
  position: relative;
}
.tableCard {
  float: left;
  width: 90%;
}
.headSpan {
  font-weight: bold;
  font-size: 18px;
  color: black;
}
.zoomRight {
  font-weight: 400;
  font-size: 15px;
  line-height: 30px;
}
.zoomLeft {
  font-size: 15px;
  font-weight: bold;
  display: inline-block;
  margin-right: 30px;
}
</style>
<style>
.el-table .success-row {
  background: #f0f9eb;
}

.shipmentCard .el-input__inner {
    height: 22px;
    width:100%;
    font-size: 16px;
    box-shadow: none;
    border: 1px solid #e9e9e9;
    text-align: center;
}
 
.shipmentCard .el-input__inner:hover {
    border-color: #e9e9e9;
}
 
.shipmentCard .el-input__inner:focus {
    border-color: #42a5f5;
    box-shadow: none;
    transition-duration: .5s;
}
 
.shipmentCard .el-input__inner::-webkit-input-placeholder {
    line-height: 20px;
}
 
.shipmentCard .el-input__inner, .el-checkbox__inner, .el-textarea__inner, .el-button {
    border-radius: 0;
}
.shipmentCard .el-input__icon {
    height: 100%;
    width: 22px;
    text-align: center;
    line-height: 22px;
}
.shipmentCard .el-textarea__inner {
    height:48px;
    display: block;
    resize: vertical;
    padding: 1px 1px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    background-image: none;
    border: 1px solid
    #DCDFE6;
        border-top-color: rgb(220, 223, 230);
        border-right-color: rgb(220, 223, 230);
        border-bottom-color: rgb(220, 223, 230);
        border-left-color: rgb(220, 223, 230);
    border-radius: 4px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
</style>