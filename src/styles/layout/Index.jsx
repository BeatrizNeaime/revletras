import { Layout, theme } from "antd";
import { routes } from "../../router/routes";
import AppHeader from "../../components/common/Header";
const { Header, Content, Footer } = Layout;

const LayoutComponent = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          position: "sticky",
          zIndex: 1,
        }}
        breakpoint="lg"
      >
        <div className="demo-logo" />
        <AppHeader routes={routes} />
      </Header>
      <Content>
        <div
          className="site-layout-content"
          style={{
            backgroundColor: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        ©2024 Created by Beatriz Neaime and Rebeca Rosa - All rights reserved
      </Footer>
    </Layout>
  );
};
export default LayoutComponent;
