<template>
  <div class="row bookings">
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="NewBooking" label="New bookings" />
      <q-tab name="ViewBookings" label="View bookings" />
      <q-tab name="Pending" label="Pending bookings" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="NewBooking">
        <div class="text-h6">Booking information</div>
        <div class="row tabPanelBookingInfo">
          <div class="col">
            <q-form ref="createBooking" class="formEmail">
              <div class="row">
                <div class="col">
                  <q-input
                    v-model="booking.Client_Id"
                    ref="Client_Id"
                    outlined
                    label="Client ID"
                    dense
                    lazy-rules
                    :rules="[
                      val => (val && val.length > 0) || `Value may not be blank`
                    ]"
                  />
                  <q-input
                    v-model="booking.Car_Make"
                    ref="Car_Make"
                    outlined
                    label="Car make"
                    dense
                    lazy-rules
                    :rules="[
                      val => (val && val.length > 0) || `Value may not be blank`
                    ]"
                  />
                  <q-input
                    v-model="booking.Car_Model"
                    ref="Car_Model"
                    outlined
                    label="Car model"
                    dense
                    lazy-rules
                    :rules="[
                      val => (val && val.length > 0) || `Value may not be blank`
                    ]"
                  />
                  <q-input
                    v-model="booking.Car_Year"
                    ref="Car_Year"
                    outlined
                    label="Car year"
                    dense
                    lazy-rules
                    :rules="[
                      val => (val && val.length > 0) || `Value may not be blank`
                    ]"
                  />
                  <q-input
                    v-model="booking.Car_VIN"
                    ref="Car_VIN"
                    outlined
                    label="Car VIN"
                    dense
                    lazy-rules
                    :rules="[
                      val => (val && val.length > 0) || `Value may not be blank`
                    ]"
                  />
                  <q-input
                    v-model="booking.Work_Description"
                    ref="Car_Work_Description"
                    outlined
                    label="Work description. What needs to be done to the vehicle?"
                    dense
                    lazy-rules
                    :rules="[
                      val => (val && val.length > 0) || `Value may not be blank`
                    ]"
                  />
                </div>
                <div class="col">
                  <q-input
                    v-model="booking.BookIn_InspectionNotes"
                    ref="BookIn_InspectionNotes"
                    outlined
                    label="Pre booking notes. Car condition before booking in, be as detailed as possible."
                    type="textarea"
                    dense
                    lazy-rules
                    :rules="[
                      val => (val && val.length > 0) || `Value may not be blank`
                    ]"
                  />
                  <q-input
                    v-model="booking.BelongingsNotes"
                    ref="BelongingsNotes"
                    outlined
                    label="Client belongings at booking (what items are in the car?)"
                    type="textarea"
                    dense
                    lazy-rules
                    :rules="[
                      val => (val && val.length > 0) || `Value may not be blank`
                    ]"
                  />
                </div>
              </div>
            </q-form>
          </div>
          <div class="col">
            <q-btn
              class="btn"
              @click="createBooking"
              color="primary"
              label="Create booking"
            />
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="ViewBookings">
        <div class="text-h6">Active & Past bookings</div>
        <data-table
          :endPoint="'/bookings'"
          tableTitle="Bookings"
          :optionColumns="arr"
        />
      </q-tab-panel>

      <q-tab-panel name="Pending"> </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import DataTable from 'components/DataTable/DataTable.vue';

export default {
  components: { DataTable },
  data() {
    return {
      tab: 'NewBooking',
      booking: {},
      arr: []
    };
  },
  methods: {
    createBooking() {
      this.$refs['createBooking']
        .validate()
        .then(async success => {
          if (success) {
            try {
              const response = await this.$axios.post(
                '/bookings',
                this.booking
              );

              this.$q.notify(response.data['message']);
            } catch ({ response }) {}
          } else {
            this.$q.notify('Enter all required fields!!');
          }
        })
        .catch(error => {
          this.$q.notify('BAD');
        });
    }
  }
};
</script>

<style lang="scss">
.bookings {
  flex-direction: column;
  padding: 20px;
  box-shadow: 0px 0px 6px 2px gray !important;
  border-radius: 8px;
  margin: 20px;
}

.q-tab__label {
  font-weight: bold;
}

.tabPanelBookingInfo {
  flex-direction: column;

  .col .row {
    gap: 20px;
  }
}
</style>
