import { useReducer } from "react";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
  display: "inline-block"
};

const initializerArg = [
  { name: "small", price: 100, count: 1, id: 1, edited: false },
  { name: "medium", price: 200, count: 1, id: 2, edited: false },
  { name: "large", price: 300, count: 1, id: 3, edited: false },
];

type TState = typeof initializerArg;
const reducer = (state: TState) => {
  console.log(state);
  return state;
};

export function UseReducerDemo() {
  const [items, dispatch] = useReducer(
    reducer,
    initializerArg /* initializer = (initializerArg) => initializerArg */
  );
  return (
    <div style={itemStyle}>
      <h3>items</h3>
      <table border={1} cellPadding={0} cellSpacing={0} width={400}>
        <thead>
          <tr>
            <th>name</th>
            <th>price</th>
            <th>count</th>
            <th>totalPrice</th>
            <th>edit</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return (
              <tr key={item.id}>
                <td align="center">{item.name}</td>
                <td align="center">{item.price}</td>
                <td align="center">{item.count}</td>
                <td align="center">{item.price * item.count}</td>
                <td align="center">
                  <button type="button">update</button>
                  <button type="button">delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
