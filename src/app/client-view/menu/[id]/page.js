'use client';

import { useContext, useEffect, useState } from 'react';
import { food_list } from '@/utils';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { GlobalContext } from '@/context';

const FoodDetails = ({ params }) => {
  const router = useRouter();
  const [foodItem, setFoodItem] = useState(null);
  const { addcart } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const selectedItem = food_list.find((item) => String(item._id) === String(params.id));
    if (selectedItem) {
      // simulate loading delay like real fetch
      setTimeout(() => {
        setFoodItem(selectedItem);
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  }, [params.id]);

  const SkeletonBox = ({ className }) => (
    <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
  );

  return (
    <div className="bg-white text-black">
      <div className="max-w-screen-2xl h-auto px-5 py-10 mx-auto">
        <div className="pb-10 flex flex-wrap justify-center items-start md:flex-nowrap gap-5 shadow-sm shadow-slate-300">
          <div>
            {loading ? (
              <SkeletonBox className="w-96 h-80" />
            ) : (
              <Image className="rounded-md w-96 h-auto" src={foodItem?.image} alt={foodItem?.name} width={400} height={300} />
            )}
          </div>

          <div className="py-5 px-3 w-full max-w-md">
            {loading ? (
              <div className="flex flex-col gap-4">
                <SkeletonBox className="h-8 w-3/4" />
                <SkeletonBox className="h-4 w-full" />
                <SkeletonBox className="h-4 w-1/2" />
                <SkeletonBox className="h-10 w-full mt-10" />
              </div>
            ) : (
              <>
                <h1 className="md:text-3xl font-semibold">{foodItem?.name}</h1>
                <p className="text-gray-400">{foodItem?.description}</p>
                <p>₹{foodItem?.price}</p>
                <div className="pt-10 px-3 w-full">
                  <Button
                    className="text-xs bg-green-500 text-white w-full font-semibold"
                    onClick={() => {
                      addcart(foodItem);
                      router.push('/service/cart');
                    }}
                  >
                    ADD TO CART
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Related Dishes */}
        <h1 className="pt-5 text-center text-2xl font-semibold">
          {loading ? <SkeletonBox className="h-6 w-40 mx-auto" /> : 'Related Dishes'}
        </h1>

        <div className="py-10 grid grid-cols-2 md:grid-cols-4 place-items-center gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-full max-w-[300px] shadow-sm shadow-gray-200 p-2 rounded animate-pulse">
                  <SkeletonBox className="aspect-square mb-2" />
                  <SkeletonBox className="h-4 w-3/4 mb-1" />
                  <SkeletonBox className="h-3 w-full mb-1" />
                  <SkeletonBox className="h-4 w-1/2 mb-3" />
                  <SkeletonBox className="h-9 w-full" />
                </div>
              ))
            : food_list
                .filter((item) => item.category === foodItem?.category)
                .map((item, i) => (
                  <div
                    key={i}
                    onClick={() => router.push(`/client-view/menu/${item._id}`)}
                    className="pb-2 max-w-[300px] h-auto shadow-sm shadow-gray-200 rounded cursor-pointer"
                  >
                    <div className="w-full relative">
                      <Image src={item.image} alt={item.name} width={300} height={200} className="rounded-md" />
                      <div className="py-2">
                        <h1 className="text-sm px-2">{item.name}</h1>
                        <p className="text-gray-400 text-sm px-2">{item.description}</p>
                        <p className="text-sm px-2">
                          <span className="text-green-500">₹</span>
                          {item.price}
                        </p>
                        <div className="px-2 pt-5">
                          <Button
                            className="text-xs bg-green-500 text-white w-full font-semibold"
                            onClick={(e) => {
                              e.stopPropagation();
                              addcart(item);
                              router.push('/service/cart');
                            }}
                          >
                            ADD TO CART
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
