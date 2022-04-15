import React, { ChangeEvent } from "react";

type SecondformProps = {
  title: string;
  handleChange: (e: any) => void;
};

class Secondform extends React.Component<SecondformProps, {}> {
  handleChange = (e: ChangeEvent<HTMLInputElement | HTMLFormElement>) => {
    this.props.handleChange(e);
  };
  render() {
    return (
      <input
        type="text"
        name="text"
        onChange={this.handleChange}
        value={this.props.title}
      />
    );
  }
}

export default Secondform;
