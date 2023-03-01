export class Conversation {
    constructor(
        public _id: number,
        public sender_id : number,
        public receptor_id : number,
        public created_at: string,
        public updated_at: string,
    ){}
}