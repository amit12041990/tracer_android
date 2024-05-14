// api.js
const local = 'http://10.0.2.2:4000'
const live = 'http://13.201.50.123'
const API_BASE_URL = local ; // Base URL for your API

const API_ROUTES = {
  userLogin: '/mobile_login',
  userComment:'/Commentuser',
  userQuery:'/userQuery',
  userInterest:'/userInterest',
  userDashboard:'/appDashboard',
  userList:'/allmembers',

  userInterestChrome:'/chromeInterest',
  userSearch:'/chromeSearch'




  // Other API routes can be added here
};

export const API_URLS = {
  userLogin: `${API_BASE_URL}${API_ROUTES.userLogin}`,
  userComment: `${API_BASE_URL}${API_ROUTES.userComment}`,
  userQuery: `${API_BASE_URL}${API_ROUTES.userQuery}`,
  userInterest: `${API_BASE_URL}${API_ROUTES.userInterest}`,
  userDashboard:`${API_BASE_URL}${API_ROUTES.userDashboard}`,
  userList:`${API_BASE_URL}${API_ROUTES.userList}`,
  userInterestChrome:`${API_BASE_URL}${API_ROUTES.userInterestChrome}`,
  userSearch :`${API_BASE_URL}${API_ROUTES.userSearch}`

  // Add other URLs as needed
};
