import UsuarioVisitor from './generated/UsuarioVisitor.js';

export class CustomVisitor extends UsuarioVisitor {
    visitPrograma(ctx) {
        
        let output = `function crearUsuario(id, atributos) {\n`;
        output += `    console.log(\`Creando usuario: \${id}\`);\n`;
        output += `    atributos.forEach(({clave, valor}) => {\n`;
        output += `        console.log(\`\${clave} = \${valor}\`);\n`;
        output += `    });\n}\n\n`;

        const usuarios = ctx.usuario();
        if (usuarios) {
            for (let u of usuarios) {
                output += this.visitUsuario(u) + '\n';
            }
        }
        return output;
    }

    visitUsuario(ctx) {
        let id = ctx.ID().getText();
        let atributosCode = ctx.atributo().map(a => this.visitAtributo(a)).join(',\n');
        return `crearUsuario("${id}", [\n${atributosCode}\n]);`;
    }

    visitAtributo(ctx) {
        let clave = ctx.ID().getText();
        let valor = this.visitValor(ctx.valor());
        return `    { clave: "${clave}", valor: ${valor} }`;
    }

    visitValor(ctx) {
        if (ctx.NUMERO()) return ctx.NUMERO().getText();
        if (ctx.CADENA()) return ctx.CADENA().getText(); 
        if (ctx.BOOLEANO()) {
            return ctx.BOOLEANO().getText() === 'verdadero' ? 'true' : 'false';
        }
    }
}