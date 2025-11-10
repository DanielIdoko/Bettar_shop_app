import React from "react";

const Product = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { product } = await params;

  return <div>Product {product}</div>;
};

export default Product;
