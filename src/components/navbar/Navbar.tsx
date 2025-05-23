import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  PlusCircleOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Inicio",
      onClick: () => navigate("/login"),
    },
    {
      key: "addPlatillo",
      icon: <PlusCircleOutlined />,
      label: "Agregar Platillo",
      onClick: () => navigate("/addDish"),
    },




    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Perfil",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Salir",
      className: "logout-item",
    },
  ];

  return (
    <Header className="navbar">
      <div className="logo">
        <img src="/src/assets/images/logosolo.jpg" alt="Logo" />
      </div>
      <Menu mode="horizontal" items={menuItems} className="nav-menu" />
    </Header>
  );
};

export default Navbar;
