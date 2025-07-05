import { FC, ReactNode } from "react";

export const Child: FC<{
  aNull: null;
  anUndefined: undefined;
  aBoolean: boolean;
  aNumber: number;
  aString: string;
  anObject: object;
  anArray: number[];
  aFunction: (a: number, b: number) => number;
  aJsxElement: JSX.Element;
  children: ReactNode;
}> = (props) => {
  return (
    <>
      <ul>
        <li>aNull: {props.aNull}</li>
        <li>anUndefined: {props.anUndefined}</li>
        <li>aBoolean: {props.aBoolean}</li>
        <li>aNumber: {props.aNumber}</li>
        <li>aString: {props.aString}</li>
        <li>anObject: {JSON.stringify(props.anObject)}</li>
        <li>anArray: {props.anArray.join(", ")}</li>
        <li>aFunction: {props.aFunction(1, 2)}</li>
        <li>aJsxElement: {props.aJsxElement}</li>
      </ul>
      {props.children}
    </>
  );
};
