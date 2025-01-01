import React from "react";

const Product = async ({ params }: { params: Promise<{ product: string }> }) => {
  const { product } = await params;

  return <div>Product {product}</div>;
};

export default Product;
