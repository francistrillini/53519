grammar Usuario;

programa: usuario* EOF ;
usuario: 'usuario' ID ILLAVE atributo* DLLAVE ;
atributo: ID ASIGNACION valor PUNTOCOMA ;
valor: NUMERO | CADENA | BOOLEANO ;

ILLAVE: '{' ;
DLLAVE: '}' ;
ASIGNACION: '=' ;
PUNTOCOMA: ';' ;
BOOLEANO: 'verdadero' | 'falso' ;

ID: LETRA (LETRA | DIGITO)* ;
NUMERO: DIGITO+ ;
CADENA: '"' ~["]* '"' ;

fragment LETRA: [a-zA-Z] ;
fragment DIGITO: [0-9] ;

WS : [ \t\r\n]+ -> skip ;