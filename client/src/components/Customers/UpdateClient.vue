<template>
  <div class="q-pa-md divContent">
    <q-form
      @submit.prevent.stop="onSubmit"
      @reset.prevent.stop="onReset"
      ref="updateClient"
    >
      <label for="Id_Number"
        >Enter ID number of the client you wish to update</label
      >
      <q-input
        v-model="client.Id_Number"
        ref="Id_Number"
        outlined
        label="Id Number"
        dense
        lazy-rules
        :rules="[val => (val && val.length > 0) || `Value may not be blank`]"
        @keypress.enter="getClientInfo"
      />
      <div class="row q-gutter-lg client">
        <div class="col">
          <q-input
            v-model="client.Last_Name"
            ref="Last_Name"
            outlined
            label="Surname"
            dense
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || `Value may not be blank`
            ]"
          />
          <q-input
            v-model="client.First_Name"
            ref="First_Name"
            outlined
            label="First name"
            dense
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || `Value may not be blank`
            ]"
          />
          <q-input
            v-model="client.Email"
            ref="Email"
            outlined
            label="Email address"
            dense
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || `Value may not be blank`
            ]"
          />
          <q-input
            v-model="client.Contact_Number"
            ref="Contact_Number"
            outlined
            label="Contact Number"
            dense
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || `Value may not be blank`
            ]"
          />
        </div>
        <div class="col">
          <q-input
            v-model="client.StreetNumber"
            ref="StreetNumber"
            outlined
            label="Street Address"
            dense
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || `Value may not be blank`
            ]"
          />
          <q-input
            v-model="client.Surburb"
            ref="Surburb"
            outlined
            label="Surburb"
            dense
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || `Value may not be blank`
            ]"
          />
          <q-input
            v-model="client.City"
            ref="City"
            outlined
            label="City"
            dense
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || `Value may not be blank`
            ]"
          />
          <q-input
            v-model="client.Province"
            ref="Province"
            outlined
            label="Province"
            dense
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || `Value may not be blank`
            ]"
          />
          <q-input
            v-model="client.PostalCode"
            ref="PostalCode"
            outlined
            label="Postal Code"
            dense
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || `Value may not be blank`
            ]"
          />
        </div>
      </div>
      <q-btn class="btn" @click="validateForm" color="primary" label="Save" />
      <q-btn
        color="red"
        @click="client = {}"
        label="Reset"
        class="q-ml-sm btn"
      />
    </q-form>
  </div>
</template>

<script>
export default {
  name: 'UpdateClient',
  props: {
    mode: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      step: 0,
      client: {},
      loading: false
    };
  },

  computed: {},
  methods: {
    async getClientInfo() {
      //get Client info
      try {
        const request = await this.$axios.get(
          `/client/${this.client.Id_Number}`
        );
        this.client = request.data[0];
        console.log(this.client);
      } catch ({ response }) {
        this.$q.notify(response.data.message);
      }
    },
    validateForm() {
      this.$q.notify(this.mode);
      // eslint-disable-next-line no-use-before-define
      this.$refs.updateClient.validate().then(async success => {
        if (success) {
          // TODO: the information has been succesfully validated, go to next step
          try {
            const request = await this.$axios.post(
              '/client/update',
              this.client
            );
            this.$q.notify('response:' + request.status);
          } catch ({ response }) {
            this.$q.notify('Error: ' + response.data.message);
          }
        } else {
          // eslint-disable-next-line no-use-before-define
          alert(
            'Check that all information has been entered before proceeding!'
          );
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.stepnav {
  display: flex;
  padding: 10px;
}
</style>
