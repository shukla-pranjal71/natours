/*eslint-disable*/
const Stripe = require('stripe');
import { showAlert } from './alert';
import axios from 'axios';

// export const bookTour = async (tourID) => {
//   const stripe = Stripe(
//     'pk_test_51IouR8SJV980NR8RbEnnFOaFCBu598bkOCZFRW68sVJMVAo9u721JtGRquVQSEpopC9Gxacry73j1vBw51rKWbHt00muUWJZNq'
//   );
//   // Get checkout session from API
//   const session = await axios(
//     `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourID}`
//   );
//   console.log(session);
//   // Create checkout form + charge credit card
// };

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51IouR8SJV980NR8RbEnnFOaFCBu598bkOCZFRW68sVJMVAo9u721JtGRquVQSEpopC9Gxacry73j1vBw51rKWbHt00muUWJZNq'
  ); // <==== PUT THE VARIABLE HERE

  try {
    // 1. Get checkout session from the API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
