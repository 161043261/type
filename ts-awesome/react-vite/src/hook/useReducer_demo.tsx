import { useReducer } from "react";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
  display: "inline-block",
};

const initializerArg = [
  { name: "small", price: 100, count: 1, id: 1, isEditing: false },
  { name: "medium", price: 200, count: 1, id: 2, isEditing: false },
  { name: "large", price: 300, count: 1, id: 3, isEditing: false },
];

type TState = typeof initializerArg;
const reducer = (
  state: TState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: { type: "add" | "sub" | "onEdit" | "delete" | "updateName" | "editOnBlur"; id: number, newVal?: any }
) => {
  // state: items
  const item = state.find((item) => item.id === action.id)!;
  switch (action.type) {
    case "add":
      item.count++;
      return [...state];
    case "sub":
      if (item.count > 0) {
        item.count--;
      }
      return [...state];
    case "delete":
      return state.filter((item) => item.id !== action.id);
    case "onEdit":
      item.isEditing = !item.isEditing;
      return [...state];
    case "updateName":
      item.name = action.newVal!;
      return [...state];
    case "editOnBlur":
      item.isEditing = !item.isEditing;
      return [...state]
    default:
      return state;
  }
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
            <th>total</th>
            <th>edit</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return (
              <tr key={item.id}>
                <td align="center">
                  {item.isEditing ? (
                    <>
                      {/* for -> htmlFor */}
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                          dispatch({
                            type: "updateName",
                            id: item.id,
                            newVal: e.target.value,
                          })
                        }
                        onBlur={() =>
                          dispatch({ type: "editOnBlur", id: item.id })
                        }
                      />
                    </>
                  ) : (
                    item.name
                  )}
                </td>
                <td align="center">{item.price}</td>
                <td align="center">
                  {item.count}
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "add", id: item.id })}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "sub", id: item.id })}
                  >
                    -
                  </button>
                </td>
                <td align="center">{item.price * item.count}</td>
                <td align="center">
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({ type: "onEdit", id: item.id })
                    }
                  >
                    edit
                  </button>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "delete", id: item.id })}
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}></td>
            <td align="right">
              sigma: {items.reduce((a, b) => a + b.price * b.count, 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
