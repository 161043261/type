/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
type Spawn = (genFunc: Function) => Promise<any>;
// declare function spawn(genFunc: Function): Promise<any>;
declare const spawn: Spawn;
export default spawn;
