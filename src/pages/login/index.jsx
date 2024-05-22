import { Button, Checkbox, Form, Input, Space, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
const { Title } = Typography;

const login = async (values) => {
  console.log(values);
};

const Login = () => {
  const [form] = useForm();

  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Title level={5}>Entrar</Title>

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={login}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Por favor, insira seu nome de usuário!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Usuário"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Por favor, insira sua senha!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Senha"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Mantenha-me conectado</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Esqueci minha senha
          </a>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Entrar
          </Button>
        </Form.Item>
        Ou <a href="/cadastro">cadastrar agora!</a>
      </Form>
    </Space>
  );
};

export default Login;
