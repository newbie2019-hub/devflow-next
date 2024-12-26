const ROUTES = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  PROFILE: (id: string) => `/profile/${id}`,
  ASK_QUESTION: '/ask-question',
  TAGS: (id: string) => `/tags/${id}`,
  QUESTION: (id: string) => `/question/${id}`,
};

export default ROUTES;
