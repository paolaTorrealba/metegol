export interface votosUsuario {
    email:string;
}

export class Elemento {
    public  id?:string;
    public email:string;
    public img:string;
    public nombre:string;
    public votos:number; // sumo o resto segun el tipo de voto
    public date:Date;
    public nroFoto:number;
    public votosusuario:votosUsuario[];
}
