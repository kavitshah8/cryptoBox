import React from 'react';
import Select from 'react-select';
import css from '../styles/select.css';

var ValuesAsNumbersField = React.createClass({
	displayName: 'ValuesAsNumbersField',
	propTypes: {
		label: React.PropTypes.string
	},
	getInitialState () {
		return {
			matchPos: 'any',
			matchValue: true,
			matchLabel: true,
			multi: false
		};
	},
	onChangeMatchStart(event) {
		this.setState({
			matchPos: event.target.checked ? 'start' : 'any'
		});
	},
	onChangeMatchValue(event) {
		this.setState({
			matchValue: event.target.checked
		});
	},
	onChangeMatchLabel(event) {
		this.setState({
			matchLabel: event.target.checked
		});
	},
	onChange(value) {
		this.setState({ value });
		console.log('Numeric Select value changed to', value);
	},
	onChangeMulti(event) {
		this.setState({
			multi: event.target.checked
		});
	},
	render () {
		var matchProp = 'any';
		if (this.state.matchLabel && !this.state.matchValue) {
			matchProp = 'label';
		}
		if (!this.state.matchLabel && this.state.matchValue) {
			matchProp = 'value';
		}
		return (
			<div>
				<h4 className="section-heading">{this.props.label}</h4>
				<div style={{margin:'15px 15px 15px 0'}}>
					<Select
						placeholder='Salt'
						matchPos={this.state.matchPos}
						matchProp={matchProp}
						onChange={this.props.onSelect}
						options={this.props.options}
						simpleValue
						value={this.props.value}
						required
						/>
					<span className="default"> Defaults to 12</span>
				</div>
		</div>
		);
	}
});

module.exports = ValuesAsNumbersField;
