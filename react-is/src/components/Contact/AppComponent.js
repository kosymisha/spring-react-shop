import React, { Component } from 'react';

class AppComponent extends Component {
    state = {
        numChildren: 0
    };

    render () {
        const children = [];

        for (var i = 0; i < this.state.numChildren; i += 1) {
            children.push(<div key={i}>{"I am child " + i}</div>);
        };

        return (
            <div className="card calculator">
            <p><a href="#" onClick={this.onAddChild}>Add Another Child Component</a></p>
                <div id="children-pane">
                    {children}
                </div>
            </div>
        );
    }

    onAddChild = () => {
        this.setState({
            numChildren: this.state.numChildren + 1
        });
    }
};

export default AppComponent;