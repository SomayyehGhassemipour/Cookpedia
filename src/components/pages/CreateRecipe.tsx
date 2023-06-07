import { Form, useNavigate } from "react-router-dom"
import { Button } from "../utilities/Button"
import { Card } from "../utilities/card/Card"
import { CardAction } from "../utilities/card/CardAction"
import { CardBody } from "../utilities/card/CardBody"
import { FieldSet } from "../utilities/form/FieldSet"
import { Header } from "../utilities/Header"
import { Icon } from "../utilities/Icon"
import { InputField } from "../utilities/InputField"
import { LineSeperator } from "../utilities/LineSeperator"

export const CreateRecipe = () => {
  const navigate = useNavigate();             
  return (
    <div className="container">
      <Card classname="flex-justify-start">
        <Header>
          <div className="flex-row-justify-start">
          <Button data_type={'container'} data_bg={'transparent'} clickHandler={() => navigate("/profile")}>
            <Icon name="close" size='lg'/>
          </Button>
          <h2>Create Recipe</h2>
            
          </div> 
        </Header>
        <CardBody>
        {/* <Form id="myForm"> */}
        <h4>Title</h4>
        <InputField type="text" data_type="input" placeholder={"Recipe Title"} />
        <h4>Description</h4>
        <InputField type="text" data_type="textarea" placeholder={"Description"} />
        <h4>Cook Time</h4>
        <InputField type="text" data_type="input" placeholder={"1 hour, 30 mins, etc"} />
        <h4>Serves</h4>
        <InputField type="text" data_type="input" placeholder={"3 people"} />
        <h4>Origin</h4>
        <InputField type="text" data_type="input" placeholder={"Location"} />
        <LineSeperator type="horizontal"/>
        <div className="ingredients flex-align-start" style={{width:"100%"}}>
          <h4>Ingredients:</h4>
          <div className="flex-row-justify-start" >
            <Icon name="settings" size='lg'/>
            <div className="bg-primary-900 text-primary-600" 
              style={{borderRadius:"50%", 
              maxWidth:30,minWidth:30,maxHeight:30, minHeight:30,textAlign:"center", justifyContent:"center"}}> 1
            </div>
            <InputField type="text" data_type="input" placeholder={"Ingredient 1"}/>
            <div className="text-primary-600" >
              <Icon name="trash" size='lg'/>
            </div>
          </div>
          <Button data_bg={'secondary'}  data_type={'container'} clickHandler={()=>navigate("/signin")}>
          <p>+ Add Ingredients</p>
          </Button>
        </div>
        <LineSeperator type="horizontal"/>
        <div className="instructions flex-align-start" style={{width:"100%"}}>
          <h4>Instructions:</h4>
          <div className="flex-row-justify-start" >
            <Icon name="settings" size='lg'/>
            <div className="bg-primary-900 text-primary-600" 
              style={{borderRadius:"50%", 
              maxWidth:30,minWidth:30,maxHeight:30, minHeight:30,textAlign:"center", justifyContent:"center"}}> 1
            </div>
            <InputField type="text" data_type="input" placeholder={"Instruction 1"}/>
            <div className="text-primary-600" >
              <Icon name="trash" size='lg'/>
            </div>
          </div>
          <Button data_bg={'secondary'}  data_type={'container'} clickHandler={()=>navigate("/signin")}>
          <p>+ Add Instructions</p>
          </Button>
        </div>
        {/* </Form> */}
        </CardBody>
        <CardAction>
          <div className="flex-row-justify-start" >
            <Button data_bg={'primary'} data_type={'container'} >
              <p>Save</p>
            </Button>
            <Button data_bg={'google'} data_type={'container'} >
              <p>Publish</p>
            </Button>
          </div>
        </CardAction>
      </Card>
    </div>
  )
}