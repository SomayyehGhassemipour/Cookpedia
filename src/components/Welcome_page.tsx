import {Button} from './utilities/Button'
import { Card } from './utilities/card/Card'
import { CardHeader } from './utilities/card/CardHeader'
import { CardBody } from './utilities/card/CardBody'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHand } from '@fortawesome/free-solid-svg-icons'

export default function Welcome_page() {
  return (
    <div className='container'>
      <Card>
        <CardHeader>
        <h1 className='text-neutral-800'>Welcome to <br/>
          <h3 className='text-primary-500'>Cookpedia</h3>
        </h1>
        </CardHeader>
        <CardBody>
          <p>The best cooking and food recipies app of the century</p>
        </CardBody>
        <div className='flex-small-gap'>
          <Button title={'Continue With Google'} type={'google'}/><br/>
          <Button title={'Get Started'} type={'primary'}/><br/>
          <Button title={'I Already Have an Account'} type={'secondary'}/>
        </div>
        
      </Card>
    </div>
  )
}
