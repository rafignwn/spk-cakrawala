import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AddBelanjaPage() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigate();
  const { idPesanan } = useParams();

  // fungsi untuk mengirim data pesan ke database
  async function handleAddPesanan(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    if (formRef.current) {
      // mengambil data di form yang sudah diisi
      const formData = new FormData(formRef.current);

      //   console.log(formData.get("nama_cs"));

      // mengirim data ke database dengan methode post dengan fungsi fetch
      try {
        if (idPesanan) {
          formData.append("id_pesanan", idPesanan);
        }
        const res = await fetch(
          "https://kelasf.000webhostapp.com/api/belanja.php",
          {
            method: "POST",
            body: formData,
          }
        );

        // mengambil respon data yang dikirim dari server
        const data = await res.json();

        // jika data berhasil di simpan ke database pindah ke halaman data pesanan
        if (data.status == "success") {
          toast.success("Data belanja berhasil ditambahkan🐵", {
            duration: 4000,
          });
          navigation(`/pesanan/${idPesanan}`);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="mt-10 w-1/2">
      <Link
        to={`/pesanan/${idPesanan}`}
        className="text-emerald-600 mb-5 inline-block font-semibold tracking-wide bg-emerald-100 rounded-md px-5 py-1"
      >
        {"<--Go-Back"}
      </Link>

      <form
        ref={formRef}
        onSubmit={handleAddPesanan}
        className="form w-full"
        action="#noh"
        id="FormPesanan"
      >
        <h3 className="form-title">Form Belanja Cakrawala</h3>
        <div className="rowInput">
          <div className="colInput1 w-full">
            <div className="form-input w-full">
              <label htmlFor="InputNama">
                <p>
                  ID Pesanan <span className="text-red-500">*</span>
                </p>
                <input
                  name="id_pesanan"
                  id="InputNama"
                  disabled
                  value={idPesanan}
                  placeholder="Masukan Nama Customer Service"
                  type="text"
                  className="w-full"
                />
              </label>
            </div>
            <div className="form-input">
              <label htmlFor="InputBarang">
                <p>
                  Nama Barang <span className="text-red-500">*</span>
                </p>

                <input
                  name="nama_barang"
                  placeholder="Masukan Nama Barang"
                  type="text"
                  required
                  className="w-full"
                />
              </label>
            </div>
            <div className="form-input">
              <label htmlFor="InputPembuatNota">
                <p>
                  Harga Barang <span className="text-red-500">*</span>
                </p>

                <input
                  name="harga"
                  placeholder="Masukan Harga Barang"
                  type="number"
                  required
                  className="w-full"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="tombol-submit">
          <button className="tombol" id="submitPesanan">
            {loading ? "Menyimpan Data..." : "simpan data belanjaan"}
          </button>
        </div>
      </form>
    </div>
  );
}
