import Action               from 'utils/Action';
import * as SayHelloApi     from 'api/SayHelloApi';


export const sayHello = new Action().async( SayHelloApi.getMessage );

