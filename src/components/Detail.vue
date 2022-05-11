<template>
  <div>
    <q-card-section>
      <section id="first-section-detail">
        <div class="row">
          <div class="col-md-4 col-lg-4 text-weight-bold">Detail</div>
          <div class="col-md-8 col-lg-8">
            Name<small style="color: red">*</small>

            <q-select
              outlined
              v-model="data"
              :options="listEmployee"
              label="Name"
              style="max-width: 80%"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 col-lg-4 text-weight-bold"></div>
          <div class="col-md-8 col-lg-8 q-mt-lg q-mb-md">
            Distribution Center<small style="color: red">*</small>

            <q-select
              outlined
              v-model="distribution"
              :options="listDistribution"
              label="Distribution Center"
              style="max-width: 45%"
            />
          </div>
        </div>
      </section>
      <section id="second-section-detail" v-if="filledFirstSectionDetail">
        <div class="row">
          <div class="col-md-4 col-lg-4 text-weight-bold"></div>
          <div class="col-md-8 col-lg-8 q-mt-md">
            <div class="row">
              <div class="col-6">
                Payment Type<small style="color: red">*</small>
                <q-select
                  outlined
                  v-model="paymentType"
                  :options="listPaymentType"
                  label="Payment Type"
                  style="max-width: 90%"
                />
              </div>
              <div class="col-6">
                Expired Date<small style="color: red">*</small>
                <q-input filled v-model="date" mask="date" :rules="['date']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="date">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 col-lg-4 text-weight-bold"></div>
          <div class="col-md-8 col-lg-8 q-mt-lg q-mb-lg">
            Notes

            <q-input
              v-model="notes"
              filled
              type="textarea"
              style="max-width: 80%"
            />
          </div>
        </div>
      </section>

      <q-separator inset />

      <section id="product-section" v-if="filledSectionProducts">
        <div class="row q-ma-md">
          <div class="col-md-4 col-lg-4 text-weight-bold">Product</div>
          <div class="col-md-8 col-lg-8">
            <div class="row">
              <div class="col-md-9">
                Product<small style="color: red">*</small>

                <q-select
                  outlined
                  v-model="productName"
                  :options="listNameProduct"
                  label="Product Name"
                  style="max-width: 95%"
                />
              </div>
              <div class="col-md-3">
                Unit<small style="color: red">*</small>

                <q-select
                  outlined
                  v-model="unit"
                  :options="listNameUnit"
                  label="Unit"
                  style="max-width: 100%"
                />
              </div>
            </div>
            <div class="row q-mt-md">
              <div class="col-md-3">
                Quantity<small style="color: red">*</small>

                <q-input
                  outlined
                  v-model="quantity"
                  label="Quantity"
                  type="number"
                  style="max-width: 90%"
                  :readonly="filled"
                  :disable="filled"
                />
              </div>
              <div class="col-md-3">
                Price<small style="color: red">*</small>

                <q-input
                  outlined
                  disable
                  readonly
                  v-model="price"
                  type="number"
                  label="Price"
                  style="max-width: 80%"
                />
              </div>
              <div class="col-md-6">
                Total Price<small style="color: red">*</small>

                <q-input
                  outlined
                  v-model="totalPrice"
                  :disable="true"
                  label="Product Name"
                  type="number"
                  style="
                    max-width: 100%;
                    margin-bottom: 20px;
                    background-color: #c0c0c0;
                  "
                />
                <q-separator color="grey" size="3px" />
                <div class="row q-mt-sm text-weight-bolder">
                  <div class="col-md-6">Total Nett Price</div>
                  <div
                    class="col-md-6"
                    style="display: flex; justify-content: flex-end"
                  >
                    <p>{{ price }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="section-add-product" v-if="filledSectionProducts">
        <div class="row q-ma-md">
          <div class="col-md-4 col-lg-4"></div>
          <div class="row col-md-8 col-lg-8">
            <div class="col-md-6">
              <q-btn
                color="warning"
                icon-right="add"
                label="NEW ITEM"
                @click="addItem"
              />
            </div>
            <div class="row col-md-6 q-mt-xl text-weight-bolder">
              <div class="col-md-6">Total</div>
              <div
                class="col-md-6"
                style="display: flex; justify-content: flex-end"
              >
                {{ price }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <q-separator inset />
      <div class="row justify-end q-pa-md">
        <q-btn
          flat
          style="color: grey"
          label="Cancel"
          class="q-mr-md"
          @click="cancelBtn"
        />
        <q-btn
          flat
          label="Confirm"
          :class="
            disableButton == false ? 'q-mr-md bg-positive' : 'q-mr-md bg-grey-3'
          "
          :style="disableButton == false ? 'color: white;' : ''"
          :disable="disableButton"
          @click="confirmBtn"
        />
      </div>
    </q-card-section>
  </div>
</template>

<script>
export default {
  name: "Detail",

  props: {
    value_data: String,
    listEmployee: Array,
    value_distribution: String,
    value_listDistribution: Array,
    value_filledFirstSectionDetail: Boolean,
    value_paymentType: String,
    listPaymentType: Array,
    value_date: String,
    value_notes: String,
  },
  mounted() {
    for (const data of this.listProduct) {
      this.listNameProduct.push(data.product_name);
    }

    this.data = this.value_data;
    this.distribution = this.value_distribution;
    this.listDistribution = this.value_listDistribution;
    this.paymentType = this.value_paymentType;
    this.date = this.value_date;
  },
  data() {
    return {
      data: "",
      paymentType: "",
      date: "",
      listDistribution: [],
      filledFirstSectionDetail: false,
      listNameProduct: [],
      listNameUnit: [],
      distribution: "",
      notes: "",
      exxpiredDate: "",
      quantity: "",
      price: 0,
      totalPrice: 0,
      productName: "",
      unit: "",
      filled: true,
      filledSectionProducts: false,
      disableButton: true,
      listProduct: [
        {
          product_name: "Morning Dew Milk",
          units: [
            { name: "Karton", price: 20000 },
            { name: "Pak", price: 25000 },
            { name: "Pcs", price: 10000 },
          ],
        },
        {
          product_name: "Le Minerale 600ml",
          units: [
            { name: "Karton", price: 50000 },
            { name: "Pak", price: 75000 },
          ],
        },
        {
          product_name: "Greenfields Full Cream Milk 1L",
          units: [
            { name: "Karton", price: 100000 },
            { name: "Pak", price: 80000 },
            { name: "Pcs", price: 400000 },
          ],
        },
      ],
    };
  },
  watch: {
    data() {
      if (this.data !== "" || this.data !== undefined || this.data !== null) {
        this.listDistribution = [];
        this.listDistribution.push("DC Tangerang", "DC Cikarang");
      }
    },
    distribution() {
      this.listDistribution = [];
      this.listDistribution.push("No data available");
      if (this.data !== "" && this.distribution !== "") {
        this.filledFirstSectionDetail = true;
        this.filledSectionProducts = true;
      }
    },
    productName() {
      this.unit = "";
      this.listNameUnit = [];

      if (
        this.productName !== "" &&
        this.productName !== null &&
        this.productName !== undefined
      ) {
        let objectProduct = this.listProduct.find((x) => {
          return x.product_name === this.productName;
        });

        for (const data of objectProduct.units) {
          this.listNameUnit.push({
            label: data.name,
            value: data.price,
          });
        }
      }
    },
    unit() {
      let objectUnit = this.listNameUnit.find((x) => {
        return x === this.unit;
      });

      this.price = objectUnit.value;
      this.filled = false;
    },
    quantity() {
      if (this.quantity == "") {
        this.disableButton = true;
      }
      if (this.quantity == 0 && this.quantity !== "") {
        this.quantity = "";

        this.$q.notify(
          {
            message: "Quantity can't 0, please try again",
            color: "red",
            position: "top-right",
          },
          1000
        );

        return;
      }

      let objectUnit = this.listNameUnit.find((x) => {
        return x === this.unit;
      });
      this.price = objectUnit.value;

      if (
        this.quantity !== "" &&
        this.quantity !== null &&
        this.quantity !== undefined
      ) {
        this.price = this.price * this.quantity;
        this.disableButton = false;
      }
    },
    price() {
      if (
        this.price !== "" &&
        this.price !== null &&
        this.price !== undefined
      ) {
        this.totalPrice = this.price;
      }
    },
  },
  methods: {
    onChangeData(e) {
      this.$emit("update_data", e.target.value);
    },
    onChangeDistribution(e) {
      this.$emit("update_distribution", e.target.value);
    },
    onChangeListDistribution(e) {
      this.$emit("update_listDistribution", e.target.value);
    },
    onChangePaymentType(e) {
      this.$emit("update_paymentType", e.target.value);
    },
    onChangeDate(e) {
      this.$emit("update_date", e.target.value);
    },
    addItem() {
      // this.items.push({ type: "Product" });
      this.$q.notify({
        message: "soon",
        color: "green",
        position: "top-right",
      });
    },
    confirmBtn() {
      this.$q.notify({
        message: "soon",
        color: "green",
        position: "top-right",
      });
    },
    cancelBtn() {
      this.$q.notify({
        message: "soon",
        color: "green",
        position: "top-right",
      });
    },
  },
};
</script>
