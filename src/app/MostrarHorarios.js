"use client";

import React, { use } from "react";
import { useState, useEffect } from "react";

export const MostrarHorarios = () => {
  const [cajeras, setCajeras] = useState([]);

  useEffect(() => {
    const fetchCajeras = async () => {
      const response = await fetch("/api/cajeras");
      const data = await response.json();
      setCajeras(data);
    };

    fetchCajeras();
  }, []);

  return (
    <div className="">
      <table className="w-full border-collapse border-2 border-gray-400">
        <thead className="bg-gray-200">
          <tr className="flex flex-row w-9/9">
            <th className="text-xl border border-gray-400 text-black p-2 w-1/9"></th>
            <th className="text-xl border border-gray-400 text-black p-2 w-4/9">
              Turno Mañana
            </th>
            <th className="text-xl border border-gray-400 text-black p-2 w-4/9">
              Turno tarde
            </th>
          </tr>
        </thead>
        <tbody>
          {[
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Sabado",
            "Domingo",
          ].map((dia, index) => (
            <tr key={index} className="flex flex-row w-9/9">
              <td className="px-5 text-[20px] border border-gray-400 w-1/9">
                {dia}
              </td>
              <td className="w-4/9 border border-gray-400 ">
                <div className="flex flex-wrap gap-1 px-1 py-2 justify-center">
                  {cajeras.map((cajera) =>
                    cajera.horarios.map((horario, index) =>
                      horario.dia === dia && horario.entradaM.length > 0 ? (
                        <div
                          className="w-[32%] border border-blue-200 text-center text-[14px] p-[2px]"
                          key={cajera.name + index}
                        >
                          <span className="text-lime-200">
                            {" "}
                            {cajera.nombre}
                          </span>{" "}
                          <span className="text-amber-200">
                            {horario.entradaM}
                          </span>{" "}
                          <span className="text-fuchsia-200">
                            {horario.salidaM}
                          </span>{" "}
                        </div>
                      ) : null
                    )
                  )}
                </div>
              </td>

              <td className="w-4/9 border border-gray-400 ">
                <div className="flex flex-wrap gap-1 px-1 py-2 justify-center ">
                  {cajeras.map((cajera) =>
                    cajera.horarios.map((horario, index) =>
                      horario.dia === dia && horario.entradaT.length > 0 ? (
                        <div
                          className="w-[32%] border border-blue-200 text-center text-[14px] p-[2px]"
                          key={cajera.name + index}
                        >
                          <span className="text-lime-200">
                            {" "}
                            {cajera.nombre}
                          </span>{" "}
                          <span className="text-amber-200">
                            {horario.entradaT}
                          </span>{" "}
                          <span className="text-fuchsia-200">
                            {horario.salidaT}
                          </span>{" "}
                        </div>
                      ) : null
                    )
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
