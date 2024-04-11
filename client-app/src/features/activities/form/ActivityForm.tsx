import { Button, Header, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from 'uuid';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyDateInput from "../../../app/common/form/MyDateInput";


export default observer(function ActivityForm() {


  const { activityStore } = useStore();
  const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;

  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: null,
    city: '',
    venue: ''
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('The activity title is required'),
    description: Yup.string().required('The activity description is required'),
    category: Yup.string().required(),
    date: Yup.string().required('Date is required'),
    city: Yup.string().required(),
    venue: Yup.string().required()
  })

  useEffect(() => {
    if (id) loadActivity(id).then(activity => setActivity(activity!))
  }, [id, loadActivity])

  function handleFormSubmit(activity: Activity) {
    if (!activity.id) {
      activity.id == uuid()
      createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
    }
    else {
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
    }

  }



  if (loadingInitial) return <LoadingComponent content='Loading Activity..' />

  return (
    <Segment clearing>
      <Header content='Activity Details' sub color='teal'></Header>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={values => handleFormSubmit(values)}>
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
            <MyTextInput name='title' placeholder="Title"></MyTextInput>
            <MyTextArea rows={3} placeholder='description' name='description' />
            <MySelectInput options={categoryOptions} placeholder='category' name='category' />
            <MyDateInput placeholderText='date' name='date' showTimeSelect timeCaption="time" dateFormat="MMMM d, yyyy h:mm aa" />
            <Header content='Location Details' sub color='teal'></Header>
            <MyTextInput placeholder='city' name='city' />
            <MyTextInput placeholder='venue' name='venue' />
            <Button disabled={isSubmitting || !dirty || !isValid} floated='right' positive type='submit' content='submit' loading={loading} />
            <Button as={Link} to='/activities' floated='right' positive type='button' content='Cancel' />
          </Form>
        )}
      </Formik>

    </Segment>
  )
}
) 