<template>
  <div class="row">
    <data-table
      :endPoint="'/client'"
      tableTitle="Clients"
      :optionColumns="arr"
    />
  </div>
</template>

<script>
import DataTable from 'components/DataTable/DataTable.vue';

export default {
  components: { DataTable },
  data() {
    return {
      arr: []
    };
  }
};
</script>

<style>
.divContent {
  height: 94.9vh;
}
</style>
