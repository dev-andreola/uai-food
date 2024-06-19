import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

interface CategoriesPageProps {
  params: {
    id: string;
  };
}

const CategoriesPage = async ({ params: { id } }: CategoriesPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
        take: 12,
      },
    },
  });

  if (!category) {
    return notFound();
  }

  return (
    <>
      <div className="lg:border-b-[1px] lg:border-neutral-200 lg:pb-6">
        <Header />
      </div>
      <div className="mx-auto max-w-6xl px-5 py-6">
        <h2 className="mb-6 text-xl font-semibold">{category.name}</h2>
        <div className="grid w-full grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
          {category.products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="min-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
