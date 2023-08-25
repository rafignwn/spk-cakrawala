import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ItemField from "./ItemField";
import { Delete, EditTwo, ShoppingCartAdd } from "@icon-park/react";
import { toast } from "react-hot-toast";
import useDelete from "../hooks/useDelete";

interface IDataPesanan {
  nama_cs: string;
  nama_konsumen: string;
  nama_pn: string;
  pelaksana: string;
  pembayaran: string;
  belanjaan: Array<any>;
  pengambil: string;
  menyerahkan: string;
}

// membuat fungsi untuk mengubah format ke rupiah
function currencyIdr(value: string | number): string {
  const number: number = typeof value == "string" ? parseInt(value) : value;
  return number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export default function DetailPesananPage() {
  const [data, setData] = useState<IDataPesanan | null>(null);
  const { idPesanan } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingUpdatePesanan, setloadingUpdatePesanan] =
    useState<boolean>(false);
  const [pengambil, setPengambil] = useState<string>("");
  const [menyerahkan, setMenyerahkan] = useState<string>("");
  const {
    deleteData,
    setLoadingBelanja,
    loadingBelanja,
    setLoadingPesanan,
    loadingPesanan,
  } = useDelete();

  let total = 0;

  async function getDataDetailPesanan() {
    setLoading(true);
    try {
      const res = await fetch(
        `https://kelasf.000webhostapp.com/api/getDetailPesananById.php?id=${idPesanan}`
      );
      const resJson = await res.json();

      if (resJson.belanjaan) {
        console.log(resJson);
        setData(resJson);
        setPengambil(resJson.pengambil);
        setMenyerahkan(resJson.menyerahkan);
      } else {
        console.log("Data Tidak Tersedia");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpadatePesanan() {
    if (pengambil || menyerahkan) {
      try {
        setloadingUpdatePesanan(true);
        const formData = new FormData();
        formData.append("pengambil", pengambil);
        formData.append("menyerahkan", menyerahkan);
        formData.append("id_pesanan", idPesanan ? idPesanan : "");

        const res = await fetch(
          "https://kelasf.000webhostapp.com/api/updatePesananTwo.php",
          {
            method: "POST",
            body: formData,
          }
        );
        const resJson = await res.json();
        if (resJson.status != "success") {
          throw new Error("Gagal Update Data Pesanan");
        }
        setData((prev) => ({
          ...(prev as IDataPesanan),
          pengambil: pengambil,
          menyerahkan: menyerahkan,
        }));
      } catch (error) {
        console.log(error);
      } finally {
        setloadingUpdatePesanan(false);
      }
    }
  }

  // fungsi untuk menghapus pesanan
  function handleDeletePesanan() {
    setLoadingPesanan(true);
    toast(
      (t) => {
        setLoadingPesanan(t.visible);
        return (
          <div>
            <p className="mb-3 text-xl">Lanjutkan hapus data pesanan?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  toast.promise(
                    deleteData("pesanan", idPesanan ? idPesanan : ""),
                    {
                      success: "Data pesanan berhasil dihapus👌",
                      error: "Data pesanan gagal dihapus🙏",
                      loading: "Menghapus pesanan...",
                    }
                  );
                  toast.dismiss(t.id);
                }}
                className="px-2 py-1 rounded-md inline-block shadow-sm shadow-slate-400 bg-sky-200 text-sky-600 font-medium"
              >
                Okeh
              </button>
              <button
                onClick={() => toast.dismiss(t.id)}
                className="px-2 py-1 rounded-md inline-block shadow-sm shadow-slate-400 bg-pink-200 text-pink-600 font-medium"
              >
                Batal
              </button>
            </div>
          </div>
        );
      },
      {
        duration: 20000,
      }
    );
  }

  function filterBelanja(id: string) {
    const newBelanja = data?.belanjaan.filter((item) => item.id_belanja != id);
    setData((prev) => {
      if (prev) {
        return {
          ...prev,
          belanjaan: newBelanja ? newBelanja : [],
        };
      }

      return null;
    });
  }

  useEffect(() => {
    getDataDetailPesanan();
  }, []);

  return (
    <div className="mt-10 w-full">
      <Link
        to={"/pesanan"}
        className="text-emerald-600 inline-block font-semibold tracking-wide bg-emerald-100 rounded-md px-5 py-1"
      >
        {"<--Go-Back"}
      </Link>

      <div className="mt-5 flex gap-10 w-full">
        {/* rincian pesanan */}
        <div className="flex-1 bg-emerald-50 p-4 rounded-md relative">
          <div className="absolute top-5 right-5 flex gap-3">
            <Link
              to={`/${idPesanan}`}
              title="Edit Data Pesanan"
              className="p-2 bg-yellow-100 text-yellow-500 rounded-md shadow-sm shadow-gray-300 inline-block"
            >
              <EditTwo size={20} />
            </Link>
            <button
              disabled={loadingPesanan}
              onClick={handleDeletePesanan}
              className={`p-2 ${
                loadingPesanan
                  ? "text-gray-600 bg-gray-100"
                  : "text-red-500 bg-red-100"
              } rounded-md shadow-sm shadow-gray-300 inline-block`}
            >
              <Delete size={20} />
            </button>
          </div>
          <h3 className="mb-5 text-xl font-semibold text-pink-500 capitalize">
            Rincian pesanan
          </h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <ItemField
                title="Customer Service"
                value={data ? data.nama_cs : ""}
              />
              <ItemField
                title="Konsumen"
                value={data ? data.nama_konsumen : ""}
              />
              <ItemField
                title="Pembuat Nota"
                value={data ? data.nama_pn : ""}
              />
              <ItemField
                title="Pelaksana"
                value={data?.pelaksana ? data.pelaksana : "-"}
              />
              <ItemField
                title="Pembayaran"
                value={data?.pembayaran ? data.pembayaran : "-"}
              />
              <div className="relative pb-2 mt-2 p-2 bg-white rounded-md">
                <label className="font-semibold capitalize text-orange-800">
                  Pengambil Barang
                </label>
                <input
                  type="text"
                  name="pengambil"
                  value={pengambil}
                  onChange={(e) => setPengambil(e.target.value)}
                  placeholder="Masukan Nama Pengambil"
                  className="w-full bg-transparent outline-none"
                />
                <label className="mt-2 block font-semibold capitalize text-orange-800">
                  Penyerah Barang
                </label>
                <input
                  type="text"
                  name="menyerahkan"
                  value={menyerahkan}
                  onChange={(e) => setMenyerahkan(e.target.value)}
                  placeholder="Nama Yang Menyerahkan"
                  className="w-full bg-transparent outline-none"
                />
                <button
                  name="btn"
                  disabled={loadingUpdatePesanan}
                  onClick={() => {
                    toast.promise(handleUpadatePesanan(), {
                      success: `Update Data Berhasil👌`,
                      loading: "Mengupdate belanjaan...",
                      error: `Data gagal diupdate🙏`,
                    });
                  }}
                  className={`bg-orange-200 hover:bg-orange-100 text-orange-600 font-semibold tracking-wide px-4 py-1 rounded-md absolute right-2 bottom-2 ${
                    pengambil != data?.pengambil ||
                    menyerahkan != data?.menyerahkan
                      ? "inline-block"
                      : "hidden"
                  }`}
                >
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
        {/* end rincian pesanan */}

        {/* data belanja */}
        <div className="flex-1 bg-emerald-50 p-4 rounded-md relative">
          <div className="absolute top-5 right-5">
            <Link
              to={`/tambah-belanja/${idPesanan}`}
              title="Edit Data Pesanan"
              className="p-2 bg-sky-100 text-sky-500 rounded-md shadow-sm shadow-gray-300 inline-block"
            >
              <ShoppingCartAdd size={20} />
            </Link>
          </div>
          <h3 className="mb-10 text-xl font-semibold text-pink-500 capitalize">
            Rincian Belanja
          </h3>
          {data?.belanjaan ? (
            data.belanjaan.length > 0 ? (
              <div>
                <div className="flex justify-between mb-3">
                  <p className="font-semibold">Nama barang</p>
                  <p className="font-semibold">Harga</p>
                </div>
                {data.belanjaan.map((item) => {
                  total += parseInt(item.harga);
                  return (
                    <div
                      key={item.id_belanja}
                      className="flex justify-between border-b gap-5 border-emerald-300 mb-4"
                    >
                      <div className="flex gap-1 items-start">
                        <button
                          disabled={loadingBelanja}
                          onClick={async () => {
                            setLoadingBelanja(true);
                            await toast.promise(
                              deleteData("belanja", item.id_belanja),
                              {
                                success: `${item.nama_barang} berhasil dibuang👌`,
                                loading: "Menghapus belanjaan...",
                                error: `${item.nama_barang} gagal dibuang🙏`,
                              }
                            );
                            filterBelanja(item.id_belanja);
                          }}
                          className={`${
                            loadingBelanja
                              ? "text-gray-600 bg-gray-200"
                              : "text-red-500 bg-red-200"
                          } inline-block rounded-sm`}
                        >
                          <Delete size={17} />
                        </button>
                        <p>{item.nama_barang}</p>
                      </div>

                      <p className="whitespace-nowrap">
                        {currencyIdr(item.harga)}
                      </p>
                    </div>
                  );
                })}

                <div className="flex justify-between my-4 pb-2">
                  <p className="font-semibold">Total</p>
                  <p className="font-semibold">{currencyIdr(total)}</p>
                </div>
              </div>
            ) : (
              <p>Tidak Ada Belanjaan</p>
            )
          ) : (
            <p>Tidak Ada Belanjaan</p>
          )}
        </div>
        {/* end data belanja */}
      </div>
    </div>
  );
}
