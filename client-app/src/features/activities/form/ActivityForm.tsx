import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { ChangeEvent, useState } from "react";



interface Props{
    activity: Activity|undefined;  
    closeForm: ()=>void;
    createOrEdit: (activity:Activity)=>void;
    submitting:boolean;




}

export default function ActivityForm({activity:selectedActivity,closeForm,createOrEdit,submitting}:Props) {

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
  createOrEdit(activity);
}

function handleInputChange(event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>){

const {name,value} = event.target;

setActivity({...activity,[name]:value});

}



  return (
    <Segment clearing>   
        <Form onSubmit={handleSubmit} autoComplete= 'off' onChange= {handleInputChange}>
                <Form.Input placeHolder = 'title'  name='title' value = {activity.title}  onChange={handleInputChange}/>
                <Form.TextArea placeHolder = 'description'   name='description'    value = {activity.description}  onChange={handleInputChange}/>
                <Form.Input placeHolder = 'category'  name='category' value = {activity.category}  onChange={handleInputChange}/>
                <Form.Input type='date' placeHolder = 'date' name='date' value = {activity.date}  onChange={handleInputChange}/>
                <Form.Input placeHolder = 'city' name='city' value = {activity.city}  onChange={handleInputChange}/>
                <Form.Input placeHolder = 'venue' name='venue' value = {activity.venue}  onChange={handleInputChange} />
                <Button floated = 'right' positive type ='submit' content = 'submit' />
                <Button  loading = {submitting} onClick={closeForm} floated = 'right' positive type ='button' content = 'Cancel' />

        </Form>

    </Segment>     
  )
}
