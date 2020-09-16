import React from 'react';
import './App.css';
import {ListGroup, ListGroupItem} from "reactstrap";


function AssigneePanelBar(props) {

    let assignees = new Set(props?.claimsData?.claims.map(claim => claim.assignedTo)).add("All");
    return (
        <div>
            <h6>Assignee Panel</h6>
        <ListGroup>
            {Array.from(assignees).map(assignee =>
                <ListGroupItem tag="button" action onClick={() => props.onClick(assignee)}>{assignee}</ListGroupItem>)}
        </ListGroup>
        </div>
    );
}

export default AssigneePanelBar;
