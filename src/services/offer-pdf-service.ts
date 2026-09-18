import { chromium } from "playwright";

import type {
  OfferWithCase,
} from "@/types/offer";

/**
 * Offer PDF Service.
 *
 * HTML alapján PDF-et készít.
 */
export class OfferPdfService {
  /**
   * PDF generálása HTML-ből.
   */
  async generate(
    html: string
  ): Promise<Buffer> {
    const browser =
      await chromium.launch({
        headless: true,
      });

    try {
      const page =
        await browser.newPage();

      await page.setContent(
        html,
        {
          waitUntil:
            "networkidle",
        }
      );

      return await page.pdf({
        format: "A4",

        printBackground: true,

        margin: {
          top: "20mm",
          right: "20mm",
          bottom: "20mm",
          left: "20mm",
        },
      });
    } finally {
      await browser.close();
    }
  }

  /**
   * Ajánlat PDF fájlneve.
   */
  getFileName(
    offer: OfferWithCase
  ): string {
    return `HF-OFFER-${offer.version}.pdf`;
  }
}

/**
 * Singleton.
 */
export const offerPdfService =
  new OfferPdfService();