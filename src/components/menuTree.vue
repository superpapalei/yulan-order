<template>
  <!-- 有子节点，用el-menu-item-group -->
  <el-submenu
    v-if="
      menuTreeItem.children &&
        menuTreeItem.children.length >= 1 &&
        menuTreeItem.MENU_TYPE == 'menu'
    "
    :index="menuTreeItem.MENU_LINK"
  >
    <template slot="title">
      <i
        v-if="
          menuTreeItem.ICON_CLASS != '' &&
            menuTreeItem.ICON_CLASS.indexOf('&') > -1
        "
        class="iconfont icon-color"
        v-html="menuTreeItem.ICON_CLASS"
        >{{ menuTreeItem.ICON_CLASS }}</i
      >
      <i
        v-else-if="
          menuTreeItem.ICON_CLASS != '' &&
            menuTreeItem.ICON_CLASS.indexOf('&') == -1
        "
        :class="menuTreeItem.ICON_CLASS"
      ></i>
      <span slot="title">{{ menuTreeItem.MENU_NAME }}</span>
    </template>
    <el-menu-item-group>
      <menuTree
        v-for="item in menuTreeItem.children"
        :key="item.SYSTEMMENU_ID"
        :menuTreeItem="item"
      ></menuTree>
    </el-menu-item-group>
  </el-submenu>
  <!-- 没有子节点，直接el-menu-item -->
  <router-link
    v-else-if="menuTreeItem.MENU_TYPE == 'menu'"
    :to="'/' + menuTreeItem.MENU_LINK"
    tag="div"
  >
    <el-menu-item :index="menuTreeItem.MENU_LINK">
      <i
        v-if="
          menuTreeItem.ICON_CLASS != '' &&
            menuTreeItem.ICON_CLASS.indexOf('&') > -1
        "
        class="iconfont icon-color"
        v-html="menuTreeItem.ICON_CLASS"
        >{{ menuTreeItem.ICON_CLASS }}</i
      >
      <i
        v-else-if="
          menuTreeItem.ICON_CLASS != '' &&
            menuTreeItem.ICON_CLASS.indexOf('&') == -1
        "
        :class="menuTreeItem.ICON_CLASS"
      ></i>
      <span slot="title">{{ menuTreeItem.MENU_NAME }}</span>
      <el-badge
        v-if="getAllBadge(menuTreeItem.MENU_LINK) > 0"
        class="mark r"
        :value="getAllBadge(menuTreeItem.MENU_LINK)"
      ></el-badge>
    </el-menu-item>
  </router-link>
</template>

<script>
export default {
  name: "menuTree",
  props: {
    menuTreeItem: {
      type: Object,
      required: true
    }
  },
  methods: {
    getAllBadge(value) {
      switch (value) {
        case "painting": //委托喷绘（用户）
          return this.$store.state.badge.painting;
        case "refundCompensation": //退货赔偿
          return this.$store.state.badge.refund;
        case "order/myOrder"://待处理订单
          return this.$store.state.badge.orderDeal;
        case "statement"://待确认对账单
          return this.$store.state.badge.statement;  
        case "supplierModule/payDelegation":
          return this.$store.state.badge.payDelegation1; //待编辑的付款委托书单据（客户）
        case "supplierModule/payDelegationExamine":
          return this.$store.state.badge.payDelegation2; //待编辑的付款委托书单据（公司）
        case "design/lanJu":
          return this.$store.state.badge.lanju1; //兰居设计中可编辑的已退回单据（客户）
        case "design/lanJuMarketExamine":
          return this.$store.state.badge.lanju2; //兰居设计中可审核的单据（市场部）
        case "design/lanJuGMExamine":
          return this.$store.state.badge.lanju3; //兰居设计中可审核的单据（广美）
        case "complaint":
          return this.$store.state.badge.complaint1; //物流投诉中可进行评价的单据个数（用户评价）
        case "complaintReply":
          return this.$store.state.badge.complaint2; //物流投诉中未处理的单据个数（公司处理）
        case "design/imageShop":
          return this.$store.state.badge.imageShop1; //形象店设计中可编辑的单据个数（客户）
        case "design/ISExamineMarket":
          return this.$store.state.badge.imageShop2; //形象店设计中可编辑的单据个数（兰居）
        case "design/ISExamineGM":
          return this.$store.state.badge.imageShop3; //形象店设计中可编辑的单据个数（广美）
        default:
          return 0;
      }
    }
  }
};
</script>

<style scoped>
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
.el-submenu .el-menu-item {
  padding: 0 25px;
}
</style>