'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Stripe from 'stripe';
import { Card, CardContent, CardTitle } from './ui/card';

interface Props {
  products: Stripe.Product[];
}
export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);

      console.log(products);
    }, 5000);
    return () => clearInterval(interval);
  }, [products, products.length]);

  const currentProduct = products[current];
  const price = currentProduct.default_price as Stripe.Price;

  return (
    <Card className='relative overflow-hidden rounded-lg shadow-md border-gray-300 bg-gradient-to-tr from-gray-600 to-gray-100 py-0 px-4'>
      {currentProduct.images && currentProduct.images[0] && (
        <div className='relative h-96 w-full'>
          <Image
            src={currentProduct.images[0]}
            alt={currentProduct.name}
            layout='fill'
            //objectFit='cover'
            className='transition-opacity duration-500 ease-in-out object-cover'
          />
        </div>
      )}
      <CardContent className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80'>
        <CardTitle className='text-3xl font-bold text-white mb-2'>
          {currentProduct.name}
        </CardTitle>
        {price && price.unit_amount && (
          <p className='text-xl text-white'>
            ${(price.unit_amount / 100).toFixed(2)}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
