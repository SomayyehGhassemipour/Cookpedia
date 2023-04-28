import {Button} from '../utilities/Button'
import { Card } from '../utilities/card/Card'
import { Header } from '../utilities/Header'
import { CardBody } from '../utilities/card/CardBody'
import { useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, googleAuthProvider } from '../../redux/firebase'

export default function WelcomePage() {
  let navigate = useNavigate();

  const clickHandlerGoogle = async () => {
    // try{
    //   await signInWithPopup(auth, googleAuthProvider);
    // }catch(error){
    //   console.error(error);
    // }
    await signInWithPopup(auth, googleAuthProvider)
    .then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;

      const user = result.user;
      navigate("/profile");
      console.log(user);
    }).catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage);
      // const email = error.customData.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
    })
  }
  return (
    <div className='container'>
      <Card classname={"flex-justify-space-around"}>
        <Header align='center'>
        <h1 className='text-neutral-800'>Welcome to <br/>
          <h3 className='text-primary-500'>Cookpedia</h3>
        </h1>
        </Header>
        <CardBody align='center'>
          <p>The best cooking and food recipies app of the century</p>
        </CardBody>
        <div className='flex-small-gap'>
          <Button data_type={'google'} clickHandler={clickHandlerGoogle}>
            <p>Continue With Google</p>
          </Button><br/>
          <Button data_type={'primary'} clickHandler={()=>navigate("/signup-country")}>
          <p>Get Started</p>
          </Button>
          <br/>
          <Button data_type={'secondary'} clickHandler={()=>navigate("/signin")}>
          <p>I Already Have an Account</p>
          </Button>
        </div>
        
      </Card>
    </div>
  )
}
