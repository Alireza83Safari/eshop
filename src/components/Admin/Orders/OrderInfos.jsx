const OrderInfos = ({ tax, income, netProfit }) => {
  const DataSection = ({ label, value, color }) => (
    <div className="bg-white-100 dark:bg-black-200 2xl:py-6 md:py-4 py-2 rounded-xl mt-6 text-center col-span-1 md:mx-5 mx-2">
      <span className="font-bold text-[10px] md:text-xs xl:text-lg 2xl:text-xl">
        {label}
      </span>
      <h1
        className={`  lg:text-3xl md:text-2xl font-bold md:my-6 my-3 2xl:text-5xl ${color} `}
      >
        {value} $
      </h1>
    </div>
  );

  return (
    <div className="dark:text-white-100 grid grid-cols-3">
      <DataSection
        label="Your Tax This Month"
        value={tax.toLocaleString()}
        color="text-red-300"
      />

      <DataSection
        label="Your Income This Month"
        value={income.toLocaleString()}
        color="text-blue-600"
      />

      <DataSection
        label="Your Profit This Month"
        value={netProfit.toLocaleString()}
        color="text-green-300"
      />
    </div>
  );
};

export default OrderInfos;
