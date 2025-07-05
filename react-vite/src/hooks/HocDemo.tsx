import { Space } from "antd";

enum Role {
  Admin = "Admin",
  User = "User",
}

const withAuth = (role: Role) => (Component: React.FC) => {
  const isAdmin = (role: Role) => role === Role.Admin;
  return (props: Record<string, unknown>) => {
    if (isAdmin(role)) {
      return <Component {...props} />;
    } else {
      return <Space>No permission, props: {JSON.stringify(props)}</Space>;
    }
  };
};

const AdminPage = withAuth(Role.Admin)((props: Record<string, unknown>) => (
  <div>Admin, props: {JSON.stringify(props)}</div>
));

const UserPage = withAuth(Role.User)((props: Record<string, unknown>) => (
  <div>User, props: {JSON.stringify(props)}</div>
));

export default function HocDemo() {
  return (
    <div>
      <AdminPage a={1} c={2} e={3} />
      <UserPage a={4} c={5} e={6} />
    </div>
  );
}
