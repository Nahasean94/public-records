import React from 'react'
import {Nav, NavItem, NavLink} from "reactstrap"


export default ({router, active}) => {
    const onNtsaLink = (e) => {
        e.preventDefault()
        router.history.push("/dashboard/ntsa")
    }
    const onEcitizen = (e) => {
        e.preventDefault()
        router.history.push("/dashboard/ecitizen")
    }
    const onTertiary= (e) => {
        e.preventDefault()
        router.history.push("/dashboard/tertiary")

    }
    const onKnec = (e) => {
        e.preventDefault()
        router.history.push("/dashboard/knec")


        return <Nav pills vertical className="bd-links" id="bd-docs-nav">
            <NavItem>
                <NavLink href="" onClick={onKnec} active={active === 'knec'}>KNEC</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="" onClick={onNtsaLink} active={active === 'ntsa'}>NTSA</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="" onClick={onEcitizen} active={active === 'ecitizen'}>eCitizen</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="" onClick={onTertiary} active={active === 'tertiary'}>Tertiary Institution</NavLink>
            </NavItem>
        </Nav>

    }
}
