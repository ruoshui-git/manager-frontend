import React from 'react';
import { Result, Card, Row, Skeleton, Button, Col, Typography } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useParams, Link, useRouteMatch } from 'react-router-dom';
import { Dorm } from './models';

const ALL_DORMS = gql`
{
  allDorms {
    id,
    name,
    address,
    personSet {
      id,
      chineseFormatName,
    	isMale,
      age,
    }
  }
}
`

interface DormsQuery {
    allDorms: Dorm[];
}

const dormPageHeader = (
    <Typography.Title>
        宿舍
    </Typography.Title>)
    ;


const DormFC: React.FC = () => {
    const { loading, error, data, refetch } = useQuery<DormsQuery>(
        ALL_DORMS,
        {
            notifyOnNetworkStatusChange: true,
        });
    const { url } = useRouteMatch();

    let page;
    if (error) {
        page = (
            <Result
                status='error'
                title='获取数据时出错'
                extra={
                    <Button type='primary' key='retry' onClick={e => { e.preventDefault(); refetch() }}>再试一次</Button>
                }
            />
        );
    } else {
        page = (
            <Row gutter={[16, 16]}>
                {
                    loading ? <Skeleton active /> :
                        data && data.allDorms.map(({ id, name, address }) => {
                            return (
                                <Col span={8} key={id}>
                                    <Link to={`${url}/${id}`}>
                                        <Card title={name} bordered hoverable>
                                            地址: {address}
                                        </Card>
                                    </Link>
                                </Col>)
                        })
                }
            </Row>
        )
    }

    return (
        <>
            {dormPageHeader}
            {page}
        </>
    );
}

export default DormFC;