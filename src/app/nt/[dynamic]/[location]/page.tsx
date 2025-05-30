"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Footer from "@/components/nt/layout/footer/footer.component";

export default function LocationPage() {
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const theme = params?.dynamic;
    const location = params?.location;

    if (theme && location) {
      router.push(`/nt/${theme}/${location}`);
    }
  }, []);

  return (
    <div>
      this is nt/fc/location page...
      <Footer />
    </div>
  );
}
