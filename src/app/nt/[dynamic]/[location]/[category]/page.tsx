import { Metadata } from "next";
import { getorigin, isSeoDetail } from "@/components/common/utility";
import { RestaurantsServices } from "../../../../../../redux/restaurants/restaurants.services";
import CategoryClient from "./category.client";
import { fetchSeoMetadata } from "@/components/nt/common/seo-utils";

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
      title: metaData.title,
      description: metaData.description,
      openGraph: {
        title: metaData.title,
        description: metaData.description || "Online description",
        url: metaData.url,
        images: [{ url: metaData.image }],
      },
    };
  } else {
    return {
      title: "Online Ordering || FC",
      description: "Online description",
    };
  }
}

export default function CategoryPage() {
  return <CategoryClient />;
}
