import React from "react";
import {
    Container,
    makeStyles,
    Grid,
    Box,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText
} from "@material-ui/core";
import Title from "./Title";


const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}))

interface PersonDetailsProps {
    id: number;
}

interface ListTemplateProps {
    data: Array<string>;
    title: React.ReactNode;
}

const ListTemplate: React.FC<ListTemplateProps> = ({ data, title }) => {
    return (
        <>
            <Title>{title}</Title>
            <List dense>
                {
                    data.map(e => {
                        return (
                            <ListItem>
                                <ListItemText>{e}</ListItemText>
                            </ListItem>
                        );
                    })
                }
            </List>
        </>
    );
}

const BasicInfo: React.FC<PersonDetailsProps> = ({ id }) => {

    return (
        <>
            <Title>基本信息 #{id}</Title>
            <List dense>
                <ListItem>
                    <ListItemText>年龄：{'age'}</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>性别： {'sex'} </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>生日：{'birthday'} </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>现住宿舍：{'none'} </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>开始学习年份：{2000} </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>是否是一家人：{'unkonwn'} </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>兴趣爱好：{'说大话 搞政治 玩手腕'} </ListItemText>
                </ListItem>
            </List>
        </>);
}
const TaskProgress: React.FC<PersonDetailsProps> = ({ id }) => {
    return (
        <>
            <Title>任务完成情况：{"<完成>"}</Title>
            <List dense>
                <ListItem>
                    <ListItemText>二时课诵：{'<COMPLETED>'}</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>梵呗：{'<COMPLETED>'}</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>三百二十条：{'<COMPLETED>'}</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>吉祥经：{'<COMPLETED>'}</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>丛林要则二十条：{'<COMPLETED>'}</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>事师五十颂：{'<COMPLETED>'}</ListItemText>
                </ListItem>
            </List>
        </>
    );
}

function ccat(a: string, b: string): string {
    return `${a}: ${b}`;
}

const healthInfo: Array<string> = [
    ccat('身高', '<180>'),
    ccat('体重', '<150>'),
    ccat('视力', '<2.0>'),
    ccat('肺结核皮试', '<negative>'),
    ccat('心率', '<60/min>'),
    '...',
];

const PersonDetails: React.FC<PersonDetailsProps> = ({ id }) => {
    const classes = useStyles();

    return (
        <Container maxWidth='lg' className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <Paper className={classes.paper}>
                        <BasicInfo id={id} />
                    </Paper>
                </Grid>
                <Grid item xs={12} >
                    <Paper className={classes.paper}>
                        <TaskProgress id={id} />
                    </Paper>
                </Grid>
                <Grid item xs={12} >
                    <Paper className={classes.paper}>
                        <ListTemplate title='违纪' data={[]} />
                    </Paper>
                </Grid>
                <Grid item xs={12} >
                    <Paper className={classes.paper}>
                        <ListTemplate title='为团体贡献' data={[]} />
                    </Paper>
                </Grid>
                <Grid item xs={12} >
                    <Paper className={classes.paper}>
                        <ListTemplate title='个人学历及工作' data={[]} />
                    </Paper>
                </Grid>
                <Grid item xs={12} >
                    <Paper className={classes.paper}>
                        <ListTemplate data={healthInfo} title='健康' />
                    </Paper>
                </Grid>
            </Grid>
            <Box pt={4}>
                <Typography variant="body2" color="textSecondary" align="center">
                    版权信息
                </Typography>
            </Box>
        </Container>
    );
}


export default PersonDetails;