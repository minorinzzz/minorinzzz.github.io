class Alumno {
    constructor(ci, nombre, apPaterno, apMaterno, nroMaterias, materias) {
        this.ci = ci;
        this.nombre = nombre;
        this.apPaterno = apPaterno;
        this.apMaterno = apMaterno;
        this.nroMaterias = nroMaterias;
        this.materias = materias;
        this.inscritas = nroMaterias;
        this.aprobadas = 0;
        this.reprobadas = 0;
        this.abandonos = 0;
        this.prom = 0.0;
        let cont = 0.0;
        for (let i = 0; i < nroMaterias; i++) {
            if (materias[i][3] == 0) {
                this.abandonos++;
            } else if (materias[i][3] > 50) {
                this.aprobadas++;
            } else {
                this.reprobadas++;
            }
            cont += materias[i][3];
        }
        this.prom = cont / nroMaterias;
    }
    actualizar(ci, nombre, apP, apM) {
        this.ci = ci;
        this.nombre = nombre;
        this.apPaterno = apP;
        this.apMaterno = apM;
    }
    actualizarMateria(nueva) {
        this.materias.push(nueva);
        this.nroMaterias++;
        this.inscritas++;
        if (nueva[5] != "EN CURSO") {
            let cont = 0.0;
            for (let i = 0; i < this.nroMaterias; i++) {
                if (this.materias[i][3] == 0) {
                    this.abandonos++;
                } else if (this.materias[i][3] > 50) {
                    this.aprobadas++;
                } else {
                    this.reprobadas++;
                }
                cont += this.materias[i][3];
            }
            this.prom = cont / this.nroMaterias;
        }
    }
    actualizarMateria2(fila, a0, a1, a2, a3, a4, a5, a6) {
        this.materias[fila][0] = a0;
        this.materias[fila][1] = a1;
        this.materias[fila][2] = a2;
        this.materias[fila][3] = parseInt(a3);
        this.materias[fila][4] = parseInt(a4);
        this.materias[fila][5] = a5;
        this.materias[fila][6] = a6;
        this.aprobadas = 0;
        this.reprobadas = 0;
        this.abandonos = 0;
        this.prom = 0.0;
        let cont = 0.0;
        for (let i = 0; i < this.nroMaterias; i++) {
            if (this.materias[i][5] != "EN CURSO") {
                if (parseInt(this.materias[i][3]) == 0) {
                    this.abandonos++;
                } else if (parseInt(this.materias[i][3]) >= 51) {
                    this.aprobadas++;
                } else {
                    this.reprobadas++;
                }
                cont += this.materias[i][3];
            }
        }
        this.prom = cont / this.nroMaterias;
    }
}


class Materia {
    constructor(idMateria, sigla, nombre) {
        this.idMateria = idMateria;
        this.sigla = sigla;
        this.nombre = nombre;
    }
}

class Docente {
    constructor(idDocente, nombre) {
        this.idDocente = idDocente;
        this.nombre = nombre;
    }
}

let nroDocentes, nroAlumnos, nroMaterias;
let alumnos = new Array(100);
let materias = new Array(100);
let docentes = new Array(100);
let acum = 0;

function men() {
    nroAlumnos = 3;
    alumnos[0] = new Alumno(123456, "Mario", "Mamani", "Tarqui", 2, [
        [1, "MAT-115", "CALCULO I", 51, 2019, "APROBADO", ""],
        [2, "LAB-273", "LABORATORIO DE TELEMATICA", 80, 2022, "APROBADO", "RAMIRO GALLARDO"]
    ]);
    alumnos[1] = new Alumno(8438216, "Sarai", "Blanco", "Salgado", 0, []);
    alumnos[2] = new Alumno(3456789, "Jazmin", "Limachi", "Loza", 1, [
        [3, "INF-273", "TELEMATICA", 82, 2022, "APROBADO", "RAMIRO GALLARDO"]
    ]);
    nroMaterias = 3;
    materias[0] = new Materia(1, "MAT-115", "CALCULO I");
    materias[1] = new Materia(2, "LAB-273", "LABORATORIO DE TELEMATICA");
    materias[2] = new Materia(3, "INF-273", "TELEMATICA");
    nroDocentes = 2;
    docentes[0] = new Docente(1, "RAMIRO GALLARDO");
    docentes[1] = new Docente(2, "ALEXANDER SILVA");
}

function editarAlumno(ci) {
    x = alumnos[0];
    nro = 0;
    for (let i = 0; i < nroAlumnos; i++) {
        if (alumnos[i].ci.toString() == ci) {
            x = alumnos[i];
            nro = i;
        }
    }
    alumnos[nro].ci = parseInt(prompt("Nuevo ci:", x.ci));
    alumnos[nro].nombre = prompt("Nuevo nombre: ", x.nombre);
    alumnos[nro].apPaterno = prompt("Nuevo apellido paterno: ", x.apPaterno);
    alumnos[nro].apMaterno = prompt("Nuevo apellido materno: ", x.apMaterno);
    alumnosLista(acum + 1);
}

function eliminarAlumno(ci) {
    for (let i = 0; i < nroAlumnos; i++) {
        if (alumnos[i].ci.toString() == ci) {
            for (let j = i; j < nroAlumnos - 1; j++) {
                alumnos[j] = alumnos[j + 1];
            }
        }
    }
    alert("Eliminando a: " + ci);
    nroAlumnos = nroAlumnos - 1;
    alumnosLista(acum + 1);
}

function editarMateria(ci, fila) {
    document.getElementById("formulario").style.opacity = 1;
    nro = 0;
    for (let i = 0; i < nroAlumnos; i++) {
        if (alumnos[i].ci.toString() == ci) {
            nro = i;
        }
    }
    t1 = "<option selected>Docente...</option>";
    t2 = "";
    for (let i = 0; i < nroDocentes; i++) {
        t2 += "<option value='";
        t2 += docentes[i].idDocente;
        t2 += "'>";
        t2 += docentes[i].nombre;
        t2 += "</option>";
    }
    document.getElementById("inputGroupSelect01").innerHTML = t2;
    t3 = "<option selected>Materia...</option>";
    t4 = "";
    for (let i = 0; i < nroMaterias; i++) {
        t4 += "<option value='";
        t4 += materias[i].idMateria;
        t4 += "'>";
        t4 += materias[i].sigla;
        t4 += " ";
        t4 += materias[i].nombre;
        t4 += "</option>";
    }
    document.getElementById("inputGroupSelect02").innerHTML = t4;
    document.getElementById("botonEnviar").innerHTML = "<button type='submit' class='formulario__btn' onclick='enviarMateriaEditar(" + ci + "," + fila + ");'>Enviar</button>";
}

function enviarMateriaEditar(ci, fila) {
    document.getElementById("formulario").style.opacity = 0;
    nroA = 0;
    for (let i = 0; i < nroAlumnos; i++) {
        if (alumnos[i].ci.toString() == ci) {
            nroA = i;
        }
    }
    nroD = 0;
    idDoc = document.getElementById("inputGroupSelect01").value;

    for (let i = 0; i < nroDocentes; i++) {
        if (docentes[i].idDocente.toString() == idDoc) {
            nroD = i;
        }
    }
    nroM = 0;
    idMat = document.getElementById("inputGroupSelect02").value;
    for (let i = 0; i < nroMaterias; i++) {
        if (materias[i].idMateria.toString() == idMat) {
            nroM = i;
        }
    }
    aa = parseFloat(prompt("Nueva nota: ", alumnos[nroA].materias[fila][3]));
    ab = parseInt(prompt("Nueva gestion: ", alumnos[nroA].materias[fila][4]));
    ac = prompt("Nueva observacion: ", alumnos[nroA].materias[fila][5]);
    alumnos[nroA].actualizarMateria2(fila, materias[nroM].idMateria, materias[nroM].sigla, materias[nroM].nombre, aa, ab, ac, docentes[nroD].nombre);
    detalleAlumno(ci);
}

function agregarMateria(ci) {
    nro = 0;
    for (let i = 0; i < nroAlumnos; i++) {
        if (alumnos[i].ci.toString() == ci) {
            nro = i;
        }
    }
    t1 = "<option selected>Docente...</option>";
    t2 = "";
    for (let i = 0; i < nroDocentes; i++) {
        t2 += "<option value='";
        t2 += docentes[i].idDocente;
        t2 += "'>";
        t2 += docentes[i].nombre;
        t2 += "</option>";
    }
    document.getElementById("inputGroupSelect01").innerHTML = t2;
    t3 = "<option selected>Materia...</option>";
    t4 = "";
    for (let i = 0; i < nroMaterias; i++) {
        t4 += "<option value='";
        t4 += materias[i].idMateria;
        t4 += "'>";
        t4 += materias[i].sigla;
        t4 += " ";
        t4 += materias[i].nombre;
        t4 += "</option>";
    }
    document.getElementById("botonEnviar").innerHTML = "<button type='submit' class='formulario__btn' onclick='enviarMateria(" + ci + ");'>Enviar</button>";
    document.getElementById("inputGroupSelect02").innerHTML = t4;
    document.getElementById("formulario").style.opacity = 1;
}

function enviarMateria(ci) {
    nroA = 0;
    for (let i = 0; i < nroAlumnos; i++) {
        if (alumnos[i].ci.toString() == ci) {
            nroA = i;
        }
    }
    nroD = 0;
    idDoc = document.getElementById("inputGroupSelect01").value;
    for (let i = 0; i < nroDocentes; i++) {
        if (docentes[i].idDocente.toString() == idDoc) {
            nroD = i;
        }
    }
    nroM = 0;
    idMat = document.getElementById("inputGroupSelect02").value;
    for (let i = 0; i < nroMaterias; i++) {
        if (materias[i].idMateria.toString() == idMat) {
            nroM = i;
        }
    }
    too = new Array(materias[nroM].idMateria, materias[nroM].sigla, materias[nroM].nombre, 0, 2022, "EN CURSO", docentes[nroD].nombre);
    alumnos[nroA].actualizarMateria(too);
    document.getElementById("formulario").style.opacity = 0;
    detalleAlumno(ci);
}

function detalleAlumno(ci) {
    aa = "<button class='btn btn-success my-2 my-sm-0 px-5 text-light' onclick='agregarMateria(";
    aa2 = ");'>Agregar Materia</button>";
    document.getElementById("botonAgrega").innerHTML = aa + ci + aa2;
    document.getElementById("paraBuscar").innerHTML = "<button class='btn btn-success my-2 my-sm-0 px-5 text-light' onclick='materiaBuscar();'>Buscar</button>";
    t1 = "<table class'table'><thead><tr>  <th scope='col'>idMateria</th>  <th scope='col'>Sigla</th>        <th scope='col'>Materia</th>        <th scope='col'>Nota</th>        <th scope='col'>Gestion</th>        <th scope='col'>Observación</th> <th scope='col'>Docente</th> <th scope='col'>Acción</th></tr></thead><tbody>";
    todo = "";
    nro = 0;
    for (let i = 0; i < nroAlumnos; i++) {
        if (alumnos[i].ci.toString() == ci) {
            nro = i;
        }
    }
    for (let i = 0; i < alumnos[nro].nroMaterias; i++) {
        todo += "<tr><th scope='row'>";
        todo += alumnos[nro].materias[i][0];
        todo += "</th><td>";
        todo += alumnos[nro].materias[i][1];
        todo += "</td><td>";
        todo += alumnos[nro].materias[i][2];
        todo += "</td><td>";
        todo += alumnos[nro].materias[i][3];
        todo += "</td><td>";
        todo += alumnos[nro].materias[i][4];
        todo += "</td><td>";
        todo += alumnos[nro].materias[i][5];
        todo += "</td><td>";
        todo += alumnos[nro].materias[i][6];
        todo += "</td><td><div class='btn-group-toggle' data-toggle='buttons'><label class='btn btn-secondary active'><input type='checkbox' checked autocomplete='off' onclick='editarMateria(";
        todo += ci + "," + i;
        todo += ");'> Editar</label></div></td></tr>";
    }
    t2 = " <tr>    <td>Inscritas: ";
    i1 = alumnos[nro].inscritas;
    t3 = "</td>    <td>Aprobadas: ";
    i2 = alumnos[nro].aprobadas;
    t4 = "    </td>    <td>Reprobadas: ";
    i3 = alumnos[nro].reprobadas;
    t5 = "    </td>    <td>Abandonos: ";
    i4 = alumnos[nro].abandonos;
    t6 = "    </td>    <td colspan=2 >Prom. Gral: ";
    i5 = alumnos[nro].prom;
    t7 = "</td>  </tr></tbody></table>";
    vol = "<button onclick='alumnosLista(acum+1)'>Volver</button>";
    document.getElementById("algo").innerHTML = t1 + todo + t2 + i1 + t3 + i2 + t4 + i3 + t5 + i4 + t6 + i5 + t7 + vol;
}

function materiaBuscar(ci) {
    n = document.formu2.st.value;
    n = n.toString();
    document.getElementById("paraBuscar").innerHTML = "<button class='btn btn-success my-2 my-sm-0 px-5 text-light' onclick='materiaBuscar();'>Buscar</button>";
    aa = "<button class='btn btn-success my-2 my-sm-0 px-5 text-light' onclick='agregarMateria(";
    aa2 = ");'>Agregar Materia</button>";
    document.getElementById("botonAgrega").innerHTML = aa + ci + aa2;
    document.getElementById("paraBuscar").innerHTML = "<button class='btn btn-success my-2 my-sm-0 px-5 text-light' onclick='materiaBuscar();'>Buscar</button>";
    t1 = "<table class'table'><thead><tr>  <th scope='col'>idMateria</th>  <th scope='col'>Sigla</th>        <th scope='col'>Materia</th>        <th scope='col'>Nota</th>        <th scope='col'>Gestion</th>        <th scope='col'>Observación</th> <th scope='col'>Docente</th> <th scope='col'>Acción</th></tr></thead><tbody>";
    todo = "";
    nro = 0;
    for (let i = 0; i < nroAlumnos; i++) {
        if (alumnos[i].ci.toString() == ci) {
            nro = i;
        }
    }
    for (let i = 0; i < alumnos[nro].nroMaterias; i++) {
        if ((alumnos[nro].materias[i][1]).toString().indexOf(n) >= 0 ||
            (alumnos[nro].materias[i][2]).toString().indexOf(n) >= 0) {
            todo += "<tr><th scope='row'>";
            todo += alumnos[nro].materias[i][0];
            todo += "</th><td>";
            todo += alumnos[nro].materias[i][1];
            todo += "</td><td>";
            todo += alumnos[nro].materias[i][2];
            todo += "</td><td>";
            todo += alumnos[nro].materias[i][3];
            todo += "</td><td>";
            todo += alumnos[nro].materias[i][4];
            todo += "</td><td>";
            todo += alumnos[nro].materias[i][5];
            todo += "</td><td>";
            todo += alumnos[nro].materias[i][6];
            todo += "</td><td><div class='btn-group-toggle' data-toggle='buttons'><label class='btn btn-secondary active'><input type='checkbox' checked autocomplete='off' onclick='editarMateria(";
            todo += ci + "," + i;
            todo += ");'> Editar</label></div></td></tr>";
        }
    }
    t2 = " <tr>    <td>Inscritas: ";
    i1 = alumnos[nro].inscritas;
    t3 = "</td>    <td>Aprobadas: ";
    i2 = alumnos[nro].aprobadas;
    t4 = "    </td>    <td>Reprobadas: ";
    i3 = alumnos[nro].reprobadas;
    t5 = "    </td>    <td>Abandonos: ";
    i4 = alumnos[nro].abandonos;
    t6 = "    </td>    <td colspan=2 >Prom. Gral: ";
    i5 = alumnos[nro].prom;
    t7 = "</td>  </tr></tbody></table>";
    vol = "<button onclick='detalleAlumno(" + ci + ");'>Actualizar</button>";
    vol += "<button onclick='alumnosLista(acum+1);'>Volver</button>";
    document.getElementById("algo").innerHTML = t1 + todo + t2 + i1 + t3 + i2 + t4 + i3 + t5 + i4 + t6 + i5 + t7 + vol;
}

function alumnosBuscar() {
    n = document.formu2.st.value;
    n = n.toString();
    document.getElementById("paraBuscar").innerHTML = "<button class='btn btn-success my-2 my-sm-0 px-5 text-light' onclick='alumnosBuscar();'>Buscar</button>";
    document.getElementById("botonAgrega").innerHTML = "<button class='btn btn-success my-2 my-sm-0 px-5 text-light'>Registrar Nuevo</button>";
    t1 = " <table class='table'><thead>  <tr><th scope='col'>C.I.</th><th scope='col'>Nombre</th><th scope='col'>Ap. Paterno</th> <th scope='col'>Ap. Materno</th><th scope='col'>Acciones</th> </tr></thead><tbody>";
    t2 = "</tbody></table>";
    q0 = "<tr>"
    q1 = " <th scope='row'>";
    // ci
    q2 = "</th><td>";
    // nombre
    q3 = "</td><td>";
    //apPaterno
    //q3
    //apMaterno
    //q3
    q40 = "<div class='btn-group' role='group' aria-label='Basic example'><button type='button' class='btn btn-secondary' onclick='detalleAlumno(";
    q41 = ");'>Ver</button><button type='button' class='btn btn-secondary' onclick='editarAlumno("
    q42 = ");'>Editar</button><button type='button' class='btn btn-secondary' onclick='eliminarAlumno("
    q43 = ");'>Borrar</button></div></td>";
    q5 = "</tr>"
    q6 = "";
    for (let i = 0; i < nroAlumnos; i++) {
        if ((alumnos[i].ci).toString().indexOf(n) >= 0 ||
            (alumnos[i].nombre).toString().indexOf(n) >= 0 ||
            (alumnos[i].apPaterno).toString().indexOf(n) >= 0 ||
            (alumnos[i].apMaterno).toString().indexOf(n) >= 0) {
            q6 += (q0 + q1 +
                alumnos[i].ci.toString() + q2 + alumnos[i].nombre.toString() + q3 + alumnos[i].apPaterno.toString() + q3 + alumnos[i].apMaterno.toString() + q3 +
                q40 + alumnos[i].ci.toString() + q41 + alumnos[i].ci.toString() + q42 + alumnos[i].ci.toString() + q43 + q5).toString();
        }
    }
    vol = "<button onclick='alumnosLista(5);'>Actualizar</button>";
    document.getElementById("algo").innerHTML = t1 + q6 + t2 + vol;
}

function materiasBuscar() {
    n = document.formu2.st.value;
    n = n.toString();
    document.getElementById("paraBuscar").innerHTML = "<button class='btn btn-success my-2 my-sm-0 px-5 text-light' onclick='materiasBuscar();'>Buscar</button>";
    document.getElementById("botonAgrega").innerHTML = "<button class='btn btn-success my-2 my-sm-0 px-5 text-light' onclick='nuevaMateria();'>Registrar Nuevo</button>";
    t1 = "<table class='table'><thead><tr><th scope='col'>idMateria</th><th scope='col'>Sigla</th><th scope='col'>Materia</th></tr></thead><tbody>";
    t2 = "</tbody></table>";
    q0 = "<tr>"
    q1 = " <th scope='row'>";
    //idMateria
    q2 = "</th><td>";
    //sigla
    q3 = "</td><td>";
    //nombre
    q5 = "</td></tr>"
    q6 = "";
    vol = "<button onclick='materiasLista();'>Actualizar</button>";
    for (let i = 0; i < nroMaterias; i++) {
        if ((materias[i].sigla).toString().indexOf(n) >= 0 ||
            (materias[i].nombre).toString().indexOf(n) >= 0) {
            q6 += q0 + q1 + materias[i].idMateria.toString() + q2 +
                materias[i].sigla.toString() + q3 + materias[i].nombre.toString() + q5;
        }
    }
    document.getElementById("algo").innerHTML = t1 + q6 + t2 + vol;
}

function docentesBuscar() {
    n = document.formu2.st.value;
    n = n.toString();
    document.getElementById("paraBuscar").innerHTML = "<button class='btn btn-success my-2 my-sm-0 px-5 text-light' onclick='docentesBuscar();'>Buscar</button>";
    document.getElementById("botonAgrega").innerHTML = "<button class='btn btn-success my-2 my-sm-0 px-5 text-light' onclick='nuevoDocente();'>Registrar Nuevo</button>";
    t1 = "<table class='table'><thead><tr><th scope='col'>idDocente</th><th scope='col'>Nombre</th></tr></thead><tbody></tbody>";
    t2 = "</tbody></table>";
    q0 = "<tr>"
    q1 = " <th scope='row'>";
    //idDocente
    q2 = "</th><td>";
    //nombre
    q5 = "</td></tr>"
    q6 = "";
    for (let i = 0; i < nroDocentes; i++) {
        if ((docentes[i].nombre).toString().indexOf(n) >= 0) {
            q6 += q0 + q1 + docentes[i].idDocente.toString() + q2 +
                docentes[i].nombre.toString() + q5;
        }
    }
    vol = "<button onclick='docentesLista();'>Actualizar</button>";
    document.getElementById("algo").innerHTML = t1 + q6 + t2 + vol;
}

function nuevoAlumno() {
    nro = nroAlumnos;
    nroAlumnos++;
    a1 = parseInt(prompt("Nuevo ci:"));
    a2 = prompt("Nuevo nombre: ");
    a3 = prompt("Nuevo apellido paterno: ");
    a4 = prompt("Nuevo apellido materno: ");
    alumnos[nro] = new Alumno(a1, a2, a3, a4, 0, []);
    alumnosLista(acum + 1);
}

function nuevoDocente() {
    nro = nroDocentes;
    nroDocentes++;
    a1 = parseInt(prompt("Nuevo idDocente:"));
    a2 = prompt("Nuevo nombre: ");
    docentes[nro] = new Docente(a1, a2);
    docentesLista();
}

function nuevaMateria() {
    nro = nroMaterias;
    nroMaterias++;
    a1 = parseInt(prompt("Nuevo idMateria:"));
    a2 = prompt("Nueva sigla: ");
    a3 = prompt("Nuevo nombre: ");
    materias[nro] = new Materia(a1, a2, a3);
    materiasLista();
}

function materiasLista() {
    document.getElementById("nombre").innerHTML = "Materias";
    document.getElementById("paraBuscar").innerHTML = "<button class='btn btn-success my-2 my-sm-0 px-5 text-light' onclick='materiasBuscar();'>Buscar</button>";
    document.getElementById("botonAgrega").innerHTML = "<button class='btn btn-success my-2 my-sm-0 px-5 text-light' onclick='nuevaMateria();'>Registrar Nuevo</button>";
    t1 = "<table class='table'><thead><tr><th scope='col'>idMateria</th><th scope='col'>Sigla</th><th scope='col'>Materia</th></tr></thead><tbody>";
    t2 = "</tbody></table>";
    q0 = "<tr>"
    q1 = " <th scope='row'>";
    //idMateria
    q2 = "</th><td>";
    //sigla
    q3 = "</td><td>";
    //nombre
    q5 = "</td></tr>"
    q6 = "";
    for (let i = 0; i < nroMaterias; i++) {
        q6 += q0 + q1 + materias[i].idMateria.toString() + q2 +
            materias[i].sigla.toString() + q3 + materias[i].nombre.toString() + q5;
    }
    document.getElementById("algo").innerHTML = t1 + q6 + t2;
}

function docentesLista() {
    document.getElementById("nombre").innerHTML = "Docentes";
    document.getElementById("paraBuscar").innerHTML = "<button class='btn btn-success my-2 my-sm-0 px-5 text-light' onclick='docentesBuscar();'>Buscar</button>";
    document.getElementById("botonAgrega").innerHTML = "<button class='btn btn-success my-2 my-sm-0 px-5 text-light' onclick='nuevoDocente();'>Registrar Nuevo</button>";
    t1 = "<table class='table'><thead><tr><th scope='col'>idDocente</th><th scope='col'>Nombre</th></tr></thead><tbody></tbody>";
    t2 = "</tbody></table>";
    q0 = "<tr>"
    q1 = " <th scope='row'>";
    //idDocente
    q2 = "</th><td>";
    //nombre
    q5 = "</td></tr>"
    q6 = "";
    for (let i = 0; i < nroDocentes; i++) {
        q6 += q0 + q1 + docentes[i].idDocente.toString() + q2 +
            docentes[i].nombre.toString() + q5;
    }
    document.getElementById("algo").innerHTML = t1 + q6 + t2;
}

function alumnosLista(acumm) {
    document.getElementById("nombre").innerHTML = "Alumnos";
    if (acumm == 0) {
        men();
    }
    document.getElementById("paraBuscar").innerHTML = "<button class='btn btn-success my-2 my-sm-0 px-5 text-light' onclick='alumnosBuscar();'>Buscar</button>";
    document.getElementById("botonAgrega").innerHTML = "<button class='btn btn-success my-2 my-sm-0 px-5 text-light' onclick='nuevoAlumno();'>Registrar Nuevo</button>";
    t1 = " <table class='table'><thead>  <tr><th scope='col'>C.I.</th><th scope='col'>Nombre</th><th scope='col'>Ap. Paterno</th> <th scope='col'>Ap. Materno</th><th scope='col'>Acciones</th> </tr></thead><tbody>";
    t2 = "</tbody></table>";
    q0 = "<tr>"
    q1 = " <th scope='row'>";
    // ci
    q2 = "</th><td>";
    // nombre
    q3 = "</td><td>";
    //apPaterno
    //q3
    //apMaterno
    //q3
    q40 = "<div class='btn-group' role='group' aria-label='Basic example'><button type='button' class='btn btn-secondary' onclick='detalleAlumno(";
    q41 = ");'>Ver</button><button type='button' class='btn btn-secondary' onclick='editarAlumno("
    q42 = ");'>Editar</button><button type='button' class='btn btn-secondary' onclick='eliminarAlumno("
    q43 = ");'>Borrar</button></div></td>";
    q5 = "</tr>"
    q6 = "";
    for (let i = 0; i < nroAlumnos; i++) {
        q6 += (q0 + q1 +
            alumnos[i].ci.toString() + q2 + alumnos[i].nombre.toString() + q3 + alumnos[i].apPaterno.toString() + q3 + alumnos[i].apMaterno.toString() + q3 +
            q40 + alumnos[i].ci.toString() + q41 + alumnos[i].ci.toString() + q42 + alumnos[i].ci.toString() + q43 + q5).toString();
    }
    document.getElementById("algo").innerHTML = t1 + q6 + t2;
}

function ingresar() {
    user = document.formu.user.value;
    password = document.formu.pass.value;
    if (user == "admin" && password == "admin") {
        location.replace("alumnos.html");
        men();
        // window.close(this);
        //window.open("alumnos.html");
    } else {
        alert("Usuario no encontrado");
    }
}