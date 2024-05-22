import React, { useEffect, useMemo } from "react";
import { notification, Space } from "antd";
const Context = React.createContext({
  name: "Default",
});

const Notification = ({ message, title, type }) => {
  const [api, contextHolder] = notification.useNotification();

  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );

  const openNotificationWithIcon = (placement) => {
    api[type]({
      message: title,
      description: message,
      placement,
    });
  };

  useEffect(() => {
    openNotificationWithIcon("topRight");
  }, []);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <Space></Space>
    </Context.Provider>
  );
};

export default Notification;
