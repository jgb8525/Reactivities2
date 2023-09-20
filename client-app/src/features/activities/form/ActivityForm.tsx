import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";



export default observer(function ActivityForm() {


  const{activityStore}=useStore();
  const{selectedActivity,closeForm,createActivity,updateActivity,loading}=activityStore;
  
  const initialState=selectedActivity ?? {
    id:'',
    title: '',
    category: '',
    description : '',
    date: '',
    city:'',
    venue:''
  
  } 
  
  const [activity,setActivity] = useState(initialState);
  
  function handleSubmit(){
     activity.id ? updateActivity(activity) : createActivity(activity)
  }
  
  function handleInputChange(event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>){
  
  const {name,value} = event.target;
  
  setActivity({...activity,[name]:value});
  
  }
  
  
  
    return (
      <Segment clearing>   
          <Form onSubmit={handleSubmit} autoComplete= 'off' onChange= {handleInputChange}>
                  <Form.Input placeholder = 'title'  name='title' value = {activity.title}  onChange={handleInputChange}/>
                  <Form.TextArea placeholder = 'description'   name='description'    value = {activity.description}  onChange={handleInputChange}/>
                  <Form.Input placeholder = 'category'  name='category' value = {activity.category}  onChange={handleInputChange}/>
                  <Form.Input type='date' placeholder = 'date' name='date' value = {activity.date}  onChange={handleInputChange}/>
                  <Form.Input placeholder = 'city' name='city' value = {activity.city}  onChange={handleInputChange}/>
                  <Form.Input placeholder = 'venue' name='venue' value = {activity.venue}  onChange={handleInputChange} />
                  <Button floated = 'right' positive type ='submit' content = 'submit' loading = {loading}  />
                  <Button  onClick={closeForm} floated = 'right' positive type ='button' content = 'Cancel' />
          </Form>
  
      </Segment>     
    )
  }
  ) 