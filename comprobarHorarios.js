const horarios = [
    { nombre: "Ana", entrada: "09:00", salida: "11:00" },
    { nombre: "Carlos", entrada: "10:00", salida: "12:00" },
    { nombre: "Elena", entrada: "08:00", salida: "10:30" },
    { nombre: "Luis", entrada: "14:00", salida: "16:00" },
  ];
  
  function estaTrabajando(hora, entrada, salida) {
    return hora >= entrada && hora < salida;
  }
  
  function contarTrabajadoresEnHora(hora) {
    return horarios.filter(({ entrada, salida }) => estaTrabajando(hora, entrada, salida)).length;
  }
  
  console.log(contarTrabajadoresEnHora("10:00")); // Devuelve 3 (Ana, Carlos, Elena)
  console.log(contarTrabajadoresEnHora("12:00")); // Devuelve 1 (Carlos)
  console.log(contarTrabajadoresEnHora("14:00")); // Devuelve 1 (Luis)
  