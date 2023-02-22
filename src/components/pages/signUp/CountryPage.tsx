import { Card } from "../../utilities/card/Card"
import { CardBody } from "../../utilities/card/CardBody"
import { Header } from "../../utilities/Header"
import { ProgressBar } from "../../utilities/ProgressBar"
import { TextField } from "../../utilities/TextField"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'

export const CountryPage = () => {
  return (
    <div className="container">
      <Card classname={"flex-justify-start"}>
        <Header>
        <div className="flex-row">
          <FontAwesomeIcon icon={faArrowLeftLong} />
          <ProgressBar progress={20}/>
        </div>
        <h1>Which country are you from?</h1>
        </Header>
        <CardBody>
          <label >Please select your country of origin for a better recommendations.</label>
          <TextField textholder={"Search Country"}/>
        </CardBody>
      </Card>
    </div>
  )
}