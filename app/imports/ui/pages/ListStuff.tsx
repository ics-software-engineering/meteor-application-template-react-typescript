import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import * as React from 'react';
import { Container, Header, Loader, Table } from 'semantic-ui-react';
import { Stuffs } from '../../api/stuff/stuff';
import StuffItem from '../components/StuffItem';

interface IListStuffProps {
  ready: boolean;
  stuffs: any; // CAM: Don't like the any should be an array of stuff.
}

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListStuff extends React.Component<IListStuffProps, object> {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  public render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  public renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">List Stuff</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Condition</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.stuffs.map((stuff) => <StuffItem key={stuff._id} stuff={stuff} />)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    ready: subscription.ready(),
    stuffs: Stuffs.find({}).fetch(),
  };
})(ListStuff);
