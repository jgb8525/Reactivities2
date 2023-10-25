
import Calendar from 'react-calendar'
import { Header, Menu } from 'semantic-ui-react'

export default function ActivityFilters() {
  return (
    <>
      <Menu vertical size='large' style={{width: '100%', marginTop: 25}}>
            <Header icon='filter' attached colo='teal' content='Filters' />
            <Menu.Item content = "All Activities"/>
            <Menu.Item content = "Im going"/>
            <Menu.Item content = "im hosting"/>
        </Menu>
        <Header/>
        <Calendar/>
    </>
      
    
  )
}
