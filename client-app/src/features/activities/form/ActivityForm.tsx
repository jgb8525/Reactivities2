import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {v4 as uuid} from 'uuid';



export default observer(function ActivityForm() {


  const{activityStore}=useStore();
  const{createActivity,updateActivity,loading,loadActivity,loadingInitial}=activityStore;

  const {id} = useParams();
  const navigate  = useNavigate();

  const[activity,setActivity] = useState<Activity>({
    id:'',
    title: '',
    category: '',
    description : '',
    date: '',
    city:'',
    venue:''
  })
  
  useEffect(()=>{
      if(id) loadActivity(id).then(activity=>setActivity(activity!))
  },[id,loadActivity])

  function handleSubmit(){
    if(!activity.id){
      activity.id ==uuid()
      createActivity(activity).then(()=>navigate(`/activities/${activity.id}`))
    }
    else{
      updateActivity(activity).then(()=>navigate(`/activities/${activity.id}`) )
    }
    
  }
  
  function handleInputChange(event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>){
  const {name,value} = event.target;
  setActivity({...activity,[name]:value});  
  }
  
  if(loadingInitial) return <LoadingComponent content = 'Loading Activity..'/>
  
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
                  <Button  as = {Link} to='/activities' floated = 'right' positive type ='button' content = 'Cancel' />
          </Form>
  
      </Segment>     
    )
  }
  ) 