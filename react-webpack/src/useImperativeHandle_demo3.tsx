import { Ref, useImperativeHandle, useRef, useState } from 'react';

const itemStyle = {
  border: '1px solid lightblue',
  borderRadius: '10px',
  padding: '5px',
  overflow: 'auto',
};

interface ChildRef {
  name: string;
  validate: () => boolean;
  reset: () => void;
}

function Child(props: { ref: Ref<ChildRef> }) {
  const { ref } = props;
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const validate = () => {
    return !(form.username === '' || form.password === '');
  };

  const reset = () => {
    setForm({
      username: '',
      password: '',
    });
  };

  useImperativeHandle(ref, () => {
    return {
      name: 'Child',
      validate,
      reset,
    };
  });

  return (
    <div>
      <p>Child</p>
      <input
        type="text"
        value={form.username}
        onChange={(ev) => setForm({ ...form, username: ev.target.value })}
      />
      <input
        type="password"
        value={form.password}
        onChange={(ev) => setForm({ ...form, password: ev.target.value })}
      />
    </div>
  );
}

export function UseImperativeHandleDemo3() {
  const childRef = useRef<ChildRef>(null);
  return (
    <div style={itemStyle}>
      <p>Parent</p>
      <button
        type="button"
        onClick={() => console.log(childRef.current?.validate())}
      >
        validate
      </button>
      <button type="button" onClick={() => childRef.current?.reset()}>
        reset
      </button>
      <Child ref={childRef} />
    </div>
  );
}
