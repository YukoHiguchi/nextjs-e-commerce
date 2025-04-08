import React from 'react';
import { stripe } from '@/lib/stripe';
import { ProductDetail } from '@/components/product-detail';

export default async function Productpage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await stripe.products.retrieve(id, {
    expand: ['default_price'],
  });
  // Converts a JavaScript value to a JSON string, and then convert the string to JavaScript object
  const plainProduct = JSON.parse(JSON.stringify(product));
  return <ProductDetail product={plainProduct} />;
}
