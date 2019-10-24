<template>
  <div>
    <el-card shadow="hover" class="clearfix">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="墙纸" name="wallPaper">
          <ShoppingWallPaper v-if="activeName =='wallPaper'" :wallpaperData="wallpaperData"></ShoppingWallPaper>
        </el-tab-pane>
        <el-tab-pane label="窗帘" name="curtain">
          <ShoppingCurtain v-if="activeName =='curtain'" :curtainData="curtainData"></ShoppingCurtain>
        </el-tab-pane>
        <el-tab-pane label="软装" name="softSuit">
          <ShoppingSoftSuit v-if="activeName =='softSuit'" :softsuitData="softsuitData"></ShoppingSoftSuit>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import ShoppingWallPaper from "./shoppingWallPaper";
import ShoppingCurtain from "./shoppingCurtain";
import ShoppingSoftSuit from "./shoppingSoftSuit";
import { getUserMarket } from "@/api/shop";
import { GetCartItem } from "@/api/shopASP";
import { mapMutations, mapActions } from "vuex";
import { mapState } from "vuex";
import Cookies from "js-cookie";

export default {
  name: "Shopping",
  data() {
    return {
      searchKey: "",
      allData: [],
      wallpaperData: [],
      curtainData: [],
      softsuitData: []
    };
  },
  components: {
    ShoppingWallPaper,
    ShoppingCurtain,
    ShoppingSoftSuit
  },
  methods: {
    async init() {
      var tempData = await getUserMarket({
        CID: Cookies.get("cid")
      });
      var temp = await GetCartItem({
        cid: Cookies.get("cid"),
        commodityType:'soft'
      });
      this.allData = tempData.data.cartItems;
      console.log(tempData.data);
      console.log(temp)
      this.wallpaperData = this.allData.wallpaper;
      this.curtainData = this.allData.curtain;
      this.softsuitData = this.allData.soft;
    },
    ...mapMutations("navTabs", ["addTab"]),
    ...mapActions("navTabs", ["closeTab", "closeToTab"]),
    handleClick(tab, event) {
      this.addTab("shoppingCar/shopping" + "?" + tab.name);
      this.$router.push({
        path: "/shoppingCar/shopping" + "?" + tab.name
      });
    }
  },
  computed: {
    activeName: {
      get() {
        return this.$store.state.navTabs.activeUrlName.split("?")[1];
        return this.$store.state.navTabs.activeParam;
      },
      set(value) {
        //console.log(value);
        //this.$store.commit('navTabs/setActiveTabName','shoppingCar/shopping');
        //this.$store.commit("navTabs/setActiveUrlName", 'shoppingCar/shopping');
      }
    }
  },
  created() {
    //this.init();
  }
};
</script>

<style scoped>
#shopSearchBox div:hover {
  cursor: pointer;
}
#searchBtn {
  color: #101010;
}
</style>