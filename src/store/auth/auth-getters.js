import Vue from "vue"
import { getAuth } from "firebase/auth"

const router = Vue.prototype.$authGuardRouter

export default {
  getError(state) {
    return state.error
  },
  getSessionPersistence(state) {
    return state.is_session_persistant
  },
  getCurrentUser(state) {
    const user = getAuth(Vue.prototype.$authGuardFirebaseApp).currentUser

    if (!user) return null

    const { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } = user

    return { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL }
  },
  getUid(state, getters) {
    const user = getters.getCurrentUser
    return user ? user.uid : null
  },
  getDisplayName(state, getters) {
    const user = getters.getCurrentUser
    return user ? user.displayName : null
  },
  getEmail(state, getters) {
    const user = getters.getCurrentUser
    return user ? user.email : null
  },
  getPhotoURL(state, getters) {
    const user = getters.getCurrentUser
    return user ? user.photoURL : null
  },
  getPhoneNumber(state, getters) {
    const user = getters.getCurrentUser
    return user ? user.phoneNumber : null
  },
  getMetadata(state, getters) {
    const user = getAuth(Vue.prototype.$authGuardFirebaseApp).currentUser
    return user ? user.metadata : null
  },
  isLoading(state) {
    return state.is_loading
  },
  isAuthenticated(state, getters) {
    const user = getters.getCurrentUser
    return user ? true : false
  },
  isAnonymous(state, getters) {
    const user = getters.getCurrentUser
    return user ? user.isAnonymous : null
  },
  isVerified(state, getters) {
    const user = getters.getCurrentUser
    return user ? user.emailVerified : null
  },
  isAuthGuardDialogShown(state) {
    return state.is_authguard_dialog_shown
  },
  isAuthGuardDialogPersistent(state) {
    return state.is_authguard_dialog_persistent
  },
  isUserRegistrationAllowed(state) {
    return state.config.registration
  },
  isEmailVerificationRequired(state) {
    return state.config.verification
  },
  isEmailVerificationScrenShown(state) {
    return state.is_email_verification_screen_shown
  },
  isEmailVerificationLinkSent(state) {
    return state.is_email_verification_link_sent
  },
  isEmailResetPasswordLinkSent(state) {
    return state.is_email_reset_password_link_sent
  },
  isResetPasswordScreenShown(state) {
    return state.is_reset_password_screen_shown
  },
  isLoginWithPhoneShown(state) {
    return state.is_login_with_phone_shown
  },
  // check if the current route is public to set negative persisten dialog
  isCurrentRoutePublic(state) {
    const { debug } = state.config

    if (!router) return false

    const route = router.currentRoute

    let isPublicRoute = route.matched[0] && typeof route.matched[0].beforeEnter === "undefined" ? true : false

    if (route.matched[0] && route.matched[0].path !== window.location.pathname) isPublicRoute = false

    if (debug) console.log("[ auth guard ]: isCurrentRoutePublic: [", isPublicRoute, "]")

    return isPublicRoute
  },
}
