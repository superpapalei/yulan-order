<template>
  <div class="shipmentCard">
   <el-card class="centerCard">
        <div slot="header">
          <span class="zoomLeft">
            订单号：
            <span class="zoomRight">{{ orderNo }}</span>
          </span>
          <br />
          <span class="zoomLeft">
            产品型号：
            <span class="zoomRight">{{ itemNo }}</span>
          </span>
          <br />
          <span class="zoomLeft">
            下单数量：
            <span class="zoomRight">{{ zongshuliang }}</span>
          </span>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            prop="SALE_NO"
            label="提货单号"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="QTY_DELIVER"
            label="数量"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="BATCH_NO"
            label="批号"
            align="center"
          ></el-table-column>
          <el-table-column align="center" label="出货情况">
            <template slot-scope="scope">
              <span
                style="font-size:14px; color:black;"
                v-if="
                  scope.row.DATE_OUT_STOCK == '' ||
                    scope.row.DATE_OUT_STOCK == '9999/12/31 00:00:00'
                "
                >待发货</span
              >
              <span style="font-size:14px; color:black;" v-else>已发货</span>
            </template>
          </el-table-column>
          <el-table-column label="发货日期" align="center">
            <template slot-scope="scope1">
              <span>{{ scope1.row.DATE_OUT_STOCK | datatrans }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="FREIGHT"
            label="加收物流费"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="TRANSCOMPANY"
            label="物流公司"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="TRANS_ID"
            label="物流单号"
            align="center"
          ></el-table-column>
          <el-table-column align="center" label="物流查看">
            <template slot-scope="scope">
              <a
                :href="kuaidi100"
                target="_blank"
                @click="searchWL(scope.row.TRANS_ID)"
              >
                <el-button
                  :disabled="scope.row.TRANS_ID === ''"
                  type="danger"
                  size="small"
                  >查看物流</el-button
                >
              </a>
            </template>
          </el-table-column>
          <el-table-column align="center" label="">
            <template slot-scope="scope">
              <el-button
                :disabled="scope.row.TRANS_ID === ''"
                type="primary"
                size="small"
                @click="addRecord(scope.row)"
                >投诉</el-button
              >
            </template>
          </el-table-column>
          <el-table-column align="center" label="">
            <template slot-scope="scope">
              <el-button
                :disabled="scope.row.TRANS_ID === ''"
                type="danger"
                size="small"
                @click="addRefundRecord(scope.row)"
                >售后</el-button
              >
            </template>
          </el-table-column>
        </el-table>
    </el-card>

    <el-dialog
      title="投诉登记表"
      :visible.sync="complaintDetail"
      :close-on-click-modal="false"
      width="40%"
      append-to-body
    >
      <!-- 编辑区 -->
      <div v-show="isAdd" class="table-c">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr class="grayTD">
            <td style="font-size:20px;height:30px;" colspan="4">投诉登记表</td>
          </tr>

          <tr>
            <td class="grayTD" style="width:16%;height:15px">客户代码</td>
            <td style="width:34%;height:15px" class="grayTD">
              (提交后自动生成)
            </td>
            <td class="grayTD" style="width:16%;height:15px">客户名称</td>
            <td style="width:34%;height:15px" class="grayTD">
              (提交后自动生成)
            </td>
          </tr>

          <tr>
            <td class="grayTD" style="height:15px">提货单号</td>
            <td class="grayTD" style="height:15px">{{ submit.SALE_NO }}</td>
            <td class="grayTD" style="height:15px">物流单号</td>
            <td class="grayTD" style="height:15px">{{ submit.C_TRANSBILL }}</td>
          </tr>
          <tr>
            <td class="grayTD" style="height:15px">订单号</td>
            <td class="grayTD" style="height:15px">{{ submit.orderNo }}</td>
            <td class="grayTD" style="height:15px">产品型号</td>
            <td class="grayTD" style="height:15px">{{ submit.itemNo }}</td>
          </tr>

          <tr>
            <td class="grayTD" style="font-size:20px;height:30px" colspan="4">
              投诉信息
            </td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" style="height:16px">投诉类型</td>
            <td colspan="1" style="text-align:left;height:16px;">
              <el-select
                style="height:16px;width:100%;padding:0px 0px 0px 0px;"
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
            <td
              v-if="submit.TYPE == '丢失'"
              class="grayTD"
              colspan="1"
              style="height:20px"
            >
              <el-input
                v-model="submit.LOSED_QUANTITY"
                placeholder="（丢失数量）"
                clearable
                class="inputStyle"
              >
              </el-input>
            </td>
            <td
              v-if="submit.TYPE == '破损'"
              class="grayTD"
              colspan="1"
              style="height:16px"
            >
              <el-input
                v-model="submit.DAMAGED_QUANTITY"
                placeholder="（破损数量）"
                clearable
                class="inputStyle"
              >
              </el-input>
            </td>
            <td v-else class="grayTD" colspan="1" style="height:16px"></td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" rowspan="1" style="height:50px;">
              投诉内容
            </td>
            <td colspan="3" rowspan="1" style="height:50px;">
              <el-input
                v-model="submit.MEMO"
                type="textarea"
                maxlength="200"
                placeholder="（请输入投诉内容和要求）"
                clearable
                class="inputStyle"
              >
              </el-input>
            </td>
          </tr>
        </table>

        <div style="margin:0 auto; width:75px;">
          <br />
          <el-button type="success" @click="_addSubmit()">提 交</el-button>
          <!-- 新增时的按钮 -->
        </div>
      </div>
    </el-dialog>

     <el-dialog
      :visible.sync="RefundDetail"
      :close-on-click-modal="false"
      width="45%"
      append-to-body
    >    
      <!-- 编辑区 -->
      <div  v-show="isRefundAdd" >
         <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr >
            <td style="font-size:20px;height:30px;text-align:center;" colspan="7">退货/赔偿申请书{{"【"+"】"}}</td>
          </tr>
         </table>
      </div>
      <div  v-show="isRefundAdd" >
         <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr >
            <td style="font-size:10px;height:15px;" colspan="1">编号：</td>
            <td style="font-size:10px;height:15px;text-align:left;" colspan="1">{{}}</td>
            <td style="font-size:10px;height:15px;" colspan="1">创建时间：</td>
            <td style="font-size:10px;height:15px;text-align:left;" colspan="3">{{}}</td>
            <td style="font-size:10px;height:15px;" colspan="1">处理人：</td>
            <td style="font-size:10px;height:15px;text-align:left;" colspan="1">{{}}</td>
            <td style="font-size:10px;height:15px;" colspan="1">处理时间：</td>
            <td style="font-size:10px;height:15px;text-align:left;" colspan="3">{{}}</td>
            <td >
              <el-button
                type="primary"
                size="small"
                style="float:right;"
                >打印</el-button
              >
            </td>
          </tr>
         </table>
      </div>
      <div v-show="isRefundAdd" class="table-c" style="margin-top:5px;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="grayTD" style="height:15px" colspan="1">客户代码</td>
            <td style="height:15px" colspan="1">
              (提交后自动生成)
            </td>
            <td class="grayTD" style="height:15px" colspan="1">客户名称</td>
            <td style="height:15px" colspan="4">
              (提交后自动生成)
            </td>
          </tr>

          <tr>
            <td class="grayTD" style="height:15px">提货单号</td>
            <td style="height:15px">{{ submit.SALE_NO }}</td>
            <td class="grayTD" style="height:15px">B2B订单号</td>
            <td style="height:15px" colspan="2">{{ submit.orderNo }}</td>
            <td class="grayTD" style="height:15px">ERP订单号</td>
            <td  style="height:15px" colspan="2">{{  }}</td>
          </tr>
          <tr>
            <td class="grayTD" style="height:15px">联系人</td>
            <td style="height:15px">{{  }}</td>
            <td class="grayTD" style="height:15px">联系电话</td>
            <td style="height:15px" colspan="2">{{  }}</td>
            <td class="grayTD" style="height:15px">物流单号</td>
            <td style="height:15px" >{{  }}</td>
          </tr>
          <tr>
            <td class="grayTD" style="height:15px">问题描述</td>
            <td style="height:15px" colspan="6">{{  }}</td>
          </tr>
          <tr>
            <td class="grayTD"  colspan="1" style="height:15px">产品/项目</td>
            <td class="grayTD"  colspan="2" style="height:15px" >型号</td>
            <td class="grayTD"  colspan="1" style="height:15px">单位</td>
            <td class="grayTD"  colspan="1" style="height:15px">数量</td>
            <td class="grayTD"  colspan="2" style="height:15px">上传相关信息</td>
          </tr>
          <tr>
            <td  colspan="1" style="height:21px">{{}}</td>
            <td  colspan="2" style="height:21px" ></td>
            <td  colspan="1" style="height:21px"></td>
            <td  colspan="1" style="height:21px"></td>
            <td  colspan="2" style="height:21px"></td>
          </tr>
          <tr>
            <td class="grayTD" style="font-size:20px;height:30px" colspan="7">
              玉兰处理意见
            </td>
          </tr>
          <tr>
            <td class="grayTD" style="height:15px">初审意见</td>
            <td style="height:15px" colspan="2">{{  }}</td>
            <td style="height:15px" colspan="4">具体意见</td>
          </tr>
          <tr>
            <td class="grayTD" style="height:15px">备注信息</td>
            <td style="height:15px" colspan="6">随退货方式变化</td>
          </tr>
          <tr>
            <td class="grayTD" style="height:15px">退货或寄样信息</td>
            <td style="height:15px" colspan="3"> 这一行要加v-show</td>
            <td class="grayTD" style="height:15px">邮寄备注信息</td>
            <td style="height:15px" colspan="2">{{}}</td>
          </tr>
          <tr>
            <td class="grayTD" style="font-size:20px;height:30px" colspan="7">
              玉兰处理结果
            </td>
          </tr>
          <tr>
            <td class="grayTD"  style="width:12%;height:15px">产品/项目</td>
            <td class="grayTD"  style="width:18%;height:15px">型号</td>
            <td class="grayTD"  style="width:10%;height:15px">单位</td>
            <td class="grayTD"  style="width:10%;height:15px">数量</td>
            <td class="grayTD"  style="width:10%;height:15px">金额</td>
            <td class="grayTD"  style="width:18%;height:15px">质量问题</td>
            <td class="grayTD"  style="width:22%;height:15px">处理意见</td>
          </tr>
          <tr>
            <td style="height:15px">{{}}</td>
            <td style="height:15px"></td>
            <td style="height:15px"></td>
            <td style="height:15px"></td>
            <td style="height:15px"></td>
            <td style="height:15px"></td>
            <td style="height:15px"></td>
          </tr>
          <tr>
            <td class="grayTD"  style="height:15px">金额小写</td>
            <td style="height:15px" colspan="2">{{}}</td>
            <td class="grayTD"  style="height:15px">金额大写</td>
            <td style="height:15px" colspan="3">{{}}</td>
          </tr>


          <tr>
            <td class="grayTD" colspan="1" style="height:16px">投诉类型</td>
            <td colspan="2" style="text-align:left;height:16px;">
              <el-select
                style="height:16px;width:100%;padding:0px 0px 0px 0px;"
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
            <td
              v-if="submit.TYPE == '丢失'"
              class="grayTD"
              colspan="3"
              style="height:20px"
            >
              <el-input
                v-model="submit.LOSED_QUANTITY"
                placeholder="（丢失数量）"
                clearable
                class="inputStyle"
              >
              </el-input>
            </td>
            <td
              v-if="submit.TYPE == '破损'"
              class="grayTD"
              colspan="3"
              style="height:16px"
            >
              <el-input
                v-model="submit.DAMAGED_QUANTITY"
                placeholder="（破损数量）"
                clearable
                class="inputStyle"
              >
              </el-input>
            </td>
            <td v-else class="grayTD" colspan="3" style="height:16px"></td>
          </tr>
           <tr style="height:90px">
            <td
              colspan="7"
              border="0px"
              style="font-size:13px;color:gray;text-align:left;"
            >
            <div style="margin:0 5px;">
               注意：1.若您未在我公司对您的《退货/赔偿申请书》提交处理意见之日起15日内确认、提出异议的，则视为放弃赔偿权利；<br />
               2.玉兰公司支付的退货金额，仅限于本《退货/赔偿申请书》的金额，不承担其他费用；<br />
               3.请您仔细阅读本《退货/赔偿申请书》相关信息，一旦确认，视为同意我公司的处理方案。<br />
               公司名称：广东玉兰集团股份有限公司&emsp; &emsp;&emsp;&emsp;地址：东莞市莞城莞龙路段狮龙路莞城科技园内<br />
               电话:0769-23321708&emsp;&emsp;邮政编码:523119&emsp;&emsp;邮箱：yulan315@yulangroup.cn<br />
            </div>
            </td>
          </tr>
          <tr  style="height:40px">
            <td 
              colspan="4"
              border="0px"
              style="font-size:13px;color:gray;text-align:center;">
            <div >
              广东玉兰集团股份有限公司<br />
              市场部<br />
              {{ new Date().getFullYear() }}年
              {{ new Date().getMonth() + 1}}月
              {{ new Date().getDate() }}日
            </div>
            </td>
            <td 
              colspan="3"
              border="0px"
              style="font-size:13px;color:gray;text-align:center;">
              <div>
              经销商
              <span
                >:{{ }}</span
              ><br />
              （盖章）<br />
              <span > 年 月 日</span>
              <!-- <span v-else>
                {{ new Date(baseData.REASSURE_TS).getFullYear() }}年
                {{
                  addZeroIfNeed(new Date(baseData.REASSURE_TS).getMonth() + 1)
                }}月
                {{ addZeroIfNeed(new Date(baseData.REASSURE_TS).getDate()) }}日
              </span> -->
            </div>
            </td>
          </tr>
        </table>

        <div style="text-align:center;margin-top:5px">           
          <el-button type="danger" size="mini" >保存修改</el-button>
          <el-button type="success" size="mini" @click="_addSubmit()">提交</el-button>  
          <el-button type="info"   size="mini" @click="_editSubmit()">返回</el-button>  
        </div> 
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Axios from "axios";
import { addSubmit } from "@/api/complaint";
import Cookies from "js-cookie";
import { getShipment } from "@/api/orderList";
import { getPackDetailInfo } from "@/api/orderListASP";
import { mapMutations, mapActions } from "vuex";
import { mapState } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      submit: [],
      complaintDetail: false,
      isAdd: false,
      RefundDetail:false,
      isRefundAdd:false,
      //itemNo: "", //产品型号
      //orderNo: "",
      //lineNo: "",
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
        }
      ]
    };
  },
  props: ["orderNo", "itemNo", "lineNo"],
  filters: {
    datatrans(value) {
      if (value == "9999/12/31 00:00:00") return "";
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
      // this.orderNo = this.$route.params.orderId;
      // this.itemNo = this.$route.params.itemNo;
      // this.lineNo = this.$route.params.lineNo;
      var data = {
        orderNo: this.orderNo,
        lineNo: this.lineNo,
        itemNo: this.itemNo
      };
      // Axios.post("/packDetail/getPackDetailAppoint.do", {
      //   itemNo: this.itemNo,
      //   orderId: this.orderNo,
      //   lineNo: this.lineNo
      // })
      getPackDetailInfo(data)
        .then(res => {
          this.tableData = res.data[0].packDetails;
          this.zongshuliang = res.data[0].allCount;
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
    //新建一条投诉记录
    addRecord(data) {
      (this.isAdd = true),
        (this.complaintDetail = true),
        (this.CNAME = Cookies.get("realName")), //客户名
        (this.submit = {
          SID: "", //投诉单id
          SALE_NO: "", //销售单号
          CUSTOMER_CODE: "", //客户编码
          SUBMITTS: "", //提交时间
          TYPE: "", //投诉类型
          MEMO: "", //备注——投诉内容
          OPERATOR: "", //处理人
          PROCESSTS: "", //处理时间
          PROCESSDESC: "", //处理结果——回复
          WLTS_THINK: "", //服务评价
          FEEDBACKTS: "", //评价时间
          STATUS: 1,
          TELEPHONE: "",
          IMGURL: "",
          LOSED_QUANTITY: "", //货物丢失数量
          DAMAGED_QUANTITY: "", //货物损坏数量
          C_TRANSBILL: "", //物流单号
          orderNo: "",
          itemNo: ""
        }),
        (this.submit.orderNo = this.orderNo);
      this.submit.itemNo = this.itemNo;
      this.submit.CUSTOMER_CODE = Cookies.get("companyId");
      this.submit.SALE_NO = data.SALE_NO;
      this.submit.C_TRANSBILL = data.TRANS_ID;
    },
    //新增投诉记录提交
    _addSubmit() {
      let data = this.submit;
      //判断是否填完所有信息
      if (
        this.submit.SALE_NO == "" ||
        this.submit.C_TRANSBILL == "" ||
        this.submit.TYPE == "" ||
        this.submit.MEMO == ""
      ) {
        this.$alert("请完善信息", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (this.submit.TYPE == "丢失") {
        this.submit.DAMAGED_QUANTITY = 0;
      }
      if (this.submit.TYPE == "破损") {
        this.submit.LOSED_QUANTITY = 0;
      }
      if (this.submit.TYPE != "破损" && this.submit.TYPE != "丢失") {
        this.submit.LOSED_QUANTITY = 0;
        this.submit.DAMAGED_QUANTITY = 0;
      }
      if (
        this.submit.DAMAGED_QUANTITY > this.zongshuliang ||
        this.submit.LOSED_QUANTITY > this.zongshuliang
      ) {
        this.$alert("填写数量必须小于下单数量", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (this.submit.DAMAGED_QUANTITY < 0 || this.submit.LOSED_QUANTITY < 0) {
        this.$alert("填写数量必须为非负数", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (
        this.submit.DAMAGED_QUANTITY == 0 &&
        this.submit.LOSED_QUANTITY == 0
      ) {
        this.$alert("请输入相应的货物数量", "提示", {
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
      this.complaintDetail = false;
    },
     //新建一条售后记录
    addRefundRecord(data) {
      this.isRefundAdd = true;
      this.RefundDetail = true;
      //   this.CNAME = Cookies.get("realName"); 
      //   this.submit = {
      //     SID: "", //投诉单id
      //     SALE_NO: "", //销售单号
      //     CUSTOMER_CODE: "", //客户编码
      //     SUBMITTS: "", //提交时间
      //     TYPE: "", //投诉类型
      //     MEMO: "", //备注——投诉内容
      //     OPERATOR: "", //处理人
      //     PROCESSTS: "", //处理时间
      //     PROCESSDESC: "", //处理结果——回复
      //     WLTS_THINK: "", //服务评价
      //     FEEDBACKTS: "", //评价时间
      //     STATUS: 1,
      //     TELEPHONE: "",
      //     IMGURL: "",
      //     LOSED_QUANTITY: "", //货物丢失数量
      //     DAMAGED_QUANTITY: "", //货物损坏数量
      //     C_TRANSBILL: "", //物流单号
      //     orderNo: "",
      //     itemNo: ""
      //   };
      // this.submit.orderNo = this.orderNo;
      // this.submit.itemNo = this.itemNo;
      // this.submit.CUSTOMER_CODE = Cookies.get("companyId");
      // this.submit.SALE_NO = data.SALE_NO;
      // this.submit.C_TRANSBILL = data.TRANS_ID;
    },
    //新增售后记录提交
    _addRefundSubmit() {
      let data = this.submit;
      //判断是否填完所有信息
      if (
        this.submit.SALE_NO == "" ||
        this.submit.C_TRANSBILL == "" ||
        this.submit.TYPE == "" ||
        this.submit.MEMO == ""
      ) {
        this.$alert("请完善信息", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (this.submit.TYPE == "丢失") {
        this.submit.DAMAGED_QUANTITY = 0;
      }
      if (this.submit.TYPE == "破损") {
        this.submit.LOSED_QUANTITY = 0;
      }
      if (this.submit.TYPE != "破损" && this.submit.TYPE != "丢失") {
        this.submit.LOSED_QUANTITY = 0;
        this.submit.DAMAGED_QUANTITY = 0;
      }
      if (
        this.submit.DAMAGED_QUANTITY > this.zongshuliang ||
        this.submit.LOSED_QUANTITY > this.zongshuliang
      ) {
        this.$alert("填写数量必须小于下单数量", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (this.submit.DAMAGED_QUANTITY < 0 || this.submit.LOSED_QUANTITY < 0) {
        this.$alert("填写数量必须为非负数", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (
        this.submit.DAMAGED_QUANTITY == 0 &&
        this.submit.LOSED_QUANTITY == 0
      ) {
        this.$alert("请输入相应的货物数量", "提示", {
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
      this.complaintDetail = false;
    },

    ...mapMutations("navTabs", ["addTab"]),
    ...mapActions("navTabs", ["closeTab", "closeToTab"])
  },
  activated: function() {
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
.inputStyle {
  border: 0;
  height: 95%;
  width: 100%;
  font-size: 16px;
  text-align: center;
}
.centerCard {
  margin: 0 auto;
  position: relative;
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

.table-c .el-input__inner {
  height: 19px;
  width: 100%;
  font-size: 16px;
  box-shadow: none;
  text-align: center;
}

.table-c .el-input__inner:hover {
  border-color: #e9e9e9;
}

.table-c .el-input__inner:focus {
  border-color: #42a5f5;
  box-shadow: none;
  transition-duration: 0.5s;
}

.table-c .el-input__inner::-webkit-input-placeholder {
  line-height: 19px;
}

.table-c .el-input__inner,
.el-checkbox__inner,
.el-textarea__inner,
.el-button {
  border-radius: 0 !important;
}
.table-c .el-input__icon {
  height: 100%;
  width: 22px;
  text-align: center;
  line-height: 22px;
}
.table-c .el-textarea__inner {
  height: 48px;
  display: block;
  resize: vertical;
  padding: 1px 1px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  font-size: inherit;
  background-image: none;
  border: 1px solid #dcdfe6;
  border-top-color: rgb(220, 223, 230);
  border-right-color: rgb(220, 223, 230);
  border-bottom-color: rgb(220, 223, 230);
  border-left-color: rgb(220, 223, 230);
  border-radius: 4px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>