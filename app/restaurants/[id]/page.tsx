import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: true,
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantImage name={restaurant.name} imageUrl={restaurant.imageUrl} />

      <div className="flex items-center justify-between px-5 pt-5">
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-8 w-8">
            <Image
              className="rounded-full object-cover"
              src={restaurant.imageUrl}
              fill
              alt={restaurant.name}
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>

        <div className="flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px] text-white">
          <StarIcon className="fill-yellow-400 text-yellow-400" size={12} />
          <span className="text-xs font-semibold">5.0</span>
        </div>
      </div>

      <div className="px-5">
        <DeliveryInfo
          deliveryFee={restaurant.deliveryFee}
          deliveryTimeMinutes={restaurant.deliveryTimeMinutes}
        />
      </div>

      <div className="mt-3 flex gap-4 overflow-x-scroll px-5 scrollbar-hide">
        {restaurant.categories.map((category) => (
          <div
            className="min-w-[167px] rounded-lg bg-[#F4F4F4] text-center"
            key={category.id}
          >
            <span className="text-xs text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantPage;