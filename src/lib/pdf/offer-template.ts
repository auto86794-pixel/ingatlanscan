import type {
  OfferStatus,
  OfferWithCase,
} from "@/types/offer";

/**
 * HTML speciális karakterek
 * biztonságos kódolása.
 */
function escapeHtml(
  value: string | number | null | undefined
): string {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/**
 * Dátum formázása.
 */
function formatDate(
  value: string | null
): string {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "-";
  }

  return date.toLocaleDateString(
    "hu-HU",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
}

/**
 * Ügyszám formázása.
 */
function formatCaseNumber(
  caseNumber: number
): string {
  return `HF-${String(
    caseNumber
  ).padStart(6, "0")}`;
}

/**
 * Ajánlat státuszának
 * magyar megnevezése.
 */
function getStatusLabel(
  status: OfferStatus
): string {
  switch (status) {
    case "draft":
      return "Piszkozat";

    case "sent":
      return "Elküldve";

    case "accepted":
      return "Elfogadva";

    case "rejected":
      return "Elutasítva";

    case "expired":
      return "Lejárt";

    default:
      return status;
  }
}

/**
 * Ajánlat PDF HTML sablon.
 *
 * A teljes HTML dokumentumot
 * egyetlen stringként adja vissza.
 */
export function buildOfferHtml(
  offer: OfferWithCase
): string {
  const caseNumber =
    offer.case
      ? formatCaseNumber(
          offer.case.case_number
        )
      : "-";

  const caseTitle =
    offer.case?.title ??
    "Nincs kapcsolódó ügy";

  const caseType =
    offer.case?.type ?? "-";

  const casePriority =
    offer.case?.priority ?? "-";

  const caseStatus =
    offer.case?.status ?? "-";

  const notes =
    offer.notes?.trim() ||
    "Nincs megjegyzés.";

  return `
<!DOCTYPE html>
<html lang="hu">
  <head>
    <meta charset="utf-8" />

    <meta
      name="viewport"
      content="width=device-width, initial-scale=1"
    />

    <title>
      ${escapeHtml(offer.title)}
    </title>

    <style>
      * {
        box-sizing: border-box;
      }

      html,
      body {
        margin: 0;
        padding: 0;
        background: #ffffff;
        color: #0f172a;
        font-family:
          Arial,
          Helvetica,
          sans-serif;
        font-size: 14px;
        line-height: 1.5;
      }

      body {
        padding: 0;
      }

      .document {
        width: 100%;
        max-width: 794px;
        margin: 0 auto;
        background: #ffffff;
      }

      .header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 32px;
        padding-bottom: 24px;
        border-bottom: 2px solid #e2e8f0;
      }

      .brand-name {
        margin: 0;
        color: #0f172a;
        font-size: 30px;
        font-weight: 800;
        letter-spacing: 0.04em;
      }

      .brand-subtitle {
        margin: 6px 0 0;
        color: #64748b;
        font-size: 15px;
      }

      .document-meta {
        min-width: 190px;
        text-align: right;
      }

      .document-label {
        margin: 0;
        color: #64748b;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .document-version {
        margin: 4px 0 0;
        color: #0f172a;
        font-size: 22px;
        font-weight: 700;
      }

      .section-grid {
        display: grid;
        grid-template-columns:
          repeat(2, minmax(0, 1fr));
        gap: 32px;
        margin-top: 32px;
      }

      .section {
        break-inside: avoid;
      }

      .section-title {
        margin: 0 0 14px;
        color: #0f172a;
        font-size: 17px;
        font-weight: 700;
      }

      .details {
        margin: 0;
        padding: 0;
      }

      .detail-row {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 24px;
        padding: 9px 0;
        border-bottom: 1px solid #e2e8f0;
      }

      .detail-row:first-child {
        border-top: 1px solid #e2e8f0;
      }

      .detail-label {
        flex: 0 0 auto;
        margin: 0;
        color: #64748b;
      }

      .detail-value {
        margin: 0;
        color: #0f172a;
        font-weight: 600;
        text-align: right;
        overflow-wrap: anywhere;
      }

      .status {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 999px;
        background: #dbeafe;
        color: #1d4ed8;
        font-size: 12px;
        font-weight: 700;
      }

      .notes-section {
        margin-top: 36px;
        break-inside: avoid;
      }

      .notes {
        min-height: 150px;
        padding: 18px;
        border: 1px solid #cbd5e1;
        border-radius: 10px;
        background: #f8fafc;
        color: #334155;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
      }

      .validity-box {
        margin-top: 32px;
        padding: 16px 18px;
        border-left: 4px solid #2563eb;
        background: #eff6ff;
        break-inside: avoid;
      }

      .validity-title {
        margin: 0;
        color: #1e3a8a;
        font-size: 13px;
        font-weight: 700;
      }

      .validity-text {
        margin: 4px 0 0;
        color: #1e40af;
      }

      .signatures {
        display: grid;
        grid-template-columns:
          repeat(2, minmax(0, 1fr));
        gap: 56px;
        margin-top: 76px;
        break-inside: avoid;
      }

      .signature {
        padding-top: 10px;
        border-top: 1px solid #64748b;
        color: #475569;
        font-size: 12px;
        text-align: center;
      }

      .footer {
        margin-top: 48px;
        padding-top: 18px;
        border-top: 1px solid #e2e8f0;
        color: #94a3b8;
        font-size: 11px;
        text-align: center;
      }

      @media print {
        .document {
          max-width: none;
        }
      }
    </style>
  </head>

  <body>
    <main class="document">
      <header class="header">
        <div>
          <h1 class="brand-name">
            HOMEFLOW
          </h1>

          <p class="brand-subtitle">
            Ingatlan értékesítési ajánlat
          </p>
        </div>

        <div class="document-meta">
          <p class="document-label">
            Ajánlat
          </p>

          <p class="document-version">
            V${escapeHtml(offer.version)}
          </p>
        </div>
      </header>

      <div class="section-grid">
        <section class="section">
          <h2 class="section-title">
            Ajánlat adatai
          </h2>

          <dl class="details">
            <div class="detail-row">
              <dt class="detail-label">
                Cím
              </dt>

              <dd class="detail-value">
                ${escapeHtml(offer.title)}
              </dd>
            </div>

            <div class="detail-row">
              <dt class="detail-label">
                Verzió
              </dt>

              <dd class="detail-value">
                V${escapeHtml(offer.version)}
              </dd>
            </div>

            <div class="detail-row">
              <dt class="detail-label">
                Státusz
              </dt>

              <dd class="detail-value">
                <span class="status">
                  ${escapeHtml(
                    getStatusLabel(
                      offer.status
                    )
                  )}
                </span>
              </dd>
            </div>

            <div class="detail-row">
              <dt class="detail-label">
                Érvényes eddig
              </dt>

              <dd class="detail-value">
                ${escapeHtml(
                  formatDate(
                    offer.valid_until
                  )
                )}
              </dd>
            </div>

            <div class="detail-row">
              <dt class="detail-label">
                Létrehozva
              </dt>

              <dd class="detail-value">
                ${escapeHtml(
                  formatDate(
                    offer.created_at
                  )
                )}
              </dd>
            </div>
          </dl>
        </section>

        <section class="section">
          <h2 class="section-title">
            Kapcsolódó ügy
          </h2>

          <dl class="details">
            <div class="detail-row">
              <dt class="detail-label">
                Ügyszám
              </dt>

              <dd class="detail-value">
                ${escapeHtml(caseNumber)}
              </dd>
            </div>

            <div class="detail-row">
              <dt class="detail-label">
                Cím
              </dt>

              <dd class="detail-value">
                ${escapeHtml(caseTitle)}
              </dd>
            </div>

            <div class="detail-row">
              <dt class="detail-label">
                Típus
              </dt>

              <dd class="detail-value">
                ${escapeHtml(caseType)}
              </dd>
            </div>

            <div class="detail-row">
              <dt class="detail-label">
                Státusz
              </dt>

              <dd class="detail-value">
                ${escapeHtml(caseStatus)}
              </dd>
            </div>

            <div class="detail-row">
              <dt class="detail-label">
                Prioritás
              </dt>

              <dd class="detail-value">
                ${escapeHtml(casePriority)}
              </dd>
            </div>
          </dl>
        </section>
      </div>

      <section class="notes-section">
        <h2 class="section-title">
          Megjegyzések
        </h2>

        <div class="notes">
          ${escapeHtml(notes)}
        </div>
      </section>

      <aside class="validity-box">
        <p class="validity-title">
          Ajánlat érvényessége
        </p>

        <p class="validity-text">
          Az ajánlat
          ${escapeHtml(
            formatDate(
              offer.valid_until
            )
          )}
          napjáig érvényes.
        </p>
      </aside>

      <section class="signatures">
        <div class="signature">
          Ügyfél aláírása
        </div>

        <div class="signature">
          HomeFlow képviselője
        </div>
      </section>

      <footer class="footer">
        A dokumentum a HomeFlow CRM
        rendszerben készült.
      </footer>
    </main>
  </body>
</html>
`;
}