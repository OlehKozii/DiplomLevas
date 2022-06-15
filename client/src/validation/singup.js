import * as yup from "yup"

export default yup().object().shape({
    name: yup().string().required("Enter name"),
    email: yup().string().email().required("Email is invalid").max(20),
    password: yup().string().required("Password have to be from 6 to 16 characters").min(6).max(16),
})