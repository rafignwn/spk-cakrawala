import { Close } from "@icon-park/react";

type TFilterProp = {
  filterText: string;
  onFilter: (value: string) => void;
  onClear: () => void;
};

export default function FilterDataComponent({
  filterText,
  onFilter,
  onClear,
}: TFilterProp) {
  return (
    <div className="relative">
      <input
        className="outline-none border border-emerald-400 w-96 px-2 py-1 rounded-md text-emerald-700 placeholder:text-pink-400"
        value={filterText}
        onChange={(e) => onFilter(e.target.value)}
        type="text"
        placeholder="Cari - CS, Konsumen atau Pembuat Nota"
      />
      <button
        className="absolute right-0 top-0 grid rounded-r-md place-items-center bg-emerald-200 text-emerald-600 h-full aspect-square text-center"
        onClick={onClear}
      >
        <Close size={20} />
      </button>
    </div>
  );
}
