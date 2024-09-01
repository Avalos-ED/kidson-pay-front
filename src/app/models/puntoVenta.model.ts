export class PuntoVenta {
    constructor(
        public _id?: string,
        public ubicacion?: string,
        public importe_renta?: string,
        public fecha_inicio?: string,
        public fecha_termino?: string,
        public contrato?: string,
        public observacion?: string,
        public img?: string,
        public descripcion?: string,
    ) { }
}