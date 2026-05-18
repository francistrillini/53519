# Analizador Léxico y Sintáctico (ANTLR4 + JS)
**Materia:** Sintaxis y Semántica de los Lenguajes  
**Tema Asignado:** 25914_4 - Declaración de Usuarios  
**Legajo:** 53519

## Descripción
Este proyecto implementa un analizador léxico y sintáctico construido con ANTLR4 y Node.js. Procesa un lenguaje de declaración de usuarios, valida su estructura, genera la tabla de tokens, muestra el árbol sintáctico (CST) y traduce la entrada a código JavaScript ejecutable.

## Estructura
* `Usuario.g4`: Gramática del lenguaje en formato ANTLR4.
* `index.js`: Script principal de ejecución.
* `CustomVisitor.js`: Traductor semántico del árbol a JavaScript.
* `CustomErrorListener.js`: Interceptor de errores con indicación de línea.
* `generated/`: Código autogenerado por ANTLR4.
* `input_*.txt`: 4 archivos de prueba provistos para la evaluación.

## Instalación y Ejecución
Requiere tener **Node.js** instalado en el equipo.

1. Clonar el repositorio:
   git clone [https://github.com/francistrillini/53519.git](https://github.com/francistrillini/53519.git)

2. Abrir la terminal en la carpeta del proyecto e instalar las dependencias:
npm install

3. Ejecutar el analizador:
node index.js

Pruebas
Se incluyen 4 archivos para evaluar distintos escenarios:

input_correcto1.txt / input_correcto2.txt: Casos válidos.

input_incorrecto1.txt / input_incorrecto2.txt: Casos con errores léxicos/sintácticos.