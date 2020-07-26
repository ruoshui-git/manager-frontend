// Act as a switch for PeopleTable and PersonDetail

import React from 'react';
import { useParams } from 'react-router-dom';
import PersonDetails from './PersonDetails';
import PeopleTable from './PeopleTable';

const People: React.FC = () => {
    let { id } = useParams();
    if (id) {
        id = parseInt(id);
        return <PersonDetails id={id} />;
    } else {
        return <PeopleTable />;
    }

}

export default People;