import axios from 'axios';
import { showAlert } from './alert';

// export const userData = async (name, email) => {
//   try {
//     const res = await axios({
//       method: 'PATCH',
//       url: 'http://127.0.0.1:3000/api/v1/users/updateMe',
//       data: {
//         name,
//         email,
//       },
//     });

//     if (res.data.status === 'success') {
//       showAlert('success', 'User Data Updated!!!');
//     }
//   } catch (err) {
//     showAlert('error', err.response.data.message);
//   }
// };

// Merging data update and password update settings
export const userSetting = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:3000/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} scuccessfully updated!!!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
