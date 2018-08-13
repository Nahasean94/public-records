import React from 'react'
import {Nav, NavItem, NavLink} from "reactstrap"


export default ({router, active}) => {
    const onAddRecordLink = (e) => {
        e.preventDefault()
        router.history.push("/ecitizen/add-record")
    }
    const onDrivingLicensesLink = (e) => {
        e.preventDefault()
        router.history.push("/ecitizen/driving-licenses")
    }
    const onTitleDeedsLink = (e) => {
        e.preventDefault()
        router.history.push("/ecitizen/title-deeds")
    }

    return <Nav pills vertical  className="bd-links" id="bd-docs-nav">
        <NavItem>
            <NavLink href="" onClick={onAddRecordLink} active={active === 'add-record'}>Add Record</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="" onClick={onDrivingLicensesLink} active={active === 'driving-licenses'}>Driving Licenses</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="" onClick={onTitleDeedsLink} active={active === 'title-deeds'}>Title deeds</NavLink>
        </NavItem>

    </Nav>


}
