import React from 'react'

import AppHeader from './Header';
import { Layout, Typography, Button, Space, Row } from 'antd';
import { Link } from 'react-router-dom';
import TextArea from 'antd/lib/input/TextArea';

const { Content, Footer } = Layout;

const routes = [
    {
        path: '',
        name: '管理界面',
        isExternal: true,
    },
    {
        path: 'login',
        name: '（暂时无效）登录网页'
    },
    {
        path: 'app',
        name: '（测试，不完整）跳转至用户界面'
    }
]

const Home: React.FC = () => {
    return (
        <>
            <AppHeader />
            <Content style={{ textAlign: 'center', marginTop: 10, }}>
            <Space direction='vertical'>
                {/* <Row>
                    <a href='admin'>
                        <Button size='large' type='primary'>管理界面</Button>
                    </a>
                </Row> */}
                {routes.map(route => {
                    const button = <Button size='large' type='primary' >{route.name}</Button>;
                    return (
                        <Row key={route.path}>
                            {
                            route.isExternal?
                            <a href={route.path} style={{width:'100%'}}>
                                {button}
                            </a>
                            :
                            <Link to={route.path} style={{width:'100%'}}>
                                {button}
                            </Link>
                            }
                        </Row>
                    )
                })}
            </Space>
        </Content>
        <Footer style={{ textAlign: 'center' }}> ©2020 Made by R with Ant Design in React </Footer>
        </>
    )
}

export default Home;