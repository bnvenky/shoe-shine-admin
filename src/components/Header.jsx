import { GoBell } from "react-icons/go";
import PopoverPopupState from "./dashboardComponents/PopOver";

const Header = () => {
  return (
    <div className="flex justify-between items-center bg-white p-4">
      <div className="hidden md:flex">
          <input
            type="text"
            placeholder="Search..."
            className="bg-indigo-100/30 px-4 py-2 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-600"
          />
        </div>
      <div className="flex items-center space-x-5">
        
        <div className="flex items-center space-x-5">
          <button className="relative text-2xl text-gray-600 ">
            <GoBell size={28} />
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex justify-center items-center bg-indigo-600 text-white font-semibold text-[10px] w-5 h-4 rounded-full border-2 border-white">
              9
            </span>
          </button>
          
          <PopoverPopupState/>

        </div>
      </div>
    </div>
  );
};

export default Header;
