import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import * as React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { AutoForm, TextField, NumField, SelectField, SubmitField, ErrorsField, HiddenField } from 'uniforms-semantic';
import { Stuffs, StuffSchema } from '../../api/stuff/stuff';

/** Renders the Page for adding a document. */
class AddStuff extends React.Component {
  private formRef: any;

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  public insertCallback = (error) => {
    if (error) {
      swal('Error', error.message, 'error');
    } else {
      swal('Success', 'Item added successfully', 'success');
      this.formRef.reset();
    }
  };

  /** On submit, insert the data. */
  public submit = (data) => {
    const { name, quantity, condition } = data;
    const owner = Meteor.user().username;
    // @ts-ignore
    Stuffs.insert({ name, quantity, condition, owner }, this.insertCallback);
  };

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  public render() {
    return (
      <Grid container={true} centered={true}>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Stuff</Header>
          <AutoForm ref={(ref) => {
            this.formRef = ref;
          }} schema={StuffSchema} onSubmit={this.submit}>
            <Segment>
              <TextField name="name"/>
              <NumField name="quantity" decimal={false}/>
              <SelectField name="condition"/>
              <SubmitField value="Submit"/>
              <ErrorsField/>
              <HiddenField name="owner" value="fakeuser@foo.com"/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddStuff;
