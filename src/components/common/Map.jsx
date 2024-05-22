import styled from "styled-components";
import { FloatButton, Modal } from "antd";
import { StepForwardOutlined, HomeOutlined } from "@ant-design/icons";
import { useState } from "react";

const MapComponent = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  overflow: hidden;
  background-image: ${(props) => `url(${props.level})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Map = ({ level, change }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    localStorage.setItem("actualPhase", level);
    window.location.href = "/";
  };

  return (
    <MapComponent level={level}>
      <FloatButton
        icon={<StepForwardOutlined />}
        tooltip={<div>Próxima fase</div>}
        onClick={change}
        style={{ position: "absolute", left: "25px" }}
      >
        Next
      </FloatButton>
      <FloatButton
        icon={<HomeOutlined />}
        tooltip={<div>Página inicial</div>}
        onClick={() => {
          Modal.confirm({
            title: "Tem certeza?",
            content: "Você está prestes a sair do jogo. Deseja continuar?",
            onCancel: handleCancel,
            onOk: handleOk,
            footer: (_, { OkBtn, CancelBtn }) => (
              <>
                <CancelBtn />
                <OkBtn />
              </>
            ),
          });
        }}
      ></FloatButton>
    </MapComponent>
  );
};

export default Map;
