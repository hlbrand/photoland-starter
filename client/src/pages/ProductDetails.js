import React, { useContext } from "react";
// useParams hook
import { useParams } from "react-router-dom";
// useFetch hook
import useFetch from "../hooks/useFetch";
// components
import RelatedProducts from "../components/RelatedProducts";
// context
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
  const { addToCart } = useContext(CartContext);

  // get id of the product from the URL params
  const { id } = useParams();

  // fetch product data base on the id
  const { data } = useFetch(`/products?populate=*&filters[id][$eq]=${id}`);

  // if the data is not yet fetched, show loading message
  if (!data) {
    return <div className="container mx-auto">loading...</div>;
  }

  // get the category title of the current product
  const categoryTitle = data[0].attributes.categories.data[0].attributes.title;

  // log the category title to the console
  console.log(categoryTitle);

  return (
    <div className="mb-16 pt-44 lg:pt-[30px] xl:pt-0">
      <div className="container mx-auto">
        {/* product details */}
        <div className="flex flex-col lg:flex-row gap-[30px] mb-[30px]">
          <div className="flex-1 lg:max-w-[40%] lg:h-[540px] grad rounded-lg flex justify-center items-center">
            <img
              src={`http://localhost:1337${data[0].attributes.image.data.attributes.url}`}
              alt=""
              className="w-full max-w-[65%]"
            />
          </div>
          <div className="flex-1 bg-primary p-12 xl:p-20 rounded-lg flex flex-col justify-center">
            {/* product category */}
            <div className="uppercase text-acecnt text-lg font-medium mb-2">
              {categoryTitle} cameras
            </div>
            {/* product title */}
            <h2 className="h2 mb-4">{data[0].attributes.title}</h2>
            {/* product description */}
            <p className="mb-12">{data[0].attributes.description}</p>
            {/* product price & add to cart button */}
            <div className="flex items-center gap-x-8 ">
              {/* product price */}
              <div className="text-3xl text-accent font-semibold">
                ${data[0].attributes.price}
              </div>
              {/* add to cart button */}
              <button
                onClick={() => addToCart(data, id)}
                className="btn btn-accent"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        {/* related products */}
        <RelatedProducts categoryTitle={categoryTitle} />
      </div>
    </div>
  );
};

export default ProductDetails;
