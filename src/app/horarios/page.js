"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Undo } from "lucide-react";

export default function Page() {
  const [Cajeras, setCajeras] = useState([]);
  const [dias, setDias] = useState([
    { dia: "Lunes", franco: false },
    { dia: "Martes", franco: false },
    { dia: "Miércoles", franco: false },
    { dia: "Jueves", franco: false },
    { dia: "Viernes", franco: false },
    { dia: "Sábado", franco: false },
    { dia: "Domingo", franco: false },
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
    updatedDias[index].franco = value === "Franco";
    setDias(updatedDias);
  };

  return (
    <>
      <Link href="/" className="cursor-pointer flex gap-2 p-5">
        <Undo></Undo> Volver
      </Link>
      <div className="flex flex-col w-full items-center h-screen">
        <select className="my-4 flex justify-center border p-2">
          {Cajeras.map((cajera, index) => (
            <option key={index} value={cajera.id}>
              {cajera.nombre} {cajera.apellido}
            </option>
          ))}
        </select>

        {/* Tabla */}
        <table className="w-3/4 border-collapse border border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 p-2 w-[120px] text-black">Día</th>
              <th className="border border-gray-400 p-2 w-[120px] text-black">Franco</th>
              <th className="border border-gray-400 p-2 w-[120px] text-black">Tipo</th>
              <th className="border border-gray-400 p-2 w-[120px] text-black">Entrada M</th>
              <th className="border border-gray-400 p-2 w-[120px] text-black">Salida M</th>
              <th className="border border-gray-400 p-2 w-[120px] text-black">Entrada T</th>
              <th className="border border-gray-400 p-2 w-[120px] text-black">Salida T</th>
            </tr>
          </thead>
          <tbody>
            {dias.map((dia, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-400 p-2">{dia.dia}</td>
                <td className="border border-gray-400 p-2">
                  <select
                    className="border p-1 w-full"
                    onChange={(e) => handleFrancoChange(index, e.target.value)}
                  >
                    <option className="text-black" value="">Normal</option>
                    <option className="text-black"value="Franco">Franco</option>
                  </select>
                </td>
                <td className="border border-gray-400 p-2">
                  <select className="border p-1 w-full">
                    <option value="caja">Caja</option>
                    <option value="reposicion">Reposición</option>
                  </select>
                </td>
                <td className="border border-gray-400 p-2">
                  <input
                    className="border p-1 w-full"
                    type="time"
                    name="entradaM"
                    step="900"
                    disabled={dia.franco}
                  />
                </td>
                <td className="border border-gray-400 p-2">
                  <input
                    className="border p-1 w-full"
                    type="time"
                    name="salidaM"
                    step="900"
                    disabled={dia.franco}
                  />
                </td>
                <td className="border border-gray-400 p-2">
                  <input
                    className="border p-1 w-full"
                    type="time"
                    name="entradaT"
                    step="900"
                    disabled={dia.franco}
                  />
                </td>
                <td className="border border-gray-400 p-2">
                  <input
                    className="border p-1 w-full"
                    type="time"
                    name="salidaT"
                    step="900"
                    disabled={dia.franco}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => {
            if (dias.length > 0) {
              setDias(dias.slice(0, dias.length - 1));
            }
          }}
        >
          Guardar horarios
        </button>
      </div>
    </>
  );
}
