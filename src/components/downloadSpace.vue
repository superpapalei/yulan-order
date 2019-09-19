<template>
    <div>
     <el-card shadow="hover">
      <div slot="header">
        <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6"  class="fstrong f16"><div>下载中心</div></el-col>
            <el-col :span="6">                    
                <div id="DownloadSearchBox">
                        <el-input clearable
                            v-model.trim="searchKey" 
                            @clear="_getTabDownloadFiles(0)"
                            @keyup.enter.native="_GetFileByGroupID()"
                            placeholder="输入关键字"
                            size="mini">
                            <div id="searchBtn" slot="append" style="cursor:pointer;" class="fstrong f12" @click="_GetFileByGroupID(searchKey)" >搜索</div>
                        </el-input>
                    </div>
            </el-col>
        </el-row>
      </div>
      <div>
            <el-tabs :tab-position="tabPosition"  v-model="activeName" @tab-click="handleClick" >
                    <el-tab-pane label="所有"  @click="_GetFileByGroupID()">
                            <div>
                                 <el-table
                                 :data="tableData"
                                 stripe>
                                 <el-table-column
                                 prop="FILE_NAME"
                                 label="所有"
                                 width="777">
                                 </el-table-column>
                                 <el-table-column
                                 width="100px"
                                 prop="UPLOAD_DATE"
                                 label=" " >
                                 </el-table-column>
                                 <!-- 下载的超链接是模仿shoptab里的查看库存 -->
                                 <el-table-column
                                 width="100px">
                                 <template >
                                 <a class="mr10">
                                 下载
                                 </a>
                                 </template>
                                </el-table-column>
                                 </el-table>
                            </div>
                    </el-tab-pane>
                    <el-tab-pane label="政策导向" @click="_GetFileByGroupID('G001')">
                            <div>
                                 <el-table
                                 :data="tableData"
                                 stripe
                                 style="width: 100%">
                                 <el-table-column
                                 prop="FILE_NAME"
                                 label="政策导向"
                                 width="777">
                                 </el-table-column>
                                 <el-table-column
                                 width="100px"
                                 prop="UPLOAD_DATE"
                                 label=" " >
                                 </el-table-column>
                                 <!-- 下载的超链接是模仿shoptab里的查看库存 -->
                                 <el-table-column
                                 width="70px">
                                 <template >
                                 <a class="mr10">
                                 下载
                                 </a>
                                 </template>
                                </el-table-column>
                                 </el-table>
                            </div>
                    </el-tab-pane>
                    <el-tab-pane label="行业报告" @click="_GetGroupIDByChooseTab('G002')" >
                            <div>
                                 <el-table
                                 :data="tableData"
                                 stripe
                                 style="width: 100%">
                                 <el-table-column
                                 prop="FILE_NAME"
                                 label="行业报告"
                                 width="777">
                                 </el-table-column>
                                 <el-table-column
                                 prop="UPLOAD_DATE"
                                 label=" " 
                                 width="100">
                                 </el-table-column>
                                 <!-- 下载的超链接是模仿shoptab里的查看库存 -->
                                 <el-table-column
                                 width="70px">
                                 <template >
                                 <a class="mr10">
                                 下载
                                 </a>
                                 </template>
                                 </el-table-column>
                                 </el-table>
                            </div>
                    </el-tab-pane>
                    <el-tab-pane label="集团通告" @click="_GetGroupIDByChooseTab('G003')">
                            <div>
                                 <el-table
                                 :data="tableData"
                                 stripe
                                 style="width: 100%">
                                 <el-table-column
                                 prop="FILE_NAME"
                                 label="集团通告"
                                 width="777">
                                 </el-table-column>
                                 <el-table-column
                                 prop="UPLOAD_DATE" 
                                 label=" " 
                                 width="100">
                                 </el-table-column>
                                 <!-- 下载的超链接是模仿shoptab里的查看库存 -->
                                 <el-table-column
                                 width="70px">
                                 <template >
                                 <a class="mr10">
                                 下载
                                 </a>
                                 </template>
                                </el-table-column>
                                 </el-table>
                            </div>
                    </el-tab-pane>
                    <el-pagination
                        class="tc"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        layout="prev, pager, next, jumper"
                        :total="totalNumber">
                    </el-pagination>
            </el-tabs>
      </div>
    </el-card>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import {
    GetFileByGroupID
} from "@/api/DownloadInfoASP";


export default {
    name: 'DownloadSpace',
    data(){
        return{
            tabPosition: 'left',
            searchKey: '',  //搜索的关键词
            chooseTab: '',  //当前的选择
            numberList: [],
            tableData: {
             FILE_NO: "", //文件编号
             FILE_NAME: "", //文件名
             GROUP_ID: "", //类别编号
             UPLOAD_DATE: "", //上传日期
             },
            currentPage: 1,     //当前的页数
            pageSize: 10,       //每页的个数
            totalNumber: 15,   //总条数
            //创建一个总的data，这样只需加载一次请求
            allData: [
                [],[],[],[],[],[],[]
            ],
        }
    },
    props:[ 'tableData'],
    methods: {
        //数组去重
        unique(arr) {
            var i,j;
            var len = arr.length; 
            for(i = 0; i < len; i++){
                for(j = i + 1; j < len; j++){
                    if(arr[i].itemNo == arr[j].itemNo){
                        arr.splice(j,1);
                        len--;
                        j--;
                    }
                }
            }
            return arr;
        },
        //获取条数
        handleSizeChange(val) {
                  this.pageSize = val;
                  this.currentPage = 1;
                  this.refresh();
        },
        //翻页获取该页信息
        handleCurrentChange(val) {
            this.currentPage = val;
            this.totalNumber=chooseTab.data.length;
            this.currentPage = val;
            this.refresh();
        },
        //创建每类文件的的数量
        createNumberList(len){
            this.numberList = [];
            for(var i = 0; i < len; i++){
                this.numberList.push({
                    value: '',  //主计量
                    value1: ''  //辅助计量
                });
            }
        },
        //获取对应标签下的文件信息
        _getTabDownloadFiles(flag){
            this.tableData = [];
            var status = 0;
            if(flag !== 1){
                switch(this.chooseTab){
                    case '分类标签1':
                        if(this.allData[0].length !== 0){
                            this.tableData = this.allData[0];
                            this.totalNumber = this.tableData[0].total;
                            this.createNumberList(this.allData[0].length);
                            status = 0; 
                            return;
                        } 
                        break;
                    case '分类标签2':
                        if(this.allData[1].length !== 0){
                            this.tableData = this.allData[1];
                            this.totalNumber = this.tableData[1].total;
                            this.createNumberList(this.allData[1].length);
                            return;
                        }
                        status = 1;
                        break;
                    case '分类标签3':
                        if(this.allData[2].length !== 0){
                            this.tableData = this.allData[2];
                            this.totalNumber = this.tableData[2].total;
                            this.createNumberList(this.allData[2].length);
                            return;
                        }
                        status = 2;
                        break;
                    case '分类标签4':
                        if(this.allData[3].length !== 0){
                            this.tableData = this.allData[3];
                            this.totalNumber = this.tableData[3].total;
                            this.createNumberList(this.allData[3].length);
                            return;
                        }
                        status = 3;
                        break;
                }
                getAllDownloadFiles({
                    FileType: this.chooseTab,
                    FileName: this.searchKey.toUpperCase(),
                    limit: this.pageSize,
                    page: this.currentPage
                }).then(res =>{
                    console.log(res.data);
                    res.data = this.unique(res.data);
                    res.data = this.changeUnit(res.data);
                    this.allData[status] = res.data;
                    this.allNumber[status] = res.data[0].total;
                    this.totalNumber = this.allNumber[status];
                    this.tableData = this.allData[status];
                    this.createNumberList(this.tableData.length);
                }).catch( err =>{
                    console.log('暂无数据');
                })
            }
            else{
                switch(this.chooseTab){
                    case '分类标签1':
                        status = 0;    
                        break;
                    case '分类标签2':
                        status = 1;
                        break;
                    case '分类标签3':
                        status = 2;
                        break;
                    case '分类标签4':
                        status = 3;
                        break;
                }
                getAllDownloadFiles({
                    itemType: this.chooseTab,
                    cid: this.cid,
                    limit: this.pageSize,
                    page: this.currentPage
                }).then(res =>{
                    console.log(res.data);
                    res.data = this.unique(res.data);
                    res.data = this.changeUnit(res.data);
                    this.tableData = res.data;
                    this.totalNumber = this.allNumber[status];
                    this.createNumberList(this.tableData.length);
                }).catch( err =>{
                    console.log('暂无数据');
                })
            }
        }, 
        //某类文件的的模糊搜索
        searchFileInTab(flag){
            if(flag === 0)
                this.currentPage = 1;
            getSingleDownloadFile({
                FileType: this.chooseTab,
                FileName: this.searchKey.toUpperCase(),
                limit: this.pageSize,
                page: this.currentPage
            }).then(res =>{
                console.log(res);
                this.tableData = this.unique(res.data);
                this.tableData = this.changeUnit(this.tableData);
                this.totalNumber = this.tableData[0].total;
                this.createNumberList(this.tableData.length);
            }).catch(err =>{
                this.tableData = [];
                this.totalNumber = 0;
            });
        },
        //切换标签页时的触发事件
        handleClick(tab, event) {
            if(tab.name == this.chooseTab)  return ;
            this.chooseTab = tab.name;
            this.searchKey = '';
            this.currentPage = 1;
            console.log(this.chooseTab);
            Cookies.set('activeNameDownload', tab.name);
            this._getTabDownloadFiles(0);
            console.log(Cookies.get('activeNameDownload'));
        },

        //获取下载信息(参照我的订单-myOrder)
        refresh() {
        pageSize=this.pageSize,
        currentPage=chooseTab.data.length;
        },

        //选中相应页签后给GROUP_ID赋值
         _GetGroupIDByChooseTab(){
              GROUP_ID: this.GROUP_ID;//类别编号
        },

        //通过GROUP_ID查找到相应类别的文件
        _GetFileByGroupID(GroupID){
        this.tableData = [];
        var val = {
             GROUP_ID: GroupID, //类别编号
        };
        GetFileByGroupID(val).then(res => {
              this.tableData = res.data
        }).catch((res)=>{
                   
        })
        }
    },
    created(){
            this._GetFileByGroupID();
    },
    }
</script>


<style scoped>
#DownloadSearchBox div:hover{
    cursor: pointer;
}
#searchBtn{
    color: #101010;
    cursor: pointer;
}
</style>