import { GoLocation } from "react-icons/go";
import { TbCurrentLocation } from "react-icons/tb";
import { TiWeatherSunny } from "react-icons/ti";
import SearchBox from "./SearchBox";

interface Props {}

const Navbar = ({}: Props) => {
  return (
    <nav className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
      <div className='h-[80x] w-full flex justify-between items-center max-w-7x1 px-3 mx-auto'>
        <div className='flex items-center justify-center gap-2'>
          <h2 className='text-gray-500 text-3xl'>Weather</h2>
          <TiWeatherSunny className='text-3xl mt-1 text-orange-400' />
        </div>
        <div className='flex gap-5'>
          <div className='flex gap-2 items-center'>
            <TbCurrentLocation className='text-2xl text-gray-700 hover:opacity-60 cursor-pointer' />
            <GoLocation className='text-xl' />
            <p className='text-slate-950 text-sm'>Chittagong</p>
          </div>
          <div>
            <SearchBox value={""} onChange={undefined} onSubmit={undefined} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
