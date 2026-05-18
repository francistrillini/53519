import antlr4 from 'antlr4';
import { CharStreams, CommonTokenStream } from 'antlr4';
import UsuarioLexer from './generated/UsuarioLexer.js';
import UsuarioParser from './generated/UsuarioParser.js';
import { CustomErrorListener } from './CustomErrorListener.js';
import { CustomVisitor } from './CustomVisitor.js';
import fs from 'fs';

function compilar(archivoInput) {
    console.log(`\n==================================================`);
    console.log(`PROCESANDO ARCHIVO: ${archivoInput}`);
    console.log(`==================================================`);
    
    const input = fs.readFileSync(archivoInput, 'utf8');

    const chars = CharStreams.fromString(input);
    const lexer = new UsuarioLexer(chars);
    
    lexer.removeErrorListeners();
    const errorListener = new CustomErrorListener();
    lexer.addErrorListener(errorListener);

    const tokens = new CommonTokenStream(lexer);

    console.log("REQUERIMIENTO 2: Tabla de Lexemas y Tokens");
    console.log("--------------------------------------------------");
    tokens.fill();
    tokens.tokens.forEach(t => {
        if (t.type !== antlr4.Token.EOF) {
            const nombreToken = UsuarioLexer.symbolicNames[t.type] || t.type;
            console.log(`Lexema: '${t.text.padEnd(15)}' \t->\t Token: ${nombreToken}`);
        }
    });

    const parser = new UsuarioParser(tokens);
    parser.buildParseTrees = true;
    parser.removeErrorListeners();
    parser.addErrorListener(errorListener);

    const tree = parser.programa();

    console.log("REQUERIMIENTO 1: Análisis Sintáctico e Informe");
    console.log("--------------------------------------------------");
    if (errorListener.tieneErrores()) {
        console.error("❌ El código fuente contiene errores sintácticos o léxicos:");
        errorListener.errores.forEach(err => console.error(err));
        return; 
    } else {
        console.log(" Análisis léxico y sintáctico exitoso. Entrada correcta sin errores.");
    }

    console.log("REQUERIMIENTO 3: Árbol de Análisis Sintáctico (CST)");
    console.log("--------------------------------------------------");
    console.log(tree.toStringTree(parser.ruleNames));

    console.log(" REQUERIMIENTO 4: Traducción a JavaScript e Interpretación");
    console.log("--------------------------------------------------");
    const visitor = new CustomVisitor();
    const codigoJavaScript = visitor.visitPrograma(tree);
    
    console.log("CÓDIGO JAVASCRIPT GENERADO:");
    console.log(codigoJavaScript);
    
    console.log("EJECUCIÓN EN TIEMPO DE INTERPRETACIÓN:");
    console.log("--------------------------------------------------");
    try {
        eval(codigoJavaScript); 
    } catch (evalError) {
        console.error("Error durante la ejecución del intérprete:", evalError);
    }
}

compilar('input_correcto1.txt');