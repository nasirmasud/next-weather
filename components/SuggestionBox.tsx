const SuggestionBox = ({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error,
}: {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}) => {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className='mb-4 bg-white absolute border top-[40px] left-0 border-green-400 rounded-md min-w-[250px] flex flex-col gap-1 py-2 px-2'>
          {error && suggestions.length < 1 && (
            <li className='text-red-500 p-1'>{error}</li>
          )}
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(item)}
              className='cursor-pointer p-1 rounded hover:bg-green-200'
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SuggestionBox;
