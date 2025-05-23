import { FC } from "react";
import { Child } from "./Child";

const Parent: FC = () => {
  return (
    <>
      <Child
        aNull={null}
        anUndefined={undefined}
        aBoolean={true}
        aNumber={1}
        aString={"Hola"}
        anObject={{ a: 1 }}
        anArray={[1, 2, 3]}
        aFunction={(a: number, b: number) => a + b}
        aJsxElement={<div>JSX</div>}
      >
        <div>I am a slot!</div>
      </Child>
    </>
  );
};

export default Parent;
