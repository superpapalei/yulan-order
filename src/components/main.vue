<template>
  <div class="center" @click="lastClick">
    <el-container class="page">
      <el-aside :width="asideWidth" style="overflow:hidden;background:white;">
        <el-scrollbar style="height:100%;">
          <div id="aside-header">
            <div id="aside-logo"></div>
            <span>玉兰B2B</span>
          </div>
          <el-menu
            style="margin-bottom:10px;"
            :default-openeds="['shops', 'design', 'shoppingCar', 'query']"
            :default-active="url"
            @select="addTab"
            :collapse="asideStatus"
          >
            <!-- 权限树加载 -->
            <menuTree
              v-for="item in menuTreeList"
              :key="item.SystemMenuID"
              :menuTreeItem="item"
            />
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container style="width:85%; min-width:1050px;">
        <el-header height="45px">
          <ul class="l">
            <li
              :title="asideStatus == true ? '菜单展开' : '菜单收起'"
              @click="changeAside"
            >
              <i id="asideControll" class="iconfont">&#xe61e;</i>
            </li>
            <!-- <li title="主页" @click="dialogFormVisible = true">
              <i class="iconfont">&#xe65e;</i>
            </li> -->
            <router-link to="/notification/notificationMain" tag="li">
              <li @click="addTab('notification/notificationMain')">
                <i class="el-icon-bell"></i>
                <span class="ml10 mr10">公告</span>
              </li>
            </router-link>
          </ul>
          <ul class="r">
            <li>
              <el-dropdown trigger="hover">
                <span class="el-dropdown-link">
                  个人中心
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="min-width: 150px;">
                  <!-- <el-dropdown-item>历年经销设计书</el-dropdown-item>
                  <el-dropdown-item>修改登录密码</el-dropdown-item>
                  <el-dropdown-item>修改对账密码</el-dropdown-item>-->
                  <!--v-if = "isContainAttr('myZone/myCoupon')"  -->
                  <router-link
                    v-if="isContainAttr('myZone/myCoupon')"
                    to="/myZone/myCoupon"
                    tag="li"
                  >
                    <el-dropdown-item @click.native="addTab('myZone/myCoupon')"
                      >我的优惠券</el-dropdown-item
                    >
                  </router-link>
                  <el-dropdown-item @click.native="changePasswordVisible = true"
                    >修改密码</el-dropdown-item
                  >
                  <el-dropdown-item divided @click.native="logout"
                    >退出登录</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </li>
            <li style="margin-right:20px;" @click="screenfull">
              <i class="iconfont ml10 mr10">&#xe663;</i>
            </li>
          </ul>
          <span
            v-if="isManager !== '1'"
            style="color:white;line-height:50px;font-size:12px;margin-left:10px;"
            >{{ "账户：" + cid + " " + realName + " " + "操作员" }}</span
          >
          <span
            v-else
            style="color:white;line-height:50px;font-size:12px;margin-left:10px;"
            >{{ "账户：" + cid + " " + realName + " " + "管理员" }}</span
          >
        </el-header>
        <el-main style="margin:0;padding:0;background:#ECF5EF;">
          <el-tabs
            class="tabs"
            v-model="activeTabName"
            @tab-click="getTab"
            @tab-remove="closeTab"
            type="border-card"
          >
            <div id="notice">
              <i
                class="el-icon-bell ml10 mr10 f16"
                style="line-height:30px;color:gold;font-weight:bold;"
              ></i>
              <span style="color:red;margin-right:5px;margin-top:5px;"
                >最新公告：</span
              >
              <span v-if="newsTextArr.length == 0">{{ adminText }}</span>
              <span v-else style="line-height:30px;">
                <transition name="slide">
                  <a
                    style="cursor:pointer;text-decoration:underline"
                    :key="newsTextArr[newsIndex].ID"
                    @click="showNotification(newsTextArr[newsIndex])"
                    >{{ newsTextArr[newsIndex].TITLE }}</a
                  >
                </transition>
              </span>
              <span
                v-if="identity == 'ECWEB'"
                class="r f14 mr10"
                style="line-height:30px;color:red;"
              >
                <strong>
                  <i>{{ moneySituation }}</i>
                </strong>
                <i
                  title="刷新余额"
                  :class="refreshMoneyClass"
                  style="color:black;cursor:pointer;"
                  @click="refreshUserMoney"
                ></i>
              </span>
            </div>
            <el-tab-pane
              v-for="item in tabList"
              :key="item.name"
              :name="item.name"
              :label="item.label"
              :closable="item.closable"
            ></el-tab-pane>
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive === true" />
            </keep-alive>
            <router-view v-if="$route.meta.keepAlive !== true" />
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog
      :show-close="true"
      :visible.sync="notificationVisible"
      width="1000px"
      top="5vh"
      :title="newsTitle"
      center
    >
      <div v-html="newsHtmlData"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="notificationVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="请填写完此调查表，才能继续操作！"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="studyVisible"
      width="900px"
      top="5vh"
      center
    >
      <keep-alive>
        <studyContextDetail
          ref="studyContextDetail"
          v-if="studyVisible"
          :selectData="studySelectData"
          @refresh="refreshStudy"
        ></studyContextDetail>
      </keep-alive>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitStudy">提交调查表</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改密码"
      :close-on-click-modal="false"
      :visible.sync="changePasswordVisible"
      width="450px"
    >
      <el-form
        :model="passwordForm"
        :rules="passwordRules"
        ref="passwordForm"
        class="passwordForm"
      >
        <el-form-item label="原密码" prop="pw">
          <el-input
            style="width:300px;"
            type="password"
            v-model="passwordForm.pw"
            placeholder="填写原密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="npw">
          <el-input
            style="width:300px;"
            type="password"
            v-model="passwordForm.npw"
            placeholder="填写新密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="npw1">
          <el-input
            style="width:300px;"
            type="password"
            v-model="passwordForm.npw1"
            placeholder="再次填写新密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item style="text-align:center;">
          <el-button type="primary" @click="changePassWord('passwordForm')"
            >确认修改</el-button
          >
          <el-button @click="resetForm('passwordForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getUserMoney } from "@/api/user";
import { getAllRefund } from "@/api/refund";
import { getIconNumber } from "@/api/painting";
import { checkBill } from "@/api/orderList";
import { GetNewNotification, InserFlag } from "@/api/notificationASP";
import { GetCustomerMustWriteStudy } from "@/api/studyASP";
import { QueryWebMenuByUserId } from "@/api/webMenuASP";
import { getAllOrders } from "@/api/orderListASP";
import screenfull from "screenfull";
import { mapMutations, mapActions } from "vuex";
import { mapState } from "vuex";
import Vue from "vue";
import Cookies from "js-cookie";
import menuTree from "./menuTree";
import studyContextDetail from "./studyContext/studyContextDetail";
import { GetAllCompensation } from "@/api/paymentASP";
import { ChangePassword } from "@/api/webUserASP";
import payDelegationVue from './supplierModule/payDelegation.vue';
import { GetCurrentDelegation,GetAllDelegation } from "@/api/supplierASP";
import { GetAllData,GetAllUserData } from "@/api/lanju";
import {GetAllComplaint,GetAllUserComplaint} from "@/api/complaint";


export default {
  name: "Main",
  components: {
    menuTree,
    studyContextDetail
  },
  data() {
    return {
      lastClickTime: new Date().getTime(),
      cid: Cookies.get("cid"),
      isManager: Cookies.get("isManager"),
      customerType: Cookies.get("customerType"),
      realName: Cookies.get("realName"),
      identity: Cookies.get("identity"),
      newsIndex: 0, //当前滚动的公告
      newsTextArr: [], //最新公告集合
      newsTitle: "",
      newsHtmlData: "", //所有需要显示的公告拼接
      notificationVisible: false,
      studySelectData: [],
      studyVisible: false,
      asideStatus: false, //false:菜单栏处于展开状态； true：菜单栏处于收起状态
      asideWidth: "190px",
      defaultUrl: "",
      isFullscreen: false,
      adminText: "无新公告发布!",
      moneySituation: "",
      Initial_balance: 0,
      getTheTab: "",
      refreshMoneyClass: "el-icon-refresh-left",
      changePasswordVisible: false,
      passwordForm: {},
      passwordRules: {
        pw: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请填写密码"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ],
        npw: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请填写新密码"));
              } else if (value == this.passwordForm.pw) {
                callback(new Error("新密码与原始密码一致!"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ],
        npw1: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请再次填写新密码"));
              } else if (value !== this.passwordForm.npw) {
                callback(new Error("两次填写的密码不一致!"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    ...mapMutations("navTabs", ["addTab", "setMenuTreeList"]),
    ...mapMutations("badge", ["changeBadge"]),
    ...mapActions("navTabs", ["closeTab", "closeToTab"]),
    //获取角标情况【退货】
    async addBadgeIcon() {
      if (Cookies.get("identity") === "ECWEB") {
        //let _refund = await getAllRefund({
        let _refund = await GetAllCompensation({
          CID: this.cid,
          page: 1,
          number: 10000,
          startDate: "0001/1/1",
          endDate: "9999/12/31",
          state: "CUSTOMERAFFIRM"
        });
        this.changeBadge({
          name: "refund",
          index: _refund.count
        });
      }
    },
    //获取角标情况【委托】
    async PaintingIcon() {
      let _refund = await getIconNumber({
        cid: this.cid,
        page: 1,
        limit: 999,
        startDate: "",
        endDate: "",
        state: "CUSTOMERAFFIRM"
      });
      this.changeBadge({
        name: "painting",
        index: _refund.airbrushDesignerAssureList.length
      });
    },
    //获取角标待处理订单
    async OrderDealIcon() {
      if (Cookies.get("identity") === "ECWEB") {
        let order = await getAllOrders({
          companyId: Cookies.get("companyId"),
          limit: 9999,
          page: 1,
          cid: Cookies.get("cid"),
          statusId: ["0", "5", "6", "21", "22"],
          find: "",
          beginTime: "0001/1/1",
          finishTime: "9999/12/31",
          orderType: ""
        });
        this.changeBadge({
          name: "orderDeal",
          index: order.count
        });
      }
    },
    //获取角标待确认对账单
    async getStatementIcon() {
      if (Cookies.get("identity") === "ECWEB") {
        let url = "/customerBalance/getCustomerBalanceInfo.do";
        let data = {
          cid: Cookies.get("cid"),
          limit: 9999,
          page: 1
        };
        let statement = await checkBill(url, data);
        if (statement.customerBalancePeriodList.length) {
          var unDealNum = 0;
          for (var i = 0; i < statement.customerBalancePeriodList.length; i++) {
            if (
              statement.customerBalancePeriodList[i].customerCheckState ==
              "待确认"
            )
              unDealNum++;
          }
          this.changeBadge({
            name: "statement",
            index: unDealNum
          });
        }
      }
    },
    //获取角标待处理付款委托书（客户）
    async payDelegationIcon1() {
      let payDelegation1 = await GetCurrentDelegation({
          companyId: Cookies.get("companyId"),
          limit: 9999,
          page: 1,
          CID: Cookies.get("cid"),
          beginTime: "0001/1/1",
          finishTime: "9999/12/31",
          STATUS: '1'
        });
      let payDelegation2 = await GetCurrentDelegation({
          companyId: Cookies.get("companyId"),
          limit: 9999,
          page: 1,
          CID: Cookies.get("cid"),
          beginTime: "0001/1/1",
          finishTime: "9999/12/31",
          STATUS: '4'
        });
      this.changeBadge({
          name: "payDelegation1",
          index: payDelegation1.count+payDelegation2.count
        });
    },
    //获取角标待处理付款委托书（公司审核）
    async payDelegationIcon2() {
      let payDelegation1 = await GetAllDelegation({
          companyId: Cookies.get("companyId"),
          limit: 9999,
          page: 1,
          CID: Cookies.get("cid"),
          beginTime: "0001/1/1",
          finishTime: "9999/12/31",
          STATUS: '2'
        });
        this.changeBadge({
          name: "payDelegation2",
          index: payDelegation1.count
        });
    },
    //获取角标待处理的兰居设计单据（客户）
    async lanjuIcon() {
      let lanju1 = await GetAllData({
          companyId: Cookies.get("companyId"),
          limit: 9999,
          page: 1,
          CID: Cookies.get("cid"),
          beginTime: "0001/1/1",
          finishTime: "9999/12/31",
          STATUS:'2'
        });
      this.changeBadge({
          name: "lanju1",
          index: lanju1.count
        });
    },
    //获取角标待处理的兰居设计单据（市场部）
    async lanJuMarketExamineIcon() {
      let lanju1 = await GetAllUserData({
          companyId: Cookies.get("companyId"),
          limit: 9999,
          page: 1,
          CID: Cookies.get("cid"),
          beginTime: "0001/1/1",
          finishTime: "9999/12/31",
          STATUS:'1'
        });
      this.changeBadge({
          name: "lanju2",
          index: lanju1.count
        });
    },
    //获取角标待处理的兰居设计单据（广美）
    async lanJuGMExamineIcon() {
      let lanju1 = await GetAllUserData({
          companyId: Cookies.get("companyId"),
          limit: 9999,
          page: 1,
          CID: Cookies.get("cid"),
          beginTime: "0001/1/1",
          finishTime: "9999/12/31",
          STATUS:'3'
        });
      let lanju2 = await GetAllUserData({
          companyId: Cookies.get("companyId"),
          limit: 9999,
          page: 1,
          CID: Cookies.get("cid"),
          beginTime: "0001/1/1",
          finishTime: "9999/12/31",
          STATUS:'5'
        });
      this.changeBadge({
          name: "lanju3",
          index: lanju1.count+lanju2.count
        });
    },
    //获取角标待处理的物流投诉单据（客户评价）
    async complaintIcon() {
      let complaint = await GetAllComplaint({
          companyId: Cookies.get("companyId"),
          limit: 9999,
          page: 1,
          CID: Cookies.get("cid"),
          beginTime: "0001/1/1",
          finishTime: "9999/12/31",
          STATUS:2
        });
      this.changeBadge({
          name: "complaint1",
          index: complaint.count
        });
    },
    //获取角标待处理的物流投诉单据（公司处理反馈）
    async complaintReplyIcon() {
      let complaint = await GetAllUserComplaint({
          companyId: Cookies.get("companyId"),
          limit: 9999,
          page: 1,
          CID: Cookies.get("cid"),
          beginTime: "0001/1/1",
          finishTime: "9999/12/31",
          STATUS:1
        });
      this.changeBadge({
          name: "complaint2",
          index: complaint.count
        });
    },
    //获取用户余额情况
    async userMoney() {
      this.refreshMoneyClass = "el-icon-loading";
      this.moneySituation = "";
      getUserMoney(
        {
          cid: this.cid,
          companyId: Cookies.get("companyId")
        },
        { loading: false } //传入参数控制页面是否loading
      )
        .then(res => {
          if (this.isManager != "1") {
            if (res.data < 0) {
              this.moneySituation = "当前余额不足，请尽快打款";
            } else {
              this.moneySituation = "当前余额充足，请继续保持";
            }
          } else {
            this.moneySituation = "当前余额 " + res.data + "元";
          }
          this.refreshMoneyClass = "el-icon-refresh-left";
        })
        .catch(err => {
          //console.log(err);
        });
    },
    refreshUserMoney() {
      this.userMoney();
    },
    lastClick() {
      this.lastClickTime = new Date().getTime();
    },
    //按钮样式--菜单展开收起
    changeAside() {
      this.asideStatus = !this.asideStatus;
      if (this.asideStatus == false) {
        this.asideWidth = "190px";
        document.getElementById("aside-logo").style.display = "block";
        document.getElementById("asideControll").innerHTML = "&#xe61e;";
      } else {
        this.asideWidth = "60px";
        document.getElementById("aside-logo").style.display = "none";
        document.getElementById("asideControll").innerHTML = "&#xe65f;";
      }
    },
    //全屏事件
    screenfull() {
      if (!screenfull.enabled) {
        this.$message({
          message: "您的浏览器不支持全屏!!!",
          type: "warning"
        });
        return false;
      }
      screenfull.toggle();
      this.isFullscreen = true;
    },
    //是否全屏并按键ESC键的方法
    checkFull() {
      var isFull =
        document.fullscreenEnabled ||
        window.fullScreen ||
        document.webkitIsFullScreen ||
        document.msFullscreenEnabled;
      if (isFull === undefined) {
        isFull = false;
      }
      return isFull;
    },
    //获取当前路径
    getPath() {
      this.defaultUrl = window.location.href.split("#/")[1];
    },
    //点击标签页触发的事件
    getTab(val) {
      this.$store.commit("navTabs/setActiveUrlName", val.name);
      this.getTheTab = this.$store.state.navTabs.activeUrlName;
    },
    //退出登录
    logout() {
      //清除数据
      Cookies.remove("cid");
      Cookies.remove("customerType");
      //跳转链接
      this.$router.push({
        path: "/login"
      });
      //this.$router.go(0);//刷新页面
    },
    //获得菜单数组并传入store ,await并不会阻塞主线程，这里并不起作用
    async getMenuTree() {
      this.$store.commit("navTabs/emptyMenuTreeList");
      await QueryWebMenuByUserId({
        userid: JSON.parse(Cookies.get("userInfo")).userId
      }).then(res => {
        if (res.data.children.length > 0) {
          this.setMenuTreeList(res.data.children);
        } else {
          this.$alert("没有菜单权限，请联系管理员配置", "提示", {
            confirmButtonText: "确定",
            type: "success"
          });
        }
      });
    },
    isContainAttr(attr) {
      //是否包含权限
      return (
        this.menuTreeListFlatten.filter(item => item.MENU_LINK == attr).length >
        0
      );
    },
    startMove() {
      //设置定时器滚动公告
      this.newsTimer = setInterval(() => {
        if (this.newsIndex === this.newsTextArr.length - 1) {
          this.newsIndex = 0;
        } else {
          this.newsIndex += 1;
        }
      }, 3000);
    },
    getNews() {
      //获得最新的生效公告
      GetNewNotification({ cid: this.cid }).then(res => {
        this.newsTextArr = res.data;
        if (this.newsTextArr.length > 0) {
          this.startMove();
          for (var i = 0; i < this.newsTextArr.length; i++) {
            if (this.newsTextArr[i].showFlag == 1) {
              //将所有需要显示的公告拼接
              this.newsHtmlData +=
                "<div style='text-align:center;'><span style='font-size:18px;color:#303133;'>" +
                this.newsTextArr[i].TITLE +
                "</span></div><br />";
              this.newsHtmlData += this.newsTextArr[i].CONTENT + "<br /><br />";
              if (i != this.newsTextArr.length - 1)
                this.newsHtmlData +=
                  "<div style='border-bottom:0.2rem solid #ccc;'></div><br />";
              this.notificationVisible = true;
              if (this.newsTextArr[i].POPUPTYPE == "FIRSTOFDAY")
                InserFlag({ nid: this.newsTextArr[i].ID, cid: this.cid }); //标记为已显示
            }
          }
        }
      });
    },
    showNotification(item) {
      this.newsTitle = item.TITLE;
      this.newsHtmlData = item.CONTENT;
      this.notificationVisible = true;
    },
    getStudy() {
      GetCustomerMustWriteStudy({ cid: this.cid }).then(res => {
        if (res.data.length > 0) {
          this.studySelectData = res.data[0];
          this.studyVisible = true;
        }
      });
    },
    submitStudy() {
      this.$refs.studyContextDetail.submitStudy(); //调用子组件方法
    },
    refreshStudy() {
      this.studyVisible = false;
      this.getStudy();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changePassWord(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          ChangePassword({
            loginName: this.cid,
            password: this.passwordForm.pw,
            newPassword: this.passwordForm.npw
          })
            .then(res => {
              this.changePasswordVisible = false;
              this.resetForm(formName);
              this.$alert("修改成功", "提示", {
                confirmButtonText: "确定",
                type: "success"
              });
            })
            .catch(res => {
              this.$alert(res.msg ? res.msg : "修改失败", "提示", {
                confirmButtonText: "确定",
                type: "success"
              });
            });
        }
      });
    }
  },
  computed: {
    ...mapState("navTabs", ["tabList", "menuTreeList", "menuTreeListFlatten"]),
    key() {
      return this.$route.name !== undefined ? this.$route.name : this.$route;
    },
    //切换标签页时导航菜单的变换,用来满足奇怪需求
    url() {
      let index = this.$store.state.navTabs.activeUrlName;
      if (index === "order/orderDetail") {
        return "order/myOrder";
      }
      if (index === "detail/detailWallPaper") {
        return "shoppingCar/shopping?wallPaper";
      }
      if (index === "detail/detailSoftSuit") {
        return "shoppingCar/shopping?softSuit";
      }
      if (index === "detail/detailCurtain") {
        return "shoppingCar/shopping?curtain";
      }
      if (index === "detail/detailRefund") {
        return "refundCompensation";
      }
      return index;
      if (this.getTheTab !== "") return this.getTheTab;
      return this.defaultUrl;
    },
    activeTabName: {
      get() {
        return this.$store.state.navTabs.activeTabName;
      },
      set(value) {
        this.$store.commit("navTabs/setActiveUrlName", value);
        this.$router.push({
          path: "/" + this.$store.state.navTabs.activeUrlName
        });
        this.defaultUrl = "";
        this.getPath;
      }
    }
  },
  mounted() {
    window.onresize = () => {
      // 全屏下监控是否按键了ESC
      if (!this.checkFull()) {
        // 全屏下按键esc后要执行的动作
        this.isFullscreen = false;
      }
    };
    this.timeOutTimer = setInterval(() => {
      var interval = 5 * 60 * 1000;
      if (new Date().getTime() - this.lastClickTime >= interval) {
        //5分钟不操作自动退出
        this.$message.close();
        clearInterval(this.timeOutTimer);
        this.logout();
      } else if (
        new Date().getTime() - this.lastClickTime >=
        interval - 10 * 1000
      ) {
        //10秒提醒
        this.$message.close();
        this.$message({
          duration: 1000,
          message: `长时间未操作，将在${Math.ceil(
            (interval - (new Date().getTime() - this.lastClickTime)) / 1000
          )}秒后自动退出(点击任意位置可继续操作)`,
          type: "warning"
        });
      }
    }, 1000);
  },
  beforeCreate() {
    if (Cookies.get("cid") === null || Cookies.get("cid") === undefined) {
      Cookies.set("cid", "C01613");
    }
    if (
      Cookies.get("customerType") === null ||
      Cookies.get("customerType") === undefined
    ) {
      Cookies.set("customerType", "02");
    }
  },
  created() {
    this.getMenuTree(); //获得菜单权限树
    this.userMoney(); //获得用户余额
    this.getPath();
    this.addTab("main");
    this.addTab(this.defaultUrl);
    this.addBadgeIcon();
    this.PaintingIcon();
    this.OrderDealIcon();
    this.getStatementIcon();
    this.payDelegationIcon1();
    this.payDelegationIcon2();
    this.lanjuIcon();
    this.lanJuMarketExamineIcon();
    this.lanJuGMExamineIcon();
    this.complaintIcon();
    this.complaintReplyIcon();
    document.onkeydown = function(event) {
      var key = window.event.keyCode;
      if (key == 27) {
        if (this.fullscreen == true) {
          this.handleFullScreen();
        }
      }
    };
    //可以从其他页面触发刷新余额
    this.$root.$on("refreshMoneyEvent", () => {
      this.userMoney();
    });
    //获得最新公告
    if (this.customerType != "110") this.getNews();
    this.getStudy();
  },
  beforeDestroy() {
    clearInterval(this.newsTimer);
    clearInterval(this.timeOutTimer);
  },
  watch: {}
};
</script>

<style scoped>
@media (min-width: 1920px) {
  .center {
    width: 1650px;
    margin: 0 auto;
  }
}
@media (max-width: 1920px) {
  .center {
    width: 1650px;
    margin: 0 auto;
  }
}
@media (max-width: 1680px) {
  .center {
    width: 1525px;
    margin: 0 auto;
  }
}
@media (max-width: 1440px) {
  .center {
    width: 1400px;
    margin: 0 auto;
  }
}
@media (max-width: 1366px) {
  .center {
    width: 1347px;
    margin: 0 auto;
  }
}
@media (max-width: 1280px) {
  .center {
    width: 1260px;
    margin: 0 auto;
  }
} /*>=1280的设备*/
@media (max-width: 1100px) {
  .center {
    width: 1080px;
    margin: 0 auto;
  }
} /*>=1100的设备*/
@media (max-width: 1024px) {
  .center {
    width: 1000px;
    margin: 0 auto;
  }
} /*>=1024的设备*/
/*侧边栏样式*/
#aside-header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  color: #464c5b;
  font-size: 20px;
  font-weight: bold;
}
#aside-logo {
  width: 42px;
  height: 42px;
  margin-right: 15px;
  line-height: 60px;
  display: inline-block;
  border-radius: 21px;
  background: url("../assets/img/headerLogo.jpg") no-repeat;
  background-size: 42px 42px;
}
.el-menu {
  text-align: left;
}
.el-menu i {
  font-size: 18px;
  margin: 0 10px;
}
.icon-color {
  color: #303133;
}
.el-menu-item-group span {
  margin-left: 20px;
}
.el-icon-goods {
  color: #303133;
}
.el-menu-item.is-active {
  background: #8bc34a;
  color: white;
}
/*顶部导航样式*/
.el-header {
  background: #8bc34a;
  padding: 0 20px 0 10px;
}
.el-header li {
  float: left;
}
.el-header li:hover {
  cursor: pointer;
  background: #86b450;
}
.el-header i {
  line-height: 50px;
  color: white;
}
.el-header ul {
  margin: 0 10px;
}
.el-header ul:nth-child(1) i {
  font-size: 20px;
  margin: 0 10px;
}
.el-header ul:nth-child(1) li span {
  color: white;
  line-height: 50px;
  font-size: 14px;
  margin-right: 10px;
  margin-left: -10px;
}
.el-header ul:nth-child(2) li span {
  color: white;
  line-height: 50px;
  font-size: 14px;
}
.el-dropdown {
  margin: 0 15px;
}
.el-dropdown-menu__item:hover {
  color: #606266;
  background: #eee;
}
.tabs {
  margin: 0 -4px;
  padding: 0;
  width: 100%;
  height: 40px;
}
#notice {
  width: 100%;
  height: 30px;
  background: white;
  margin-bottom: 10px;
  text-align: left;
  vertical-align: middle;
  font-size: 12px;
}
.vertically {
  position: fixed;
  top: 50%;
  color: #300112;
}
.slide-enter-active {
  transition: all 0.5s linear;
}
.slide-leave-active {
  opacity: 0;
}
.slide-enter {
  opacity: 0;
}
.slide-leave-to {
  opacity: 0;
}
</style>

<style>
.passwordForm .el-form-item__label {
  width: 80px;
}
.el-transfer-panel {
  width: 300px !important;
  height: 240px !important;
}
.el-transfer-panel__list.is-filterable {
  height: 136px !important;
  width: 300px !important;
}
.el-card__header {
  padding: 10px 15px !important;
}
.el-card__body {
  padding: 15px;
}
.el-dialog__body {
  padding: 20px;
}
.el-menu-item-group__title {
  padding: 4px 0 !important;
}
.el-menu-item,
.el-submenu__title {
  height: 45px !important;
  line-height: 45px !important;
}
.el-submenu .el-menu-item {
  height: 40px !important;
  line-height: 40px !important;
}
.el-table td,
.el-table th {
  padding: 4px 0 !important;
}
.el-badge__content {
  border: none !important;
}
.el-table th.gutter {
  display: table-cell !important;
}
.el-table colgroup.gutter {
  display: table-cell !important;
}
.el-table .success-row {
  background: #f0f9eb;
}
</style>

