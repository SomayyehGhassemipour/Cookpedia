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
          <Button title={'Continue With Google'} type={'google'} clickHandler={()=>navigate("/")}/><br/>
          <Button title={'Get Started'} type={'primary'} clickHandler={()=>navigate("/signup")}/><br/>
          <Button title={'I Already Have an Account'} type={'secondary'} clickHandler={()=>navigate("/")}/>
        </div>
        
      </Card>
    </div>
  )
}
