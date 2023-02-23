import {Button} from '../utilities/Button'
import { Card } from '../utilities/card/Card'
import { Header } from '../utilities/Header'
import { CardBody } from '../utilities/card/CardBody'
import { useNavigate } from 'react-router-dom'

export default function WelcomePage() {
  let navigate = useNavigate();
  return (
    <div className='container'>
      <Card classname={"flex-justify-space-around"}>
        <Header>
        <h1 className='text-neutral-800'>Welcome to <br/>
          <h3 className='text-primary-500'>Cookpedia</h3>
        </h1>
        </Header>
        <CardBody>
          <p>The best cooking and food recipies app of the century</p>
        </CardBody>
        <div className='flex-small-gap'>
          <Button type={'google'} clickHandler={()=>navigate("/")}>
            <p>Continue With Google</p>
          </Button><br/>
          <Button type={'primary'} clickHandler={()=>navigate("/signup-country")}>
          <p>Get Started</p>
          </Button>
          <br/>
          <Button type={'secondary'} clickHandler={()=>navigate("/")}>
          <p>I Already Have an Account</p>
          </Button>
        </div>
        
      </Card>
    </div>
  )
}
