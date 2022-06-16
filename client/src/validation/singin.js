import * as yup from "yup"

export default yup.object().shape({
    email: yup.string().email().required("Email is invalid").max(20),
    password: yup.string().required("Password have to be from 6 to 16 characters").min(4).max(16),
})