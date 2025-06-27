"use client";

interface RestaurantData {
  id: string;
  name: string;
  themeType: string;
  description: string;
}

interface RestaurantContentProps {
  data: RestaurantData;
}

export function RestaurantContent({ data }: RestaurantContentProps) {
  return (
    <div>
      <h2>{data.name}</h2>
      <p>Theme: {data.themeType}</p>
      <p>{data.description}</p>
      {/* Your interactive content here */}
    </div>
  );
}
