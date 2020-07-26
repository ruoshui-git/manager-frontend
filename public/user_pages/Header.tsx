import React from "react";
import { Layout } from "antd";
import { HomeOutlined } from '@ant-design/icons'
import { Link } from "react-router-dom";
import './Header.css';

const { Header } = Layout;

const AppHeader: React.FC = () => {

    return (
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
            <Link to='/'><HomeOutlined className='app-header-icon'/></Link>
        </Header>
    );
}

export default AppHeader;