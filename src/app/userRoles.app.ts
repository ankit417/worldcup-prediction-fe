export const userType = {
  ADMIN: 'ADMIN',
  USER: 'user',
}

export const userRoles = {
  [userType.ADMIN]: {
    access: [
      '/',
      '/stock/*',
      '/hotel/*',
      '/menu/*',
      '/dashboard/*',
      '/order/*',
      '/tournament/*',
      '/match/*',
      '/team/*',
    ],
  },
  [userType.USER]: {
    access: ['/', '/login'],
  },
}
