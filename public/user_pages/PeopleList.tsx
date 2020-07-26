import React, { useState } from 'react';
import { Layout, Table, Input, message, Typography, Divider, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Person } from './models';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const { Sider, Content } = Layout;

const ALL_PEOPLE_QUERY = gql`
{
    allPeople {
      id,
      chineseFormatName,
      age,
      isMale,
      birthday,
      dorm {
        name
      }
    }
  }
  `

interface AllPeopelQueryProps {
    allPeople: Person[],
}


const PeopleFilters: React.FC = (props) => {

    return (
        <>
            <Typography.Title level={4}>
                过滤器
            </Typography.Title>

            <Form>
                <Form.Item
                    label='姓名'
                // onChange={}// add fn here
                >
                    <Input
                        prefix={<UserOutlined />}
                        allowClear
                    />
                </Form.Item>
            </Form>

        </>
    );
}

const PeopleTable: React.FC = () => {
    const { loading, error, data, refetch } = useQuery<AllPeopelQueryProps>(ALL_PEOPLE_QUERY);

    let list;
    if (!(error || loading) && data) {
        list = data.allPeople;
    }

    const columns = [
        {
            title: '姓名',
            dataIndex: 'chineseFormatName',
            key: 'chineseFormatName',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '所在宿舍',
            dataIndex: 'dorm',
            key: 'dorm',
        }
    ];
    return (
        <>
            <Typography.Title>人员</Typography.Title>
            <Layout className='site-layout-background'>
                <Sider theme='light'>
                    <PeopleFilters />
                </Sider>
                <Layout style={{ margin: '24px 16px' }} >
                    <Content>
                        {error ?
                            message.error('获取数据失败')
                            :
                            <Table loading={loading} dataSource={list} columns={columns} pagination={false} />

                        }
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}

export default PeopleTable;