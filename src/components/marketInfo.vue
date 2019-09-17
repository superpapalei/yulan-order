<template>
  <div>
    <el-card class="studyMain">
      <el-table
        style="width: 95%"
        :data="studyData"
        :row-class-name="tableRowClassName"
      >
        <el-table-column label="主题" header-align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.TITLE }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="150">
          <template slot-scope="scope">
            {{ scope.row.completeStatus | comFilter }}
          </template>
        </el-table-column>
        <el-table-column align="center" width="150" label="操作">
          <template slot-scope="scope">
            <el-button
              :disabled="scope.row.completeStatus == 2"
              @click="editStudy()"
              type="primary"
              icon="el-icon-edit"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :show-close="true"
        :close-on-click-modal="false"
        :visible.sync="detailVisible"
        width="1200px"
        top="5vh"
        center
      >
        <header>
          <h2 class="studyTitle">标题</h2>
        </header>
        <div class="studyContent">
          <el-card v-if="studyContextData.length >1" shadow="hover">
            <div slot="header">
              <span class="fstrong f16">第一组</span>
            </div>
            <div class="questionItem">
              <h2 class="questionTitle">Q1 问题1<span> *</span></h2>
              <div class="optionClass">
                <el-radio-group v-model="radio" @change="radioChange">
                  <el-radio class="optionSingle" label="1">非常满意</el-radio>
                  <el-radio class="optionSingle" label="2">满意</el-radio>
                  <el-radio class="optionSingle" label="3">基本满意</el-radio>
                  <el-radio class="optionSingle" label="4">不满意</el-radio>
                  <el-radio class="optionSingle" label="5">极不满意</el-radio>
                </el-radio-group>
              </div>
            </div>
            <div class="questionItem">
              <h2 class="questionTitle">Q2 问题2<span> *</span></h2>
              <div class="optionClass">
                <el-radio-group v-model="radio2" @change="radioChange">
                  <el-radio class="optionSingle" label="1">非常满意</el-radio>
                  <br />
                  <el-radio class="optionSingle" label="2">满意</el-radio>
                  <br />
                  <el-radio class="optionSingle" label="3">基本满意</el-radio>
                  <br />
                  <el-radio class="optionSingle" label="4">不满意</el-radio>
                  <br />
                  <el-radio class="optionSingle" label="5">极不满意</el-radio>
                </el-radio-group>
              </div>
            </div>
          </el-card>
          <div v-else>
            <div class="questionItem">
              <h2 class="questionTitle">Q1 问题1</h2>
              <div class="optionClass">
                <el-radio-group v-model="radio" @change="radioChange">
                  <el-radio class="optionSingle" label="1">非常满意</el-radio>
                  <el-radio class="optionSingle" label="2">满意</el-radio>
                  <el-radio class="optionSingle" label="3">基本满意</el-radio>
                  <el-radio class="optionSingle" label="4">不满意</el-radio>
                  <el-radio class="optionSingle" label="5">极不满意</el-radio>
                </el-radio-group>
              </div>
            </div>
            <div class="questionItem">
              <h2 class="questionTitle">Q2 问题2</h2>
              <div class="optionClass">
                <el-radio-group v-model="radio2" @change="radioChange">
                  <el-radio class="optionSingle" label="1">非常满意</el-radio>
                  <br />
                  <el-radio class="optionSingle" label="2">满意</el-radio>
                  <br />
                  <el-radio class="optionSingle" label="3">基本满意</el-radio>
                  <br />
                  <el-radio class="optionSingle" label="4">不满意</el-radio>
                  <br />
                  <el-radio class="optionSingle" label="5">极不满意</el-radio>
                </el-radio-group>
              </div>
            </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="detailVisible = false"
            >提交调查表</el-button
          >
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { GetCustomerStudy } from "@/api/studyASP";
import Cookies from "js-cookie";

export default {
  name: "MarketInfo",
  data() {
    return {
      studyData: [],
      detailVisible: false,
      studyContextData: [],
      radio: "",
      radio2: ""
    };
  },
  filters: {
    comFilter(value) {
      switch (value) {
        case 0:
          return "未开始";
          break;
        case 1:
          return "未完成";
          break;
        case 2:
          return "已完成";
          break;
      }
    }
  },
  methods: {
    getDetail() {
      GetCustomerStudy({ cid: Cookies.get("cid") }).then(res => {
        this.studyData = res.data;
      });
    },
    editStudy() {
      this.studyContextData = [];

      this.detailVisible = true;
    },
    radioChange(val) {
      console.log(val);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "success-row";
      }
      return "";
    }
  },
  created() {
    this.studyData = [];
    this.getDetail();
  }
};
</script>

<style scoped>
.studyTitle {
  margin-bottom: 2rem;
  text-align: center;
  font-size: 3rem;
  color: #555;
}
.studyContent {
  padding: 1rem;
  border-top: 0.2rem solid #ccc;
  border-bottom: 0.2rem solid #ccc;
}
.questionTitle {
  padding: 1.5rem 2rem;
  font-size: 2rem;
  color: #555;
}
.optionClass {
  margin-left: 4rem;
}
.optionSingle {
  margin-bottom: 10px;
  margin-right: 10px;
  font-size: 1.5rem;
}
.questionItem {
  padding: 0;
}
</style>
<style>
.studyContent .el-card__body {
  padding: 0;
}
.studyMain .el-dialog__header {
  padding: 0;
}
</style>