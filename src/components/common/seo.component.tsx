import Head from "next/head";
import { getorigin } from "./utility";

export default function SEOComponent({
  title = "",
  description = "",
  ogImgUrl = "",
  ogUrl = `${getorigin()}`,
}) {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta
          key="cache-control"
          httpEquiv="cache-control"
          content="no-cache"
        />
        <meta key="expires" httpEquiv="expires" content="0" />
        <meta key="pragma" httpEquiv="pragma" content="no-cache" />
        <title key="title">{title}</title>
        <meta key="description" name="description" content={description} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:title" property="og:title" content={title} />
        <meta
          key="og:description"
          property="og:description"
          content={description}
        />
        <meta key="og:image" property="og:image" content={ogImgUrl} />
        <meta key="og:url" property="og:url" content={ogUrl} />
        <meta
          key="twitter:card"
          property="twitter:card"
          content="summary_large_image"
        />
      </Head>
    </>
  );
}
