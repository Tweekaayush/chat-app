import {useEffect} from 'react'
import {Row, Col, Button, Tab, Nav} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ProfileSettings from '../components/ProfileSettings'
import AppSettings from '../components/AppSettings'

const Settings = () => {

  const navigate = useNavigate()

  useEffect(()=>{
    document.title = 'ChatApp | Settings'
  }, [])

  return (
    <>
      <Row
        style={{height: '8vh'}} 
        className='settings-header p-2 p-sm-3 m-0 position-relative w-100 rounded-top'
      >
        <Col className='d-flex align-items-center p-0'>
          <Button 
            className='border-0 bg-transparent p-0 pe-3 fs-5 text-1' 
            onClick={()=>navigate('/')}
          >
            <i class="bi bi-arrow-left"></i>
          </Button>
          <div className='d-flex align-items-center gap-2'>
            <h2 className='fs-5 m-0 text-1'>Settings</h2>
            <i class="bi bi-gear text-1 fs-5"></i>
          </div>
        </Col>
      </Row>
      <Tab.Container defaultActiveKey="first">
        <Row
          style={{height: '62vh'}} 
          className='container-c p-0 m-0 position-relative w-100 rounded-bottom overflow-hidden'
        > 
          <Col lg={4} className='settings-nav p-0 pb-lg-3'>
            <Nav variant="pills" className="flex-lg-column">
              <Nav.Item>
                <Nav.Link eventKey="first" className='rounded-0 p-3 text-1'>Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second" className='rounded-0 p-3 text-1'>Themes</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col lg={8} className='settings-content p-2 p-sm-3 h-100'>
            <Tab.Content className='h-100'>
                <Tab.Pane eventKey="first" className='h-100'>
                  <ProfileSettings/>
                </Tab.Pane>
                <Tab.Pane eventKey="second" className='h-100'>
                  <AppSettings/>
                </Tab.Pane>
              </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  )
}

export default Settings