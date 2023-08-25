import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import FilterDataComponent from "./FilterDataComponent";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useDelete from "../hooks/useDelete";

export default function PesananPages() {
  const [dataPesanan, setDataPesana] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<Array<any>>([]);
  const [filterText, setFilterText] = useState<string>("");
  const navigation = useNavigate();
  const [selectedRows, setSelectedRows] = useState<Array<any>>([]);
  const { deleteData, setLoadingPesanan, loadingPesanan } = useDelete();

  // fungsi untuk menghapus pesanan
  function handleDeleteSelectedPesanan() {
    const ids: any[] = selectedRows.map((row) => row.id_pesanan);
    setLoadingPesanan(true);
    toast(
      (t) => {
        setLoadingPesanan(t.visible);
        return (
          <div>
            <p className="mb-3 text-xl">Lanjutkan hapus data pesanan?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={async () => {
                  toast.dismiss(t.id);
                  await toast.promise(deleteData("pesanan", ids), {
                    success: "Data pesanan berhasil dihapus👌",
                    error: "Data pesanan gagal dihapus🙏",
                    loading: "Menghapus pesanan...",
                  });
                  toast.dismiss(t.id);

                  const newData: Array<any> = filteredData.filter(
                    (item) => !ids.includes(item.id_pesanan)
                  );
                  setFilteredData(newData);
                  setSelectedRows([]);
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

  async function fetchPesanan() {
    setLoading(true);
    try {
      const res = await fetch(
        "https://kelasf.000webhostapp.com/api/getPesanan.php"
      );
      const data = await res.json();

      if (data) {
        console.log(data);
        setDataPesana(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPesanan();
  }, []);

  // membuat fungsi untk menghapus filter
  function handleClearFilter() {
    if (filterText) {
      setFilterText("");
    }
  }

  useEffect(() => {
    if (dataPesanan) {
      const newData = dataPesanan.filter(
        (item) =>
          item.nama_cs.toLowerCase().includes(filterText.toLowerCase()) ||
          item.nama_konsumen.toLowerCase().includes(filterText.toLowerCase()) ||
          item.nama_pn.toLowerCase().includes(filterText.toLowerCase()) ||
          item.pelaksana.toLowerCase().includes(filterText.toLowerCase())
      );

      setFilteredData(newData);
    }
  }, [dataPesanan, filterText]);

  return (
    <div className="mt-10 w-full bg-white p-5 rounded-lg">
      <h3 className="text-emerald-700 text-2xl font-semibold">Data Pesanan</h3>
      <div>
        {loading ? (
          <p>Loading Data...</p>
        ) : (
          <DataTable
            columns={[
              {
                name: "Penerima Pesanan",
                selector: (row) => row.nama_cs,
                sortable: true,
              },
              {
                name: "Konsumen",
                selector: (row) => row.nama_konsumen,
                sortable: true,
              },
              {
                name: "Pembuat Nota",
                selector: (row) => row.nama_pn,
                sortable: true,
              },
              {
                name: "Pelaksana",
                selector: (row) => (row.pelaksana ? row.pelaksana : "-"),
                sortable: true,
              },

              {
                name: "Pembayaran",
                selector: (row) => (row.pembayaran ? row.pembayaran : "-"),
              },
              {
                name: "Tgl Dibuat",
                selector: (row) => row.createdAt,
                sortable: true,
              },
              {
                name: "Nama Pengambi",
                selector: (row) => (row.pengambil ? row.pengambil : "_"),
                sortable: true,
              },
              {
                name: "Yang Menyerahkan",
                selector: (row) => (row.menyerahkan ? row.menyerahkan : "_"),
                sortable: true,
              },
            ]}
            data={filteredData}
            pagination
            subHeader
            selectableRows
            onSelectedRowsChange={(selected) => {
              setSelectedRows(selected.selectedRows);
            }}
            subHeaderComponent={
              <div
                className={`w-full flex ${
                  selectedRows.length > 0 ? "justify-between" : "justify-end"
                }`}
              >
                {selectedRows.length > 0 ? (
                  <button
                    disabled={loadingPesanan}
                    className={`px-4 py-1 rounded font-semibold tracking-wide ${
                      loadingPesanan
                        ? "bg-slate-400 text-slate-900"
                        : "bg-pink-200 hover:bg-pink-300 text-red-600"
                    }`}
                    onClick={handleDeleteSelectedPesanan}
                  >
                    Hapus Data?
                  </button>
                ) : (
                  ""
                )}
                <FilterDataComponent
                  filterText={filterText}
                  onFilter={setFilterText}
                  onClear={handleClearFilter}
                />
              </div>
            }
            customStyles={{
              rows: {
                style: {
                  padding: 0,
                  minHeight: "35px",
                  "&:hover": {
                    backgroundColor: "hsla(20, 70%, 80%, 0.6)",
                    cursor: "pointer",
                  },
                },
              },
              cells: {
                style: {
                  fontSize: "15px",
                },
              },
              headRow: {
                style: {
                  fontWeight: 700,
                  fontSize: "16px",
                  backgroundColor: "hsla(180, 70%, 80%, 0.6)",
                  minHeight: "35px",
                },
              },
              subHeader: {
                style: {
                  padding: 0,
                },
              },
            }}
            onRowClicked={(row) => {
              navigation(`/pesanan/${row.id_pesanan}`);
            }}
          />
        )}
      </div>
    </div>
  );
}
