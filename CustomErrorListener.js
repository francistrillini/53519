import antlr4 from 'antlr4';

export class CustomErrorListener extends antlr4.error.ErrorListener {
    constructor() {
        super();
        this.errores = [];
    }

    syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
        this.errores.push(`[Error Lexico/Sintáctico] Línea ${line}:${column} - ${msg}`);
    }
    
    tieneErrores() {
        return this.errores.length > 0;
    }
}