import {useState, useEffect} from 'react'
import {Row, Col, Button, Tab, Tabs, Nav} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ProfileSettings from '../components/ProfileSettings'

const Settings = () => {

  const navigate = useNavigate()
  const [currentSettings, setCurrentSettings] = useState(0)

  useEffect(()=>{
    document.title = 'ChatApp | Settings'
  }, [])

  return (
    <>
      <Row
        style={{height: '8vh'}} 
        className='settings-header p-3 m-0 position-relative w-100'
      >
        <Col className='d-flex align-items-center p-0'>
          <Button 
            className='border-0 bg-transparent p-0 pe-3 fs-5' 
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
          className='container-c p-0 m-0 position-relative w-100'
        > 
          <Col lg={4} className='settings-nav p-0 pb-lg-3'>
            <Nav variant="pills" className="flex-lg-column">
              <Nav.Item>
                <Nav.Link eventKey="first" className='rounded-0 p-3 text-1'>Profile Settings</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second" className='rounded-0 p-3 text-1'>App Settings</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col lg={8} className='settings-content p-3 h-100'>
            <Tab.Content className='h-100'>
                <Tab.Pane eventKey="first" className='h-100'>
                  <ProfileSettings/>
                </Tab.Pane>
                <Tab.Pane eventKey="second" className='h-100'>Second tab content</Tab.Pane>
              </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  )
}

export default Settings