import prisma from "@/db";
import { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import PageRenderer from "./page-renderer";

interface PageProps {
  params: { subdomain: string; path: string };
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const subdomain = params.subdomain;
  const path = params.path;

  const dynamicLink = await prisma.dynamicLink.findFirst({
    where: {
      subdomain,
    },
    include: {
      childLinks: {
        where: {
          shortLink: path,
        },
      },
    },
  });

  const dynamicLinkChildLink = dynamicLink?.childLinks[0];

  return {
    title:
      `${dynamicLinkChildLink?.metaDataTitle}` ||
      "Link sharing powered by ishortn",
    description:
      `${dynamicLinkChildLink?.metaDataDescription}` ||
      "Link sharing powered by ishortn",
    openGraph: {
      images: [dynamicLinkChildLink?.metaDataImageUrl as string],
    },
  };
}

const PathPage = async ({ params }: PageProps) => {
  const subdomain = params.subdomain;

  const dynamicLink = await prisma.dynamicLink.findFirst({
    where: {
      subdomain: subdomain,
    },
    include: {
      childLinks: {
        where: {
          shortLink: params.path,
        },
      },
    },
  });

  const dynamicLinkChildLink = dynamicLink?.childLinks[0];

  if (!dynamicLink) {
    notFound();
  }

  const incomingHeaders = headers();
  const userAgent = incomingHeaders.get("user-agent");

  if (userAgent?.includes("iPhone") || userAgent?.includes("iPad")) {
    redirect(
      dynamicLink?.appStoreUrl
        ? dynamicLink.appStoreUrl
        : `https://apps.apple.com/app/id${dynamicLink?.iosBundleId}`,
    );
  } else if (userAgent?.includes("Android")) {
    redirect(
      dynamicLink?.playStoreUrl
        ? dynamicLink.playStoreUrl
        : `https://play.google.com/store/apps/details?id=${dynamicLink?.androidPackageName}`,
    );
  }

  return (
    <PageRenderer
      domain={dynamicLinkChildLink!.fallbackLink}
      ogImage={dynamicLinkChildLink!.metaDataImageUrl}
    />
  );
};

export default PathPage;
