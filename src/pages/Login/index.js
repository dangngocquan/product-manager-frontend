import LoginComponent from "../../components/LoginComponent";

function Login({token, setToken}) {
    console.log("Render Page Login");
    return (
        <LoginComponent
            token={token}
            setToken={setToken}
        ></LoginComponent>
    );
}

export default Login;