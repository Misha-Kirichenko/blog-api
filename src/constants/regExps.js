module.exports = {
  PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
  ALPHA_AND_SPACE: /^[a-zA-Z\s]+$/,
  NICKNAME: /^[a-zA-Z0-9_-]+$/
}