import { Metadata } from "next";
import CategoryClient from "./category.client";
import { fetchSeoMetadata } from "@/components/nt/common/seo-utils";
import { MetadataTypes } from "@/types/metadata-types/metadata.type";

type Props = {
  params: {
    dynamic: string;
    location: string;
    category: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { dynamic, location, category } = await params;
  const pathname = `/nt/${dynamic}/${location}/${category}`;

  const metaData = await fetchSeoMetadata(
    dynamic,
    location,
    category,
    pathname
  );
  if (metaData) {
    return {
      title: `${metaData.title} : Online Ordering`,
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

export default async function CategoryPage({ params }: Props) {
  const { dynamic, location, category } = await params;
  const pathname = `nt/${dynamic}/${location}/${category}`;
  const metaData = await fetchSeoMetadata(
    dynamic,
    location,
    category,
    pathname
  );
  return <CategoryClient metaData={metaData as MetadataTypes} />;
}
