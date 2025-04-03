"use client";

import React, { use } from "react";
import { useState, useEffect } from "react";

export const MostrarHorarios = () => {
  const [cajeras, setCajeras] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    const fetchCajeras = async () => {
      const response = await fetch("/api/cajeras");
      const data = await response.json();
      setCajeras(data);
    };

    fetchCajeras();
  }, []);

  const handleChangeTable = () => {
    let diasCaja = {};
    let diasFiambrera = {};
    let diasRepositor = {};
  
    let errorCajera = "";
    let errorFiambrera = "";
    let errorRepositor = "";
  
    const ordenarPorDia = (tipo, variable) => {
      cajeras.forEach((cajera) => {
        cajera.horarios.forEach((horario) => {
          if (horario.tipo === tipo) {
            const dia = horario.dia;
  
            if (!variable[dia]) {
              variable[dia] = []; 
            }
  
            if (horario.entradaM || horario.entradaT) {
              variable[dia].push({
                cajera: cajera.nombre,
                entradaM: horario.entradaM || null,
                salidaM: horario.salidaM || null,
                entradaT: horario.entradaT || null,
                salidaT: horario.salidaT || null,
              });
            }
          }
        });
      });
    };
  
    ordenarPorDia("caja", diasCaja);
    ordenarPorDia("fiambrera", diasFiambrera);
    ordenarPorDia("repositor", diasRepositor);
  
    const verificarHorarios = (dias) => {
      let errores = [];
  
      Object.keys(dias).forEach((dia) => {
        let empleados = dias[dia];
  
        let eventos = [];
  
        empleados.forEach((empleado) => {
          if (empleado.entradaM && empleado.salidaM) {
            eventos.push({ hora: empleado.entradaM, tipo: "inicio", nombre: empleado.cajera });
            eventos.push({ hora: empleado.salidaM, tipo: "fin", nombre: empleado.cajera });
          }
          if (empleado.entradaT && empleado.salidaT) {
            eventos.push({ hora: empleado.entradaT, tipo: "inicio", nombre: empleado.cajera });
            eventos.push({ hora: empleado.salidaT, tipo: "fin", nombre: empleado.cajera });
          }
        });
  
        eventos.sort((a, b) => a.hora.localeCompare(b.hora));
  
        let enTurno = 0;
  
        eventos.forEach((evento) => {
          if (evento.tipo === "inicio") {
            enTurno++;
          } else {
            enTurno--;
          }
  
          if (enTurno < 2) {
            errores.push({ dia, hora: evento.hora, problema: `Solo ${enTurno} empleados en el turno` });
          }
        });
      });
  
      console.log("Errores detectados:", errores);
    };
  
    verificarHorarios(diasCaja);
    verificarHorarios(diasFiambrera);
    verificarHorarios(diasRepositor);
  };
  
  handleChangeTable();
  

  handleChangeTable();

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
      <div>{error}</div>
    </div>
  );
};
