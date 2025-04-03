"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Undo } from "lucide-react";
import "../globals.css";


export default function Page() {
  const [Cajeras, setCajeras] = useState([]);
  const [selectedCajera, setSelectedCajera] = useState(null);
  const [horarios, setHorarios] = useState([]);

  const diasBase = [
    {
      dia: "Lunes",
      franco: "no",
      tipo: "caja",
      entradaM: "",
      salidaM: "",
      entradaT: "",
      salidaT: "",
    },
    {
      dia: "Martes",
      franco: "no",
      tipo: "caja",
      entradaM: "",
      salidaM: "",
      entradaT: "",
      salidaT: "",
    },
    {
      dia: "Miércoles",
      franco: "no",
      tipo: "caja",
      entradaM: "",
      salidaM: "",
      entradaT: "",
      salidaT: "",
    },
    {
      dia: "Jueves",
      franco: "no",
      tipo: "caja",
      entradaM: "",
      salidaM: "",
      entradaT: "",
      salidaT: "",
    },
    {
      dia: "Viernes",
      franco: "no",
      tipo: "caja",
      entradaM: "",
      salidaM: "",
      entradaT: "",
      salidaT: "",
    },
    {
      dia: "Sábado",
      franco: "no",
      tipo: "caja",
      entradaM: "",
      salidaM: "",
      entradaT: "",
      salidaT: "",
    },
    {
      dia: "Domingo",
      franco: "no",
      tipo: "caja",
      entradaM: "",
      salidaM: "",
      entradaT: "",
      salidaT: "",
    },
  ];

  useEffect(() => {
    const fetchCajeras = async () => {
      const response = await fetch("/api/cajeras");
      if (!response.ok) {throw new Error("Error al obtener las cajeras")};
      const data = await response.json();
      setCajeras(data);
    };
    fetchCajeras();
  }, []);

  const handleChangeEmpleado = (id) => {
    const cajera = Cajeras.find((c) => c.id == id);
    setSelectedCajera(cajera);
    setHorarios(cajera?.horarios || diasBase);
  };

  const handleInputChange = (index, field, value) => {
    const updatedHorarios = [...horarios];
    updatedHorarios[index][field] = value;
    setHorarios(updatedHorarios);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedCajera) return;

    const response = await fetch(`/api/cajeras/horarios/${selectedCajera.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selectedCajera.id, horarios }),
    });

    if (!response.ok) throw new Error("Error al actualizar los horarios");
  };

  const handleBorrarDatos = async (id) => {

    setHorarios(diasBase);

    const response = await fetch(`/api/cajeras/horarios/${selectedCajera.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selectedCajera.id, horarios: diasBase }),
    });

    if (!response.ok) throw new Error("Error al actualizar los horarios");
  }

  return (
    <>
      <Link href="/" className="cursor-pointer flex gap-2 px-5 pt-5 w-30">
        <Undo /> Volver
      </Link>
      <form onSubmit={handleUpdate} className="flex flex-col items-center">
        <select
          className="my-4 border p-2"
          onChange={(e) => handleChangeEmpleado(e.target.value)}
        >
          <option value="" hidden>
            Seleccione Empleado
          </option>
          {Cajeras.map((cajera) => (
            <option className="text-black" key={cajera.id} value={cajera.id}>
              {cajera.nombre} {cajera.apellido}
            </option>
          ))}
        </select>

        <table className="w-3/4 border-collapse border border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              {[
                "Día",
                "Franco",
                "Tipo",
                "Entrada M",
                "Salida M",
                "Entrada T",
                "Salida T",
              ].map((header) => (
                <th
                  key={header}
                  className="border border-gray-400 p-2 text-black"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {horarios.map((dia, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-400 p-2">{dia.dia}</td>
                <td className="border border-gray-400 p-2">
                  <select
                    className="border p-1 w-full"
                    value={dia.franco}
                    onChange={(e) =>
                      handleInputChange(index, "franco", e.target.value)
                    }
                  >
                    {["no", "mañana", "tarde", "completo"].map((option) => (
                      <option
                        className="text-black"
                        key={option}
                        value={option}
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border border-gray-400 p-2">
                  <select
                    className="border p-1 w-full"
                    value={dia.tipo}
                    onChange={(e) =>
                      handleInputChange(index, "tipo", e.target.value)
                    }
                  >
                    {["caja", "reposicion", "fiambreria"].map((option) => (
                      <option
                        className="text-black"
                        key={option}
                        value={option}
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                </td>
                {["entradaM", "salidaM", "entradaT", "salidaT"].map((field) => (
                  <td key={field} className="border border-gray-400 p-2">
                    <input
                      className="border p-1 w-full text-white"
                      type="time"
                      step="900"
                      min="08:00"
                      max="21:00"
                      value={dia[field] || ""}
                      onChange={(e) =>
                        handleInputChange(index, field, e.target.value)
                      }
                      disabled={
                        dia.franco === "completo" ||
                        (field.includes("M") && dia.franco === "mañana") ||
                        (field.includes("T") && dia.franco === "tarde")
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center gap-8">
          <button
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            type="submit"
          >
            Guardar horarios
          </button>
          <button
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            type="button"
            onClick={() => handleBorrarDatos(selectedCajera?.id)}

          >
            Borrar datos
          </button>
        </div>
      </form>
    </>
  );
}
