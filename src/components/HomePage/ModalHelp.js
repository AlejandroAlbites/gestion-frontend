import React from 'react';

export const ModalHelp = () => {
  return (
    <div className="div-help">
      <h1>Guía Rápida</h1>
      <h2>
        Ease Group es fácil de manejar, cuenta con 3 páginas principales, las
        cuales te explico a continuación:
      </h2>
      <h2>
        Administrador de Proyectos: En esta página pondrás crear tus proyectos
        en el botón "Crear Nuevo Proyecto", también puedes eliminarlo si lo
        deseas. Cada proyecto creado se lista en la parte inferior y te permite
        ver si el proyecto está iniciado, la cantidad de grupos que tiene y la
        cantidad de personal asignado.
      </h2>
      <h2>
        Administrador de Personal: En esta página pondrás crear un nuevo
        personal en el "botón Crear Nuevo Personal", el personal creado se lista
        en la parte inferior, en el podrás ver su tarjeta, editar al personal o
        eliminarlo. En el botón tarjeta, podrás ver detalladamente los datos del
        personal, sus habilidades en una gráfica tipo radar y sus datos
        personales.
      </h2>
      <h2>
        Ver Proyecto: Es la página donde realizaras los trabajos. Te permite
        crear un nuevo grupo de trabajo, llamar al personal que hayas creado
        previamente y con la funcionalidad de arrastrar, mover al personal al
        grupo que hayas creado, cuando estés conforme con el grupo y su
        personal, puedes arrastrar al grupo a la sección de "En ejecución" para
        indicar que el grupo está en el trabajo. Al término del trabajo podrás
        devolver al grupo a la sección de "En espera", donde podrás calificar el
        desempeño del grupo. Puedes ver el resumen del grupo en el botón "Ver
        detalles" que se encuentra en la casilla de cada grupo.
      </h2>
      <h3>Pasos recomendados a seguir</h3>
      <h4>Paso 1: Crear un nuevo proyecto.</h4>
      <h4>
        Paso 2: Ir a la página "Administrar Personal y crear nuevos
        trabajadores".
      </h4>
      <h4>
        Paso 3: Ir a la opción "Ver" que se encuentra en las opciones de cada
        proyecto.
      </h4>
      <h4>Paso 4: Crear los grupos de trabajos que requieras.</h4>
      <h4>Paso 5: Agregar el personal que se requiera al proyecto.</h4>
      <h4>Paso 6: Agregar el personal al grupo y enviarlo a trabajar.</h4>
    </div>
  );
};
