import React from "react";

export default class Test2 extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={(value) => alert(this.fullname.value)}>
          <input ref={(input) => (this.fullname = input)} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
