import React from 'react'
import {Nav, NavItem, NavLink} from "reactstrap"


export default ({router, active}) => {
    const onAddRecordLink = (e) => {
        e.preventDefault()
        router.history.push("/institution/add-record")
    }
    const onLogbookLink = (e) => {
        e.preventDefault()
        router.history.push("/institution/students")
    }
    return <Nav pills vertical  className="bd-links" id="bd-docs-nav">
        <NavItem>
            <NavLink href="" onClick={onAddRecordLink} active={active === 'add-record'}>Add Record</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="" onClick={onLogbookLink} active={active === 'students'}>Students</NavLink>
        </NavItem>

    </Nav>


}
