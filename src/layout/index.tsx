import { AddThree, InsertTable } from "@icon-park/react";
import { Outlet } from "react-router-dom";
import MenuItem from "../components/MenuItem";

export default function MainLayout() {
  return (
    <div className="font-mono">
      <div className="title-app">
        <h1 className="font-bold text-3xl">
          <span className="poin"></span>
          <span className="text">SPK</span>
          <span className="ml-3 text-red-200 animate-bounce">CA</span>
          <span className="text-pink-300">KRA</span>
          <span className="text-emerald-400">WA</span>
          <span className="text-sky-200">LA</span>
        </h1>
      </div>

      {/* sidebar */}
      <div className="flex px-2 w-full justify-center">
        <ul className="flex rounded-lg h-fit gap-3 fixed left-10 top-5">
          <MenuItem Icon={AddThree} title="Tambah Pesanan" to="/" color="red" />
          <MenuItem
            Icon={InsertTable}
            title="Data Pesanan"
            to="/pesanan"
            color="emerald"
          />
        </ul>

        {/* content */}
        <div className="flex-1 flex justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
