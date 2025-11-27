import css from "./SearchBox.module.css";
import { useDebouncedCallback } from "use-debounce";

interface SearchBoxProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export default function SearchBox({
  searchValue,
  setSearchValue,
}: SearchBoxProps) {
  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchValue(value), 2000;
    }
  );
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={searchValue}
      onChange={handleChange}
    />
  );
}
