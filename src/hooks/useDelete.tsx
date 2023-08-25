import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useDelete() {
  const [loadingBelanja, setLoadingBelanja] = useState<boolean>(false);
  const [loadingPesanan, setLoadingPesanan] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const navigation = useNavigate();

  async function deleteData(key: "pesanan" | "belanja", id: string | any[]) {
    try {
      if (typeof id == "string") {
        const formData = new FormData();
        formData.append("delete", key);
        formData.append("id", id);
        const res = await fetch(
          "https://kelasf.000webhostapp.com/api/delete.php",
          {
            method: "POST",
            body: formData,
          }
        );

        const resJson = await res.json();
        console.log(resJson);
        if (resJson.status != "success") {
          throw new Error("Gagal menghapus data");
        }
      } else {
        await Promise.all(
          id.map(async (i) => {
            const formData = new FormData();
            formData.append("delete", key);
            formData.append("id", i);
            const res = await fetch(
              "https://kelasf.000webhostapp.com/api/delete.php",
              {
                method: "POST",
                body: formData,
              }
            );

            const resJson = await res.json();
            console.log(resJson);
            if (resJson.status != "success") {
              throw new Error("Gagal menghapus data");
            }
          })
        );
      }

      if (key == "pesanan") {
        // mengirim notif ke user data berhasil dihapus
        navigation("/pesanan");
      }
      // else {
      //     const newBelanja = data?.belanjaan.filter(
      //       (item) => item.id_belanja != id
      //     );
      //     setData((prev) => {
      //       if (prev) {
      //         return {
      //           ...prev,
      //           belanjaan: newBelanja ? newBelanja : [],
      //         };
      //       }

      //       return null;
      //     });
      //   }
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoadingBelanja(false);
      setLoadingPesanan(false);
    }
  }

  return {
    loadingBelanja,
    loadingPesanan,
    setLoadingBelanja,
    setLoadingPesanan,
    isSuccess,
    deleteData,
  };
}
