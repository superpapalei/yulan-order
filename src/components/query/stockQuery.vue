<template>
  <div id="stockQuery">
    <el-card shadow="hover">
      <div class="dormitory">
        <table class="header">
          <tr class="searchWord">
            <td class="cplx">产品类型</td>
            <td class="xuanze">
              <el-select v-model="productType" placeholder="全部">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
            <td>产品型号</td>
            <td>
              <el-input
                size="10"
                v-model="search"
                placeholder="请输入内容"
              ></el-input>
            </td>

            <td>
              <el-button
                @keyup.enter.native="search()"
                class="NEWUI_BUTTON_1"
                type="primary"
                icon="el-icon-search"
                @click="StockQuery"
                >查询</el-button
              >
            </td>
            <td>
              <el-button
                class="NEWUI_BUTTON_1"
                type="primary"
                icon="el-icon-back"
                @click="clear"
                >清空</el-button
              >
            </td>
          </tr>
        </table>

        <!--  遍历表格 -->
        <table>
          <td class="dormitoryData" style="width:40%;min-width:510px">
            <div class="BK_1">
              <el-table
                ref="dormitoryTable"
                :data="tables"
                tooltip-effect="dark"
                stripe
                class="table_2"
                max-height="500"
                @row-click="KC_CP_SC"
                border
              >
                <el-table-column
                  prop="ITEM_NO"
                  label="型号"
                  width="250"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="OLD_ITEM_NO"
                  label="版样型号"
                  width="250"
                  align="center"
                ></el-table-column>
              </el-table>
            </div>
            <!-- 分页 -->
            <div style="margin:0 25%;" class="block">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="limit"
                layout="prev, pager, next, jumper"
                :total="count"
              ></el-pagination>
            </div>
          </td>
          <td>
            <div class="BK_2" style="width:100%">
              <el-card class="DETAIL_1">
                <div slot="header" class="clearfix">
                  <span class="CARD">库存信息：</span>
                </div>
                <div style="height:182px;">
                  <h1 v-show="stockInfo">
                    <TR>
                      <td colspan="6">
                        <el-table
                          width="100%"
                          :data="stockInfo_1"
                          max-height="200"
                        >
                          <el-table-column
                            prop="BATCH_NO"
                            label="批号"
                            align="center"
                            width="300"
                          ></el-table-column>
                          <el-table-column
                            prop="AREA"
                            label="区"
                            align="center"
                            width="100"
                          ></el-table-column>
                          <el-table-column
                            prop="SEAT"
                            label="位"
                            align="center"
                            width="100"
                          ></el-table-column>
                          <el-table-column
                            prop="BOX"
                            label="箱"
                            align="center"
                            width="100"
                          ></el-table-column>
                          <el-table-column
                            prop="QTY"
                            label="可分配量"
                            align="center"
                            width="150"
                          ></el-table-column>
                        </el-table>
                      </td>
                    </TR>
                  </h1>
                  <span v-show="empty"> </span>
                </div>
              </el-card>

              <el-card class="DETAIL_2">
                <div slot="header" class="clearfix">
                  <span class="CARD">产品信息：</span>
                </div>
                <div style="height:200px;">
                  <h1 v-show="stockInfo">
                    <table width="100%" border="1" cellspacing="0">
                      <tr>
                        <td class="CPXXBJYS">型号</td>
                        <td style="width:100px">{{ dormitory.ITEM_NO }}</td>
                        <td rowspan="7" width="30px"></td>
                        <td class="CPXXBJYS">墙纸规格</td>
                        <td width="50px">{{ dormitory.PRODUCT_PAPER_ID }}</td>
                        <td class="CPXXBJYS">毛重（kg）</td>
                        <td width="50px">{{ dormitory.GROSS }}</td>
                      </tr>
                      <tr>
                        <td class="CPXXBJYS">样版型号</td>
                        <td>{{ dormitory.OLD_ITEM_NO }}</td>
                        <td class="CPXXBJYS">墙纸基材</td>
                        <td width="50px">{{ dormitory.TONGMO_TYPE }}</td>
                        <td class="CPXXBJYS">净重（kg）</td>
                        <td width="50px">{{ dormitory.NET_WEIGHT }}</td>
                      </tr>
                      <tr>
                        <td class="CPXXBJYS">产品类别</td>
                        <td width="50px">
                          {{ dormitory.PRODUCT_TYPE | transType }}
                        </td>
                        <td class="CPXXBJYS">墙纸功能</td>
                        <td width="50px">{{ dormitory.MARK_TYPE }}</td>
                        <td class="CPXXBJYS">拼花</td>
                        <td width="50px">{{ dormitory.DUIPIN }}</td>
                      </tr>
                      <tr>
                        <td class="CPXXBJYS">品牌</td>
                        <td width="50px">{{ dormitory.PRODUCT_BRAND }}</td>
                        <td class="CPXXBJYS">长度（mm）</td>
                        <td width="50px">{{ dormitory.LENGTH }}</td>
                        <td class="CPXXBJYS">拼花尺寸</td>
                        <td width="50px">{{ dormitory.DUIPIN_SIZE }}</td>
                      </tr>
                      <tr>
                        <td class="CPXXBJYS">最新版本号</td>
                        <td width="50px">
                          {{ dormitory.PRODUCTVERSION_NAME }}
                        </td>
                        <td class="CPXXBJYS">宽度（mm）</td>
                        <td width="50px">{{ dormitory.WIDTH }}</td>
                        <td class="CPXXBJYS">图案</td>
                        <td width="50px">{{ dormitory.PATTERN }}</td>
                      </tr>
                      <tr>
                        <td class="CPXXBJYS">自产代理</td>
                        <td width="50px">代理</td>
                        <td class="CPXXBJYS">规格</td>
                        <td width="50px">{{ dormitory.GRADE }}</td>
                        <td class="CPXXBJYS">颜色</td>
                        <td width="50px">{{ dormitory.COLOUR }}</td>
                      </tr>
                      <tr>
                        <td class="CPXXBJYS">计量单位</td>
                        <td width="50px">{{ dormitory.UNIT }}</td>
                        <td class="CPXXBJYS">纸箱规格</td>
                        <td width="50px">{{ dormitory.BOX_TYPE }}</td>
                        <td class="CPXXBJYS">风格</td>
                        <td width="50px">{{ dormitory.STYLE }}</td>
                      </tr>
                      <tr>
                        <td class="CPXXBJYS">备注</td>
                        <td colspan="6"></td>
                      </tr>
                    </table>
                  </h1>
                  <span v-show="empty"> </span>
                </div>
              </el-card>
            </div>
          </td>
        </table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import { mapState } from "vuex";
import {
  GetItemByProductType,
  GetStockByUser,
  GetStockByItemNo
} from "@/api/itemInfoASP";
import Cookies from "js-cookie";
const Head = "http://14.29.223.114:10250/upload";
const Quest = "http://14.29.223.114:10250/yulan-capital";
export default {
  name: "StockQuery",
  // name:ItemKey,
  // text1:'',
  data() {
    return {
      //产品类型
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "W",
          label: "墙纸"
        },
        {
          value: "G",
          label: "墙纸/布胶"
        },
        {
          value: "P",
          label: "墙纸粉"
        },
        {
          value: "T",
          label: "其他"
        },
        {
          value: "C",
          label: "代理墙布"
        },
        {
          value: "V",
          label: "版本"
        },
        {
          value: "BY",
          label: "布艺"
        },
        {
          value: "H",
          label: "代理墙纸"
        },
        {
          value: "DY",
          label: "打样"
        },
        {
          value: "F",
          label: "宽幅墙布"
        },
        {
          value: "J",
          label: "基膜"
        },
        {
          value: "A",
          label: "宽幅墙纸"
        },
        {
          value: "E",
          label: "无纺墙布"
        },
        {
          value: "AV",
          label: "宽幅无纺墙纸"
        },
        {
          value: "K",
          label: "广告产品"
        }
      ],

      stockInfo_1: [], //库存信息
      stockIds: "",
      productType: "", //产品类型查询初始值
      dormitory: [], //查询到的数据
      search: "", //搜索产品型号
      tables: [], //初始表格为空
      stockInfo: false, //库存信息显示
      empty: true, //库存信息为空
      limit: 15,
      count: 0,
      currentPage: 1,
      aletMsg: "未获取库存权限",
      displayStsates: "none"
    };
  },
  //生命周期
  created() {
    this._GetStockByUser();
  },
  filters: {
    transType(value) {
      switch (value) {
        case "0":
          return "全部";
          break;
        case "W":
          return "墙纸";
          break;
        case "G":
          return "墙纸/布胶";
        case "P":
          return "墙纸粉";
        case "T":
          return "其他";
        case "C":
          return "代理墙布";
        case "V":
          return "版本";
        case "BY":
          return "布艺";
        case "H":
          return "代理墙纸";
        case "DY":
          return "打样";
        case "F":
          return "宽幅墙布";
        case "J":
          return "基膜";
        case "A":
          return "宽幅墙纸";
        case "E":
          return "无纺墙布";
        case "AV":
          return "宽幅无纺墙纸";
        case "K":
          return "广告商品";
          break;
      }
    }
  },
  methods: {
    //用户权限
    _GetStockByUser() {
      this.stockIds = [];
      var userInfo = JSON.parse(Cookies.get("userInfo"));
      var data = {
        userid: userInfo.userId
      };
      GetStockByUser(data).then(res => {
        for (var i = 0; i < res.data.length; i++) {
          this.stockIds.push(res.data[i].STOCK_NO);
        }
        console.log(this.stockIds);
      });
      //判断库存权限
      if (this.stockIds === "") {
        this.displayStsates = "block";
        this.aletMsg = msg;
        window.setTimeout(() => {
          this.displayStsates = "none";
        }, 2000);
        this.alertDia(aletMsg);
      }
    },

    //查询
    StockQuery() {
      var data = {
        productType: this.productType, //产品类型
        //itemNo:this.search.toUpperCase(),//产品型号
        limit: this.limit, //限制数
        page: this.currentPage, //页数
        stockIds: this.stockIds, //仓库号
        find: this.search
      };

      GetItemByProductType(data)
        .then(res => {
          this.count = res.count;
          this.tables = res.data;
          // this.tables.itemNo = res.data.itemNo;
          // this.tables.OLD_ITEM_NO = res.data.OLD_ITEM_NO;
        })
        .catch(res => {
          console.log(res);
        });
      // this.tables = this.dormitory.filter(tables => {
      //   return tables.XH.match(this.search);
      // });
    },
    //清空
    clear() {
      this.value = "0";
      this.search = "";
      this.tables = [];
      this.dormitory = [];
      this.stockInfo = false; //库存信息显示
      this.empty = true; //库存信息为空
    },
    //点击行的事件
    KC_CP_SC(val) {
      this.stockInfo = true; //库存信息显示
      this.empty = false; //库存信息为空
      var data_1 = {
        itemNo: val.ITEM_NO,
        stock_no: this.stockIds
      };
      //按行查询库存
      GetStockByItemNo(data_1, { loading: false })
        .then(res => {
          this.stockInfo_1 = res.data;
        })
        .catch(res => {
          console.log(res);
        });

      //获取数据
      let data = {
        ITEM_NO: val.ITEM_NO, //型号
        OLD_ITEM_NO: val.OLD_ITEM_NO, //样本型号
        PRODUCTVERSION_NAME: val.PRODUCTVERSION_NAME, //版本号
        PRODUCT_TYPE: val.PRODUCT_TYPE, //产品类别
        BOX_TYPE: val.BOX_TYPE, //纸箱规格
        GRADE: val.GRADE, //规格
        DUIPIN_SIZE: val.DUIPIN_SIZE, //拼花尺寸
        LENGTH: val.LENGTH, //长度
        WIDTH: val.WIDTH, //宽度
        GROSS: val.GROSS, //毛重
        PRODUCT_BRAND: val.PRODUCT_BRAND, //品牌
        PRODUCT_PAPER_ID: val.PRODUCT_PAPER_ID, //墙纸规格
        TONGMO_TYPE: val.TONGMO_TYPE, //墙纸基材
        NET_WEIGHT: val.NET_WEIGHT, //净重
        MARK_TYPE: val.MARK_TYPE, //墙纸功能
        DUIPIN: val.DUIPIN, //拼花类型
        PATTERN: val.PATTERN, //图案
        COLOUR: val.COLOUR, //颜色
        UNIT: val.UNIT, //单位
        STYLE: val.STYLE //风格
      };
      this.dormitory = data; //数据集合
    },
    //翻页获取订单
    handleCurrentChange(val) {
      this.currentPage = val;
      this.bankData = [];
      this.StockQuery();
    }
  }
};
</script>

<style scoped>
.CPXXBJYS {
  background: #d5ecb8;
}
.BK_1 {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 1px 5px 5px;
}
.BK_2 {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 2px 1px;
}

/* .STOCKSET{
  margin-left: 160px;
} */
/* .dd {
  margin-top: 3px;
} */

.clearfix {
  height: 13px;
}
.NEWUI_BUTTON_1 {
  width: 90px;
  background: #8bc34a;
  margin-left: 10px;
  color: rgb(255, 255, 255);
}

.searchWord {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
}

.CONDITION_DIV {
  height: 40px;
  margin-top: 10px;
  margin-left: 20px;
}
#productType {
  height: 30px;
  width: 150px;
  margin-right: 20px;
}
#ItemKey {
  width: 150px;
  height: 23px;
  margin-right: 30px;
}

td {
  text-align: center;
}
</style>