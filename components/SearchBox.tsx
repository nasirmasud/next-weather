import cn from "@/utils/cn";
import { ImSearch } from "react-icons/im";

interface Props {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
}

const SearchBox = (props: Props) => {
  return (
    <form
      className={cn(
        "flex relative items-center justify-center h-10",
        props.className
      )}
      onSubmit={props.onSubmit}
    >
      <input
        type='text'
        value={props.value}
        onChange={props.onChange}
        placeholder='Location Name'
        className='px-2 py-1 w-[220px] h-[33px] border border-gray-400 rounded-l-md focus:outline-none focus:border-green-500'
      />
      <button className='px-2 py-1 bg-green-500 text-white rounded-r-md focus:outline-none hover:bg-green-700 whitespace-nowrap h-[33px]'>
        <ImSearch />
      </button>
    </form>
  );
};

export default SearchBox;
