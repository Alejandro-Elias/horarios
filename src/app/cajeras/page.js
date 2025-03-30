"use client";

import Link from "next/link";
import React, { use, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Undo } from "lucide-react";
import { Lista } from "./Lista";
import Swal from "sweetalert2";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder los 50 caracteres")
    .required("El nombre es requerido"),
  apellido: Yup.string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede exceder los 50 caracteres")
    .required("El apellido es requerido"),
});

export default function Page() {

  const [cajeras, setCajeras] = useState([]);

  const fetchCajeras = async () => {
    const response = await fetch("/api/cajeras");
    if (!response.ok) {
      throw new Error("Error al obtener las cajeras");
    }
    const data = await response.json();
    setCajeras(data);
  }
  useEffect(() => {
    fetchCajeras()
  }, []);
  
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const nuevaCajera = {
      nombre: values.nombre,
      apellido: values.apellido
    };

    try {
      const response = await fetch("/api/cajeras", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaCajera),
      });
      if (response.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cajera guardada correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        await fetchCajeras();
        resetForm();
      } else {
        console.error("Error al guardar el todo");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Link href="/" className="cursor-pointer flex gap-2 p-5">
        <Undo></Undo> Volver
      </Link>

      <Formik
        initialValues= {{ nombre: "", apellido: "" }}
        validationSchema= {validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-2">
            <div className="flex justify-around gap-2 my-16 px-30">
              <div className="flex-col gap-5 ">
                <div className="flex gap-5 items-center">
                  <label htmlFor="nombre">Nombre</label>
                  <Field
                    type="text"
                    name="nombre"
                    id="nombre"
                    className="border border-gray-300 rounded-md p-2 bg-cyan-50 w-48 text-black "
                  />
                </div>

                <ErrorMessage
                  name="nombre"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="flex-col items-center gap-20">
                <div className="flex gap-5 items-center">
                  <label htmlFor="apellido">Apellido</label>
                  <Field
                    type="text"
                    name="apellido"
                    id="apellido"
                    className="border border-gray-300 rounded-md p-2 bg-cyan-50 w-48 text-black "
                  />
                </div>
                <ErrorMessage
                  name="apellido"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-50 bg-blue-700 p-2 justify-center items-center "
                disabled={isSubmitting}
              >
                Enviar
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <Lista propCajeras={cajeras} actualizarCajeras={fetchCajeras} ></Lista>
    </div>
  );
}
