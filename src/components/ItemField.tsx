type TItemFieldProps = {
  title: string;
  value: string;
};

export default function ItemField({ title, value }: TItemFieldProps) {
  return (
    <div className="border-b last:border-none border-emerald-300 pb-2 mt-2">
      <p className="font-semibold capitalize text-emerald-800">{title}</p>
      <p className="text-gray-700">{value}</p>
    </div>
  );
}
