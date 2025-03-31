import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const urlData = path.join(process.cwd(), "data", "cajeras.json");
const cajeras = JSON.parse(fs.readFileSync(urlData, "utf-8"));

export function GET() {
  return NextResponse.json(cajeras);
}

export async function POST(req) {
  const { nombre, apellido } = await req.json();
  const newCajera = {
    id: cajeras.length > 0 ? cajeras[cajeras.length - 1].id + 1 : 1, 
    nombre,
    apellido,
    horarios: [
      {
        dia: "Lunes",
        franco: false,
        sector: "", 
        entradaM: "",
        salidaM: "",
        entradaT: "",
        salidaT: "",
      },
      {
        dia: "Martes",
        franco: false,
        sector: "",
        entradaM: "",
        salidaM: "",
        entradaT: "",
        salidaT: "",
      },
      {
        dia: "Miércoles",
        franco: false,
        sector: "",
        entradaM: "",
        salidaM: "",
        entradaT: "",
        salidaT: "",
      },
      {
        dia: "Jueves",
        franco: false,
        sector: "",
        entradaM: "",
        salidaM: "",
        entradaT: "",
        salidaT: "",
      },
      {
        dia: "Viernes",
        franco: false,
        sector: "",
        entradaM: "",
        salidaM: "",
        entradaT: "",
        salidaT: "",
      },
      {
        dia: "Sábado",
        franco: false,
        sector: "",
        entradaM: "",
        salidaM: "",
        entradaT: "",
        salidaT: "",
      },
      {
        dia: "Domingo",
        franco: false,
        sector: "",
        entradaM: "",
        salidaM: "",
        entradaT: "",
        salidaT: "",
      },
    ],
  };
  cajeras.push(newCajera);
  fs.writeFileSync(urlData, JSON.stringify(cajeras, null, 2));
  return NextResponse.json(cajeras);
}
