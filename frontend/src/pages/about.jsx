import withAuth from "../hoc/withAuth"

const AboutMain = ()=>{
    return <div className="bg-gray-900 min-h-screen flex items-center justify-center w-3/4 mx-auto">
    <h3 className="text-white">Welcome to about page</h3>
</div>
    
}

const About = () => {
    return <AboutMain/>
}
export default withAuth(About);