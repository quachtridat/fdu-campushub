export function signIn(): void {
  if (localStorage) {
    localStorage.setItem('signedIn', 'true')
  }
}

export function isSignedIn(): boolean {
  return localStorage && localStorage.getItem('signedIn') === 'true'
}
