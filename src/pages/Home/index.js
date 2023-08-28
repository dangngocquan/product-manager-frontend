import HomeComponent from "../../components/HomeComponent";

function Home({token, setToken}) {
    console.log("Render Page Home");
    return (
        <HomeComponent
            token={token}
            setToken={setToken}
        >

        </HomeComponent>
    );
}

export default Home;