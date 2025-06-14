import { useActionData, useLoaderData, useNavigation, useSubmit } from 'react-router'
import { Button, Card, Form, Input } from 'antd'

export default function Action() {
  const navigation = useNavigation()
  console.log(navigation.state)
  const actionData = useActionData()
  console.log(actionData)

  // loader
  const { data, okOrErr } = useLoaderData<{
    data: { name: string; age: string }[]
    okOrErr: string
  }>()

  // action
  const submit = useSubmit()
  const handleSubmitForm = (data: { name: string; age: string }) => {
    submit(data, {
      method: 'POST',
      encType: 'application/json', // 默认 encType: 'multipart/form-data'
    })
  }
  return (
    <Card>
      <Form onFinish={handleSubmitForm}>
        <Form.Item label="name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="age" name="age">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            submit
          </Button>
        </Form.Item>
      </Form>

      <div>okOrErr: {okOrErr}</div>
      <div>
        {data.map((item, idx) => (
          <div key={idx}>
            name: {item.name}, age: {item.age}
          </div>
        ))}
      </div>
    </Card>
  )
}
