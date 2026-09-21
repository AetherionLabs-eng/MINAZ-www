function escapeHtml(value?: string | null) {
  if (!value) return "—";

  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function row(label: string, value?: string | null) {
  return `
    <tr>
      <td style="
        width:180px;
        padding:12px 0;
        color:#7f8a94;
        font-size:12px;
        vertical-align:top;
        border-bottom:1px solid #e8ebed;
      ">
        ${escapeHtml(label)}
      </td>

      <td style="
        padding:12px 0;
        color:#121c24;
        font-size:14px;
        font-weight:600;
        vertical-align:top;
        border-bottom:1px solid #e8ebed;
      ">
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
}

function shell(
  label: string,
  title: string,
  content: string,
) {
  return `
    <!doctype html>
    <html>
      <body style="
        margin:0;
        padding:0;
        background:#edf0f2;
        font-family:Arial,Helvetica,sans-serif;
      ">

        <div style="
          max-width:720px;
          margin:0 auto;
          padding:36px 18px;
        ">

          <div style="
            background:#07111c;
            padding:28px 32px;
          ">
            <div style="
              color:#ef252d;
              font-size:11px;
              font-weight:700;
              letter-spacing:2px;
              margin-bottom:12px;
            ">
              MINAZ TRANSPORT AND LOGISTICS
            </div>

            <div style="
              color:white;
              font-size:28px;
              line-height:1.15;
              font-weight:700;
            ">
              ${escapeHtml(title)}
            </div>

            <div style="
              margin-top:12px;
              color:#8f9ba6;
              font-size:12px;
              letter-spacing:1px;
            ">
              ${escapeHtml(label)}
            </div>
          </div>

          <div style="
            background:white;
            padding:30px 32px;
          ">
            ${content}
          </div>

          <div style="
            padding:20px 32px;
            background:#101b25;
            color:#7d8993;
            font-size:11px;
            line-height:1.6;
          ">
            MINAZ TRANSPORT AND LOGISTICS LTD<br>
            5 South Charlotte Street, Edinburgh EH2 4AN<br>
            office@minaz.co.uk · +44 770 481 5760
          </div>

        </div>
      </body>
    </html>
  `;
}

/* =========================================================
   ADMIN — CONTACT
========================================================= */

export function contactAdminEmail(data: {
  name: string;
  company?: string | null;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
}) {
  return shell(
    "WEBSITE CONTACT",
    "New contact enquiry",
    `
      <table
        width="100%"
        cellspacing="0"
        cellpadding="0"
        style="border-collapse:collapse;"
      >
        ${row("Name", data.name)}
        ${row("Company", data.company)}
        ${row("Email", data.email)}
        ${row("Phone", data.phone)}
        ${row("Subject", data.subject)}
      </table>

      <div style="
        margin-top:28px;
        color:#7f8a94;
        font-size:11px;
        font-weight:700;
        letter-spacing:1.5px;
      ">
        MESSAGE
      </div>

      <div style="
        margin-top:12px;
        padding:20px;
        background:#f5f6f4;
        color:#25313a;
        font-size:14px;
        line-height:1.7;
        white-space:pre-wrap;
      ">${escapeHtml(data.message)}</div>
    `,
  );
}

/* =========================================================
   ADMIN — QUOTE
========================================================= */

export function quoteAdminEmail(data: {
  name: string;
  company?: string | null;
  email: string;
  phone?: string | null;
  service?: string | null;

  collection_country: string;
  collection_city?: string | null;

  delivery_country: string;
  delivery_city?: string | null;

  cargo_description: string;

  weight_kg?: string | number | null;
  pallets?: string | number | null;

  ready_date?: string | null;

  additional_information?: string | null;
}) {
  const route =
    `${data.collection_country}` +
    `${data.collection_city ? ` / ${data.collection_city}` : ""}` +
    ` → ` +
    `${data.delivery_country}` +
    `${data.delivery_city ? ` / ${data.delivery_city}` : ""}`;

  return shell(
    "FREIGHT QUOTE REQUEST",
    "New freight quote",
    `
      <table
        width="100%"
        cellspacing="0"
        cellpadding="0"
        style="border-collapse:collapse;"
      >
        ${row("Name", data.name)}
        ${row("Company", data.company)}
        ${row("Email", data.email)}
        ${row("Phone", data.phone)}
        ${row("Service", data.service)}
        ${row("Route", route)}
        ${row(
          "Weight",
          data.weight_kg
            ? `${data.weight_kg} kg`
            : null,
        )}
        ${row(
          "Pallets",
          data.pallets
            ? String(data.pallets)
            : null,
        )}
        ${row("Ready date", data.ready_date)}
      </table>

      <div style="
        margin-top:28px;
        color:#7f8a94;
        font-size:11px;
        font-weight:700;
        letter-spacing:1.5px;
      ">
        CARGO
      </div>

      <div style="
        margin-top:12px;
        padding:20px;
        background:#f5f6f4;
        color:#25313a;
        font-size:14px;
        line-height:1.7;
        white-space:pre-wrap;
      ">${escapeHtml(data.cargo_description)}</div>

      ${
        data.additional_information
          ? `
            <div style="
              margin-top:28px;
              color:#7f8a94;
              font-size:11px;
              font-weight:700;
              letter-spacing:1.5px;
            ">
              ADDITIONAL INFORMATION
            </div>

            <div style="
              margin-top:12px;
              padding:20px;
              background:#f5f6f4;
              color:#25313a;
              font-size:14px;
              line-height:1.7;
              white-space:pre-wrap;
            ">${escapeHtml(
              data.additional_information,
            )}</div>
          `
          : ""
      }
    `,
  );
}

/* =========================================================
   CUSTOMER — CONTACT CONFIRMATION
========================================================= */

export function contactCustomerEmail(data: {
  name: string;
}) {
  return shell(
    "ENQUIRY RECEIVED",
    "Thank you for contacting MINAZ",
    `
      <p style="
        margin:0 0 20px;
        color:#25313a;
        font-size:15px;
        line-height:1.8;
      ">
        Hello ${escapeHtml(data.name)},
      </p>

      <p style="
        margin:0 0 20px;
        color:#25313a;
        font-size:15px;
        line-height:1.8;
      ">
        Thank you for contacting MINAZ Transport and Logistics.
        We have received your enquiry and our team will review it.
      </p>

      <p style="
        margin:0 0 28px;
        color:#25313a;
        font-size:15px;
        line-height:1.8;
      ">
        If you need to add any further information, simply reply to this email.
      </p>

      <div style="
        padding:20px;
        background:#f5f6f4;
        color:#5f6b74;
        font-size:13px;
        line-height:1.7;
      ">
        <strong style="color:#25313a;">
          MINAZ Transport and Logistics
        </strong>
        <br>
        Edinburgh, United Kingdom
      </div>
    `,
  );
}

/* =========================================================
   CUSTOMER — QUOTE CONFIRMATION
========================================================= */

export function quoteCustomerEmail(data: {
  name: string;
  reference: string;
  collectionCountry: string;
  deliveryCountry: string;
}) {
  return shell(
    "QUOTE REQUEST RECEIVED",
    "Your freight request is with us",
    `
      <p style="
        margin:0 0 20px;
        color:#25313a;
        font-size:15px;
        line-height:1.8;
      ">
        Hello ${escapeHtml(data.name)},
      </p>

      <p style="
        margin:0 0 20px;
        color:#25313a;
        font-size:15px;
        line-height:1.8;
      ">
        Thank you for sending your freight request to MINAZ Transport and Logistics.
        We have received the shipment details and our team will review the movement.
      </p>

      <table
        width="100%"
        cellspacing="0"
        cellpadding="0"
        style="
          border-collapse:collapse;
          margin-top:24px;
        "
      >
        ${row(
          "Reference",
          data.reference,
        )}

        ${row(
          "Route",
          `${data.collectionCountry} → ${data.deliveryCountry}`,
        )}
      </table>

      <p style="
        margin:28px 0 0;
        color:#25313a;
        font-size:15px;
        line-height:1.8;
      ">
        If you need to provide documents, dimensions or additional shipment
        information, simply reply to this email.
      </p>
    `,
  );
}