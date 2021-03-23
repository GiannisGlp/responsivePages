import React, { Component } from "react";
import axios from "../../axios";
import { Redirect } from "react-router-dom";

import Button from "../../UI/Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import Input from "../Input/Input";
import styles from "./NewPage.module.css";

class NewPage extends Component {
  state = {
    pageForm: {
      title: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Title of the Page",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      description: {
        elementType: "textarea",
        elementConfig: {
          type: "text",
          placeholder: "Description of the Page",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      type: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: 0, displayValue: "Menu" },
            { value: 1, displayValue: "Event" },
            { value: 2, displayValue: "Content" },
          ],
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      isActive: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: true, displayValue: "Active" },
            { value: false, displayValue: "Not Active" },
          ],
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    },
    publishedOn: new Date(),
    formIsValid: false,
    loadind: true,
  };

  pageDataHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.pageForm) {
      formData[formElementIdentifier] = this.state.pageForm[
        formElementIdentifier
      ].value;
      const data = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        isActive: formData.isActive,
        publishedOn: this.state.publishedOn,
      };
      axios.post("/ResponsivePages/", data).then((response) => {});
    }
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedPageForm = {
      ...this.state.pageForm,
    };
    const updatedFormElement = {
      ...updatedPageForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedPageForm[inputIdentifier] = updatedFormElement;
    console.log(updatedFormElement);

    let formIsValid = true;
    for (let inputIdentifier in updatedPageForm) {
      formIsValid = updatedPageForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ pageForm: updatedPageForm, formIsValid: formIsValid });
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = (value.trim() !== "") & isValid;
    }
    return isValid;
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.pageForm) {
      formElementsArray.push({
        id: key,
        config: this.state.pageForm[key],
      });
    }
    let form = (
      <form onSubmit={this.pageDataHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType={styles.Success} disabled={!this.state.formIsValid}>
          ADD NEW PAGE
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={styles.NewPage}>
        <h4>Enter New Page Data</h4>
        {form}
      </div>
    );
  }
}

export default NewPage;
