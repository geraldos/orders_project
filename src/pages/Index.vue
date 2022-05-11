<template>
  <q-card flat bordered class="my-card bg-grey-3">
    <q-card-section>
      <main>
        <div class="text-h6">Create Order</div>

        <q-card flat bordered class="my-card">
          <Detail
            :value_data="data"
            :listEmployee="listEmployee"
            :value_distribution="distribution"
            :value_listDistribution="listDistribution"
            :value_filledFirstSectionDetail="filledFirstSectionDetail"
            :value_paymentType="paymentType"
            :listPaymentType="listPaymentType"
            :value_date="date"
            :value_notes="notes"
            @update_data="updateData"
            @update_distribution="updateDistribution"
            @update_paymentType="updatePaymentType"
            @update_date="updateDate"
            @update_listDistribution="updateListDistribution"
          />
        </q-card>
      </main>
    </q-card-section>
  </q-card>
</template>

<script>
import { date } from "quasar";
import ApiService from "../libs/api/api";
import Detail from "../components/Detail.vue";

const timeStamp = Date.now();
const formattedDatePicker = date.formatDate(timeStamp, "YYYY/MM/DD");

export default {
  name: "PageIndex",
  components: {
    Detail,
  },
  data() {
    return {
      listEmployee: [],
      listDistribution: [],
      listPaymentType: [
        "Cash H+1",
        "Cash H+3",
        "Cash H+7",
        "Transfer H+1",
        "Transfer H+3",
        "Transfer H+7",
      ],
      listNameProduct: [],
      listNameUnit: [],
      data: "",
      distribution: "",
      notes: "",
      paymentType: "",
      exxpiredDate: "",
      date: "",
      quantity: "",
      price: 0,
      totalPrice: 0,
      productName: "",
      unit: "",
      filledFirstSectionDetail: false,
      filled: true,
    };
  },
  mounted() {
    this.getAllEmployee();
    this.date = formattedDatePicker;
  },
  methods: {
    async getAllEmployee() {
      const Service = await ApiService.getInstance(this);
      this.$q.loading.show({
        message: "Some important process  is in progress. Hang on...",
      });

      try {
        this.listDistribution = [];
        this.listDistribution.push("No data available");
        const response = await Service.getAllEmployee();

        for (const data of response) {
          this.listEmployee.push(data.employee_name);
        }

        this.$q.loading.hide();
      } catch (error) {
        this.listDistribution = [];
        this.listDistribution.push("No data available");
        this.$q.loading.hide();

        this.$q.notify({
          message: error.message,
          color: "red",
          position: "top-right",
        });
      }
    },
    updateData(data) {
      this.data = data;
    },
    updateDistribution(distribution) {
      this.distribution = distribution;
    },
    updatePaymentType(paymentType) {
      this.paymentType = paymentType;
    },
    updateDate(date) {
      this.date = date;
    },
    updateListDistribution(listDistribution) {
      this.listDistribution = listDistribution;
    },
  },
};
</script>
