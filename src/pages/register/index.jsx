import { Typography, Form, Input, Flex } from "antd";
import { APIData } from "../../api/api";
import { useState } from "react";
import Notification from "../../components/common/Notification";
const { Title } = Typography;

const { Search } = Input;

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(false);

  const onSearch = async (value, _e, info) => {
    try {
      setLoading(true);
      const data = await APIData.cnpj(value.replace(/\D/g, ""));
      debugger;
      if (data.status === 200) {
        setLoading(false);

        form.setFieldsValue({
          razao_social: data.razao_social,
          nome_fantasia: data.nome_fantasia,
          nome_responsavel: data?.qsa[0]?.nome_socio,
          cep: data.cep,
          rua: data.descricao_tipo_de_logradouro + " " + data.logradouro,
          numero: data.numero,
          complemento: data.complemento,
          bairro: data.bairro,
          cidade: data.municipio,
          uf: data.uf,
          telefone: data.ddd_telefone_1,
        });
      } else if (data.status === 400) {
        setLoading(false);
        setNotification(true);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setNotification(true);
    }
  };

  const formatCnpj = async (cnpj) => {
    cnpj = cnpj.replace(/\D/g, "");
    cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2");
    cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2");
    cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2");
    cnpj = cnpj.substring(0, 18);
    form.setFieldsValue({ cnpj });
  };

  return (
    <>
      {notification && (
        <Notification message="CNPJ inválido" title="Erro" type="error" />
      )}
      <Title level={5}>Cadastro</Title>
      <Form layout="vertical" form={form}>
        <Flex gap="middle" align="center">
          <Form.Item
            label="CNPJ"
            name="cnpj"
            rules={[
              {
                required: true,
                message: "Por favor, insira um CNPJ válido!",
              },
            ]}
            style={{ width: "50%" }}
          >
            <Search
              onChange={(e) => formatCnpj(e.target.value)}
              onSearch={onSearch}
              loading={loading}
            />
          </Form.Item>
          <Form.Item
            label="Razão Social"
            name="razao_social"
            rules={[
              {
                required: true,
                message: "Por favor, insira um nome válido!",
              },
            ]}
            style={{ width: "50%" }}
          >
            <Input />
          </Form.Item>
        </Flex>
        <Flex gap="middle" align="center">
          <Form.Item
            label="Nome Fantasia"
            name="nome_fantasia"
            style={{ width: "50%" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Responsável"
            name="nome_responsavel"
            rules={[
              {
                required: true,
                message: "Por favor, insira um nome válido!",
              },
            ]}
            style={{ width: "50%" }}
          >
            <Input />
          </Form.Item>
        </Flex>
        <Flex gap="middle" align="center">
          <Form.Item label="CEP" name="cep" style={{ width: "10%" }}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Rua"
            name="rua"
            rules={[
              {
                required: true,
                message: "Por favor, insira um nome válido!",
              },
            ]}
            style={{ width: "65%" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Número"
            name="numero"
            rules={[
              {
                required: true,
                message: "Por favor, insira um nome válido!",
              },
            ]}
            style={{ width: "25%" }}
          >
            <Input />
          </Form.Item>
        </Flex>
        <Flex gap="middle" align="center">
          <Form.Item
            label="Complemento"
            name="complemento"
            style={{ width: "20%" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Bairro"
            name="bairro"
            rules={[
              {
                required: true,
                message: "Por favor, insira um nome válido!",
              },
            ]}
            style={{ width: "80%" }}
          >
            <Input />
          </Form.Item>
        </Flex>
        <Flex gap="middle" align="center">
          <Form.Item
            label="Cidade"
            name="cidade"
            rules={[
              {
                required: true,
                message: "Por favor, insira um nome válido!",
              },
            ]}
            style={{ width: "45%" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="UF"
            name="uf"
            rules={[
              {
                required: true,
                message: "Por favor, insira um nome válido!",
              },
            ]}
            style={{ width: "10%" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Telefone Principal"
            name="telefone"
            rules={[
              {
                required: true,
                message: "Por favor, insira um telefone válido!",
              },
            ]}
            style={{ width: "45%" }}
          >
            <Input />
          </Form.Item>
        </Flex>
      </Form>
    </>
  );
};

export default Register;
