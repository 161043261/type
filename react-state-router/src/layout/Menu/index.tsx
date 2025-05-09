import { TwitterOutlined } from '@ant-design/icons'
import { Menu as AntdMenu, MenuProps } from 'antd'
import { useNavigate } from 'react-router'
export default function Menu() {
  const navigate = useNavigate()
  const handleClick: MenuProps['onClick'] = (info) => {
    const toPath = info.key
    navigate(toPath) // 编程式导航
  }
  const menuItems = [
    {
      key: '/home',
      label: 'Home',
      icon: <TwitterOutlined />,
    },
    {
      key: '/about',
      label: 'About',
      icon: <TwitterOutlined />,
    },
  ]
  return <AntdMenu onClick={handleClick} style={{ height: '100vh' }} items={menuItems}></AntdMenu>
}
