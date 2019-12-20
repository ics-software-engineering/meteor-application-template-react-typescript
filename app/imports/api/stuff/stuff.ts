import { Mongo } from 'meteor/mongo';
import { Tracker } from 'meteor/tracker';
import SimplSchema from 'simpl-schema';

/** Create a Meteor collection. */
const name: string = 'Stuffs';

const Stuffs = new Mongo.Collection(name);

/** Create a schema to constrain the structure of documents associated with this collection. */
const StuffSchema = new SimplSchema({
  condition: {
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good',
    type: String,
  },
  name: String,
  owner: String,
  quantity: Number,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Stuffs.attachSchema(StuffSchema);

/** Make the collection and schema available to other code. */
export { Stuffs, StuffSchema };
