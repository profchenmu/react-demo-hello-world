import React, { Component, PropTypes } from 'react';
import Input from './input';
export default class IndexLayout extends Component {

    render() {
        return (
            <div className="cao">
            <Input
        enabled
        type={this.props.type}
        onChange={this.props.onChange}
        value={this.props.value}
        min={this.props.min}
        max={this.props.max}
        step={this.props.step}
        defaultKeyboard="us"
        ref='input1'
      />
            index

            <Input
        enabled
        type={this.props.type}
        onChange={this.props.onChange}
        value={this.props.value}
        min={this.props.min}
        max={this.props.max}
        step={this.props.step}
        defaultKeyboard="us"
        ref='input1'
      />
            

            </div>
        )
    }
}
