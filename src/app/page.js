import Link from "next/link";
import { MostrarHorarios } from "./MostrarHorarios";

export default function Home() {
  
  return (
    <div className=" flex-col items-start justify-items-normal min-h-screen p-2 pb-5 gap-2 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center justify-center">
        <h1 className="text-4xl mb-10">Horarios</h1>
      </div>

      <div className=""></div>
      <div className="flex flex-col gap-2">
        <Link href="/cajeras" className="cursor-pointer w-40">
          Lista de Empleados
        </Link>
        <Link href="/horarios" className="cursor-pointer w-30">
          Crear horario
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center mt-20">
      </div>
      <MostrarHorarios />
    </div>
  );
}
