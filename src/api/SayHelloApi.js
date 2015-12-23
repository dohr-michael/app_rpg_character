const baseUrl:string = 'hello';

export function getMessage( name:string, url:string = `${baseUrl}/${name}` ) {
    return Promise.resolve(
        {
            message: `Hello, ${name}`
        }
    );
}