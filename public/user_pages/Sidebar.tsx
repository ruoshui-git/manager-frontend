
import React from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css'

import { DashboardOutlined, UserOutlined, BankOutlined } from '@ant-design/icons';
const { Sider } = Layout


export default function Sidebar() {
    let { path } = useRouteMatch();
    let location = useLocation();
    const paths = [
        {
            path: `${path}`,
            title: '主面板',
            icon: <DashboardOutlined />,
        },
        {
            path: `${path}/dorms`,
            title: '宿舍',
            icon: <BankOutlined />,
        },
        {
            path: `${path}/people`,
            title: '人员',
            icon: <UserOutlined />,
        }
    ]
    
    return (
        <Sider
            theme='light'
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <div className="logo" />
            <Menu theme="light" mode="inline" defaultSelectedKeys={[location.pathname]}>
                {/* <Menu.Item key="1" icon={}>
                    <Link to={}>主面板</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={}>
                    <Link to={}></Link>
                </Menu.Item>
                <Menu.Item key="3" icon={}>
                    <Link to={`${path}/people`}>人员</Link>
                </Menu.Item> */}
                { paths.map(e => {
                    return (
                        <Menu.Item key={e.path} icon={e.icon}>
                            <Link to={e.path}>{e.title}</Link>
                        </Menu.Item>
                    )
                }) }
            </Menu>
        </Sider>
    );
}