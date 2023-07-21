const logoutUser = async (res) => {
  await res.cookie('jwt', '', {
    expiresIn: new Date(0),
    httpOnly: true
  }
  )
  const status = 200
  const msg = 'User logged out'
  return { status, msg }
}

module.exports = logoutUser