<template>
  <div>
   <el-card shadow="hover" class="centerCard">
      <div slot="header">
        <span class="fstrong f16">退款赔偿</span>
      </div>
      <div>
        <div  class="tbarStyle">
          <span style="font-size:15px;margin-right:5px">建立日期:</span>
          <el-date-picker
            value-format="yyyy-MM-dd"
            style="width:14%;margin-right:25px"
            v-model="beginTime"
            type="date"
            placeholder="日期区间"            
          >
          </el-date-picker>
          <span style="font-size:15px;margin-right:35px">至</span>
          <el-date-picker
            value-format="yyyy-MM-dd"
            style="width:14%;margin-right:10px;"
            v-model="finishTime"  
            type="date"
            placeholder="日期区间"
          >
          </el-date-picker>
          <span style="font-size:15px;margin-right:31px">状态:</span>
          <el-select
            style="width:14%;margin-right:10px;"
            v-model="SELECT_STATUS"
            placeholder="请选择"
          >
            <el-option
              v-for="item in statusArray"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button 
            type="success" 
            @click.native="clickSearch"    
            style="margin-right:6px;"
            >查 询</el-button
          >
          <el-button
            type="warning"
            @click.native="resetSearch"
            style="margin-right:6px;"
            >重 置</el-button
          >
        </div>
        <div class="tbarStyle">
          <span style="font-size:15px;margin-right:24px">型号：</span>
          <el-input
            clearable
            v-model="selectItemNo"
            style="width:14%;margin-right:10px;"
            placeholder="产品型号"
          >
          </el-input>
          <span style="font-size:15px;margin-right:5px">客户名：</span>
          <el-input
            clearable
            v-model="selectCNAME"
            style="width:14%;margin-right:10px;"
            placeholder="客户名"
          >
          </el-input>
          <span style="font-size:15px;margin-right:5px">创建人：</span>
          <el-input
            clearable
            style="width:14%;margin-right:10px;"
            v-model="selectCreator"
            placeholder="创建人"
          >
          </el-input>
          <!-- <el-button 
            @click.native="checkNoPrint" 
            style="margin-right:6px;width:168px"
            >查看未打印
          </el-button > -->
        </div>
        <el-table
          border
          :row-class-name="tableRowClassName"
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column width="145" label="编号" prop="ID"  align="center"> </el-table-column>
          <el-table-column width="145" label="创建时间"  align="center">
            <template slot-scope="scope">
               {{ scope.row.CREATE_TS | datatrans }}
            </template>
          </el-table-column>
          <el-table-column
            label="客户名称"
            prop="CNAME"
            align="center"
          >
          </el-table-column>
          <el-table-column width="70" label="货品数" prop="ITEM_COUNT"  align="center"> </el-table-column>
          <el-table-column width="120" label="状态"  align="center">
            <template slot-scope="scope">
              {{ scope.row.STATE | transStatus }}
            </template>
          </el-table-column>
          <el-table-column
            label="处理人"
            prop="DEALMAN_NAME"
            align="center"
          >
          </el-table-column>

           <!-- 未做 -->
          <el-table-column width="120" label="操作" align="center">
            <template slot-scope="scope">
              <el-tooltip content="查看" placement="top">
                <el-button
                  circle
                  style="padding: 7px;"
                  type="warning"
                  icon="el-icon-search"
                  size="mini"
                  @click="_CheckDetail(scope.row,1)"
                >
                </el-button>
              </el-tooltip>
              <el-tooltip
                v-if="
                  scope.row.STATE == 'CUSTOMERAFFIRM'
                "
                content="编辑"
                placement="top"
              >
                <el-button
                  circle
                  style="padding: 7px;"
                  @click="_CheckDetail(scope.row,2)"
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                >
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="width: 100%;"
          class="dib tc"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="allNum"
        >
        </el-pagination>
      </div>
    </el-card>
    
     <el-dialog
      :visible.sync="RefundDetail"
      :close-on-click-modal="false"
      width="55%"
      append-to-body
    >    
      <!-- 查看区 -->
      <div v-show="isCheck" id="printTable">
      <div style="margin-bottom:5px;">
         <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr >
            <td style="font-size:20px;height:30px;text-align:center;" colspan="7">
              退货/赔偿申请书【{{submit.STATE | transStatus}}】
              <i class="icon-print el-icon-printer cpoi" style="float:right" @click="printRefund"></i>
            </td>
          </tr>
         </table>
      </div>
      <div >
         <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr >
            <td style="font-size:10px;height:15px;width:6%;" colspan="1">编号：</td>
            <td style="font-size:10px;height:15px;text-align:left;width:15%;" colspan="1">{{submit.ID}}</td>
            <td style="font-size:10px;height:15px;width:9%;" colspan="1">创建时间：</td>
            <td style="font-size:10px;height:15px;text-align:left;width:17%;" colspan="3">{{submit.CREATE_TS|datatrans}}</td>
            <td style="font-size:10px;height:15px;width:8%;" colspan="1">处理人：</td>
            <td style="font-size:10px;height:15px;text-align:left;width:19%;" colspan="1">{{submit.DEALMAN_NAME}}</td>
            <td style="font-size:10px;height:15px;width:9%;" colspan="1">处理时间：</td>
            <td style="font-size:10px;height:15px;text-align:left;width:17%;" colspan="3">{{submit.DEAL_TS|datatrans}}</td>
          </tr>
         </table>
      </div>
      <div class="table-c" style="margin-top:5px;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="grayTD" style="height:15px" colspan="1">客户代码</td>
            <td style="height:15px" colspan="1">
              {{submit.CID}}
            </td>
            <td class="grayTD" style="height:15px" colspan="1">客户名称</td>
            <td style="height:15px" colspan="4">
              {{submit.CNAME}}     
            </td>
          </tr>
          <tr>
            <td class="grayTD" style="height:15px">提货单号</td>
            <td style="height:15px">{{ submit.SALE_NO }}</td>   
            <td class="grayTD" style="height:15px">B2B订单号</td>
            <td style="height:15px" colspan="2">{{ submit.ORDER_NO }}</td><!-- 连表查询 -->
            <td class="grayTD" style="height:15px">ERP订单号</td>
            <td  style="height:15px" colspan="2">{{ submit.CONTRACT_NO }}</td><!-- 连表查询 -->
          </tr>
          <tr>                                                                             
            <td class="grayTD" style="height:15px">联系人</td>
            <td style="height:15px">{{ submit.CONTACT_MAN  }}</td>
            <td class="grayTD" style="height:15px">联系电话</td>
            <td style="height:15px" colspan="2">{{ submit.CONTACT_PHONE  }}</td>
            <td class="grayTD" style="height:15px">物流单号</td>
            <td style="height:15px" >{{ submit.TRANS_ID  }}</td>   <!-- 连表查询 -->
          </tr>
          <tr>
            <td class="grayTD" style="height:15px">问题描述</td>
            <td style="height:15px" colspan="6">{{ submit.NOTES  }}</td>
          </tr>
          <tr>
            <td class="grayTD"  colspan="1" style="height:15px">产品/项目</td>
            <td class="grayTD"  colspan="2" style="height:15px" >型号</td>
            <td class="grayTD"  colspan="1" style="height:15px">单位</td>
            <td class="grayTD"  colspan="1" style="height:15px">数量</td>
            <td class="grayTD"  colspan="2" style="height:15px">上传相关信息</td>
          </tr>
          <tr>
            <td  colspan="1" style="height:21px">{{submit.PRODUCTION_VERSION}}</td>                      
            <td  colspan="2" style="height:21px" >{{submit.ITEM_NO}}</td>
            <td  colspan="1" style="height:21px">{{submit.UNIT}}</td>
            <td  colspan="1" style="height:21px">{{submit.QTY}}</td> 
            <td  colspan="2" style="height:21px">
              <ul  class="el-upload-list el-upload-list--text" >
              <li 
                  v-for="(file, index) in fileList"
                  :key="index"
                  class="el-upload-list__item is-success"
                  tabindex="0"
                >
                  <a class="el-upload-list__item-name" >
                      <el-link
                         type="primary"
                         size="mini"
                         @click="showImage(file.url )"
                         @mouseenter.native="showMiniImage($event,file.url)"
                         @mouseout.native="MiniPic=false"
                      >{{ file.name }}
                      </el-link>
                  </a>
                  <label style="display:block;position:absolute;top:1px;right:10px;">
                    <a style="cursor:pointer;" @click="downLoad(file.url)" >下载</a>
                  </label>
              </li>
              </ul>
            </td>
          </tr>        
          <tr v-if="submit.STATE!='SUBMITTED'">
            <td class="grayTD" style="font-size:20px;height:30px" colspan="7">
              玉兰处理意见
            </td>
          </tr>
          <tr v-if="submit.STATE!='SUBMITTED'">
            <td class="grayTD" style="height:15px"  colspan="1">初审意见</td>
            <td style="height:15px" colspan="2">{{submit.RETURN_TYPE}}</td>
            <td style="height:15px" colspan="4">{{submit.FIRST_AUDITION}}</td>
          </tr>
          <tr v-if="submit.STATE!='SUBMITTED'&&submit.RETURN_TYPE!='无需退货'"> 
            <td class="grayTD" style="height:15px">备注信息</td>
            <td style="height:15px" colspan="6" v-if="submit.RETURN_TYPE=='玉兰取货'">我公司已安排物流公司上门取货，请保持电话畅通</td>
            <td style="height:15px" colspan="6" v-if="submit.RETURN_TYPE=='客户邮寄'">请您在快递单上备注提货单号</td>
            <td style="height:15px" colspan="6" v-else></td>
          </tr>
          <tr v-if="submit.STATE!='SUBMITTED'&&submit.RETURN_TYPE=='客户邮寄'">
            <td class="grayTD" style="height:15px">退货或寄样信息</td>
            <td style="height:15px" colspan="6">  {{submit.RETURN_ADDRESS}}</td>
          </tr>
          <tr v-if="submit.STATE!='SUBMITTED'&&submit.RETURN_TYPE=='客户邮寄'">
            <td class="grayTD" style="height:15px">邮寄备注信息</td>
            <td style="height:15px" colspan="6">您的提货单号为{{submit.SALE_NO}}</td>
          </tr>
          <tr v-if="submit.STATE=='CUSTOMERAFFIRM'||submit.STATE=='APPROVED'">
            <td class="grayTD" style="font-size:20px;height:30px" colspan="7">
              玉兰处理结果
            </td>
          </tr>
          <tr v-if="submit.STATE=='CUSTOMERAFFIRM'||submit.STATE=='APPROVED'">
            <td class="grayTD"  style="width:17%;height:15px">产品/项目</td>
            <td class="grayTD"  style="width:18%;height:15px">型号</td>
            <td class="grayTD"  style="width:12%;height:15px">单位</td>
            <td class="grayTD"  style="width:10%;height:15px">数量</td>
            <td class="grayTD"  style="width:10%;height:15px">金额</td>
            <td class="grayTD"  style="width:15%;height:15px">质量问题</td>
            <td class="grayTD"  style="width:18%;height:15px">处理意见</td>
          </tr>
          <tr  v-if="submit.STATE=='CUSTOMERAFFIRM'||submit.STATE=='APPROVED'" v-for="(item,index) of processDetail" :key="index">
            <td colspan="1" rowspan="1" style="height:15px">{{submit.PRODUCTION_VERSION}}</td>
            <td colspan="1" rowspan="1" style="height:15px">{{submit.ITEM_NO}}</td>
            <td colspan="1" rowspan="1" style="height:15px">{{submit.UNIT}}</td>
            <td colspan="1" rowspan="1" style="height:15px">{{processDetail[index].P_QTY}}</td>
            <td colspan="1" rowspan="1" style="height:15px">{{processDetail[index].P_MONEY}}</td>
            <td colspan="1" rowspan="1" style="height:15px">{{processDetail[index].P_NOTES}}</td>
            <td colspan="1" rowspan="1" style="height:15px">{{processDetail[index].P_RESULT}}</td>
          </tr>
          <tr v-if="submit.STATE=='CUSTOMERAFFIRM'||submit.STATE=='APPROVED'">
            <td class="grayTD"  style="height:15px">金额小写</td>
            <td style="height:15px" colspan="3">{{submit.TOTALMONEY}}</td>
            <td class="grayTD"  style="height:15px">金额大写</td>
            <td style="height:15px" colspan="2">{{totalMoneyUpper}}</td>
          </tr>

           <tr style="height:90px">
            <td
              colspan="7"
              border="0px"
              style="font-size:13px;color:gray;text-align:left;"
            >
            <div style="margin:4px 0px 4px 4px">
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
            <div style="margin:4px 0px 4px 4px">
              广东玉兰集团股份有限公司<br />
              市场部<br />
              {{ new Date(submit.CREATE_TS).getFullYear() }}年
              {{ addZeroIfNeed(new Date(submit.CREATE_TS).getMonth() + 1) }}月
              {{ addZeroIfNeed(new Date(submit.CREATE_TS).getDate()) }}日
            </div>
            </td>
            <td 
              colspan="3"
              border="0px"
              style="font-size:13px;color:gray;text-align:center;">
              <div>
              经销商
              <span v-if="submit.STATE == 'APPROVED'"
                >:{{ submit.CNAME }}</span
              ><br />
              （盖章）<br />
              <span v-if="submit.STATE != 'APPROVED'"> 年 月 日</span>
              <span v-else>
                {{ new Date(submit.REASSURE_TS).getFullYear() }}年
                {{
                  addZeroIfNeed(new Date(submit.REASSURE_TS).getMonth() + 1)
                }}月
                {{ addZeroIfNeed(new Date(submit.REASSURE_TS).getDate()) }}日
              </span>
            </div>
            </td>
          </tr>
        </table>

      </div>
      </div>

      <!-- 编辑区 -->
      <div v-show="isEdit">
      <div>
         <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr >
            <td style="font-size:20px;height:30px;text-align:center;" colspan="7">退货/赔偿申请书【{{submit.STATE | transStatus}}】</td>
          </tr>
         </table>
      </div>
      <div class="table-c" style="margin-top:5px;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="grayTD" style="height:15px" colspan="1">客户代码</td>
            <td style="height:15px" colspan="1">
              {{submit.CID}}
            </td>
            <td class="grayTD" style="height:15px" colspan="1">客户名称</td>
            <td style="height:15px" colspan="4">
              {{submit.CNAME}}    
            </td>
          </tr>
          <tr>
            <td class="grayTD" style="height:15px">提货单号</td>
            <td style="height:15px">{{ submit.SALE_NO }}</td>
            <td class="grayTD" style="height:15px">B2B订单号</td>
            <td style="height:15px" colspan="2">{{ submit.ORDER_NO }}</td>
            <td class="grayTD" style="height:15px">ERP订单号</td>
            <td  style="height:15px" colspan="2">{{ submit.CONTRACT_NO }}</td>
          </tr>
          <tr>
            <td class="grayTD" style="height:15px">联系人</td>
            <td style="height:15px">{{ submit.CONTACT_MAN  }}</td>
            <td class="grayTD" style="height:15px">联系电话</td>
            <td style="height:15px" colspan="2">{{ submit.CONTACT_PHONE  }}</td>
            <td class="grayTD" style="height:15px">物流单号</td>
            <td style="height:15px" >{{ submit.TRANS_ID  }}</td>
          </tr>
          <tr>
            <td class="grayTD" style="height:15px">问题描述</td>
            <td style="height:15px" colspan="6">{{ submit.NOTES  }}</td>
          </tr>
          <tr>
            <td class="grayTD"  colspan="1" style="height:15px">产品/项目</td>
            <td class="grayTD"  colspan="2" style="height:15px" >型号</td>
            <td class="grayTD"  colspan="1" style="height:15px">单位</td>
            <td class="grayTD"  colspan="1" style="height:15px">数量</td>
            <td class="grayTD"  colspan="2" style="height:15px">上传相关信息</td>
          </tr>
          <tr>
            <td  colspan="1" style="height:21px">{{submit.PRODUCTION_VERSION}}</td>
            <td  colspan="2" style="height:21px" >{{submit.ITEM_NO}}</td>
            <td  colspan="1" style="height:21px">{{submit.UNIT}}</td>
            <td  colspan="1" style="height:21px">{{submit.QTY}}</td>
            <td  colspan="2" style="height:21px">
              <ul  class="el-upload-list el-upload-list--text" >
              <li 
                  v-for="(file, index) in fileList"
                  :key="index"
                  class="el-upload-list__item is-success"
                  tabindex="0"
                >
                  <a class="el-upload-list__item-name" >
                      <el-link
                         type="primary"
                         size="mini"
                         @click="showImage(file.url )"
                         @mouseenter.native="showMiniImage($event,file.url)"
                         @mouseout.native="MiniPic=false"
                      >{{ file.name }}
                      </el-link>
                  </a>
                  <label style="display:block;position:absolute;top:1px;right:10px;">
                    <a style="cursor:pointer;" @click="downLoad(file.url)">下载</a>
                  </label>
              </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td class="grayTD" style="font-size:20px;height:30px" colspan="7">
              玉兰处理意见
            </td>
          </tr>
          <tr>
            <td class="grayTD" style="height:15px"  colspan="1">初审意见</td>
            <td style="height:15px" colspan="2" >{{submit.RETURN_TYPE}}</td>
            <td style="height:15px" colspan="4" >{{submit.FIRST_AUDITION}}</td>
          </tr>
          <tr v-if="submit.RETURN_TYPE!='无需退货'"> 
            <td class="grayTD" style="height:15px">备注信息</td>
            <td style="height:15px" colspan="6" v-if="submit.RETURN_TYPE=='玉兰取货'">我公司已安排物流公司上门取货，请保持电话畅通</td>
            <td style="height:15px" colspan="6" v-if="submit.RETURN_TYPE=='客户邮寄'">请您在快递单上备注提货单号</td>
            <td style="height:15px" colspan="6" v-else></td>
          </tr>
          <tr v-if="submit.RETURN_TYPE=='客户邮寄'">
            <td class="grayTD" style="height:15px">退货或寄样信息</td>
            <td style="height:15px" colspan="6" >{{submit.RETURN_ADDRESS}}</td>
          </tr>
          <tr v-if="submit.RETURN_TYPE=='客户邮寄'">
            <td class="grayTD" style="height:15px">邮寄备注信息</td>
            <td style="height:15px" colspan="6">您的提货单号： {{submit.SALE_NO}}</td>
          </tr>
          <tr>
            <td class="grayTD" style="font-size:20px;height:30px" colspan="7">
              玉兰处理结果
            </td>
          </tr>
          <tr>
            <td class="grayTD"  style="width:17%;height:15px">产品/项目</td>
            <td class="grayTD"  style="width:18%;height:15px">型号</td>
            <td class="grayTD"  style="width:12%;height:15px">单位</td>
            <td class="grayTD"  style="width:10%;height:15px">数量</td>
            <td class="grayTD"  style="width:10%;height:15px">金额</td>
            <td class="grayTD"  style="width:15%;height:15px">质量问题</td>
            <td class="grayTD"  style="width:18%;height:15px">处理意见</td>
          </tr>
          <tr v-for="(item,index) of processDetail" :key="index">
            <td colspan="1" rowspan="1" style="height:15px">{{submit.PRODUCTION_VERSION}}</td>
            <td colspan="1" rowspan="1" style="height:15px">{{submit.ITEM_NO}}</td>
            <td colspan="1" rowspan="1" style="height:15px">{{submit.UNIT}}</td>
            <td colspan="1" rowspan="1" style="height:15px">{{processDetail[index].P_QTY}}</td>
            <td colspan="1" rowspan="1" style="height:15px">{{processDetail[index].P_MONEY}}</td>
            <td colspan="1" rowspan="1" style="height:15px">{{processDetail[index].P_NOTES}}</td>
            <td colspan="1" rowspan="1" style="height:15px">{{processDetail[index].P_RESULT}}</td>
          </tr>

           <tr style="height:90px">
            <td
              colspan="7"
              border="0px"
              style="font-size:13px;color:gray;text-align:left;"
            >
            <div style="margin:4px 0px 4px 4px">
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
            <div style="margin:4px 0px 4px 4px">
              广东玉兰集团股份有限公司<br />
              市场部<br />
              {{ new Date(submit.CREATE_TS).getFullYear() }}年
              {{ addZeroIfNeed(new Date(submit.CREATE_TS).getMonth() + 1) }}月
              {{ addZeroIfNeed(new Date(submit.CREATE_TS).getDate()) }}日
            </div>
            </td>
            <td 
              colspan="3"
              border="0px"
              style="font-size:13px;color:gray;text-align:center;">
              <div>
              经销商
              <span v-if="submit.STATE == 'APPROVED'"
                >:{{ submit.CNAME }}</span
              ><br />
              （盖章）<br />
              <span v-if="submit.STATE != 'APPROVED'"> 年 月 日</span>
              <span v-else>
                {{ new Date(submit.REASSURE_TS).getFullYear() }}年
                {{
                  addZeroIfNeed(new Date(submit.REASSURE_TS).getMonth() + 1)
                }}月
                {{ addZeroIfNeed(new Date(submit.REASSURE_TS).getDate()) }}日
              </span>
            </div>
            </td>
          </tr>
        </table>

        <div style="text-align:center;margin-top:5px" v-if="isEdit">           
          <el-button type="success" size="mini" @click="_EditDetail()">同意</el-button>
          <el-button type="info"   size="mini" @click="isEdit=false;RefundDetail=false">返回</el-button>  
        </div> 
      </div>
      </div>
    </el-dialog>

    <div v-if="MiniPic" style="z-index:99999;position:fixed;" :style="{left:picX,top:picY}">
        <img class="BIGimg2" :src="imgUrl" />
    </div>

    <el-dialog width="500px" title="预览" :visible.sync="BigPic">
      <div>
        <img class="BIGimg" :src="imgUrl" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import print from "print-js";
import Axios from "axios";
import Cookies from "js-cookie";
import { digitUppercase } from "@/common/js/money.js";
import {
  getAllRefund,
  deleteRefund,
  updataRefundStatus,
  updatePrinted
} from "@/api/refund";
import {getReturnInfo2 } from "@/api/orderListASP";
import {
  GetUserCompensation,
  GetCompensationById,
  GetNoPrinted,
  ApprovedUpdate,
  UpdatePrintedById
} from "@/api/paymentASP";
import { downLoadFile } from "@/common/js/downLoadFile";
import { mapMutations } from "vuex";
import { mapState } from "vuex";
export default {
  name: "refundExamine",
  data() {
    return {
      picX:"0",
      picY:"0",
      MiniPic:false,
      BigPic:false,
      imgUrl: "",
      tableData: [], //表格数据
      allNum: 0 ,//表格总共有几条数据
      currentPage:1,//当前页数
      pageSize:10,//每页最多显示数量
      submit: [],
      returnInfo:[],
      processDetail:[],//玉兰处理结果表明细
      fileList:[],//存储附件
      complaintDetail: false,
      isAdd: false,
      isCheck:false,
      isEdit:false,
      RefundDetail:false,
      isRefundAdd:false,
      SELECT_STATUS: "CUSTOMERAFFIRM", //存储下拉框的值
      beginTime: "", //查询的开始时间
      finishTime: "", //查询的结束时间
      companyId: Cookies.get("companyId"),
      CID: Cookies.get("cid"),
      CNAME :Cookies.get("realName"),
      selectItemNo: "", //搜索栏产品型号
      selectCNAME: "", //搜索栏姓名
      selectCreator: "", //搜索栏创建人名
      zongshuliang: "",
      daifashuliang: "",
      kuaidi100: "",
      kuaididanhao: "",
      //单据状态
      statusArray: [
        { value: null, label: "全部状态" },
        { value: "SUBMITTED", label: "已提交" },
        { value: "RECEIVE", label: "已接收" },
        { value: "CUSTOMERAFFIRM", label: "客户确认中" },
        { value: "APPROVED", label: "客户同意" }
      ],
      returnArray: [   //退货方式
        {
          label: "玉兰取货",
          value: "玉兰取货"
        },
        {
          label: "客户邮寄",
          value: "客户邮寄"
        },
        {
          label: "无需退货",
          value: "无需退货"
        },
      ],
      processArray: [   //退货方式
        {
          label: "赔偿",
          value: "赔偿"
        },
        {
          label: "退货",
          value: "退货"
        },
        {
          label: "无质量问题",
          value: "无质量问题"
        },
      ],
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
      return y + "-" + MM + "-" + d + " " + h + ':' + m ; //+ ':' + s
    },
    //过滤掉值为空的属性
    propertyFilter(obj) {
      let keyArr = Object.keys(obj);
      for (let i = 0; i < keyArr.length; i++) {
        if (obj[keyArr[i]] === "") {
          delete obj[keyArr[i]];
        }
      }
      return obj;
    },
    transStatus(value) {
      switch (value) {
        case null:
          return "";
          break;
        case "SUBMITTED":
          return "已提交";
          break;
        case "RECEIVE":
          return "已接收";
          break;
        case "CUSTOMERAFFIRM":
          return "客户确认中";
          break;
        case "APPROVED":
          return "客户同意";
          break;
      }
    },
  },
  methods: {
    //展开搜索
    clickSearch() {
      this.currentPage = 1;
      this.refresh();
    },
    //重置搜索条件
    resetSearch() { 
      this.beginTime = "";
      this.finishTime = "";
      this.SELECT_STATUS="";
      this.selectItemNo = "";
      this.selectCNAME = "";
      this.selectCreator = "";
    },
    //查询未打印的单据
    // checkNoPrint() {
    //   GetNoPrinted().then(res => {
    //     this.tableData = res.data;
    //     this.tableData.forEach(item => {
    //       item.PRINTED = item.PRINTED === "0" ? true : false;
    //     });
    //     this.allNum = res.count;
    //   });
    // },
    //查询满足条件的该用户的退货赔偿
    refresh() {
      let obj = {
        CID: this.CID,
        page: this.currentPage, //第几页
        number: this.pageSize, //一页有多少数据
        startDate: this.beginTime, //开始日期
        endDate: this.finishTime, //结束日期
        state: this.SELECT_STATUS, //状态
        createName: this.selectCreator, //创建者名称
        cName: this.selectCNAME, //客户名称
        itemNo: this.selectItemNo //产品号S
      };
      if (!obj.startDate) {
        obj.startDate = "0001/1/1 00:00:00";
      }
      if (!obj.endDate) {
        obj.endDate = "9999/12/31";
      } else {
        obj.endDate = obj.endDate + " 23:59:59";
      }
      let filter = this.$options.filters["propertyFilter"];
      GetUserCompensation(filter(obj))
        .then(res => {
          this.tableData = res.data;
          this.tableData.forEach(item => {
            item.PRINTED = item.PRINTED === "0" ? true : false;
          });
          this.allNum = res.count;
        })
        .catch(err => {
          this.tableData = [];
          this.allNum = 0;
        });
    },
    //查看详情
    _CheckDetail(val,type) {
      this.submit = [];
      this.fileList=[];
      this.processDetail=[];
      let data = {
        ID: val.ID,
        STATE:val.STATE
      };
      GetCompensationById(data).then(res => {
        if (res.count > 0) {
          this.submit = res.data[0];
          if(this.submit.STATE=='CUSTOMERAFFIRM'||this.submit.STATE=='APPROVED'){
              this.processDetail = res.data;
              var totalMoney=0;
              for (let j = 0; j < res.count; j++) {
              totalMoney=totalMoney.add(this.processDetail[j].P_MONEY);
              }
              this.submit.TOTALMONEY=totalMoney;
          };
        }
          var list = this.submit.ATTACHMENT_FILE.split(";");
          for (var i = 0; i < list.length - 1; i++) {
            var index = list[i].lastIndexOf("/");
            var fileName = list[i].substr(index + 1);
            this.fileList.push({
              name: fileName,
              url: list[i]
            });
          }
        if(type==1)
        {
            this.isEdit = false;
            this.isCheck = true;
        }
        else
        {
            if(this.submit.STATE=='RECEIVE')
            {
               this.processDetail.push({
                  P_RTCB_ID: this.submit.RTCB_ID, 
                  LINE_NO:"",
                  P_QTY: "", 
                  P_NOTES: "", 
                  P_RESULT: "", 
                  P_MONEY: "", 
                });
            }
            this.isEdit = true;
            this.isCheck = false;
        }
        this.RefundDetail = true;
      });
    },
    //保存修改
    _EditDetail(){
          this.submit.STATE='APPROVED';
          ApprovedUpdate({ head: this.submit }).then(res => {
            if (res.code == 0) {
              this.$alert("修改成功", "提示", {
              confirmButtonText: "确定",
              type: "success"
            });
            this.releaseBadge("newRefund1");//刷新角标
            this.refresh();
            this.RefundDetail = false;
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
    //显示图片
    showImage(url) {
      var list1=url.split('png');
      var list2=url.split('jpg');
      var list3=url.split('jpeg');
      var list4=url.split('bmp');
      if(list1.length>1||list2.length>1||list3.length>1||list4.length>1)
      {
          this.imgUrl = "";
          //url只是部分路径，还需要一个头部（还需要全路径）
          this.imgUrl=this.Global.baseUrl+url;
          this.BigPic=true;
      }
      else{
        return;
      }
    },
    //图片预览
    showMiniImage(event,url){
      var list1=url.split('png');
      var list2=url.split('jpg');
      var list3=url.split('jpeg');
      var list4=url.split('bmp');
      if(list1.length>1||list2.length>1||list3.length>1||list4.length>1)
      {
          this.imgUrl=this.Global.baseUrl+url;
          var clientWidth=document.body.clientWidth;
          var clientHeight=document.body.clientHeight;
          var curserX=event.x;
          var curserY=event.y;
          if(curserX+200+20<clientWidth)
          {
             this.picX=curserX+20+'px';
          }
          else{
             this.picX=curserX-200-20+'px';
          }
          if(curserY+200+10<clientHeight)
          {
             this.picY=curserY+10+'px';
          }
          else{
            this.picY=curserY-200-10+'px';
           }
          this.MiniPic=true;
      }
      else{
        return;
      }
    },
    //下载
    downLoad(path) {
      downLoadFile(
        this.Global.baseUrl + `DownLoadAPI/DownloadFile?path=${path}&`
      );
    },
    //切换下一页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.refresh();
    },
    //隔行变色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "success-row";
      }
      return "";
    },
    //给时间加前缀'0'
    addZeroIfNeed(num) {
      if (num < 10) {
        return "0" + num;
      }
      return num;
    },
    //执行打印操作
    printRefund() {
      printJS({
        printable: "printTable",
        type: "html",
        maxWidth: 1300,
        headerStyle: "margin: -2px;",
        targetStyles: ["*"]
      });
    },
    ...mapMutations("badge", ["addBadge", "releaseBadge"]),
  },
  computed: {
    //返回大写形式的总金额
    totalMoneyUpper: function() {
      return digitUppercase(this.submit.TOTALMONEY);
    }
  },
  created() {
    this.refresh();
  },
  activated: function() {
    this.refresh();
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
  height: 90%;
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
  height: 20px;
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
  line-height: 20px;
}

.table-c .el-input__inner,
.el-checkbox__inner,
.el-textarea__inner {
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
.table-c  .el-upload-list__item{
    margin-top: 0px;
    line-height: 22px;
}
.tbarStyle {
  margin-bottom: 13px;
}
.BIGimg {
  width: 450px;
  height: 450px;
}
.BIGimg2 {
  width: 200px;
  height: 200px;
}
.icon-print {
  font-size: 25px;
  color: gray;
}
.noprint {
  display:none;
}
</style>
