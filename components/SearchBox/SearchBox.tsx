import css from "./SearchBox.module.css";

interface SearchBoxProps {
  setQuery: (value: string) => void;
}

export default function SearchBox({ setQuery }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setQuery(e.target.value)
      }
    />
  );
}
