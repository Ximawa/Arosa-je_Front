const CardListing = () => {
  return (
    <div className="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
      <div>
        <img
          className="object-center object-cover h-auto w-full"
          src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
          alt="photo"
        />
      </div>
      <div className="text-center py-8 sm:py-6">
        <p className="text-xl text-gray-700 font-bold mb-2">Dany Bailey</p>
        <p className="text-base text-gray-400 font-normal">Software Engineer</p>
      </div>
    </div>
  );
};

export default CardListing;
