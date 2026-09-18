// src/templates/offer-pdf-template.ts

import type {
  OfferWithCase,
} from "@/types/offer";

function money(
  value: number | null | undefined
): string {
  if (value == null) {
    return "Ár egyeztetés szerint";
  }

  return new Intl.NumberFormat(
    "hu-HU",
    {
      maximumFractionDigits: 0,
    }
  ).format(value) + " Ft";
}

function value(
  text: string | number | null | undefined
): string {
  if (
    text === null ||
    text === undefined ||
    text === ""
  ) {
    return "-";
  }

  return String(text);
}

function location(
  city?: string | null,
  address?: string | null
) {
  return [city, address]
    .filter(Boolean)
    .join(", ");
}

/**
 * Offer PDF Template.
 *
 * Elegáns marketing adatlap.
 */
export class OfferPdfTemplate {
  render(
    offer: OfferWithCase
  ): string {
    const property =
      offer.case?.properties;

    const client =
      offer.case?.clients;

    const image =
      property?.main_image_url;

    return `
<!DOCTYPE html>

<html lang="hu">

<head>

<meta charset="UTF-8"/>

<style>

*{
box-sizing:border-box;
}

body{

margin:0;
padding:0;
background:#f4f4f4;
font-family:
Arial,
Helvetica,
sans-serif;
color:#222;

}

.page{

width:794px;
margin:auto;
background:#fff;

}

.header{

padding:42px 50px 24px;

display:flex;
justify-content:space-between;
align-items:center;

}

.logo{

display:flex;
align-items:center;
gap:16px;

}

.logo-circle{

width:62px;
height:62px;

border-radius:50%;

border:2px solid #b9984e;

display:flex;
align-items:center;
justify-content:center;

font-weight:bold;

font-size:20px;

color:#222;

}

.logo-title{

font-size:24px;

font-weight:700;

letter-spacing:-.5px;

}

.logo-sub{

margin-top:2px;

font-size:11px;

letter-spacing:2px;

color:#999;

text-transform:uppercase;

}

.doc{

text-align:right;

}

.doc-title{

font-size:13px;

font-weight:bold;

letter-spacing:2px;

text-transform:uppercase;

}

.doc-version{

margin-top:6px;

font-size:12px;

color:#777;

}

.gold{

height:2px;

background:#b9984e;

margin:0 50px;

}

.hero{

margin:26px 50px 0;

height:340px;

overflow:hidden;

border-radius:18px;

background:#ececec;

}

.hero img{

width:100%;
height:100%;
object-fit:cover;

display:block;

}

.placeholder{

height:100%;

display:flex;

align-items:center;

justify-content:center;

color:#999;

font-size:22px;

}

.content{

padding:36px 50px 50px;

}

.top{

display:flex;

justify-content:space-between;

align-items:flex-end;

gap:40px;

padding-bottom:26px;

border-bottom:1px solid #ececec;

}

.left{

flex:1;

}

.right{

text-align:right;

}

.tag{

font-size:11px;

font-weight:bold;

letter-spacing:2px;

text-transform:uppercase;

color:#b9984e;

margin-bottom:8px;

}

.title{

font-size:34px;

font-weight:700;

line-height:1.15;

margin-bottom:10px;

}

.location{

font-size:15px;

color:#777;

}

.price-title{

font-size:10px;

letter-spacing:2px;

text-transform:uppercase;

color:#999;

margin-bottom:6px;

}

.price{

font-size:36px;

font-weight:700;

color:#b9984e;

}

.stats{

display:grid;

grid-template-columns:
repeat(4,1fr);

gap:20px;

margin:34px 0;

}

.card{

background:#fafafa;

border:1px solid #ececec;

border-radius:14px;

padding:18px;

text-align:center;

}

.card-value{

font-size:24px;

font-weight:700;

margin-bottom:8px;

}

.card-label{

font-size:11px;

letter-spacing:1px;

text-transform:uppercase;

color:#888;

}

.columns{

display:grid;

grid-template-columns:
2fr 1fr;

gap:40px;

}

.section-title{

font-size:12px;

font-weight:bold;

letter-spacing:2px;

text-transform:uppercase;

margin-bottom:18px;

color:#444;

}

.description{

font-size:15px;

line-height:1.8;

color:#555;

text-align:justify;

}

.info{

border:1px solid #ececec;

border-radius:14px;

overflow:hidden;

}

.row{

display:flex;

justify-content:space-between;

padding:13px 18px;

border-bottom:1px solid #ececec;

font-size:14px;

}

.row:last-child{

border-bottom:none;

}

.label{

color:#888;

}

.val{

font-weight:600;

text-align:right;

}

.note{

margin-top:30px;

padding:18px;

background:#faf8f2;

border-left:4px solid #b9984e;

border-radius:8px;

font-size:14px;

line-height:1.7;

}

.footer{

margin-top:45px;

padding-top:26px;

border-top:1px solid #ececec;

display:flex;

justify-content:space-between;

align-items:flex-start;

}

.contact-title{

font-size:18px;

font-weight:700;

margin-bottom:8px;

}

.contact{

font-size:14px;

line-height:1.9;

color:#666;

}

.footer-right{

text-align:right;

color:#999;

font-size:12px;

line-height:1.8;

}

</style>

</head>

<body>

<div class="page">

<div class="header">

<div class="logo">

<div class="logo-circle">

HF

</div>

<div>

<div class="logo-title">

HomeFlow

</div>

<div class="logo-sub">

REAL ESTATE CRM

</div>

</div>

</div>

<div class="doc">

<div class="doc-title">

INGATLAN ADATLAP

</div>

<div class="doc-version">

v${offer.version}

</div>

</div>

</div>

<div class="gold"></div>

<div class="hero">

${
image
? `<img src="${image}" />`
: `<div class="placeholder">Nincs borítókép</div>`
}

</div>

<div class="content">

<div class="top">

<div class="left">

<div class="tag">

KIEMELT INGATLAN

</div>

<div class="title">

${value(property?.title)}

</div>

<div class="location">

${location(
property?.city,
property?.address
)}

</div>

</div>

<div class="right">

<div class="price-title">

IRÁNYÁR

</div>

<div class="price">

${money(property?.price)}

</div>

</div>

</div>

<div class="stats">

<div class="card">

<div class="card-value">

${value(property?.area)}

</div>

<div class="card-label">

m²

</div>

</div>

<div class="card">

<div class="card-value">

${value(property?.rooms)}

</div>

<div class="card-label">

Szobák

</div>

</div>

<div class="card">

<div class="card-value">

${value(property?.heating)}

</div>

<div class="card-label">

Fűtés

</div>

</div>

<div class="card">

<div class="card-value">

${value(property?.condition)}

</div>

<div class="card-label">

Állapot

</div>

</div>

</div>

<div class="columns">

<div>

<div class="section-title">

INGATLAN BEMUTATÁSA

</div>

<div class="description">

${value(
property?.description ??
""
)}

</div>

${
offer.notes
? `
<div class="note">

<strong>Megjegyzés</strong>

<br><br>

${offer.notes}

</div>
`
: ""
}

</div>

<div>

<div class="section-title">

ADATOK

</div>

<div class="info">

<div class="row">

<div class="label">

Ingatlan típusa

</div>

<div class="val">

${value(
property?.property_type
)}

</div>

</div>

<div class="row">

<div class="label">

Város

</div>

<div class="val">

${value(property?.city)}

</div>

</div>

<div class="row">

<div class="label">

Cím

</div>

<div class="val">

${value(
property?.address
)}

</div>

</div>

<div class="row">

<div class="label">

Emelet

</div>

<div class="val">

${value(
property?.floor
)}

</div>

</div>

<div class="row">

<div class="label">

Érdeklődő

</div>

<div class="val">

${
client
? `${client.first_name} ${client.last_name}`
: "-"
}

</div>

</div>

<div class="row">

<div class="label">

Telefon

</div>

<div class="val">

${value(client?.phone)}

</div>

</div>

<div class="row">

<div class="label">

E-mail

</div>

<div class="val">

${value(client?.email)}

</div>

</div>

</div>

</div>

</div>

<div class="footer">

<div>

<div class="contact-title">

HomeFlow

</div>

<div class="contact">

Professzionális ingatlan CRM<br>

AI asszisztens ingatlanosoknak

</div>

</div>

<div class="footer-right">

Ajánlat verzió: v${offer.version}<br>

Státusz:
${offer.status}<br>

Érvényes:
${value(
offer.valid_until
)}

</div>

</div>

</div>

</div>

</body>

</html>

`;
  }
}

/**
 * Singleton.
 */
export const offerPdfTemplate =
  new OfferPdfTemplate();