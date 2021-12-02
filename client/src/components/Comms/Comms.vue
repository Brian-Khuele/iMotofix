<template>
  <q-form ref="emailSender" class="formEmail">
    <div class="row q-gutter-lg emailSender">
      <div class="col">
        <q-input
          v-model="email.to"
          ref="to"
          hint="Type 'All' to broadcast to all clients."
          outlined
          label="to"
          dense
          lazy-rules
          :rules="[val => (val && val.length > 0) || `Value may not be blank`]"
        />
        <hr />
        <q-input
          v-model="email.subject"
          ref="subject"
          outlined
          label="subject"
          dense
          lazy-rules
          :rules="[val => (val && val.length > 0) || `Value may not be blank`]"
        />
        <hr />
        <q-input
          v-model="email.message"
          ref="message"
          outlined
          label="Message"
          type="textarea"
          dense
          lazy-rules
          :rules="[val => (val && val.length > 0) || `Value may not be blank`]"
        />
      </div>
    </div>
    <q-btn class="btn" @click="sendEmail" color="primary" label="Send" />
  </q-form>
</template>

<script>
export default {
  data() {
    return {
      email: {}
    };
  },
  methods: {
    sendEmail() {
      if (this.email.to.toUpperCase() == 'ALL') {
        this.$q.notify(
          'Please note that broadcasting to ALL clients will happen in the background as it may take long.'
        );
      }
      this.$refs['emailSender'].validate().then(async success => {
        if (success) {
          try {
            const response = await this.$axios.post(
              '/communication/send',
              this.email
            );
            this.$q.notify(response.data['message']);
          } catch ({ response }) {
            this.$q.notify(response.data['message']);
          }
        } else {
          this.$q.notify('Fill in all missing required fields');
        }
      });
    }
  }
};
</script>

<style lang="scss">
.formEmail {
  display: flex;
  flex-direction: column;
  padding: 20px;

  div {
    margin: 0;
  }
}

.emailSender {
  margin: 15px;
  padding: 10px;
  box-shadow: 0px 0px 8px 2px gray !important;
  border-radius: 8px;
}

.btn {
  margin-top: 10px;
}

.q-field__bottom {
  padding: 1px;
  color: black;
}
</style>
