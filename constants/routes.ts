const ROUTES = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  COMMUNITY: '/community',
  COLLECTION: '/collection',
  PROFILE: (id: string) => `/profile/${id}`,
  ASK_QUESTION: '/ask-question',
  TAGS: '/tags',
  JOBS: '/jobs',
  TAG: (id: string) => `/tags/${id}`,
  QUESTION: (id: string) => `/questions/${id}`,
};

export default ROUTES;
