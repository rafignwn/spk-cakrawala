import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Icon } from "@icon-park/react/lib/runtime";
import { useLocation } from "react-router-dom";

interface IMenuItem {
  to: string;
  title?: string;
  color?:
    | "red"
    | "cyan"
    | "emerald"
    | "blue"
    | "sky"
    | "gray"
    | "green"
    | "purple"
    | "yellow"
    | "orange";
  Icon: Icon;
}

export default function MenuItem({
  to,
  title = "Menu Item",
  color = "red",
  Icon,
}: IMenuItem) {
  const [active, setActive] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == to) {
      setActive(true);
      console.log(color);
    } else {
      setActive(false);
    }
  }, [location.pathname]);

  return (
    <li className="p-3">
      <Link
        to={to}
        title={title}
        onClick={() => setActive(true)}
        className={`${
          active ? `bg-pink-300 text-pink-700` : `bg-pink-50 text-pink-600`
        } bg-opacity-80 rounded-md p-3 inline-block shadow-sm shadow-gray-500`}
      >
        <Icon size={30} />
      </Link>
    </li>
  );
}
