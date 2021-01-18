import React, { Component } from "react";
import "../../App.css";
import { db } from "../../firebase/firebaseConfig";
import UserContext from "../../dependencies/Context";

export default class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: true,
      checkbox: {
        origin: true,
        repeat: true,
      },
      validation: {
        username: false,
        email: false,
        password: false,
        password_repeat: false,
        name_first: false,
        name_last: false,
      },
      input: {
        username: "",
        email: "",
        password: "",
        password_repeat: "",
        name_first: "",
        name_last: "",
      },
    };
  }

  checkboxToggler = (e) => {
    this.setState({
      checkbox: {
        ...this.state.checkbox,
        [e.target.id]: e.target.checked,
      },
    });
  };

  loginSeq = () => {
    const { username, password } = this.state.input;

    db.collection("users")
      .where("username", "==", username)
      .get()
      .then((doc) => {
        if (doc.size) {
          const user = doc.docs[0];
          if (user.data().password === password) {
            // sessionStorage.setItem("username", user.data().username);
            // sessionStorage.setItem("userKey", user.id);
            this.props.updateUser({
              // setting the context to include the current user
              username: user.data().username,
              userKey: user.id,
              name: user.data().name_full,
            });
          } else {
            alert("password incorrect!");
            return;
          }
        } else {
          alert("username does not exist!");
          return;
        }
      });
  };

  registerSeq = () => {
    const {
      username,
      email,
      password,
      password_repeat,
      name_first,
      name_last,
    } = this.state.input;

    if (username.length < 6) {
      // username validation
      this.setState({
        validation: {
          ...this.state.validation,
          username: true,
        },
      });
      return;
    } else {
      this.setState({
        validation: {
          ...this.state.validation,
          username: false,
        },
      });
    }
    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
      // email validation
      this.setState({
        validation: {
          ...this.state.validation,
          email: true,
        },
      });
      return;
    } else {
      this.setState({
        validation: {
          ...this.state.validation,
          email: false,
        },
      });
    }
    if (
      // password validation
      password.length < 6 ||
      !password.match(/[A-Z]/g) ||
      !password.match(/[a-z]/g) ||
      !password.match(/[0-9]/g)
    ) {
      this.setState({
        validation: {
          ...this.state.validation,
          password: true,
        },
      });
      return;
    } else {
      this.setState({
        validation: {
          ...this.state.validation,
          password: false,
        },
      });
    }
    if (!(password === password_repeat)) {
      // password repeat validation
      this.setState({
        validation: {
          ...this.state.validation,
          password_repeat: true,
        },
      });
      return;
    } else {
      this.setState({
        validation: {
          ...this.state.validation,
          password_repeat: false,
        },
      });
    }
    if (name_first.match(/[0-9a-zA-Z]/g)) {
      // first name validtion to be in hebrew
      this.setState({
        validation: {
          ...this.state.validation,
          name_first: true,
        },
      });
      return;
    } else {
      console.log("test");
      this.setState({
        validation: {
          ...this.state.validation,
          name_first: false,
        },
      });
    }
    if (name_last.match(/[0-9a-zA-Z]/g)) {
      // last name validation to be in hebrew
      this.setState({
        validation: {
          ...this.state.validation,
          name_last: true,
        },
      });
      return;
    } else {
      this.setState({
        validation: {
          ...this.state.validation,
          name_last: false,
        },
      });
    }
    db.collection("users").add({
      username,
      email,
      password,
      password_repeat,
      name_first,
      name_last,
      name_full: `${name_first} ${name_last}`,
    });
  };

  onInput = (e) => {
    this.setState({
      input: {
        ...this.state.input,
        [e.target.id]: e.target.value,
      },
    });
  };

  buttonToggler = () => {
    this.setState({
      isLogin: !this.state.isLogin,
    });
  };

  render() {
    console.log(this.context);

    return (
      <div className="container text-right mt-4">
        <div className="row">
          <div className="col-12 order-md-2 col-md-4">
            <div
              className={
                this.state.isLogin
                  ? "btn btn-lg btn-success d-block mt-4"
                  : "btn btn-lg btn-outline-success d-block mt-4"
              }
              onClick={this.buttonToggler}
            >
              התחברות
            </div>
            <div
              className={
                this.state.isLogin
                  ? "btn btn-lg btn-outline-success d-block mt-4"
                  : "btn btn-lg btn-success d-block mt-4"
              }
              onClick={this.buttonToggler}
            >
              הרשמה
            </div>
          </div>

          <div className="col-12 col-md-8 text-center">
            <div className="display-4 text-right">הכנס פרטים:</div>

            <div className="input-group mt-2" dir="ltr">
              <input
                type="text"
                className={`form-control ${
                  this.state.validation.username ? "bad-input" : null
                }`}
                id="username"
                value={this.state.input.username}
                onChange={(e) => {
                  this.onInput(e);
                }}
              />
              <div className="input-group-append">
                <span className="input-group-text">שם משתמש</span>
              </div>
            </div>

            <div className="input-group mt-2" dir="ltr">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <input
                    type="checkbox"
                    id="origin"
                    checked={this.state.checkbox.origin}
                    onChange={this.checkboxToggler}
                  />
                </div>
              </div>
              <input
                type={this.state.checkbox.origin ? "password" : "text"}
                className={`form-control ${
                  this.state.validation.password ? "bad-input" : null
                }`}
                id="password"
                value={this.state.input.password}
                onChange={(e) => {
                  this.onInput(e);
                }}
              />
              <div className="input-group-append">
                <span className="input-group-text">סיסמא</span>
              </div>
            </div>
            <small className="form-text text-muted text-right" dir="rtl">
              חייב להיות באנגלית ולהכיל אות גדולה, אות קטנה, ומספר.
            </small>

            {this.state.isLogin ? null : (
              <>
                <div className="input-group mt-2" dir="ltr">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <input
                        type="checkbox"
                        id="repeat"
                        checked={this.state.checkbox.repeat}
                        onChange={this.checkboxToggler}
                      />
                    </div>
                  </div>
                  <input
                    type={this.state.checkbox.repeat ? "password" : "text"}
                    className={`form-control ${
                      this.state.validation.password_repeat ? "bad-input" : null
                    }`}
                    id="password_repeat"
                    value={this.state.input.password_repeat}
                    onChange={(e) => {
                      this.onInput(e);
                    }}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">סיסמא בשנית</span>
                  </div>
                </div>

                <div className="input-group mt-2" dir="ltr">
                  <input
                    type="text"
                    className={`form-control ${
                      this.state.validation.email ? "bad-input" : null
                    }`}
                    id="email"
                    value={this.state.input.email}
                    onChange={(e) => {
                      this.onInput(e);
                    }}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">כתובת מייל</span>
                  </div>
                </div>

                <div className="input-group mt-2" dir="ltr">
                  <input
                    type="text"
                    className={`form-control ${
                      this.state.validation.name_first ? "bad-input" : null
                    }`}
                    id="name_first"
                    value={this.state.input.name_first}
                    onChange={(e) => {
                      this.onInput(e);
                    }}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">שם פרטי</span>
                  </div>
                </div>

                <div className="input-group mt-2" dir="ltr">
                  <input
                    type="text"
                    className={`form-control ${
                      this.state.validation.name_last ? "bad-input" : null
                    }`}
                    id="name_last"
                    value={this.state.input.name_last}
                    onChange={(e) => {
                      this.onInput(e);
                    }}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">שם משפחה</span>
                  </div>
                </div>
              </>
            )}

            <div
              className="btn btn-dark mt-2"
              onClick={this.state.isLogin ? this.loginSeq : this.registerSeq}
            >
              סיימתי
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.contextType = UserContext;
