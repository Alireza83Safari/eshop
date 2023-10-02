import adminAxios from "../../../services/Axios/adminInterceptors";
import Spinner from "../../Spinner/Spinner";
import useFetch from "../../../hooks/useFetch";

const OrderInfos = () => {
  const { datas: orders, isLoading } = useFetch("/order", adminAxios);
  const income = orders?.data?.reduce((total, sale) => total + sale?.price, 0);
  const totalTax = Math.floor(income / 9);
  const netProfit = income - totalTax;

  const DataSection = ({ label, value, color }) => (
    <div className="bg-white-100 dark:bg-black-200 2xl:py-6 sm:py-4 py-3 rounded-xl mt-6 text-center col-span-1 md:mx-5 mx- relative2">
      {isLoading ? (
        <div className="h-28 relative">
          <Spinner />
        </div>
      ) : (
        <>
          <span className="font-bold 2xl:text-xl xl:text-lg sm:text-xs text-sm">
            {label}
          </span>
          <h1
            className={` 2xl:text-5xl lg:text-3xl sm:text-2xl text-xl font-bold md:my-6 my-3 ${color} `}
          >
            {value} $
          </h1>
        </>
      )}
    </div>
  );

  return (
    <div className="dark:text-white-100 grid sm:grid-cols-3">
      <DataSection
        label="Your Tax This Month"
        value={totalTax.toLocaleString()}
        color="text-red-300"
      />

      <DataSection
        label="Your Income This Month"
        value={income?.toLocaleString()}
        color="text-blue-600"
      />

      <DataSection
        label="Your Profit This Month"
        value={netProfit?.toLocaleString()}
        color="text-green-300"
      />
    </div>
  );
};

export default OrderInfos;
