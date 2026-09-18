import { offerPdfService } from "@/services/offer-pdf-service";
import { offerService } from "@/services/offer-service";
import { storageService } from "@/lib/storage/storage-service";

import { offerPdfTemplate } from "@/templates/offer-pdf-template";

import type {
  OfferWithCase,
} from "@/types/offer";

type RouteProps = {
  params: Promise<{
    id: string;
  }>;
};

const PROPERTY_IMAGE_BUCKET =
  "property-images";

/**
 * A tárolt képútvonalból teljes,
 * nyilvános URL-t készít.
 */
function resolvePropertyImageUrl(
  value: string | null
): string | null {
  if (!value) {
    return null;
  }

  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:")
  ) {
    return value;
  }

  const normalizedPath = value
    .replace(/^\/+/, "")
    .replace(
      new RegExp(
        `^${PROPERTY_IMAGE_BUCKET}/`
      ),
      ""
    );

  return storageService.getPublicUrl(
    PROPERTY_IMAGE_BUCKET,
    normalizedPath
  );
}

/**
 * A PDF számára előkészíti
 * az ajánlat adatait.
 */
function prepareOfferForPdf(
  offer: OfferWithCase
): OfferWithCase {
  if (!offer.case?.properties) {
    return offer;
  }

  return {
    ...offer,

    case: {
      ...offer.case,

      properties: {
        ...offer.case.properties,

        main_image_url:
          resolvePropertyImageUrl(
            offer.case.properties
              .main_image_url
          ),
      },
    },
  };
}

/**
 * Ajánlat PDF letöltése.
 */
export async function GET(
  _request: Request,
  { params }: RouteProps
) {
  try {
    const { id } =
      await params;

    const offer =
      await offerService.getOfferWithCase(
        id
      );

    const preparedOffer =
      prepareOfferForPdf(offer);

    const html =
      offerPdfTemplate.render(
        preparedOffer
      );

    const pdf =
      await offerPdfService.generate(
        html
      );

    const arrayBuffer =
      pdf.buffer.slice(
        pdf.byteOffset,
        pdf.byteOffset +
          pdf.byteLength
      ) as ArrayBuffer;

    return new Response(
      arrayBuffer,
      {
        headers: {
          "Content-Type":
            "application/pdf",

          "Content-Disposition": `attachment; filename="${offerPdfService.getFileName(
            preparedOffer
          )}"`,

          "Cache-Control":
            "no-store",
        },
      }
    );
  } catch (error) {
    console.error(
      "Offer PDF generation failed:",
      error
    );

    return Response.json(
      {
        message:
          "A PDF generálása sikertelen.",
      },
      {
        status: 500,
      }
    );
  }
}