export const signOut = (): void => {
  if (localStorage) {
    localStorage.setItem('signedIn', 'false')
  }
}

export function isSignedOut(): boolean {
  return localStorage && localStorage.getItem('signedIn') === 'false'
}
