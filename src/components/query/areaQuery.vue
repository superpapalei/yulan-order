<template>
  <div id="areaQuery">
    <el-card shadow="hover">
      <el-dialog
        title="对账单明细"
        :visible.sync="detailVisible"
        :close-on-click-modal="false"
        width="60%"
      >
        <div style="width:90% ;margin:0 auto;">
       <el-table
            height="500"
            :data="tableDetail"
           
            show-summary
            border
            style="width: 100%; margin:10px auto"
          >
            <el-table-column width="130" label="日期">
              <template slot-scope="scope1">
                <span>{{scope1.row.dateOutStock | datatrans}}</span>
              </template>
            </el-table-column>
            <el-table-column label="单据号" width="130">
              <template slot-scope="scope1">
                <!-- <span>{{scope1.row.saleNo}}</span> -->
                <el-button @click="openTHdia(scope1.row)" type="text">{{scope1.row.saleNo}}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="类别">
              <template slot-scope="scope1">
                <span>{{scope1.row.billNo}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="money" label="发货总额"></el-table-column>
            <el-table-column prop="qty" label="发货数量"></el-table-column>
            <el-table-column prop="freight" label="运费"></el-table-column>
            <el-table-column prop="gatherMoneyFax" label="收款金额"></el-table-column>
            <el-table-column label="加收物流费">
              <template slot-scope="scope1">
                <span>{{scope1.row.transFlag | NYchange}}</span>
              </template>
            </el-table-column>
          </el-table>
           </div>
      </el-dialog>

      <div class="ff"> 
        <el-tabs class="tabs_1"  v-model="activeName" style="width:1340px">
          <el-tab-pane label="区域提货单查询" name="first">
            <form
              target="TAB_2_CONTENT"
              action="queryBillList.jsp"
              method="POST"
              class="FORM_1"
              style="height:250px"
            >
              <div style="width:100%">
                <div style="width:40%;border:none;float:left">
                  市场
                  <el-select v-model= "AREACODE.AREA_NAME" placeholder="----选择市场----" style="width:210px"
                  @change="areaCode(AREACODE.AREA_NAME)"
                  >
                    <el-option
                      v-for="item in AREACODE"
                      :key="item.AREA_CODE"
                      :label="item.AREA_NAME"
                      :value="item.AREA_CODE"
                    >
                    </el-option>
                  </el-select>
                  片区
                  <el-select v-model= "AREA_DISTRICT.DISTRICT_NAME" placeholder="----选择片区----" style="width:210px"
                    @change="district_code(AREA_DISTRICT.DISTRICT_NAME)">
                    <el-option
                      v-for="item in AREA_DISTRICT"
                      :key="item.DISTRICT_ID"
                      :label="item.DISTRICT_NAME"
                      :value="item.DISTRICT_ID"
                    ></el-option>
                  </el-select>
                 
                  
                  <div style="margin-top:15px">日期
                    <el-date-picker
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="开始日期区间"
                      v-model="beginTime_1"
                      style="width:210px"
                    ></el-date-picker
                    >
                    <span style="margin-left:10px">--</span>
                    <el-date-picker
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="结束日期区间"
                      v-model="finishTime_1"
                      style="width:210px;margin-left:12px"
                    ></el-date-picker>
                  </div>
                  <div style="margin-top:15px">客户类型
                  <el-select v-model= "CUSTOMER_TYPE.label" placeholder="全部" style="width:180px"
                  @change="customer_type(CUSTOMER_TYPE.label)">
                    <el-option
                      v-for="item in CUSTOMER_TYPE"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select></div>
                  <div style="margin-top:15px">
                    <div>
                      <el-button type="#DCDFE6" icon="el-icon-s-grid" class="cx" @click="reset"
                        >重置</el-button
                      >
                      <el-button
                        type="#DCDFE6"
                        icon="el-icon-search"
                        class="cx"
                        @click="queryQuYu_1"
                        style="margin-left:65px"
                        >查询</el-button
                      >
                    </div>
                  </div>
                </div>

                <div id="right" style="float:right;margin-right:100px">
                  <el-transfer
                    :titles="['可选用户', '已选用户']"
                    style="height:240px;width:700px"
                    filterable
                    filter-placeholder="筛选"
                    v-model="value_4"
                    :data="customerData"
                    :props= "{
                      key:'CUSTOMER_CODE',
                      label:'CUSTOMER_NAME',
                      }"
                  >
                  </el-transfer>
                </div>
              </div>  
            </form> 
            <hr />
        <div  v-if="query_1">
        <el-table
         :summary-method="getSummaries"
         show-summary
          :data="tableData"
          border
          highlight-current-row
          style="width: 100%"
          class="table_1"
         
        >
          <el-table-column prop="num" label width="80" align="center">
            <template scope="scope"><span>{{scope.$index+(currentPage - 1) * limit + 1}} </span></template>
          </el-table-column>
          <el-table-column label="提货单号" width="120" align="center">
            <template slot-scope="scope1">
              <el-button
               @click="openDia(scope1.row)"
                type="text"
                >{{ scope1.row.SALE_NO }}</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="ZT" label="状态"  align="center" width="80"></el-table-column>
          <el-table-column prop="WEB_ORDER_NO" label="订单号"  align="center"></el-table-column>
          <el-table-column prop="HTH" label="合同号"  align="center"></el-table-column>
          <el-table-column prop="ACCOUT_TYPE" label="类型" width="50" align="center"></el-table-column>
          <el-table-column prop="ACCOUNT_MONTH" label="开单日期"  align="center"></el-table-column>
          <el-table-column prop="DATE_OUT_STOCK" label="提货日期" width="180" align="center"></el-table-column>
          <el-table-column prop="CUSTOMER_NAME" label="客户名称" align="center" width="250"></el-table-column>
          <el-table-column prop="MONEY" label="金额" width="100" align="center"></el-table-column>
          <el-table-column prop="MANAGER" label="物流管理员" align="center" width="100"></el-table-column>
        </el-table>
        <!-- 分页 -->
      <div style="margin:0 40%;" class="block">
        <el-pagination
        @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="limit"
          layout="prev, pager, next, jumper"
          :total="count"
        ></el-pagination>
      </div>
        </div>
          </el-tab-pane>
        </el-tabs>

        
      </div>
      
    </el-card>
  </div>
</template>

<script>
import {
  checkBill,
  billDetail,
  userReturn,
  queryCash,
  statementDetail
} from "@/api/orderList";
import { mapMutations, mapActions } from "vuex";
import { mapState } from "vuex";
import {
  getAreaCode,
  getDistrictByAreaCode,
  getCustomerByAreaCode,
  getPackDetails,
} from "@/api/areaInfoASP";
import Cookies from "js-cookie";
export default {
  name: "AreaQuery",
  data() {
    return {
      detailVisible: false,
      check_CURTAIN_STATUS_ID: "",
      isManager: Cookies.get("isManager"),
      innercount:100,
      startDate:"",
      endDate:"",
      tableDetail: [],
      theBody: {},
      status:"已提交",
      first:"",
      second:"",
       activeName: "first",
      query_1:false,//查询显示
      query_2:false,
      value_3:"",//客户类型初始值
      customerData:[],
      limit: 8,
      count: 0,
      currentPage: 1,
      value_4: [],//已选用户初始值
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: "",
      value2: "",
      beginTime_1: "",//区域提货单查询
      finishTime_1: "",
      AREA_DISTRICT: [
        // {
        //   value: "04",
        //   label: "内蒙古自治区"
        // },
        // {
        //   value: "05",
        //   label: "辽宁省"
        // },
        // {
        //   value: "06",
        //   label: "吉林省"
        // },
        // {
        //   value: "07",
        //   label: "黑龙江省"
        // },
        // {
        //   value: "09",
        //   label: "浙江省"
        // },
        // {
        //   value: "10",
        //   label: "安徽省"
        // },
        // {
        //   value: "11",
        //   label: "福建省"
        // },
        // {
        //   value: "12",
        //   label: "江西省"
        // },
        // {
        //   value: "13",
        //   label: "山东省"
        // },
        // {
        //   value: "14",
        //   label: "河南省"
        // },
        // {
        //   value: "15",
        //   label: "湖北省"
        // },
        // {
        //   value: "16",
        //   label: "湖南省"
        // },
        // {
        //   value: "17",
        //   label: "广西壮族自治区"
        // },
        // {
        //   value: "18",
        //   label: "海南省"
        // },
        // {
        //   value: "20",
        //   label: "贵州省"
        // },
        // {
        //   value: "21",
        //   label: "云南省"
        // },
        // {
        //   value: "23",
        //   label: "陕西省"
        // },
        // {
        //   value: "24",
        //   label: "甘肃省"
        // },
        // {
        //   value: "25",
        //   label: "宁夏回族自治区"
        // },
        // {
        //   value: "26",
        //   label: "青海省"
        // },
        // {
        //   value: "27",
        //   label: "新疆维吾尔自治区"
        // },
        // {
        //   value: "28",
        //   label: "其他（工厂）"
        // },
        // {
        //   value: "51",
        //   label: "成都市"
        // },
        // {
        //   value: "49",
        //   label: "电商"
        // },
        // {
        //   value: "48",
        //   label: "直营"
        // },
        // {
        //   value: "52",
        //   label: "陕北"
        // },
        // {
        //   value: "55",
        //   label: "深圳（东莞以东）"
        // },
        // {
        //   value: "56",
        //   label: "广东（东莞以西）"
        // },
        // {
        //   value: "36",
        //   label: "浙南"
        // },
        // {
        //   value: "42",
        //   label: "江苏其他"
        // },
        // {
        //   value: "46",
        //   label: "东莞"
        // },
        // {
        //   value: "44",
        //   label: "豫南"
        // },
        // {
        //   value: "41",
        //   label: "鲁西南"
        // },
        // {
        //   value: "45",
        //   label: "川北"
        // },
        // {
        //   value: "35",
        //   label: "苏南"
        // },
        // {
        //   value: "38",
        //   label: "鄂西"
        // },
        // {
        //   value: "40",
        //   label: "辽西南"
        // },
        // {
        //   value: "43",
        //   label: "川南"
        // },
        // {
        //   value: "30",
        //   label: "北京市"
        // },
        // {
        //   value: "31",
        //   label: "天津市"
        // },
        // {
        //   value: "32",
        //   label: "上海市"
        // },
        // {
        //   value: "33",
        //   label: "重庆市"
        // },
        // {
        //   value: "02",
        //   label: "河北省"
        // },
        // {
        //   value: "03",
        //   label: "山西省"
        // }
      ],
      customer_main: [
        {
          value: "1",
          label: "长虹电视"
        },
        {
          value: "2",
          label: "长虹空调"
        },
        {
          value: "3",
          label: "生活家"
        }
      ],
      CUSTOMER_TYPE: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "notspeciality",
          label: "非专业市场客户"
        },
        {
          value: "speciality",
          label: "专业市场客户"
        }
      ],

      AREACODE: [
        // {
        //   value: "C000",
        //   label: "国内市场"
        // },
        // {
        //   value: "C031",
        //   label: "北京办事处"
        // },
        // {
        //   value: "C032",
        //   label: "太原办事处"
        // },
        // {
        //   value: "C033",
        //   label: "上海办事处"
        // },
        // {
        //   value: "C034",
        //   label: "南京办事处"
        // },
        // {
        //   value: "C035",
        //   label: "杭州办事处"
        // },
        // {
        //   value: "C036",
        //   label: "广州办事处"
        // },
        // {
        //   value: "C037",
        //   label: "南宁办事处"
        // },
        // {
        //   value: "C038",
        //   label: "成都办事处"
        // },
        // {
        //   value: "C039",
        //   label: "重庆办事处"
        // },
        // {
        //   value: "C040",
        //   label: "郑州办事处"
        // },
        // {
        //   value: "C041",
        //   label: "济南办事处"
        // },
        // {
        //   value: "C042",
        //   label: "沈阳办事处"
        // },
        // {
        //   value: "C043",
        //   label: "长春办事处"
        // },
        // {
        //   value: "C044",
        //   label: "兰州办事处"
        // },
        // {
        //   value: "C045",
        //   label: "西安办事处"
        // },
        // {
        //   value: "C046",
        //   label: "长沙办事处"
        // },
        // {
        //   value: "C047",
        //   label: "武汉办事处"
        // },
        // {
        //   value: "C048",
        //   label: "福州办事处"
        // },
        // {
        //   value: "C049",
        //   label: "深圳办事处"
        // },
        // {
        //   value: "C050",
        //   label: "电商直营部"
        // },
        // {
        //   value: "C051",
        //   label: "本厂部门"
        // },
        // {
        //   value: "C053",
        //   label: "南昌办事处"
        // },
        // {
        //   value: "C054",
        //   label: "石家庄办事处"
        // },
        // {
        //   value: "C055",
        //   label: "呼和浩特办事处"
        // },
        // {
        //   value: "C056",
        //   label: "合肥办事处"
        // },
        // {
        //   value: "C057",
        //   label: "昆明办事处"
        // },
        // {
        //   value: "C058",
        //   label: "贵阳办事处"
        // },
        // {
        //   value: "F000",
        //   label: "国际市场"
        // },
        // {
        //   value: "F001",
        //   label: "东南亚"
        // },
        // {
        //   value: "F002",
        //   label: "中东"
        // },
        // {
        //   value: "F003",
        //   label: "中东直销"
        // },
        // {
        //   value: "F004",
        //   label: "东亚"
        // },
        // {
        //   value: "F005",
        //   label: "独联体"
        // },
        // {
        //   value: "F006",
        //   label: "港澳"
        // },
        // {
        //   value: "F007",
        //   label: "边贸"
        // },
        // {
        //   value: "F008",
        //   label: "非洲"
        // },
        // {
        //   value: "F009",
        //   label: "拉美"
        // },
        // {
        //   value: "F010",
        //   label: "欧州"
        // },
        // {
        //   value: "F012",
        //   label: "美洲"
        // },
        // {
        //   value: "F013",
        //   label: "南亚"
        // },
        // {
        //   value: "F014",
        //   label: "台湾"
        // },
        // {
        //   value: "F110",
        //   label: "北美洲"
        // },
        // {
        //   value: "F111",
        //   label: "伊朗"
        // }
      ],

      tableData: [
        // {
        //   num: "1",
        //   THDD: "",
        //   ZT: "",
        //   DDH: "",
        //   LX: "",
        //   KDRQ: "",
        //   THRQ: "",
        //   KHMC: "",
        //   JE: "",
        //   XSZG: "",
        //   XSBM: "",
        //   WL: "",
        //   GC: ""
        // },
        // {
        //   num: "2",
        //   THDD: "",
        //   ZT: "",
        //   DDH: "",
        //   LX: "",
        //   KDRQ: "",
        //   THRQ: "",
        //   KHMC: "",
        //   JE: "",
        //   XSZG: "",
        //   XSBM: "",
        //   WL: "",
        //   GC: ""
        // },
        // {
        //   num: "3",
        //   THDD: "",
        //   ZT: "",
        //   DDH: "",
        //   LX: "",
        //   KDRQ: "",
        //   THRQ: "",
        //   KHMC: "",
        //   JE: "",
        //   XSZG: "",
        //   XSBM: "",
        //   WL: "",
        //   GC: ""
        // },
        // {
        //   num: "4",
        //   THDD: "",
        //   ZT: "",
        //   DDH: "",
        //   LX: "",
        //   KDRQ: "",
        //   THRQ: "",
        //   KHMC: "",
        //   JE: "",
        //   XSZG: "",
        //   XSBM: "",
        //   WL: "",
        //   GC: ""
        // },
        // {
        //   num: "5",
        //   THDD: "",
        //   ZT: "",
        //   DDH: "",
        //   LX: "",
        //   KDRQ: "",
        //   THRQ: "",
        //   KHMC: "",
        //   JE: "",
        //   XSZG: "",
        //   XSBM: "",
        //   WL: "",
        //   GC: ""
        // },
       
        // {
        //   num: "",
        //   THDD: "",
        //   ZT: "",
        //   DDH: "",
        //   LX: "",
        //   KDRQ: "",
        //   THRQ: "",
        //   KHMC: "页面汇总",
        //   JE: "0.00",
        //   XSZG: "",
        //   XSBM: "",
        //   WL: "",
        //   GC: ""
        // },
        // {
        //   num: "",
        //   THDD: "",
        //   ZT: "",
        //   DDH: "",
        //   LX: "",
        //   KDRQ: "",
        //   THRQ: "",
        //   KHMC: "总金额",
        //   JE: "0.00",
        //   XSZG: "",
        //   XSBM: "",
        //   WL: "",
        //   GC: ""
        // }
      ]
    };
  },
  //生命周期
  created() {
    this._getAreaCode();
    this.check_CURTAIN_STATUS_ID = Cookies.get("CURTAIN_STATUS_ID");
    this.check_STATUS_ID = Cookies.get("status_ID");
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
  
  methods: {
    
    //根据用户查区域市场
    _getAreaCode(){
      this.AREACODE= [];
      var userInfo = JSON.parse(Cookies.get("userInfo"));
      var data = {
        userid:userInfo.loginName
      }
      getAreaCode(data).then(res => {
          this.AREACODE = res.data;
        //console.log(this.stockIds)
      }).catch((res)=>{
              console.log(res)
      })

    },
    //根据市场区域查片区
    areaCode(val){          //点击选择市场事件
          var data = {
            areaCode:val
          }
          this.first = val
          getDistrictByAreaCode(data).then(res =>{
            this.AREA_DISTRICT = res.data
          })
         this._getCustomerByAreaCode_1(val);
       
      },
      //根据市场和片区查可选用户
    district_code(val){
      this.second = val
         var data = {
           areaCode:this.first,
            AREA_DISTRICT:val
         }
         this._getCustomerByAreaCode_2(data);
      },
//根据市场，片区，客户类型查可选用户
customer_type(val){
var data = {
           areaCode:this.first,
            district:this.second,
          customerType:val
         }
         this._getCustomerByAreaCode_3(data);
},
    //通过区域查询可选用户
    _getCustomerByAreaCode_1(val) {
      this.customerData=[]
      var data = {
        areaCode:val,//市场
        district:this.AREA_DISTRICT,//片区
        customerType:this.customer_type,//客户类型
      };
      getCustomerByAreaCode(data).then(res => {
        this.customerData = res.data
      })       
    },
    _getCustomerByAreaCode_2(val) {
      this.customerData=[]
      var data = {
        areaCode:val.areaCode,//市场
        district:val.AREA_DISTRICT,//片区
        customerType:this.customer_type,//客户类型
      };
      getCustomerByAreaCode(data).then(res => {
        this.customerData = res.data
      })       
    },
    _getCustomerByAreaCode_3(val) {
      this.customerData=[]
      var data = {
        areaCode:val.areaCode,//市场
        district:val.district,//片区
        customerType:val.customerType,//客户类型
      };
      getCustomerByAreaCode(data).then(res => {
        this.customerData = res.data
      })       
    },
    queryQuYu_1() {      //提货单查询
      this.query_1 = true
      this.tableData = []
      var data = {
        costomerCodes:this.value_4,//已选用户
         beginTime: this.beginTime_1, //起始时间
        finishTime: this.finishTime_1, //结束时间
        limit: this.limit, //限制数
        page: this.currentPage //页数
      }
      if (!data.beginTime) {
        data.beginTime = "0001/1/1";
      }
      if (!data.finishTime) {
        data.finishTime = "9999/12/31";
      } else {
        data.finishTime = data.finishTime + " 23:59:59";
      }
      getPackDetails(data).then(res => {
        this.count = res.count;
        this.tableData = res.data
      })       
      // this.$router.push("/QYTable");
    },
    //计算表格末行
    getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }else if(index == 9){
            var values = data.map(item => Number(item[column.property])); 
            if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } 
          }
         else {
            sums[index] = '';
          }
        });
        return sums;
      },

    //翻页获取订单
    handleCurrentChange(val) {
      this.currentPage = val;
      this.bankData = [];
      this.queryQuYu_1();
    },  
    //重置
    reset(){
      this.customerData=[]
      this.beginTime_1=""
      this.finishTime_1=""
      this.value_4=[]
      this.tableData=[]
      this.AREA_DISTRICT=[]
      this.CUSTOMER_TYPE=[]
      this._getAreaCode();
    },
    //打开弹窗渲染详情数据
    openDia(tab) {
      if (tab.customerCheckState != "待确认") {
        this.showButton = false;
      } else {
        this.showButton = true;
      }
      this.theBody = tab;
      this.getBillDetail();
      //this.detailVisible= true;
    },
        //获取对账详情
    getBillDetail() {
      let url = "/customerBalance/getCustomerBalancePeriodDetailInfo.do";
      let data = {
        cid: Cookies.get("cid"),
        startDate: this.beginTime_1, //开始日期
        endDate: this.finishTime_1, //结束日期
        limit: 999, //10,
        page: 1 //this.innerCurrentPage
      };
      if (!data.beginTime) {
        data.beginTime = "0001/1/1";
      }
      if (!data.finishTime) {
        data.finishTime = "9999/12/31";
      } else {
        data.finishTime = data.finishTime + " 23:59:59";
      }
      billDetail(url, data).then(res => {
        console.log(res);
        this.tableDetail = res.customerBalancePeriodDetailList;
        this.innercount = res.customerBalancePeriodDetailList.length
          ? res.customerBalancePeriodDetailList[0].total
          : 0;
        this.detailVisible = true;
      });
    }, 
  }
};
</script>



<style scoped>

.gx {
  background: #8bc34a;
  color: rgb(255, 255, 255);
}

.CONDITION_DIV_TABLE2 {
  height: 100px;
}

.cz {
  text-align: center;
}
.cx {
  background: #8bc34a;
  color: rgb(255, 255, 255);
}
.jiange {
  margin-left: 10px;
}
.NEWUI_BUTTON_0 {
  padding: 0.5em;
}
.CONDITION_DIV {
  margin-left: 10px;
  height: 250px;
  background: rgb(255, 255, 255);
}
.CUSTOMERLISTSELECT {
  color: #000;
}
.SELECTEDCUSTOMERCODE {
  width: 350px;
}
.CUSTOMER_CODE {
  width: 430px;
  margin-left: 500px;
  margin-top: -85px;
}
.OPTION0 {
  background: rgb(209, 243, 200);
}

.cx_2 {
  margin-left: 10px;
  background: #8bc34a;
  color: rgb(255, 255, 255);
}
</style>