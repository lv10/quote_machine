import React from 'react';


class TheButton extends React.Component {
    render = () => {
        return (
            <button style={{marginTop: 30, fontSize: 18}} onClick={this.props.onClick}>
                ⟳
            </button>
        );
    }
}

export default TheButton;
