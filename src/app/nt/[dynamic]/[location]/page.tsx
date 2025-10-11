import { Metadata } from "next";
import { fetchSeoMetadata } from "@/components/nt/common/seo-utils";
import LocationClient from "./location.client";

type Props = {
  params: {
    dynamic: string;
    location: string;
    category: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { dynamic, location } = await params;
  const pathname = `/nt/${dynamic}/${location}`;

  const metaData = await fetchSeoMetadata(dynamic, location, pathname);
  if (metaData) {
    return {
      title: `Online Ordering || ${metaData.title}`,
      description: metaData.description,
      openGraph: {
        title: metaData.title,
        description: metaData.description || "Online description",
        url: metaData.url,
        images: metaData.image,
        //images: [{ url: metaData.image }],
      },
    };
  } else {
    return {
      title: "Online Ordering || FC",
      description: "Online description",
    };
  }
}

export default async function LocationPage() {
  return <LocationClient />;
}
