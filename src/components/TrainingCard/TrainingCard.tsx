import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import './TrainingCard.css'
import { Paginate } from '../../models/paginate';
import subjectService from '../../services/subjectService';
import occupationService from '../../services/occupationService';
import GetListSubjectResponse from '../../models/responses/subject/getListSubjectResponse';
import GetListOccupationResponse from '../../models/responses/occupation/getListOccupationResponse';


export default function TrainingCard(props: any) {
  const [subjects, setSubjects] = useState<Paginate<GetListSubjectResponse>>();
  const [occupations, setOccupations] = useState<Paginate<GetListOccupationResponse>>();

  useEffect(() => {
    subjectService.getAll(0, 6).then(result => {
      setSubjects(result.data)
    })

    occupationService.getAll(0, 6).then(result => {
      setOccupations(result.data)
    })
  }, []);


  return (

    <div className='training-content'>
      <div className='training-card-group'>
        {
          props.check === "occupation" ? (
            occupations?.items.map((occupation) => (
              <Card className="card-container">
                <Card.Body className="card-body">
                  <span>{occupation.name}</span>
                </Card.Body>
              </Card>
            ))
          ) : (
            subjects?.items.map((subject) => (
              <Card className="card-container">
                <Card.Body className="card-body">
                  <span>{subject.name}</span>
                </Card.Body>
              </Card>
            ))
          )
        }
      </div>
    </div>
  )
}
