<template>
  <el-card>
    <div style="padding:20px;">
      <span>出货时间:</span>
      <el-date-picker
        type="date"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="出货时间"
        v-model="date1"
        style="width:12%;"
      ></el-date-picker
      >&nbsp;至
      <el-date-picker
        type="date"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="出货时间"
        v-model="date2"
        style="width:12%;"
      ></el-date-picker>
      <el-select
        style="width:160px;"
        v-model="rownum"
        placeholder="请选择审核状态"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="primary" @click="search()" style="margin-left:20px;"
        >更新物流状态</el-button
      >
    </div>
    <el-table
      style="width: 90%"
      :data="tableData"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column
        prop="TRANS_ID"
        label="快递单号"
        align="center"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="TRANSCOMPANY"
        label="快递公司"
        align="center"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="ExpressState"
        label="当前状态"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.ExpressState | expressState }}
        </template>
      </el-table-column>
      <el-table-column
        prop="ExpressContent"
        label="最后一次物流信息"
        header-align="center"
      >
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
import { GetPackExpressState } from "@/api/orderListASP";

export default {
  data() {
    return {
      date1: this.formatDate(new Date(new Date().setDate(1))),
      date2: this.formatDate(new Date()),
      tableData: [],
      rownum: 100,
      options: [
        {
          label: "前10行",
          value: 10
        },
        {
          label: "前20行",
          value: 20
        },
        {
          label: "前50行",
          value: 50
        },
        {
          label: "前100行",
          value: 100
        }
      ]
    };
  },
  filters: {
    expressState(value) {
      switch (value) {
        case "-1":
          return "查询出错";
          break;
        case "0":
          return "在途";
          break;
        case "1":
          return "揽收";
          break;
        case "2":
          return "疑难";
          break;
        case "3":
          return "签收";
          break;
        case "4":
          return "退件";
          break;
        case "5":
          return "派件";
          break;
        case "6":
          return "退回";
          break;
        case "7":
          return "转投";
          break;
      }
    }
  },
  methods: {
    search() {
      var data = {
        beginTime: this.date1,
        finishTime: this.date2,
        rownum: this.rownum
      };
      if (!data.beginTime) {
        data.beginTime = "0001/1/1";
      }
      if (!data.finishTime) {
        data.finishTime = "9999/12/31";
      } else {
        data.finishTime = data.finishTime + " 23:59:59";
      }
      GetPackExpressState(data).then(res => {
        this.tableData = res.data;
        for (var i = 0; i < this.tableData.length; i++) {
          var data = this.tableData[i];
          if (data.express) {
            if (data.express.message == "ok") {
              data.ExpressState = data.express.state;
              var expressData = data.express.data;
              data.ExpressContent =
                expressData.length > 0
                  ? expressData[0].time + " " + expressData[0].context
                  : "";
            } else {
              data.ExpressState = "-1";
              data.ExpressContent = data.express.message;
            }
          } else {
            data.ExpressState = "-1";
            data.ExpressContent = "请检查参数是否正确";
          }
        }
      });
    },
    formatDate(date) {
      if (date != null) {
        var month = date.getMonth() + 1;
        if (month < 10) month = "0" + month;
        var day = date.getDate();
        if (day < 10) day = "0" + day;
        return date.getFullYear() + "-" + month + "-" + day;
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "success-row";
      }
      return "";
    }
  }
};
</script>