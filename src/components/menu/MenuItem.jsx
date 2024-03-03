const MenuItem = () => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-xl hover:shadow-black/25 transition-all">
      <div className="text-center">
        <img src="/pizza.png" alt="pizza" className="max-h-24 block mx-auto" />
      </div>
      <h4 className="my-3 font-bold text-xl">Pepperoni Pizza</h4>
      <p className="text-gray-500 text-sm">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit?
      </p>
      <button className="px-8 py-2 w-full bg-primary text-white mt-4 rounded-full ">
        Add to cart $12
      </button>
    </div>
  );
};

export default MenuItem;
