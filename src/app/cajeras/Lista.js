"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const Lista = ({ propCajeras, actualizarCajeras }) => {
  const [cajeras, setCajeras] = useState([]);

  useEffect(() => {
    setCajeras(propCajeras);
  }, [propCajeras]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: `¿Estás seguro de eliminar a la cajera?`,
      text: "No podrás revertir esto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/cajeras/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setCajeras(cajeras.filter((cajera) => cajera.id !== id));
          Swal.fire({
            title: "Eliminado",
            text: "La cajera ha sido eliminada correctamente.",
            icon: "success",
          });
          actualizarCajeras();
        } else {
          console.error("Error al eliminar la cajera");
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al eliminar la cajera.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error al eliminar la cajera", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al eliminar la cajera.",
          icon: "error",
        });
      }
    }
  };

  if (!cajeras) {
    return <div>No hay cajeras disponibles</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 w-full py-10 px-40 ">
      {cajeras.map((cajera) => (
        <div
          key={cajera.id}
          className="w-60 bg-white rounded-lg shadow-md border-2 border-gray-300 text-black p-4 flex items-center justify-between"
        >
          <p>
            {cajera.nombre} {cajera.apellido}
          </p>
          <button
            onClick={() => handleDelete(cajera.id)}
            className="text-red-500"
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};
