import React from 'react';
import { Switch, Route, useRouteMatch, RouteProps } from 'react-router-dom';

import { Layout } from 'antd';
import 'antd/dist/antd.css'

import Sidebar from "./Sidebar";
import DormFC from './Dorms';
import AppHeader from './Header';
import PeopleTable from './PeopleList';

const { Footer, Content } = Layout

const UserPage: React.FC<RouteProps> = () => {

  const { url } = useRouteMatch();

  return (
    <>
      <AppHeader />
      <Layout>
        <Sidebar />
        <Layout>
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Switch>
                <Route path={`${url}/dorms/:id?/`} component={DormFC} />
                <Route path={`${url}/people/`} component={PeopleTable} />
                <Route path={`${url}/`} component={Dashboard} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}> ©2020 Made by R with Ant Design in React </Footer>
        </Layout>
      </Layout>
    </>
  );
}


function Dashboard() {
  return <h2>主面板</h2>;
}


export default UserPage;