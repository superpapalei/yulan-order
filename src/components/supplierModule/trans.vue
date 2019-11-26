<template>
  <div>
    <el-card shadow="hover">
      <div id="trans" class="lanJuport">
        <div class="block">
          <div class="first_1">
              <el-input
                  @keyup.enter.native="SelectClick()"
                  prefix-icon="el-icon-search"
                  style="width:6%; min-width:200px;padding:200"
                  placeholder=" 原始单号:（精确）"
                  v-model="po"
                >
                </el-input>
               <!-- 采购单号：（精确）
            <el-input
           @keyup.enter.native="SelectClick()"
           prefix-icon="el-icon-search"
           style="width:10%; min-width:200px;"
           v-model="po">
          </el-input> -->
          <span class="demonstration"></span>
          <el-date-picker
             v-model="date1"
            align="right"
            type="date"
             format="yyyy-MM-dd"
             value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
          <span class="demonstration">至</span>
          <el-date-picker
            v-model="date2"
            align="right"
            type="date"
             format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
          <el-button :id="'test111'" @click="autoSearch()" size="small" icon="el-icon-search" style="margin-left:8px" class="button_2">搜索</el-button>
         <el-button @click="downLoadAll()" size="small" style="margin-left:8px" class="button_2">下载Excel</el-button>
            </div>
            <hr>
          <el-table
            :data="tableData"
       :span-method="arraySpanMethod"
            style="width: 100%"
          >
            <el-table-column
              prop="TRANS_NO"
              label="单据号"
              
              align="center"
            ></el-table-column>
            <el-table-column
              prop="BILL_NO"
              label="原始单号"
             
              align="center"
            ></el-table-column>
            <el-table-column
              prop="ITEM_NO"
              label="型号"
              
              align="center"
            ></el-table-column>
            <el-table-column
              prop="BATCH_NO"
              label="批号"
              
              align="center"
            ></el-table-column>
            <el-table-column
              prop="QTY_TRANS"
              label="实际数量"
              
              align="center"
            ></el-table-column>
            <el-table-column
              prop="UNIT_PRICE"
              label="含税单价"
              
              align="center"
            >
           <template slot-scope="scope">
                  <span>{{ scope.row.UNIT_PRICE | numFilter }}</span>
                </template>
            </el-table-column>
            <el-table-column
              prop="SUM_PRICE_TAX"
              label="含税总价"
              
              align="center"
            ></el-table-column>
            <el-table-column
              
              label="开单日期"
              
              align="center"
            >
             <template slot-scope="scope">
                  <span>{{ scope.row.DATE_LIST | datatrans }}</span>
                </template>
            </el-table-column>
          </el-table>
        </div>
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
      </div>
    </el-card>
  </div>
</template>

<script>
import { GetTransDetail } from "@/api/supplierASP";
import { downLoadFile } from "@/common/js/downLoadFile";
import Cookies from "js-cookie";
export default {
  name: "trans",
  data() {
    return {
      cid: Cookies.get("cid"),
      companyId: Cookies.get("companyId"),
      // companyId: Cookies.get("cid"),
      currentPage: 1,
      limit: 15,
      count: 0,
      tableData:[],
      arr_index: [],
      arr_span: [],
      arr_index0: [],
      arr_span0: [],
      date1: this.getCurrentWeek(),
      date2: new Date(),
      activeName: "third",
      po:"",
    };
  },

  created() {
    this.date1=this.getCurrentWeek();
     this.date2 = new Date();
    //this.autoSearch();

  },
  methods: {
      datatransMethod(value) {
      //时间戳转化大法
      if (value == null||value=="") {
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
     getEndtime(value){
    var endTime=new Date(value);
    endTime.setHours(23,59,59);
    var  date = this.datatransMethod(endTime);
    return date;
    },
     //获取最近半年时间
    getPastThreeMon() {
      var curDate=(new Date()).getTime();
      var halfYear=90 *24*3600*1000;
      var pastResult=curDate-halfYear;
      var pastDate=new Date(pastResult);
      var pastYear=pastDate.getFullYear();
      var pastMonth=pastDate.getMonth()+1;
      var pastDate=pastDate.getDate();
     var strDay=pastYear+'-'+pastMonth+'-'+pastDate;
      var date = new Date(strDay);
      return date;
    },

    //获取最近一周时间
     getCurrentWeek(){
      var date=new Date();
      date.setDate(date.getDate()-7);
      date.setHours(0,0,0);
      return date;
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

   downLoadAll(){
     var companyId=this.companyId;
      var cid=this.companyId;
      var beginTime= this.datatransMethod(this.date1);
      var  finishTime=this.getEndtime(this.datatransMethod(this.date2));  
      var po =this.po;
         downLoadFile(this.Global.baseUrl + `PUR_HEAD/transExcel?companyId=${companyId}&cid=${cid}&beginTime=${beginTime}&finishTime=${finishTime}&po=${po}`);
    },
    //计算合并行的index和需合并的行数，太慢拖累加载速度 在表个后加 :span-method="arraySpanMethod" 原32
    mergeColumnIndex() {
      this.arr_index.splice(0,this.arr_index.length);
       this.arr_span.splice(0,this.arr_span.length);
      //遍历表格需要合并的列
      var arr = this.tableData;
      var intSpan=1;
      var intIndex=0;
      var len = 0;
      for (var i = 1, len = arr.length; i < len; i++) {//从第二行开始与前一行比较
        if (arr[i].TRANS_NO === arr[i - 1].TRANS_NO ) {
          intSpan = intSpan + 1;//如果相同,该合并的rowSpan+1
          intIndex = i +1- intSpan;//row
          // console.log("相同则累加合并项");
          // console.log(intSpan);
          // console.log(intIndex);
        } 
        else if (arr[i].TRANS_NO != arr[i - 1].TRANS_NO  ) {
          this.arr_index.push(intIndex);
          this.arr_span.push(intSpan);
          // console.log("不相同则追加数组");
          // console.log(this.arr_index);
          // console.log( this.arr_span);
          intSpan = 1;
          intIndex = i; 
        }
         if (i==len -1){
          //  intSpan = 1;
          // intIndex = i-1; 
          this.arr_index.push(intIndex);
          this.arr_span.push(intSpan);
          // console.log("末尾则追加数组");
          // console.log(this.arr_index);
          // console.log( this.arr_span);
        }
      }
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {//特别注意：查询出那列就合并那列，index别写成别的列
      if(this.arr_index.indexOf(rowIndex)>-1){
        var i=this.arr_index.indexOf(rowIndex);
         return [this.arr_span[i], 1];
      }
       else return{
              rowspan: 0,
              colspan: 0
          }
       
      } 
    },
    
 
      //查询语句
      autoSearch() {
        var data = {
        cid: Cookies.get("cid"),
        companyId: Cookies.get("companyId"),
        beginTime: this.date1,
        finishTime: this.getEndtime(this.date2),
        limit: this.limit,
        page: this.currentPage,
        current_id: Cookies.get("companyId"),
        supply_type: "",
        po_type: this.po_type ,//  status状态   cancel    efficient 生效（新采购单）   enforce 已执行（已确认）   fulfill 已完成
        po:this.po,
      };
      //   if (!data.beginTime) {
      //   data.beginTime = "0001/1/1";
      // }
      // if (!data.finishTime) {
      //   data.finishTime = "9999/12/19";
      // } else {
      //   data.finishTime = data.finishTime + " 23:59:59";
      // }
      GetTransDetail(data).then(res => {
        this.count = res.count;
        this.tableData = res.data;
           this.mergeColumnIndex();
         
      });
   
    },
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

      numFilter (value) {
    // 截取当前数据到小数点后两位
    let realVal = parseFloat(value).toFixed(2)
    return realVal
  },

    datatrans(value) {
      //时间戳转化大法
      if (value == null) {
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
};
</script>

<style scoped>
.first_1{
  margin-bottom: 5px;
}
.button_1{
  width: 100px;
  background: #8bc34a;
  margin-left: 10px;
  color: rgb(255, 255, 255);
  text-align: center
}
.button_2 {
  width: 80px;
  height: 30px;
  background: #8bc34a;
  margin-left: 10px;
  color: rgb(255, 255, 255);
  text-align: center;
}

</style>
<style>
.zj-inputcss1{
  margin: 3px;
  width: 120px;
  border:3
}
.lanJuport .el-table td,
.lanJuport .el-table th {
  padding: 3px 0 !important;
}

</style>