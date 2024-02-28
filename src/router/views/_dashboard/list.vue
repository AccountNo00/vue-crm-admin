<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";

/**
 * Dashboard Component
 */
export default {
  page: {
    title: "Dashboard",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    Layout,
  },
  data() {
    return {
      title: "Dashboard",
      items: [
        {
          text: "Dashboards",
          href: "/",
        },
        {
          text: "Default",
          active: true,
        },
      ],
      statsData: [
        {
          title: "INVENTORY",
          value: "3",
          bg: "bg-danger"
        },
        {
          title: "ACCOUNT CREATION",
          value: "4",
          bg: "bg-dark"
        },
        {
          title: "MFLSR",
          value: "2",
          bg: "custom-danger"
        },
        {
          title: "FINANCE",
          value: "5",
          bg: "bg-warning"
        },
      ],
      statsData2: [
        {
          title: "INVENTORY",
          value: "5",
          title_2: "INVENTORY",
          value_2: "5",
          bg: "custom-danger"
        },
        {
          title: "ACCOUNT CREATION",
          value: "4",
          title_2: "INVENTORY",
          value_2: "2",
          bg: "bg-success"
        },
        {
          title: "MFLSR",
          value: "2",
          title_2: "INVENTORY",
          value_2: "4",
          bg: "bg-info"
        },
      ],
    };
  },
  mounted() {
    // setTimeout(() => {
    //   this.showModal = true;
    // }, 1500);
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
        <div v-for="(stats,index) in statsData" :key="index" class="col-3 " >
            <div :class="`col-12 p-3 mb-0 ${stats.bg}`" style="border:1px solid rgb(239, 242, 247);border-radius:6px;">
                <strong><h3 class="text-white" style="font-size: 30px;">{{`${stats.value}`}}</h3></strong>
                <h6 class="text-white">{{`${stats.title}`}}</h6>
            </div>
        </div>
    </div>
    <div class="row mt-3">
        <div v-for="(stats,index) in statsData2" :key="index" class="col-4" >
            <div :class="`col-12 px-3 py-4 mb-0 ${stats.bg}`" style="border:1px solid rgb(239, 242, 247);border-radius:6px;">
                <strong><h3 class="text-white" style="font-size: 30px;">{{`${stats.value}`}}</h3></strong>
                <h6 class="text-white">{{`${stats.title}`}}</h6>
                <strong><h3 class="text-white" style="font-size: 30px;">{{`${stats.value_2}`}}</h3></strong>
                <h6 class="text-white">{{`${stats.title_2}`}}</h6>
            </div>
        </div>
    </div>
  </Layout>
</template>
<style scoped>
.custom-danger{
    background: rgb(181, 15, 1);
}
</style>