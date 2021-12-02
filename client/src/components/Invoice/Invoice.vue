<template>
  <div class="row  invoiceHeadDetails" id="invoiceHeadDetails">
    <span class="invoicePrintBtn">
      <q-btn @click="downloadPDF" label="Download PDF" icon="mail"> </q-btn>
    </span>
    <div class="col invoiceMain" id="invoiceMain">
      <div class="header row">
        <div class="col">
          <label for="file-upload" class="custom-file-upload">
            <img src="" id="imgLogo" />
          </label>
          <input id="file-upload" type="file" v-on:change="test" />

          <q-input
            stack-label
            label="What's the name of your business?"
            dense
            outlined
            class="businessName"
            v-model="invoiceData.businessName"
            autogrow
          ></q-input>

          <div class="row receipient">
            <div class="col">
              <q-input
                stack-label
                label="Who is the invoice for?"
                outlined
                dense
                class="receipient"
                v-model="invoiceData.recepient"
              ></q-input>
            </div>
            <div class="col">
              <q-input
                stack-label
                dense
                label="Delivery address?"
                outlined
                class="address"
                v-model="invoiceData.shipppingAddress"
              ></q-input>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="row">
            <div class="col">
              <q-input
                stack-label
                dense
                label="Invoice title"
                outlined
                class="invoiceTitle"
                v-model="invoiceData.invoiceTitle"
              >
              </q-input>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-input
                stack-label
                dense
                label="Invoice number"
                mask="##########"
                outlined
                class="invoiceNumber"
                v-model="invoiceData.invoiceNumber"
              >
                <template v-slot:prepend>
                  <q-icon name="plus_one" />
                </template>
              </q-input>
            </div>
          </div>

          <div class="row invoiceDate">
            <div class="col">
              <label for="invoiceDate">Date of Invoice</label>
            </div>
            <div class="col">
              <q-input
                stack-label
                dense
                type="date"
                id="invoiceDate"
                outlined
                class="invoiceDate"
                v-model="invoiceData.invoiceDate"
              >
              </q-input>
            </div>
          </div>
          <div class="row invoiceDueDate">
            <div class="col">
              <label for="dueDate">Due date</label>
            </div>
            <div class="col">
              <q-input
                stack-label
                type="date"
                dense
                id="dueDate"
                outlined
                class="invoiceDueDate"
                v-model="invoiceData.invoiceDueDate"
              >
              </q-input>
            </div>
          </div>

          <div class="row balanceDue">
            <div class="col">
              <label for="balanceDue">Balance due</label>
            </div>
            <div class="col">
              <q-input
                stack-label
                dense
                id="balanceDue"
                outlined
                class="balanceDue"
                readonly
                prefix="R"
                v-model="invoiceData.balanceDue"
              >
              </q-input>
            </div>
          </div>
        </div>
      </div>

      <q-table
        virtual-scroll
        :pagination.sync="pagination"
        :rows-per-page-options="[0]"
        :data="data"
        :columns="columns"
        row-key="name"
        dense
        hide-bottom
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
            <q-th auto-width />
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              v-for="(col, Index) in props.cols"
              :key="col.name"
              :props="props"
            >
              <template v-if="Index == props.cols.length - 1">
                <q-input
                  :value="calculateLineTotal(props.rowIndex)"
                  input-class="text-right"
                  stack-label
                  dense
                  readonly
                  outlined
                ></q-input>
              </template>
              <template
                v-else-if="col.name == 'Quantity' || col.name == 'Rate'"
              >
                <q-input
                  stack-label
                  mask="#.##"
                  fill-mask="0"
                  reverse-fill-mask
                  input-class="text-right"
                  dense
                  outlined
                  v-model="data[props.rowIndex][col.name]"
                ></q-input>
              </template>
              <template v-else>
                <q-input
                  stack-label
                  autogrow
                  dense
                  outlined
                  v-model="data[props.rowIndex][col.name]"
                ></q-input>
              </template>
            </q-td>
            <q-td auto-width>
              <q-btn
                size="sm"
                color="accent"
                round
                dense
                @click="removeLineItem(props)"
                icon="remove"
                class="btn"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <q-btn
        label="Add line item"
        class="btn btnAddItem"
        icon="add"
        @click="addLineItem"
      >
      </q-btn>
      <div class="row bottomSection">
        <div class="col">
          <div>
            <q-input
              dense
              outlined
              class="inputLabel"
              value="Add extra information"
            >
            </q-input>
            <q-input
              autogrow
              stack-label
              dense
              outlined
              id="notes"
              class="notes"
              v-model="invoiceData.notes"
            >
            </q-input>
          </div>
          <div>
            <q-input
              dense
              outlined
              class="inputLabel"
              value="Perhaps add your banking details here?"
            >
            </q-input>
            <q-input
              autogrow
              stack-label
              dense
              outlined
              id="miscData"
              class="miscData"
              v-model="invoiceData.misc"
            >
            </q-input>
          </div>
        </div>
        <div class="col">
          <div class="row totalDivs">
            <div class="col">
              <q-input
                dense
                outlined
                class="inputLabel"
                value="Amount excluding VAT"
                input-class="text-right"
              >
              </q-input>
            </div>
            <div class="col">
              <q-input
                stack-label
                dense
                outlined
                class="SubTotal"
                input-class="text-right"
                :prefix="currencySymbol"
                v-model="invoiceData.subTotal"
                readonly
              >
              </q-input>
            </div>
          </div>
          <div class="row totalDivs">
            <div class="col">
              <div class="row">
                <div class="col">
                  <q-input
                    dense
                    outlined
                    class="inputLabel"
                    value="VAT"
                    input-class="text-right"
                  >
                  </q-input>
                </div>
                <div class="col">
                  <q-input
                    dense
                    outlined
                    value="15"
                    hint="Enter VAT %"
                    input-class="text-right"
                    v-model="vatPercentage"
                  >
                  </q-input>
                </div>
              </div>
            </div>
            <div class="col">
              <q-input
                stack-label
                dense
                outlined
                class="Tax"
                :prefix="currencySymbol"
                v-model="invoiceData.vat"
                input-class="text-right"
                readonly
              >
              </q-input>
            </div>
          </div>
          <div class="row totalDivs">
            <div class="col">
              <q-input
                dense
                outlined
                class="inputLabel"
                value="Total"
                input-class="text-right"
              >
              </q-input>
            </div>
            <div class="col">
              <q-input
                stack-label
                dense
                outlined
                class="Total"
                :prefix="currencySymbol"
                readonly
                input-class="text-right"
                v-model="invoiceData.total"
              >
              </q-input>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfMake from 'pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export default {
  name: 'Invoice',
  data() {
    return {
      imageData: '',
      data: [
        {
          Item: '',
          Quantity: 0,
          Rate: 0,
          Total: 0
        }
      ],
      columns: [
        {
          name: 'Item',
          align: 'left',
          label: 'Item',
          field: 'Item',
          sortable: false
        },
        {
          name: 'Quantity',
          align: 'left',
          label: 'Quantity',
          field: 'Quantity',
          sortable: false
        },
        {
          name: 'Rate',
          align: 'left',
          label: 'Unit cost',
          field: 'Rate',
          sortable: false
        },
        {
          name: 'Total',
          align: 'left',
          label: 'Total',
          field: 'Total',
          sortable: false
        }
      ],
      pagination: {
        rowsPerPage: 0
      },
      invoiceData: {
        businessName: '',
        recepient: '',
        shipppingAddress: '',
        invoiceTitle: '',
        invoiceNumber: '',
        invoiceDate: '',
        invoiceDueDate: '',
        balanceDue: 0,
        subTotal: 0,
        vat: 0,
        total: 0,
        notes: '',
        misc: ''
      },
      vatPercentage: 15,
      currencySymbol: 'R',
      vatNumber: '4550298311'
    };
  },
  methods: {
    calculateLineTotal(rowIndex) {
      const num = this.data[rowIndex]['Quantity'] * this.data[rowIndex].Rate;
      this.data[rowIndex].Total = num.toFixed(2);

      // calculate subTotal
      // this.invoiceData.subTotal += num.toFixed(2);
      this.calculateSubTotal();
      // Update running VAT
      this.calculateVAT();
      // Update the grand Total
      this.calculateTotal();

      return num.toFixed(2);
    },
    calculateSubTotal() {
      let runningTotal = 0;

      this.data.forEach(lineItem => {
        runningTotal += parseFloat(lineItem.Total);
      });

      this.invoiceData.subTotal = runningTotal.toFixed(2);
    },
    calculateVAT() {
      const vatTotal = (
        this.invoiceData.subTotal *
        (this.vatPercentage / 100)
      ).toFixed(2);
      this.invoiceData.vat = vatTotal;
      return vatTotal;
    },
    calculateTotal() {
      this.invoiceData.total = (
        parseFloat(this.invoiceData.subTotal) + parseFloat(this.invoiceData.vat)
      ).toFixed(2);

      // Set Balance due of invoice
      this.invoiceData.balanceDue = this.invoiceData.total;
    },
    test() {
      const preview = document.querySelector('img');
      const file = document.querySelector('input[type=file]').files[0];
      const reader = new FileReader();

      reader.addEventListener(
        'load',
        () => {
          // convert image file to base64 string
          preview.src = reader.result;
          this.imageData = reader.result;
        },
        false
      );

      if (file) {
        reader.readAsDataURL(file);
      }
    },
    addLineItem() {
      this.data.push({
        Item: '',
        Quantity: 0,
        Rate: 0,
        Total: 0
      });
    },
    removeLineItem(props) {
      this.data.splice(props.rowIndex, 1);
    },
    downloadPDF() {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;

      /*       pdfMake.fonts = {
                Nunito: {
          normal: 'Nunito-Light.ttf',
          bold: 'Nunito-Bold.ttf',
          italics: 'Nunito-LightItalic.ttf',
          bolditalics: 'Nunito-BoldItalic.ttf'
        },
        Roboto: {
          normal: 'fonts/Roboto-Regular.ttf',
          bold: 'fonts/Roboto-Medium.ttf',
          italics: 'fonts/Roboto-Italic.ttf',
          bolditalics: 'fonts/Roboto-MediumItalic.ttf'
        }
      }; */

      const tableColumns = [];
      tableColumns.push([
        { text: 'Item', style: 'tableHeaders', alignment: 'left' },
        { text: 'Quantity', style: 'tableHeaders', alignment: 'right' },
        { text: 'Unit cost', style: 'tableHeaders', alignment: 'right' },
        { text: 'Total', style: 'tableHeaders', alignment: 'right' }
      ]);

      this.data.map((lineItem, index) => {
        tableColumns.push(
          Object.keys(this.data[index]).map(key => ({
            text: this.data[index][key],
            alignment: key == 'Item' ? 'left' : 'right'
          }))
        );
      });

      const docDefinition = {
        pageMargins: 40,
        defaultStyle: {
          columnGap: 0
        },
        styles: {
          businessName: {
            fontSize: 20,
            bold: true,
            color: 'orange',
            alignment: 'left'
          },
          vatNumber: {
            fontSize: 15,
            bold: true,
            alignment: 'left'
          },
          infoTitles: {
            fontSize: 12,
            bold: false,
            alignment: 'right'
          },
          infoValues: {
            fontSize: 12,
            bold: true,
            alignment: 'right'
          },
          invoiceTitle: {
            fontSize: 30,
            bold: true,
            alignment: 'right'
          },
          invoiceNumber: {
            fontSize: 15,
            bold: true,
            alignment: 'right'
          },
          deliveryInfo: {
            fontSize: 10,
            bold: false,
            alignment: 'left'
          },
          deliveryValues: {
            fontSize: 10,
            bold: true,
            alignment: 'left'
          },
          tableHeaders: {
            bold: true,
            fillColor: '#18616e',
            color: 'white',
            margins: 10
          }
        },
        pageSize: 'LETTER',
        content: [
          { image: this.imageData, height: 150, width: 150 },
          '\n',
          { text: this.invoiceData.businessName, style: 'businessName' },
          { text: `VAT No.: ${this.vatNumber}`, style: 'vatNumber' },
          '\n',
          { text: `525 Pretoria street Silverton`, style: 'deliveryValues' },
          { text: `0761779806`, style: 'deliveryValues' },
          { text: `imotofix@gmail.com`, style: 'deliveryValues' },
          '\n',
          {
            columns: [
              {
                text: [
                  'Bill To:\n ',
                  { text: this.invoiceData.recepient, style: 'deliveryValues' }
                ],
                width: 100
              },

              {
                text: [
                  ' Delivery Address:\n',
                  {
                    text: this.invoiceData.shipppingAddress,
                    style: 'deliveryValues'
                  }
                ],
                width: 100
              }
            ],
            style: 'deliveryInfo',
            alignment: 'left'
          },
          {
            text: this.invoiceData.invoiceTitle,
            style: 'invoiceTitle',
            absolutePosition: { x: 0, y: 40 }
          },
          {
            text: this.invoiceData.invoiceNumber,
            style: 'invoiceNumber',
            absolutePosition: { x: 0, y: 80 }
          },
          {
            columns: [
              {
                text: 'Invoice Date:',
                style: ['infoTitles', { alignment: 'right' }]
              },
              {
                text: this.invoiceData.invoiceDate,
                style: 'infoValues',
                width: 90
              }
            ],
            // style: { background: 'yellow' },
            absolutePosition: { x: 0, y: 120 }
          },
          {
            columns: [
              {
                text: 'Due Date:',
                style: ['infoTitles', { alignment: 'right' }]
              },
              {
                text: this.invoiceData.invoiceDueDate,
                style: 'infoValues',
                width: 90
              }
            ],
            absolutePosition: { x: 327, y: 140 }
            // style: { background: 'yellow' },
          },
          {
            columns: [
              {
                text: 'Balance Due:',
                style: ['infoTitles', { alignment: 'right' }]
              },
              {
                text: `${this.currencySymbol} ${this.invoiceData.balanceDue}`,
                style: 'infoValues',
                width: 90
              }
            ],
            absolutePosition: { x: 327, y: 160 }
            // style: { background: 'yellow' },
          },
          '\n\n',
          {
            layout: 'noBorders', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*', 100, 100, 100],

              body: tableColumns
            }
          },
          '\n\n',
          {
            columns: [
              {
                text: 'SubTotal:',
                style: ['infoTitles', { alignment: 'right' }]
              },
              {
                text: `${this.currencySymbol} ${this.invoiceData.subTotal}`,
                style: 'infoValues',
                width: 90
              }
            ]
          },
          {
            columns: [
              {
                text: 'VAT %:',
                style: ['infoTitles', { alignment: 'right' }]
              },
              {
                text: `${this.currencySymbol} ${this.invoiceData.vat}`,
                style: 'infoValues',
                width: 90
              }
            ]
            // style: { background: 'yellow' },
            // absolutePosition: { x: 0, y: 120 },
          },
          {
            columns: [
              {
                text: 'Total:',
                style: ['infoTitles', { alignment: 'right' }]
              },
              {
                text: `${this.currencySymbol} ${this.invoiceData.total}`,
                style: 'infoValues',
                width: 90
              }
            ]
            // style: { background: 'yellow' },
            // absolutePosition: { x: 0, y: 120 },
          },
          '\n\n\n',
          {
            stack: [
              {
                text: [
                  'Notes',
                  '\n\n',
                  { text: this.invoiceData.notes, style: 'deliveryValues' }
                ],
                style: 'deliveryInfo'
              },
              '\n\n',
              {
                text: [
                  'Banking details',
                  '\n\n',
                  { text: this.invoiceData.misc, style: 'deliveryValues' }
                ],
                style: 'deliveryInfo'
              }
            ]
          }
        ]
      };

      pdfMake
        .createPdf(docDefinition)
        .download(`${this.invoiceData.invoiceTitle}.pdf`);
    }
  }
};
</script>

<style lang="scss" scoped>
input[type='file'] {
  display: none;
}
input {
  display: none;
}

img {
  height: 100%;
  width: 100%;
  border-radius: 5px;
}

.invoiceHeadDetails {
  /* border: 10px solid orange; */
  display: flex;
  flex-direction: column;
  padding: 1%;
  margin: 0px;
  flex-grow: 1;
}

.custom-file-upload {
  border: 1px solid #ccc;
  border-radius: 5px;
  display: inline-block;
  cursor: pointer;
  height: 200px;
  width: 200px;
}

.invoiceMain {
  display: flex;
  flex-flow: column;
  box-shadow: 0px 0px 4px 3px rgb(206, 203, 203);
  padding: 10px;
  border-radius: 5px !important;
  margin: 0% 5%;
}

.invoiceTitle {
  width: 100%;
  text-align: center;
}

.totalDivs {
  margin-bottom: 10px;
}
</style>
