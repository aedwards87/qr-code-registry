import qrcode from 'qrcode'

// Remove space and capitilise text
export const capitilise = function capitilise(str) {
  if (str === undefined) { return }
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1);
  }).replace(/\s/g, "");
}

// Remove space and camalise text
export const camalise = function camalise(str) {
  if (str === undefined) { return }
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}


// export const findDuplicateNames = (users) => {
//   const checkFirstName = users.reduce((a, e) => {
//     a[e.firstName] = ++a[e.firstName] || 0;
//     return a;
//   }, {});
//   const checkLastName = users.reduce((a, e) => {
//     a[e.lastName] = ++a[e.lastName] || 0;
//     return a;
//   }, {});  
//   return (users.filter(e => checkFirstName[e.firstName] && checkLastName[e.lastName]))
// }

export const findDuplicateEmails = (users) => {
  const checkEmail = users.reduce((a, e) => {
    a[e.email] = ++a[e.email] || 0;
    return a;
  }, {});
  return (users.filter(e => checkEmail[e.email]))
}


export const fileName = (data) => (
  data?.firstName?.trim() + '-' +
  data?.lastName?.trim() + '-' +
  data?.email?.trim() + '-' +
  'qrcode.png'
)



export const reformedTitle = (title) => ({
  firstWord: title.split(' ').shift(),
  restTitle: title.split(' ').slice(1).join(' ')
})

