interface ThemeStylesProps {
  themeType: string;
}

export function ThemeStyles({ themeType }: ThemeStylesProps) {
  return (
    <>
      {/* {themeType === "default" && (
        <>
          <link rel="stylesheet" href="/defaulttheme/css/bootstrap.min.css"
            crossOrigin="anonymous"></link>
          <link
            href="/defaulttheme/css/jquery.bxslider.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
          />
          <link href="/defaulttheme/css/style.css" rel="stylesheet" />
          <link href="/defaulttheme/css/fonts.css" rel="stylesheet" />
          <link href="/defaulttheme/css/colors.css" rel="stylesheet" />
          <link href="/defaulttheme/css/responsive.css" rel="stylesheet" />
          <link href="/defaulttheme/css/zoomImage.css" rel="stylesheet" />
        </>
      )} */}

      {themeType === "newtheme" && (
        <>
          <link rel="stylesheet" href="/nt/css/bootstrap.min.css" />
          <link rel="stylesheet" href="/nt/css/owl.carousel.min.css" />
          <link rel="stylesheet" href="/nt/css/owl.theme.default.min.css" />
          <link rel="stylesheet" href="/nt/css/font-awesome.css" />
          <link rel="stylesheet" href="/nt/css/colors.css" />
          <link rel="stylesheet" href="/nt/css/font.css" />
          <link rel="stylesheet" href="/nt/css/generic.css" />
          <link rel="stylesheet" href="/nt/css/responsive.css" />
          <link rel="stylesheet" href="/nt/css/custom.css" />
          <link rel="stylesheet" href="/nt/css/zoomImage.css" />
        </>
      )}

      {/* {themeType === "dominos" && (
        <>
          <link
            href="/dominos/css/bootstrap.min.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/dominos/css/animate.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/dominos/css/owl.carousel.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/dominos/css/owl.theme.default.min.css"
          />
          <link
            href="/dominos/css/custom.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="/dominos/css/style.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="/dominos/css/responsive.css"
            rel="stylesheet"
            type="text/css"
          />
          <link href="/dominos/css/zoomImage.css" rel="stylesheet" />
        </>
      )} */}

      {/* {themeType === "FD123456" && (
        <>
          <link
            href="https://foodcoredev.blob.core.windows.net/foodcoredevcontainer/fd123456/css/bootstrap.min.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="https://foodcoredev.blob.core.windows.net/foodcoredevcontainer/fd123456/css/style.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
        </>
      )} */}

      {/* {themeType === "tableorder" && (
        <>
          <link
            rel="stylesheet"
            href="/to/css/bootstrap.min.css"
            type="text/css"
          />
          <link
            rel="stylesheet"
            href="/to/css/font-awesome.css"
            type="text/css"
          />
          <link rel="stylesheet" href="/to/css/fonts.css" type="text/css" />
          <link rel="stylesheet" href="/to/css/colors.css" type="text/css" />
          <link rel="stylesheet" href="/to/css/generic.css" type="text/css" />
          <link href="/to/css/custom.css" rel="stylesheet" type="text/css" />
          <link
            rel="stylesheet"
            href="/to/css/responsive.css"
            type="text/css"
          />
        </>
      )} */}
    </>
  );
}
