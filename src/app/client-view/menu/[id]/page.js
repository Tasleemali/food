'use client';

// import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { food_list } from '@/utils';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { GlobalContext } from '@/context';
const FoodDetails = ({ params }) => {
    const router = useRouter()
    console.log(food_list)
    const [foodItem, setFoodItem] = useState(null);
    const {addcart} = useContext(GlobalContext)

    useEffect(() => {
        const selectedItem = food_list.find((item) => String(item._id) === String(params.id));
        if (selectedItem) {
            setFoodItem(selectedItem);
        }
    }, []);

    if (!foodItem) {
        return <div className="text-center py-10">Food item not found</div>;
    }

    return (
        <div className="bg-white text-black">
            <div className='max-w-screen-2xl h-auto px-5 py-10'>
                <div className=' pb-10 flex flex-wrap justify-center items-start md:flex-nowrap gap-5 shadow-sm shadow-slate-300'>
                    <div className=''>
                        <Image className='rounded-md w-96 h-auto' src={foodItem.image} alt={foodItem.name} />
                    </div>
                    <div className='py-5 px-3'>
                        <h1 className=' md:text-3xl font-semibold'>{foodItem.name}</h1>
                        <p className='text-gray-400'>{foodItem.description}</p>
                        <p>${foodItem.price}</p>
                        <div className=' pt-10 px-3 w-full'>
                    <Button className=' text-xs bg-slate bg-green-500 ext-white w-full font-semibold '
                            onClick={() => { addcart(foodItem), router.push("/service/cart") }}>ADD TO CART</Button>
                    
                    </div>
                    </div>
                   
                   
                </div>
                
    {/* relted product */} 
    <h1 className=' pt-5 text-center text-2xl font-semibold'>Related Dish</h1> 
                <div className=' py-10 grid grid-cols-2 md:grid-cols-4 place-items-center gap-5 '> 
               
                    {food_list.map((item) => {
                            if (foodItem.category === item.category) {
                                return (
                                    <div onClick={()=>router.push(`/client-view/menu/${item._id}`)} className='pb-2 max-w-[300px] h-auto shadow-sm shadow-gray-200'>
                                        <div className='w-full  retaive '>
                                            <Image src={item.image} />
                                            <div className='py-2'>
                                                <h1 className='text-sm px-2'>{item.name}</h1>
                                                <p className='text-gray-400 text-sm px-2'>{item.description}</p>
                                                <p className='text-sm px-2'><span className='text-green-500'>$</span>{item.price}</p>
                                               
                                               <div className='px-2 pt-5'> <Button className=' text-xs bg-slate bg-green-500 ext-white w-full font-semibold '
                            onClick={() => { addcart(foodItem), router.push("/service/cart") }}>ADD TO CART</Button></div>
                    
                                            </div>
                                          
                                        </div>

                                    </div>
                                )
                            }
                        })}
                </div>

                    </div>
             
                
            </div>
    );
};

export default FoodDetails;