import AddBelanjaPage from "./components/AddBelanjaPage";
import AddPesananPages from "./components/AddPesananPages";
import PesananPages from "./components/PesananPages";
// import { BrowserRouter, Routes } from "react-router-dom";
import MainLayout from "./layout";
import BelanjaPage from "./components/BelanjaPage";
import DetailPesananPage from "./components/DetailPesananPage";
import { Toaster } from "react-hot-toast";
import { Router, Route } from "electron-router-dom";
// import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div>
      <Toaster />
      <Router
        main={
          <>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<AddPesananPages />} />
              <Route path=":idPesanan" element={<AddPesananPages />} />
              <Route path="pesanan" element={<PesananPages />} />
              <Route
                path="pesanan/:idPesanan"
                element={<DetailPesananPage />}
              />
              <Route
                path="tambah-belanja/:idPesanan"
                element={<AddBelanjaPage />}
              />
              <Route path="belanja" element={<BelanjaPage />} />
            </Route>
          </>
        }
      />
    </div>
  );
}

export default App;
