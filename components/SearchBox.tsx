import cn from "@/utils/cn";
import { FC } from "react";
import { ImSearch } from "react-icons/im";

interface Props {
  className?: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

const SearchBox: FC<Props> = ({ className, value, onChange, onSubmit }) => {
  return (
    <form
      className={cn(
        "flex relative items-center justify-center h-10",
        className
      )}
      onSubmit={onSubmit}
    >
      <input
        type='text'
        value={value}
        onChange={onChange}
        placeholder='Location Name'
        className={cn(
          "px-2 py-1 w-[220px] h-[33px] border border-gray-400 rounded-l-md focus:outline-none focus:border-green-500"
        )}
      />
      <button
        type='submit'
        className={cn(
          "px-2 py-1 bg-green-500 text-white rounded-r-md focus:outline-none hover:bg-green-700 whitespace-nowrap h-[33px]"
        )}
      >
        <ImSearch />
      </button>
    </form>
  );
};

export default SearchBox;
