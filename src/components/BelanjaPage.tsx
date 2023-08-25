import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

export default function BelanjaPage() {
  const [dataPesanan, setDataPesana] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchPesanan() {
    setLoading(true);
    try {
      const res = await fetch(
        "https://kelasf.000webhostapp.com/api/getBelanja.php"
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

  return (
    <div className="mt-10 w-full bg-white p-5 rounded-lg">
      <h3 className="text-sky-700 text-2xl font-semibold mb-5">
        Data Belanjaan
      </h3>

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
                name: "Pembuat Nota",
                selector: (row) => row.nama_pn,
                sortable: true,
              },
              {
                name: "Pelaksana",
                selector: (row) => row.pelaksana,
                sortable: true,
              },
              {
                name: "Pembayaran",
                selector: (row) => row.pembayaran,
              },
              {
                name: "Tgl Dibuat",
                selector: (row) => row.createdAt,
                sortable: true,
              },
            ]}
            data={dataPesanan}
            pagination
            customStyles={{
              rows: {
                style: {
                  padding: 0,
                  minHeight: "35px",
                },
              },
            }}
            onRowClicked={(row) => {
              console.log(row);
            }}
          />
        )}
      </div>
    </div>
  );
}
