// ./src/schema/resolverConstructor/_checkPermissions.js
const permit = {
  queryLogin({ permissions }) {
    return !!permissions && permissions.includes('read:userIDs');
  },
  updateProfile({atXavierAccount, permissions}, updateAccount) {
    try {
      if ((updateAccount === atXavierAccount)
      && permissions.includes('write:userProfile')
      || permissions.includes('write:anyUserProfile')) {
        return true;
      }
    } catch {
      return false;
    }
  },
};

export default permit;
