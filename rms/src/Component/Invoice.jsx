import React from "react";
import "../../src/assets/css/invoice.css"

export default function Invoice() {
  return (
    <section class="wrapper-invoice">
      <div class="invoice">
        <div class="invoice-information">
          <p>
            <b>Invoice #</b> : 12345
          </p>
          <p>
            <b>Created Date </b>: May, 07 2022
          </p>
          <p>
            <b>Due Date</b> : May, 09 2022
          </p>
        </div>

        <div class="invoice-logo-brand">
          <img src="./assets/image/tampsh.png" alt="" />
        </div>

        <div class="invoice-head">
          <div class="head client-info">
            <p>Tampsh, Inc.</p>
            <p>NPWP: 12.345.678.910.111213.1415</p>
            <p>Bondowoso, Jawa timur</p>
            <p>Jln. Rengganis 05, Bondowoso</p>
          </div>
          <div class="head client-data">
            <p>-</p>
            <p>Mohammad Sahrullah</p>
            <p>Bondowoso, Jawa timur</p>
            <p>Jln. Duko Kembang, Bondowoso</p>
          </div>
        </div>

        <div class="invoice-body">
          <table class="table">
            <thead>
              <tr>
                <th>Item Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Template Invoice</td>
                <td>Rp.75.000</td>
              </tr>
              <tr>
                <td>tax</td>
                <td>Rp.5.000</td>
              </tr>
            </tbody>
          </table>
          <div class="flex-table">
            <div class="flex-column"></div>
            <div class="flex-column">
              <table class="table-subtotal">
                <tbody>
                  <tr>
                    <td>Subtotal</td>
                    <td>Rp.80.000</td>
                  </tr>
                  <tr>
                    <td>PPN 10%</td>
                    <td>Rp.5.000</td>
                  </tr>
                  <tr>
                    <td>Credit</td>
                    <td>Rp.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="invoice-total-amount">
            <p>Total : Rp.80.000</p>
          </div>
        </div>

        <div class="invoice-footer">
          <p>Thankyou, happy shopping again</p>
        </div>
      </div>
    </section>
  );
}
