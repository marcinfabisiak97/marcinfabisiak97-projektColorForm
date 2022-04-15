import React, { ChangeEvent } from "react";
type SecondformProps = {
  title: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
class Secondform extends React.Component<SecondformProps, {}> {
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.handleChange(e);
  };
  render() {
    return (
      <input
        type="text"
        name="text"
        onChange={this.handleChange}
        value={this.props.title}
        className="inputVal"
      />
    );
  }
}

export default Secondform;
