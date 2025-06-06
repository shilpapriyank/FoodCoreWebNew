"use client"

import Script from "next/script"

export function DefaultScripts() {
  return (
    <>
      <Script src="/defaulttheme/js/moment-2.10.3.js" async />
      <Script src="/defaulttheme/js/jquery-3.6.2.js" strategy="afterInteractive" />
      <Script src="/defaulttheme/js/bootstrap.min.js" crossOrigin="anonymous" strategy="lazyOnload" defer />
    </>
  )
}

export function NewThemeScripts() {
  return (
    <>
      <Script src="/nt/js/jquery.min.js" strategy="beforeInteractive" />
      <Script src="/nt/js/moment-2.10.3.js" strategy="beforeInteractive" />
      <Script src="/nt/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
      <Script src="/nt/js/custom.js" strategy="afterInteractive" />
    </>
  )
}

export function DominosScripts() {
  return (
    <>
      <Script src="/dominos/js/jquery.min.js" />
      <Script src="/dominos/js/moment-2.10.3.js" async />
      <Script src="/dominos/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
      <Script src="/dominos/js/wow.min.js" strategy="afterInteractive" />
    </>
  )
}

export function FD123456Scripts() {
  return (
    <>
      <Script
        src="https://foodcoredev.blob.core.windows.net/foodcoredevcontainer/fd123456/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />
    </>
  )
}

export function TableOrderScripts() {
  return (
    <>
      <Script src="/to/js/jquery.min.js" strategy="afterInteractive" />
      <Script src="/to/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
      <Script src="/to/js/wow.min.js" strategy="afterInteractive" />
      <Script src="/to/js/fontawesome.min.js" strategy="afterInteractive" />
      <Script src="/to/js/custom.js" strategy="afterInteractive" />
    </>
  )
}
