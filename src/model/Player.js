/**
 *
 */
export default class Player {
    name:string;

    withName( name:string ) {
        this.name = name;
        return this;
    }
}