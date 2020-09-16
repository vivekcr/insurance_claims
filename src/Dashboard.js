import React from 'react';
import './App.css';

import DashboardTable from "./DashboardTable";
import AssigneePanelBar from "./AssigneePanelBar";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.handleAssigneeSelect = this.handleAssigneeSelect.bind(this);
        this.state = {
            claimsData: {
                "slas": [{
                    "status": "received",
                    "hours": 48
                },
                    {
                        "status": "awaiting_action",
                        "hours": 72
                    }
                ],
                "claims": [{
                    "id": 1,
                    "claimant": "Skylar Dean",
                    "assignedTo": "John Smith",
                    "status": "received",
                    "createdAt": "2020-08-09T00:00:00.000Z",
                    "updatedAt": "2020-08-09T00:00:00.000Z"
                },
                    {
                        "id": 2,
                        "claimant": "Amber Green",
                        "assignedTo": "John Smith",
                        "status": "awaiting_action",
                        "createdAt": "2020-08-12T00:00:00.000Z",
                        "updatedAt": "2020-08-13T00:00:00.000Z"
                    },
                    {
                        "id": 3,
                        "claimant": "Ross James",
                        "assignedTo": "John Smith",
                        "status": "received",
                        "createdAt": "2020-08-05T00:00:00.000Z",
                        "updatedAt": "2020-08-05T00:00:00.000Z"
                    },
                    {
                        "id": 4,
                        "claimant": "Kim Jones",
                        "assignedTo": "John Smith",
                        "status": "awaiting_action",
                        "createdAt": "2020-08-15T00:00:00.000Z",
                        "updatedAt": "2020-08-15T00:00:00.000Z"
                    },
                    {
                        "id": 5,
                        "claimant": "Henry Wong",
                        "assignedTo": "Michael Pool",
                        "status": "received",
                        "createdAt": "2020-08-18T00:00:00.000Z",
                        "updatedAt": "2020-08-18T00:00:00.000Z"
                    },
                    {
                        "id": 6,
                        "claimant": "James Lee",
                        "assignedTo": "Michael Pool",
                        "status": "awaiting_action",
                        "createdAt": "2020-08-10T00:00:00.000Z",
                        "updatedAt": "2020-08-13T00:00:00.000Z"
                    },
                    {
                        "id": 7,
                        "claimant": "Skylar Dean",
                        "assignedTo": "John Smith",
                        "status": "received",
                        "createdAt": "2020-08-01T00:00:00.000Z",
                        "updatedAt": "2020-08-03T00:00:00.000Z"
                    },
                    {
                        "id": 8,
                        "claimant": "Amber Green",
                        "assignedTo": "Michael Pool",
                        "status": "rejected",
                        "createdAt": "2020-08-02T00:00:00.000Z",
                        "updatedAt": "2020-08-02T00:00:00.000Z"
                    },
                    {
                        "id": 9,
                        "claimant": "Amber Green",
                        "assignedTo": "John Pool",
                        "status": "rejected",
                        "createdAt": "2020-08-02T00:00:00.000Z",
                        "updatedAt": "2020-08-02T00:00:00.000Z"
                    },
                    {
                        "id": 10,
                        "claimant": "Skylar Dean",
                        "assignedTo": "Paul Smith",
                        "status": "received",
                        "createdAt": "2020-08-01T00:00:00.000Z",
                        "updatedAt": "2020-08-03T00:00:00.000Z"
                    },
                ]
            },
            assigneeSelected: 'All'
        };
    }

    handleAssigneeSelect(assignee) {
        console.log(assignee);
        this.setState({assigneeSelected: assignee});
    }

    render() {
        const assignee = this.state.assigneeSelected;
        const claims = this.state.claimsData;
        return (
            <div className="panels">
                <div className="panel-assignee">
                    <AssigneePanelBar onClick={this.handleAssigneeSelect} claimsData={claims}/>
                </div>
                <div className="panel-table">
                    <DashboardTable claimsData={claims} assigneeSelected={{assignee}}/>
                </div>
            </div>
        );
    }
}

export default Dashboard;
