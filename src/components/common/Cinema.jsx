import { Button, FloatButton, Form, Input, Modal } from "antd";
import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  StepForwardOutlined,
  MenuOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const CinemaComponent = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  overflow: hidden;
  background-color: #f0f0f0;
  video {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SubmitButton = ({ form, children }) => {
  const [submittable, setSubmittable] = useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
};

const Cinema = ({ video, change, phase }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    document.querySelector("video").pause();
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setOpen(false);
    localStorage.setItem("actualPhase", phase);
    window.location.href = "/";
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    localStorage.setItem("name", values.name);
    setIsModalOpen(false);
    change();
  };

  const handleSkip = () => {
    if (phase + 1 === 5) {
      showModal();
    } else {
      change();
    }
  };

  useEffect(() => {
    const videoElement = document.querySelector("video");
    videoElement.addEventListener("ended", function () {
      if (phase + 1 === 3) {
        showModal();
      } else {
        change();
      }
    });

    return () => {
      videoElement.removeEventListener("ended", change);
    };
  }, [form]);

  return (
    <CinemaComponent>
      <Modal
        title="Insira seu nome"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            label="Nome"
            name="name"
            rules={[
              {
                required: true,
                message: "Por favor, insira seu nome!",
              },
            ]}
          >
            <Input placeholder="Nome" />
          </Form.Item>
          <SubmitButton form={form}>Salvar</SubmitButton>
        </Form>
      </Modal>
      <video controls autoPlay src={video} />
      <FloatButton.Group
        trigger="click"
        style={{
          left: "2rem",
          bottom: "10%",
        }}
        icon={<MenuOutlined />}
      >
        <FloatButton
          type="primary"
          icon={<HomeOutlined />}
          onClick={() => {
            document.querySelector("video").pause();
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
        />
        <FloatButton icon={<StepForwardOutlined />} onClick={handleSkip} />
      </FloatButton.Group>
    </CinemaComponent>
  );
};

export default Cinema;
