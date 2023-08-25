import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

type TDataPesanan = {
  nama_cs: string;
  nama_konsumen: string;
  nama_pn: string;
  pelaksana: string;
  pembayaran: string;
};

export default function AddPesananPages() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataPesanan, setDataPesanan] = useState<TDataPesanan | null>(null);
  const navigation = useNavigate();
  const { idPesanan } = useParams();

  // fungsi untuk mengirim data pesan ke database
  async function handleAddPesanan(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    if (formRef.current) {
      // mengambil data di form yang sudah diisi
      const formData = new FormData(formRef.current);

      if (idPesanan) {
        // mengirim data ke database dengan methode post dengan fungsi fetch
        try {
          formData.append("id_pesanan", idPesanan);
          const res = await fetch(
            "https://kelasf.000webhostapp.com/api/updatePesanan.php",
            {
              method: "POST",
              body: formData,
            }
          );

          // mengambil respon data yang dikirim dari server
          const data = await res.json();

          // jika data berhasil di simpan ke database pindah ke halaman data pesanan
          if (data.status == "success") {
            toast.success("Pesanan berhasil diupdate🤖", { duration: 4000 });
            navigation(`/pesanan/${idPesanan}`);
          }
        } catch (error) {
          console.log(error);
          toast.error("Gagal mengupdate pesanan😑.", { duration: 3000 });
        } finally {
          setLoading(false);
        }
      } else {
        // mengirim data ke database dengan methode post dengan fungsi fetch
        try {
          const res = await fetch(
            "https://kelasf.000webhostapp.com/api/pesanan.php",
            {
              method: "POST",
              body: formData,
            }
          );

          // mengambil respon data yang dikirim dari server
          const data = await res.json();

          // jika data berhasil di simpan ke database pindah ke halaman data pesanan
          if (data.status == "success") {
            toast.success("Pesanan berhasil ditambahkan👽", { duration: 4000 });
            navigation("/pesanan");
          }
        } catch (error) {
          console.log(error);
          toast.error("Gagal menambahkan pesanan😑.", { duration: 3000 });
        } finally {
          setLoading(false);
        }
      }
    }
  }

  // mengambil data pesanan dari database
  async function getPesanan() {
    if (idPesanan) {
      try {
        const res = await fetch(
          `https://kelasf.000webhostapp.com/api/getPesananById.php?id=${idPesanan}`
        );
        const resJson = await res.json();
        console.log(resJson);
        if (resJson.nama_cs) {
          setDataPesanan(resJson);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    getPesanan();
  }, [idPesanan]);

  return (
    <div className="mt-16">
      {idPesanan ? (
        <Link
          className="bg-red-200 text-red-600 font-semibold tracking-wider mb-5 py-1 px-4 rounded-md inline-block shadow-sm shadow-gray-400"
          to={`/pesanan/${idPesanan}`}
        >
          Ga Jadi Update
        </Link>
      ) : (
        ""
      )}
      <form
        ref={formRef}
        onSubmit={handleAddPesanan}
        className="form"
        action="#noh"
        id="FormPesanan"
      >
        <h3 className="form-title">{`Form${
          idPesanan ? " Update" : ""
        } Pesanan Cakrawala`}</h3>
        <div className="rowInput">
          <div className="colInput1">
            <div className="form-input">
              <label htmlFor="InputNama">
                <p>
                  Nama Customer Service <span className="text-red-500">*</span>
                </p>
                <input
                  name="nama_cs"
                  id="InputNama"
                  required
                  defaultValue={idPesanan ? dataPesanan?.nama_cs : ""}
                  placeholder="Masukan Nama Customer Service"
                  type="text"
                />
              </label>
            </div>
            <div className="form-input">
              <label htmlFor="InputKonsumen">
                <p>
                  Nama Konsumen <span className="text-red-500">*</span>
                </p>

                <input
                  name="nama_konsumen"
                  placeholder="Masukan Nama Konsumen"
                  type="text"
                  defaultValue={idPesanan ? dataPesanan?.nama_konsumen : ""}
                  required
                />
              </label>
            </div>
            <div className="form-input">
              <label htmlFor="InputPembuatNota">
                <p>
                  Nama Pembuat Nota <span className="text-red-500">*</span>
                </p>

                <input
                  name="nama_pn"
                  placeholder="Masukan Nama Pembuat Nota"
                  defaultValue={idPesanan ? dataPesanan?.nama_pn : ""}
                  type="text"
                  required
                />
              </label>
            </div>
          </div>
          <div className="colInput2">
            <div className="form-input">
              <label htmlFor="InputPelaksana">
                <p>Pelaksana (mesin)</p>
                <input
                  name="pelaksana"
                  placeholder="Masukan Pelaksana"
                  type="text"
                  defaultValue={idPesanan ? dataPesanan?.pelaksana : ""}
                />
              </label>
            </div>
            <div className="form-input">
              <label htmlFor="InputPembayaran">
                <p>Pembayaran</p>
                <input
                  name="pembayaran"
                  placeholder="Masukan Pembayaran"
                  defaultValue={idPesanan ? dataPesanan?.pembayaran : ""}
                  type="text"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="tombol-submit">
          <button
            className="tombol"
            value="anjas"
            name="save"
            id="submitPesanan"
          >
            {loading
              ? "Menyimpan Data..."
              : idPesanan
              ? "Update Data Pesanan"
              : "simpan data pesanan"}
          </button>
        </div>
      </form>
    </div>
  );
}
