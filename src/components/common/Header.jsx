import { Button, Flex, Menu } from "antd";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import logo from "../../assets/img/logos/logo-p.png";
import { LinkComponent, LinkWrapper } from "./Link";

const AppHeader = () => {
  const desktop = useMediaQuery("(min-width: 768px)");
  return (
    <Menu style={{ width: "100%", backgroundColor: "transparent" }}>
      <Flex
        gap="middle"
        justify="space-between"
        align="center"
        style={{ width: "100%" }}
      >
        <Flex>
          <img width={desktop ? 50 : 30} src={logo} />
        </Flex>
        <Flex gap="middle" justify="space-evenly">
          <ul style={{ listStyle: "none", color: "white", display: "flex" }}>
            <LinkWrapper>
              <LinkComponent to={"/"}>Início</LinkComponent>
            </LinkWrapper>
            <LinkWrapper>
              <LinkComponent to={"/sobre"}>Sobre</LinkComponent>
            </LinkWrapper>
          </ul>
        </Flex>
        <Flex>
          <LinkWrapper>
            <LinkComponent to={"/login"}>
              <Button
                type="dashed"
                style={{ backgroundColor: "transparent", color: "white" }}
              >
                Login
              </Button>
            </LinkComponent>
          </LinkWrapper>
        </Flex>
      </Flex>
    </Menu>
  );
};

export default AppHeader;
