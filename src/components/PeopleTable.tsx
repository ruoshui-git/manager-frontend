import React, { forwardRef } from 'react';
// import {} from '@material-ui/core';
import { Skeleton, Alert } from "@material-ui/lab";

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import {

    AddBox,
    ArrowDownward,
    Check,
    ChevronLeft,
    ChevronRight,
    Clear,
    DeleteOutline,
    Edit,
    FilterList,
    FirstPage,
    LastPage,
    Remove,
    SaveAlt,
    Search,
    ViewColumn,
    Refresh
} from "@material-ui/icons";
import MaterialTable, { Column, Icons } from 'material-table';
import { IconButton, Snackbar } from '@material-ui/core';
import { useHistory, useRouteMatch } from 'react-router-dom';

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
interface Person {
    id: number;
    chineseFormatName: string;
    isMale: boolean;
    age: number
    birthday: string;
    dorm: {
        name: string;
    };
}

interface AllPeopelQueryProps {
    allPeople: Person[],
}

const tableIcons: Icons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


const PeopleTable: React.FC = () => {
    const [tcolumns] = React.useState<Column<Person>[]>([
        { title: 'ID', field: 'id' },
        { title: '姓名', field: 'chineseFormatName' },
        { title: '性别', field: 'isMale', render: ({ isMale }) => isMale ? '男' : '女' },
        { title: '年龄', field: 'age', type: 'numeric' },
        { title: '生日', field: 'birthday', type: 'date' },
        { title: '宿舍', field: 'dorm', render: ({ dorm }) => dorm.name },
    ]);
    let tdata: Person[] = [];
    // const [tdata, setTData] = React.useState<Person[]>([]);
    const { loading, error, data, refetch, networkStatus } = useQuery<AllPeopelQueryProps>(
        ALL_PEOPLE_QUERY,
        {
            notifyOnNetworkStatusChange: true
        });
    const [snackBarOpen, setSnackbarOpen] = React.useState(false);

    const history = useHistory();
    const { url } = useRouteMatch();

    if (error) {
        setSnackbarOpen(true);
    }
    if (!(error || loading) && data) {
        tdata = data.allPeople;
    }
    let refetching = networkStatus === 4;
    if (loading && !refetching) {
        return <Skeleton variant='rect' height='20em' animation='wave' />;
    } else {
        return (
            <>
                <IconButton onClick={() => refetch()}><Refresh /></IconButton>

                <MaterialTable
                    title='人员表'
                    columns={tcolumns}
                    data={tdata}
                    icons={tableIcons}
                    isLoading={loading && refetching}
                    onRowClick={(event, rowData) => { history.push(`${url}/${rowData?.id}`) }}
                    options={{
                        filtering: false,
                        paging: false,
                    }}
                />
                {/* {error && */}
                <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                    <Alert severity='error'>获取数据时出错</Alert>
                </Snackbar>
                {/* } */}
            </>
        );
    }
}

export default PeopleTable;