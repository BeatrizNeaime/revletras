import { Button, Flex, Space, Typography } from "antd";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { LinkComponent } from "../../components/common/Link";
const { Title, Text } = Typography;

const Index = () => {
  const desktop = useMediaQuery("(min-width: 768px)");
  return (
    <Space direction="vertical">
      <Title level={3}>Bem-vindo(a) à Revolução das Letras!</Title>
      {desktop ? (
        <Flex gap="middle" justify="flex-start" style={{ width: "50%" }}>
          <Text>
            Descubra uma nova forma de aprendizado interativo e divertido para
            crianças em fase de alfabetização - nossa plataforma educacional
            oferece vídeos e jogos envolventes para tornar a alfabetização uma
            jornada empolgante e inclusiva. Experimente agora mesmo!
          </Text>
        </Flex>
      ) : (
        <Text>
          Descubra uma nova forma de aprendizado interativo e divertido para
          crianças em fase de alfabetização - nossa plataforma educacional
          oferece vídeos e jogos envolventes para tornar a alfabetização uma
          jornada empolgante e inclusiva. Experimente agora mesmo!
        </Text>
      )}

      <Space direction="horizontal" style={{ marginTop: "1rem" }}>
        <LinkComponent to="/sobre">
          <Button
            type="primary"
            size="large"
            href="/sobre"
            style={{ backgroundColor: "#001529" }}
          >
            Conhecer
          </Button>
        </LinkComponent>
      </Space>
    </Space>
  );
};

export default Index;
