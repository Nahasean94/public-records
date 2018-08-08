import React, {Component} from 'react'

import NavigationBar from "./components/NavigationBar"

class App extends Component {
    render() {
        return (
            <div>
                <NavigationBar/>
                <div className="container">
                    <div id="body">
                        {this.props.children}
                    </div>
                </div>
            </div>

        )
    }
}

export default App
