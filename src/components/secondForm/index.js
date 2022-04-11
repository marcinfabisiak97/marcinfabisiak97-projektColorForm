import React from 'react'
class Secondform extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {},
        };
    }
    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if (!fields["color"]) {
            formIsValid = false;
            errors["color"] = "Cannot be empty";
        }
        if (typeof fields["color"] !== "undefined") {
            if (!fields["color"].match(/^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$|^(rgb)?\(?([01]?\d\d?|2[0-4]\d|25[0-5])(\W+)([01]?\d\d?|2[0-4]\d|25[0-5])\W+(([01]?\d\d?|2[0-4]\d|25[0-5])\)?)$/)) {
                formIsValid = false;
                errors["color"] = "Only RGB format example: 125,125,125 or HEX format exampe #001dab";
            }
        }
        this.setState({ errors: errors });
        return formIsValid;
    }
    contactSubmit(e) {
        e.preventDefault();
        if (this.handleValidation()) {
            alert("Form submitted");
            localStorage.setItem(this.state.fields.color, this.state.fields.color);
        } else {
            alert("Form has errors.");
        }
    }
    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }
    render() {
        return (
            <div>
                <form
                    name="colorform"
                    className="colorForm"
                    onSubmit={this.contactSubmit.bind(this)}
                >
                    <input
                        className='colorForm__txtInp'
                        type="text"
                        size="30"
                        placeholder="color"
                        onChange={this.handleChange.bind(this, "color")}
                        value={this.state.fields["color"]}
                    />
                    <span className='colorForm__txtInfo'>{this.state.errors["color"]}</span>
                    <br />
                    <input
                        className='colorForm__submitBtn'
                        type="submit"
                        size="30"
                        placeholder="submit"
                        onChange={this.handleChange.bind(this, "submit")}
                        value={this.state.fields["submit"]}
                    />
                    <br />
                </form>
            </div>
        );
    }
}


export default Secondform;