import React from 'react'
import {Nav, NavItem, NavLink} from "reactstrap"
import NewRecord from "./new-record/NewRecord"


export default ({router, active}) => {
    const onKCPELink = (e) => {
        e.preventDefault()
        router.history.push("/knec/kcpe")
    }
    const onKCSELink = (e) => {
        e.preventDefault()
            router.history.push("/knec/kcse")
    }

    return <Nav pills vertical  className="bd-links" id="bd-docs-nav">

        <NavItem>
            <NavLink href="" onClick={onKCPELink} active={active === 'kcpe'}>KCPE</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="" onClick={onKCSELink} active={active === 'kcse'}>KCSE </NavLink>
        </NavItem>

    </Nav>


}
