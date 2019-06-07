const triggers = require('../triggers');
const { query, mutation } = require('../db/hasura');
const { UserBriefQuery } = require('../../graphql/Queries/User');

const { pubsub } = require('../pubsub');

const addUserHandler = (data, response) => {
  const { user_id } = data.event.data.new;
  query({
    query: UserBriefQuery,
    variables: {
      id: user_id,
    },
  }).then(result => {
    const newData = { ...data };
    newData.event.data.new.sui_hei_user = result.data.sui_hei_user_by_pk;
    pubsub.publish(data.trigger.name, newData);
  });
};

const controller = (request, response) => {
  const data = request.body;
  try {
    switch (data.trigger.name) {
      case triggers.ON_CHATMESSAGE_CHANGE:
      case triggers.ON_DIALOGUE_CHANGE:
      case triggers.ON_DIRECTMESSAGE_CHANGE:
      case triggers.ON_PUZZLE_CHANGE:
        addUserHandler(data, response);
        break;
    }
    response.status(200).json({ status: 'successful' });
  } catch (e) {
    console.log(`Error in subscriptionController: ${JSON.stringify(e)}`);
    response.status(500).json({ error: e });
  }
};

module.exports = controller;
