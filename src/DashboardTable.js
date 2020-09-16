import React from 'react';
import './App.css';


import {Badge, Table,} from "reactstrap";

function DashboardTable(props) {
    let claimsAssigned = selectClaimsBasedOnAssignee(props.claimsData, props.assigneeSelected);
    return (
        <div>
            <h6>Claims Dashboard</h6>
            <Table striped>
                <thead>
                <tr>
                    <th>Claim ID</th>
                    <th>Assignee</th>
                    <th>Claimant</th>
                    <th>Created</th>
                    <th>Last updated</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {
                    claimsAssigned?.map(claim =>
                        <tr>
                            <th scope="row">{claim.id}</th>
                            <td>{claim.assignedTo}</td>
                            <td>{claim.claimant}</td>
                            <td>{parseDate(claim.createdAt)}</td>
                            <td>{parseDate(claim.updatedAt)}</td>
                            <td>{claimsBadge(claim.status)}</td>
                        </tr>)
                }
                </tbody>
            </Table>
        </div>
    );
}

function selectClaimsBasedOnAssignee(claimsData, assigneeSelected) {
    let assigneeClaims = [];
    if(assigneeSelected.assignee === 'All'){
        assigneeClaims = claimsData.claims;
    } else {
        claimsData.claims.forEach(
            claim => {
                if (claim.assignedTo === assigneeSelected.assignee) {
                    assigneeClaims.push(claim);
                }
            }
        )
    }

    function getSlaBasedOnStatus(claim) {
        let slaExceeded = 0;
        switch (claim.status) {
            case 'received' : {
                slaExceeded = diffHours(new Date(claim.updatedAt), new Date()) - 48;
                break
            }
            case 'awaiting_action' : {
                slaExceeded = diffHours(new Date(claim.updatedAt), new Date()) - 72;
                break
            }
            case 'rejected' : {
                break
            }
        }
        return slaExceeded;
    }

    function compareClaims(claimA, claimB) {
        let ClaimASla = getSlaBasedOnStatus(claimA);
        let ClaimBSla = getSlaBasedOnStatus(claimB);
        if ( ClaimASla < ClaimBSla ){
            return 1;
        }
        if ( ClaimASla > ClaimBSla ){
            return -1;
        }
        return 0;
    }

    return (assigneeClaims.length > 0 ? assigneeClaims : claimsData.claims).sort(compareClaims);
}

function claimsBadge(status) {
    let badgeColor = "green"
    let claimStatus = "New"
    switch (status) {
        case 'received' : {
            badgeColor = "primary"
            claimStatus = "Received"
            break
        }
        case 'awaiting_action' : {
            badgeColor = "warning"
            claimStatus = "Awaiting"
            break
        }
        case 'rejected' : {
            badgeColor = "danger"
            claimStatus = "Rejected"
            break
        }
    }
    return (
        <Badge color={badgeColor}>{claimStatus}</Badge>
    );


}

function parseDate(formattedDate) {
    let dateProvided = new Date(formattedDate);
    return dateProvided.toDateString();
}

function diffHours(dt1, dt2)
{

    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));

}


export default DashboardTable;
