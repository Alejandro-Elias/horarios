"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Undo } from "lucide-react";

export default function Page() {
  const [Cajeras, setCajeras] = useState([]);
  const [dias, setDias] = useState([
    { dia: "Lunes", franco: "no" },
    { dia: "Martes", franco: "no" },
    { dia: "Miércoles", franco: "no" },
    { dia: "Jueves", franco: "no" },
    { dia: "Viernes", franco: "no" },
    { dia: "Sábado", franco: "no" },
    { dia: "Domingo", franco: "no" },
  ]);

  const fetchCajeras = async () => {
    const response = await fetch("/api/cajeras");
    if (!response.ok) {
      throw new Error("Error al obtener las cajeras");
    }
    const data = await response.json();
    setCajeras(data);
  };

  useEffect(() => {
    fetchCajeras();
  }, []);

  const handleFrancoChange = (index, value) => {
    const updatedDias = [...dias];
    updatedDias[index].franco = value;
    setDias(updatedDias);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target); 
    const selectedCajeraId = formData.get("cajera"); 
  
    const horarios = dias.map((dia, index) => ({
      dia: dia.dia,
      franco: formData.get(`franco-${index}`) === "si",
      tipo: formData.get(`sector-${index}`),
      entradaM: formData.get(`entradaM-${index}`),
      salidaM: formData.get(`salidaM-${index}`),
      entradaT: formData.get(`entradaT-${index}`),
      salidaT: formData.get(`salidaT-${index}`)
    }));
  
    console.log(horarios);
  
    const response = await fetch(`/api/cajeras/horarios/${selectedCajeraId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: selectedCajeraId, horarios }),
    });
  
    if (!response.ok) {
      throw new Error("Error al actualizar los horarios");
    }
  
    const data = await response.json();
    console.log(data);
  };
  

  return (
    <>
      <Link href="/" className="cursor-pointer flex gap-2 p-5">
        <Undo></Undo> Volver
      </Link>
      <form onSubmit={handleUpdate}>
        <div className="flex flex-col w-full items-center h-screen">
          <select name="cajera" className="my-4 flex justify-center border p-2">
            {Cajeras.map((cajera, index) => (
              <option key={index} value={cajera.id}>
                {cajera.nombre} {cajera.apellido}
              </option>
            ))}
          </select>

          <table className="w-3/4 border-collapse border border-gray-400">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-400 p-2 w-[120px] text-black">
                  Día
                </th>
                <th className="border border-gray-400 p-2 w-[120px] text-black">
                  Franco
                </th>
                <th className="border border-gray-400 p-2 w-[120px] text-black">
                  Tipo
                </th>
                <th className="border border-gray-400 p-2 w-[120px] text-black">
                  Entrada M
                </th>
                <th className="border border-gray-400 p-2 w-[120px] text-black">
                  Salida M
                </th>
                <th className="border border-gray-400 p-2 w-[120px] text-black">
                  Entrada T
                </th>
                <th className="border border-gray-400 p-2 w-[120px] text-black">
                  Salida T
                </th>
              </tr>
            </thead>
            <tbody>
              {dias.map((dia, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-400 p-2">{dia.dia}</td>
                  <td className="border border-gray-400 p-2">
                    <select
                      className="border p-1 w-full"
                      onChange={(e) =>
                        handleFrancoChange(index, e.target.value)
                      }
                    >
                      <option className="text-black" value="no">
                        No
                      </option>
                      <option className="text-black" value="maniana">
                        Mañana
                      </option>
                      <option className="text-black" value="tarde">
                        Tarde
                      </option>
                      <option className="text-black" value="completo">
                        Completo
                      </option>
                    </select>
                  </td>
                  <td className="border border-gray-400 p-2">
                    <select name={`sector-${index}`} className="border p-1 w-full">
                      <option value="caja">Caja</option>
                      <option value="reposicion">Reposición</option>
                    </select>
                  </td>
                  <td className="border border-gray-400 p-2">
                    <input
                      className="border p-1 w-full"
                      type="time"
                      name={`entradaM-${index}`}
                      step="900"
                      disabled={dia.franco === "maniana" || dia.franco === "completo"}
                    />
                  </td>
                  <td className="border border-gray-400 p-2">
                    <input
                      className="border p-1 w-full"
                      type="time"
                      name={`salidaM-${index}`}
                      step="900"
                      disabled={dia.franco === "maniana" || dia.franco === "completo"}
                    />
                  </td>
                  <td className="border border-gray-400 p-2">
                    <input
                      className="border p-1 w-full"
                      type="time"
                      name={`entradaT-${index}`}
                      step="900"
                      disabled={dia.franco === "tarde" || dia.franco === "completo"}
                    />
                  </td>
                  <td className="border border-gray-400 p-2">
                    <input
                      className="border p-1 w-full"
                      type="time"
                      name={`salidaT-${index}`}
                      step="900"
                      disabled={dia.franco === "tarde" || dia.franco === "completo"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            type="submit"
          >
            Guardar horarios
          </button>
        </div>
      </form>
    </>
  );
}
