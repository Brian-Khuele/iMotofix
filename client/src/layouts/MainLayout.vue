<template>
  <div class="main">
    <q-layout view="hHh Lpr lff" container style="height: 100vh">
      <q-header elevated class="bg-mainColor">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>iMotofix</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = false"
        :width="300"
        :breakpoint="500"
        content-class="sideBar"
      >
        <q-scroll-area class="fit bg-mainColor">
          <q-list
            bordered
            class="padding"
            v-for="(menuItem, index) in menuItems"
            :key="index + menuItem.title"
          >
            <q-expansion-item
              expand-separator
              :icon="menuItem.icon"
              :label="menuItem.title"
              :caption="menuItem.caption"
              default-opened
              :key="index"
              header-class="menuLinks"
              :expand-icon="menuItem.subItems ? `expand_more` : `null`"
              :to="menuItem.to"
            >
              <template v-for="(subItem, index) in menuItem.subItems">
                <q-expansion-item
                  :key="index"
                  expand-separator
                  :icon="subItem.icon"
                  :label="subItem.title"
                  :caption="subItem.caption"
                  default-opened
                  clickable
                  expand-icon="null"
                  :header-inset-level="1"
                  :content-inset-level="1"
                  :to="subItem.to"
                  class="subMenu"
                ></q-expansion-item>
              </template>
            </q-expansion-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page class="mainContent">
          <router-view class="routerView" />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { menuItems } from './menuItems';

export default {
  data() {
    return {
      drawer: true,
      miniState: false,
      menuItems,
    };
  },
  computed: {
    ...mapGetters('module', []),
  },
  methods: {
    ...mapActions('module', []),
  },
  mounted() {
    //something here
  },
};
</script>

<style lang="scss">
.subMenu {
  overflow: hidden;
}
</style>
