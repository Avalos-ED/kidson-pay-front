
export class Usuario {
    constructor(
        public nombre: String,
        public email: String,
        public password?: String,
        public img?: String,
        public google?: boolean,
        public role?: String,
        public uid?: String
    ) {}
}