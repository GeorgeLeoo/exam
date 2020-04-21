import Cookies from 'js-cookie'

// App
const sidebarStatusKey = 'sidebar_status'
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus) => Cookies.set(sidebarStatusKey, sidebarStatus)

const languageKey = 'language'
export const getLanguage = () => Cookies.get(languageKey)
export const setLanguage = (language) => Cookies.set(languageKey, language)

const sizeKey = 'size'
export const getSize = () => Cookies.get(sizeKey)
export const setSize = (size) => Cookies.set(sizeKey, size)

// User
const tokenKey = 'exam_token'
const uidKey = 'exam_uid'
export const getToken = () => Cookies.get(tokenKey)
export const setToken = (token) => Cookies.set(tokenKey, token)
export const getUid = () => Cookies.get(uidKey)
export const setUid = (uid) => Cookies.set(uidKey, uid)
export const removeToken = () => Cookies.remove(tokenKey)
export const removeUid = () => Cookies.remove(uidKey)
