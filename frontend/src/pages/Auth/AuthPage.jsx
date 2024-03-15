import { Header } from '../../components/header/header'
import { HeroImage } from '../../components/HeroImage/HeroImage'
import loginHeroImage from '../../Images/loginPageCoverImage.svg'
import { LoginForm } from '../../components/loginForm/loginForm.jsx'


export const AuthPage = () => {
    return(
        <div>
            
            <Header/>
            <HeroImage imageSrc={loginHeroImage}/>
            <LoginForm/>
        </div>
    )
}